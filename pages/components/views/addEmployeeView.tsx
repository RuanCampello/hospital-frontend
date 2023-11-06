import { useState } from 'react';
import FormField from '../formField';
import ToastComponent from '../toast';
import { CheckCircle, XCircle } from '@phosphor-icons/react';

export default function AddEmployeeView () {
  const [name, setName] = useState(null)
  const [cpf, setCpf] = useState(null)
  const [date, setDate] = useState(null)
  const [number, setNumber] = useState(null)
  const [func, setFunc] = useState(null)
  const [status, setStatus] = useState(Number)
  const [dataErrors, setDataErrors] = useState(null)
  const [data, setData] = useState(null)
  const [open, setOpen] = useState(false)

  async function AddEmployee() {
    const response = await fetch(`http://localhost:8080/employee/`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        name: name,
        cpf: cpf,
        date: date,
        personal_number: number,
        function: func
      })
    })
    const data = await response.json()
    console.log(data)
    setStatus(response.status)
    if(data!['errors'] !== undefined && data) {
      setDataErrors(data!['errors'][0]['defaultMessage'])
    }
    if(data) setData(data)
  }
  function handleSubmit(e: any) {
    e.preventDefault()
    AddEmployee()
    setOpen(true)
  }

  return (
    <div>
      <form className='py-16 xl:px-[150px] px-16' onSubmit={handleSubmit}>
        <div className='grid md:grid-cols-2 md:gap-6'>
          <FormField dName='Nome' func={setName} isDefault={false} />
          <FormField dName='CPF' func={setCpf} isDefault={false} />
        </div>
        <div className='grid md:grid-cols-3 md:gap-6 mt-6'>
          <FormField dName='Data de nascimento' type='date' func={setDate} isDefault={false} />
          <FormField dName='Telefone' func={setNumber} isDefault={false} />
          <FormField dName='Função' func={setFunc} isDefault={false} />
        </div>
        <button className='bg-teal-600 text-md font-semibold px-6 p-3 hover:bg-teal-700 float-right rounded-full' type='submit'>Submit</button>
      </form>
      {data ?
        <ToastComponent oFunc={open} cFunc={setOpen} icon={status === 201 ? <CheckCircle size={32}/> : <XCircle size={32}/>} title={status === 201 ? 'Success' : 'Error'} disc={status === 201 ? 'Employee Registered!' : status === 500 ? 'CPF must be unique' : String(dataErrors)
      }/> : null
      }
    </div>
  )
}