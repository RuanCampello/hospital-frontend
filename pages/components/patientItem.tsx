import { viewState } from "@/atoms/viewAtom"
import { Alert, AlertTitle, Collapse, IconButton } from "@mui/material"
import { XCircle } from "@phosphor-icons/react"
import { useState } from "react"
import { useRecoilState } from "recoil"
import FuncButton from "./funcButtons"
import { patientId, patientName, patientDate, patientCpf, patientPersonalNumber, patientResponsibleNumber } from "@/atoms/updatePatientAtom"

interface PatientItemProps {
  id: string,
  cpf: string,
  name: string,
  date: Date,
  personalNumber: string,
  responsibleNumber: string
}

export function formatDate(date: Date) {
  let data = String(date).replaceAll('-','')
  console.log(date, data)
  let year = data.substring(0,4)
  let month = data.substring(4,6)
  let day = data.substring(6,11)
  console.log(`day: ${day} month:${month} year:${year}`)
  
  let dataFormated = (`${day}/${month}/${year}`)
  return dataFormated
}

export default function PatientItem({id, cpf, name, date, personalNumber, responsibleNumber}: PatientItemProps) {
  const [status, setStatus] = useState(Number)
  const [viewS, setViewState] = useRecoilState(viewState)
  const [open, setOpen] = useState(false)

  const [pId, setPatientId] = useRecoilState(patientId)
  const [pName, setPatientName] = useRecoilState(patientName)
  const [pDate, setPatientDate] = useRecoilState(patientDate)
  const [pCpf, setPatientCpf] = useRecoilState(patientCpf)
  const [pPNumber, setPatientPersonalNumber] = useRecoilState(patientPersonalNumber)
  const [pRNumber, setPatientResponsibleNumber] = useRecoilState(patientResponsibleNumber)

  async function delPatient(id: String) {
    const response = await fetch(`http://localhost:8080/patient/${id}`, {
      method: 'DELETE',
      headers: {'Content-Type': 'application/json'},
    })
    setStatus(response.status)
  }

  function handlePut() {
    setPatientId(id)
    setPatientName(name)
    setPatientDate(String(date))
    setPatientCpf(cpf)
    setPatientPersonalNumber(personalNumber)
    setPatientResponsibleNumber(responsibleNumber)
    setViewState('putPatientView')
  }
  function handleDelete() {
    delPatient(id)
    setOpen(true)
  }
  return (
    <div>
  <div className='grid grid-cols-6 py-2 items-center px-4 lg:px-8 xl:text-lg text-xs'>
    <div className='text-start inline'>
      <p className='truncate max-w-[28rem]'>
        {name}
      </p>
    </div>
    <div>{cpf}</div>
    <div>{formatDate(date)}</div>
    <div>{personalNumber}</div>
    <div>{responsibleNumber}</div>
    <div className='col-span-1 flex justify-around'>
      <FuncButton funcDelete={handleDelete} funcPut={handlePut}/>
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