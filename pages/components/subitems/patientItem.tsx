import { viewState } from "@/atoms/viewAtom"
import { CheckCircle, XCircle } from "@phosphor-icons/react"
import { useState } from "react"
import { useRecoilState } from "recoil"
import FuncButton from "../funcButtons"
import { patientId, patientName, patientDate, patientCpf, patientPersonalNumber, patientResponsibleNumber } from "@/atoms/updatePatientAtom"
import { actionState } from "@/atoms/actionAtom"
import ToastComponent from "../toast"

interface PatientItemProps {
  id: string,
  cpf: string,
  name: string,
  date: Date,
  personalNumber: string,
  responsibleNumber: string
}

export function formatDate(date: any) {
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
  const [actionS, setActionState] = useRecoilState(actionState)

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
    setOpen(false)
    setOpen(true)
    setActionState(true)
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
    <ToastComponent icon={status !== 200 ? <CheckCircle size={32}/> : <XCircle size={32}/>} title={status === 200 ? 'Success' : 'Error'} disc={status === 200 ? 'Patient deleted!' : 'Patient does not exist'} oFunc={open} cFunc={setOpen}/>
    :null}
  </div>
  )
}