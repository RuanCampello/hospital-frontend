import { useState } from 'react'
import FormField from '../formField'
import { Alert, AlertTitle, Collapse, IconButton } from '@mui/material'
import { XCircle } from '@phosphor-icons/react'

export default function AddPatientView() {
  const [name, setName] = useState(null)
  const [cpf, setCpf] = useState(null)
  const [date, setDate] = useState(Date)
  const [pNumber, setPNumber] = useState(null)
  const [rNumber, setRNumber] = useState(null)
  const [open, setOpen] = useState(false)
  const [data, setData] = useState(null)
  const [dataErrors, setDataErrors] = useState(null)
  const [status, setStatus] = useState(Number)

  async function addPatient() {
    const response = await fetch('http://localhost:8080/patient/', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        name: name,
        cpf: cpf,
        date: date,
        personal_number: pNumber,
        responsible_number: rNumber
      })
    })
    const data = await response.json()
    setStatus(response.status)
    if(data!['errors'] !== undefined && data) {
      setDataErrors(data['errors'][0]['defaultMessage'])
    }
    if (data) setData(data)
  }
  function handleSubmit(e:any) {
    e.preventDefault()
    addPatient()
    setOpen(true)
  }
  return (
    <div>
      <form className='py-16 xl:px-[150px] px-16' onSubmit={handleSubmit}>
        <div className='grid md:grid-cols-2 md:gap-6'>
          <FormField func={setName} dName={'Nome'} />
          <FormField func={setCpf} dName={'CPF'} />
        </div>
        <div className='grid md:grid-cols-3 md:gap-6 mt-6'>
          <FormField func={setDate} type={'date'} dName={'Data de nascimento'} />
          <FormField func={setPNumber} dName={'Número pessoal'} />
          <FormField func={setRNumber} dName={'Número do responsável'} />
        </div>
        <button className='bg-teal-600 text-md font-semibold px-6 p-3 hover:bg-teal-700 float-right rounded-full' type='submit'>Submit</button>
      </form>
{data ?
    <Collapse in={open}>
    <Alert color={status === 201 ? 'success' : 'error'} severity={status === 201 ? 'success' : 'error'} variant='filled' action={
      <IconButton aria-label='close' color='inherit' onClick={()=> {setOpen(false)}}>
        <XCircle className='mb-1' weight='duotone'/>
      </IconButton>
    } className={`xl:w-96 float-right mx-16 xl:me-[400px] mt-auto items-center`} > 
    { status === 201 ? 
    <span><AlertTitle><b>Success</b></AlertTitle>Paciente registrado!</span> : 
    status === 500 ? 
    <span><AlertTitle><b>Error</b></AlertTitle>CPF deve ser único</span> : <span><AlertTitle><b>Error</b></AlertTitle>{dataErrors}</span> }
    </Alert>
    </Collapse> : null
}
    </div>
  )  
}