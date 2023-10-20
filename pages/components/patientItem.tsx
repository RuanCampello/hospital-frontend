import { viewState } from "@/atoms/viewAtom"
import { Alert, AlertTitle, Collapse, IconButton } from "@mui/material"
import { PencilSimple, TrashSimple, XCircle } from "@phosphor-icons/react"
import { useState } from "react"
import { useRecoilState } from "recoil"

interface PatientItemProps {
  id: string,
  cpf: string,
  name: string,
  date: Date,
  personalNumber: string,
  responsibleNumber: string
}

export default function PatientItem({id, cpf, name, date, personalNumber, responsibleNumber}: PatientItemProps) {
  const [status, setStatus] = useState(Number)
  const [viewS, setViewState] = useRecoilState(viewState)
  const [open, setOpen] = useState(false)

  async function delPatient(id: String) {
    const response = await fetch(`http://localhost:8080/patient/${id}`, {
      method: 'DELETE',
      headers: {'Content-Type': 'application/json'},
    })
    console.log(response.status)
    console.log(response);
    
    setStatus(response.status)
  }

  function handlePut() {
    localStorage.setItem('idPatient', id)
    localStorage.setItem('namePatient', name)
    localStorage.setItem('cpfPatient', cpf)
    localStorage.setItem('datePatient', String(date))
    localStorage.setItem('numberPersonal', personalNumber)
    localStorage.setItem('numberResponsible', responsibleNumber)

    setViewState('putPatientView')
  }
  function handleDelete() {
    delPatient(id)
    setOpen(true)
  }
  return (
    <div>
  <div className='grid grid-cols-6 py-2 items-center md:px-8 xl:text-lg text-xs'>
    <div className='text-start inline'>
      <p className='truncate max-w-[28rem]'>
        {name}
      </p>
    </div>
    <div>{cpf}</div>
    <div>{date.toString().replace(/-/gi, '/')}</div>
    <div>{personalNumber}</div>
    <div>{responsibleNumber}</div>
    <div className='col-span-1 flex justify-around'>
      <button className='border-2 hover:bg-yellow-500 border-yellow-500 p-2 rounded-full' onClick={()=> handlePut()}>
        <PencilSimple className='xl:h-6 xl:w-6 w-4 h-4' weight='fill'/>
      </button>
      <button className='border-2 hover:bg-red-500 border-red-500 p-2 rounded-full' onClick={()=> handleDelete()}>
        <TrashSimple className='xl:h-6 xl:w-6 w-4 h-4' weight='fill'/>
      </button>
    </div>
  </div>
    {status ?
      <Collapse in={open}>
      <Alert color={status === 200 ? 'success' : 'error'} severity={status === 200 ? 'success' : 'error'} variant='filled' action={
        <IconButton aria-label='close' color='inherit' onClick={()=> {setOpen(false)}}>
          <XCircle className='mb-1' weight='duotone'/>
        </IconButton>
      } className={`xl:w-96 float-right  my-8 items-center`} > 
      { 
        status === 200 ? 
        <span><AlertTitle><b>Success</b></AlertTitle>Paciente Excluido!</span> :
        <span><AlertTitle><b>Error</b></AlertTitle>Paciente não existe</span>
      }
      </Alert>
      </Collapse> 
    :null}
  </div>
  )
}