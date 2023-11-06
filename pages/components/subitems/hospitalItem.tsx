import { viewState } from "@/atoms/viewAtom"
import { CheckCircle, XCircle } from "@phosphor-icons/react"
import { useState } from "react"
import { useRecoilState } from "recoil"
import FuncButton from "../funcButtons"
import ToastComponent from "../toast"
import { actionState } from "@/atoms/actionAtom"
import { hospitalAddress, hospitalCnpj, hospitalId, hospitalName, hospitalNumber } from "@/atoms/updateHospitalAtom"

interface HospitalItemProps {
  index: number,
  name: string,
  address: string,
  number: string,
  cnpj: string,
  id: string
}

export default function HospitalItem({index, name, address, number, cnpj, id}: HospitalItemProps) {
  const [hId, setHospitalId] = useRecoilState(hospitalId)
  const [hName, setHospitalName] = useRecoilState(hospitalName)
  const [hCnpj, setHospitalCnpj] = useRecoilState(hospitalCnpj)
  const [hAddress, setHospitalAddress] = useRecoilState(hospitalAddress)
  const [hNumber, setHospitalNumber] = useRecoilState(hospitalNumber)

  const [actionS, setActionState] = useRecoilState(actionState)
  const [viewS, setViewState] = useRecoilState(viewState) 
  const [open, setOpen] = useState(false)
  const [status, setStatus] = useState(Number)

  async function delHospital(id: String) {
    const response = await fetch(`http://localhost:8080/hospital/${id}`, {
      method: 'DELETE',
      headers: {'Content-Type': 'application/json'},
    })
    console.log(response.status)
    setStatus(response.status)
  }
  function handleDelete() {
    delHospital(id)
    setOpen(false)
    setOpen(true)
    setActionState(true)
  }
  function handlePut() {
    setHospitalId(id)
    setHospitalName(name)
    setHospitalCnpj(cnpj)
    setHospitalAddress(address)
    setHospitalNumber(number)
    setViewState('putHospitalView')
  }
  return (
  <div>
  <div className='grid grid-cols-6 xl:text-lg text-xs py-2 xl:px-3 items-center text-center'>
    <div className='col-span-2 grid grid-cols-5 items-center'>
      <div className='xl:w-8 w-5 bg-teal-500 rounded-full xl:h-8 h-5 text-slate-700 font-bold flex justify-center items-center'>
        <span className='col-span-1'>{index+1}</span>
        </div>
      <span className='col-span-4 text-start'>{name}</span>
    </div>
    <div className='col-span-1'>{address}</div>
    <div>{number}</div>
    <div>{cnpj}</div>
    <div className='col-span-1 flex justify-around'>
      <FuncButton funcDelete={handleDelete} funcPut={handlePut}/>
    </div>
    
  </div>
  {status ?
    <ToastComponent icon={status !== 200 ? <CheckCircle size={32}/> : <XCircle size={32}/>} title={status === 200 ? 'Success' : 'Error'} disc={status === 200 ? 'Hospital deleted!' : 'Hospital does not exist'} oFunc={open} cFunc={setOpen}/>
    :null}
  </div>
  )
}