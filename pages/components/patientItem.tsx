import { viewState } from "@/atoms/viewAtom"
import { PencilSimple, TrashSimple } from "@phosphor-icons/react"
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
  }
  return (
  <div className='grid grid-cols-6 py-2 items-center md:px-8 xl:text-lg md:text-base text-xs'>
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
        <PencilSimple size={24} weight='fill'/>
      </button>
      <button className='border-2 hover:bg-red-500 border-red-500 p-2 rounded-full' onClick={()=> handleDelete()}>
        <TrashSimple size={24} weight='fill'/>
      </button>
    </div>
  </div>
  )
}