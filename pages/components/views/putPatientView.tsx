import { useState } from "react";
import FormField from "../formField";
import { Alert, AlertTitle, Collapse, IconButton } from "@mui/material";
import { XCircle } from "@phosphor-icons/react";
import { useRecoilState } from "recoil";
import { viewState } from "@/atoms/viewAtom";

export default function PutPatientView() {
  const [viewS, setViewState] = useRecoilState(viewState)
  const [id, setId] = useState(null)
  const [data, setData] = useState(null)
  const [open, setOpen] = useState(false)
  const [dataErrors, setDataErrors] = useState(null)
  const [status, setStatus] = useState(Number)
  const idSession = localStorage.getItem('idPatient')
  async function putPatient() {
    const nameSession = localStorage.getItem('namePatient')
    const dateSession = localStorage.getItem('datePatient')
    const cpfSession = localStorage.getItem('cpfPatient')
    const numberPersonalSession = localStorage.getItem('numberPersonal')
    const numberResponsibleSession = localStorage.getItem('numberResponsible')

    const response = await fetch(`http://localhost:8080/patient/${idSession}`, {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        name: nameSession,
        date: dateSession,
        cpf: cpfSession,
        personal_number: numberPersonalSession,
        responsible_number: numberResponsibleSession
      })
    })
    const data = await response.json()
    setData(data)
    if(data!['errors'] !== undefined && data){
      setDataErrors(data!['errors'][0]['defaultMessage'])
    }
    if(data) {
      setData(data)
      setStatus(response.status)
      //if(status === 200) setViewState('getPatientView')
    }
  }
  function handleSubmit(e: any) {
    e.preventDefault()
    putPatient()
    setOpen(true)
  }
  return (
    <div>
      <form className='py-16 xl:px-[200px] px-16' onSubmit={handleSubmit}>
        <div className='grid md:grid-cols-2 md:gap-6'>
          <FormField name={'namePatient'} isDefault={true} dName={'Nome'} />
          <FormField name={'cpfPatient'} isDefault={true} dName={'CPF'} />
        </div>
        <div className='grid md:grid-cols-3 md:gap-6 mt-6'>
          <FormField name={'datePatient'} type="date" isDefault={true} dName={"Data de nascimento"}/>
          <FormField name={'numberPersonal'} isDefault={true} dName={'Telefone pessoal'}/>
          <FormField name={'numberResponsible'} isDefault={true} dName={'Telefone do responsável'}/>
        </div>
        <button className='bg-teal-600 text-md font-semibold px-6 p-3 hover:bg-teal-700 float-right rounded-full' type='submit'>Submit</button>
      </form>
      {data ?
          <Collapse in={open}>
          <Alert color={status === 200 ? 'success' : 'error'} severity={status === 200 ? 'success' : 'error'} variant='filled' action={
            <IconButton aria-label='close' color='inherit' onClick={()=> {setOpen(false)}}>
              <XCircle className='mb-1' weight='duotone'/>
            </IconButton>
          } className={`xl:w-96 float-right mx-16 xl:me-[200px] mt-auto items-center`} > 
          { status === 200 ? 
          <span><AlertTitle><b>Success</b></AlertTitle>Paciente atualizado!</span> : 
          status === 500 ? 
          <span><AlertTitle><b>Error</b></AlertTitle>CPF deve ser único</span> : <span><AlertTitle><b>Error</b></AlertTitle>{dataErrors}</span> }
          </Alert>
          </Collapse> : null
        }
    </div>
  )
}