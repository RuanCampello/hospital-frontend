import { useState } from "react"
import FuncButton from "../funcButtons"
import { useRecoilState } from "recoil"
import { viewState } from "@/atoms/viewAtom"
import { formatDate } from "./patientItem"
import { employeeCpf, employeeDate, employeeFunction, employeeId, employeeName, employeeNumber } from "@/atoms/updateEmployeeAtom"
import ToastComponent from "../toast"
import { CheckCircle, XCircle } from "@phosphor-icons/react"
import { actionState } from "@/atoms/actionAtom"
import { isEmployeeOnTeam } from "../views/addTeamView"

interface EmployeeItemProps {
  id: string,
  name: string,
  cpf: string,
  date: Date,
  number: string,
  func: string,
  isOnTeam: boolean;
}

export default function EmployeeItem({id, name, cpf, date, number, func, isOnTeam}: EmployeeItemProps) {
  const [eId, setEmployeeId] = useRecoilState(employeeId)
  const [eName, setEmployeeName] = useRecoilState(employeeName)
  const [eCpf, setEmployeeCpf] = useRecoilState(employeeCpf)
  const [eDate, setEmployeeDate] = useRecoilState(employeeDate)
  const [eNumber, setEmployeeNumber] = useRecoilState(employeeNumber)
  const [eFunc, setEmployeeFunction] = useRecoilState(employeeFunction)

  const [open, setOpen] = useState(false)
  const [actionS, setActionState] = useRecoilState(actionState)
  const [viewS, setViewState] = useRecoilState(viewState)
  const [status, setStatus] = useState(Number)
  
  async function delEmployee(id: String) {
    const response = await fetch(`http://localhost:8080/employee/${id}`, {
      method: 'DELETE',
      headers: {'Content-Type': 'application/json'},
    })
    console.log(response.status)
    setStatus(response.status)
  }
  function handleDelete() { 
    delEmployee(id)
    setOpen(false)
    setOpen(true)
    setActionState(true)
  }
  function handlePut() {
    setEmployeeId(id)
    setEmployeeName(name)
    setEmployeeCpf(cpf)
    setEmployeeDate(String(date))
    setEmployeeNumber(number)
    setEmployeeFunction(func)
    setViewState('putEmployeeView')
  }
  return (
    <div>
      <div className='grid grid-cols-8 items-center text-center xl:text-lg text-sm'>
        <div className='col-span-2 text-left flex items-center gap-5'>
          <div className={`w-2 h-14 ${isOnTeam?'bg-razzmatazz':'bg-bittersweet'}`}>    
          </div>
          <span>
            {name}
          </span>
        </div>
        <div>{cpf}</div>
        <div>{formatDate(date)}</div>
        <div>{number}</div>
        <div className='col-span-2'>{func}</div>
        <div className='flex justify-end me-2'>
          <FuncButton funcDelete={handleDelete} funcPut={handlePut}/>
        </div>
      </div>
      {status ?
    <ToastComponent icon={status !== 200 ? <CheckCircle size={32}/> : <XCircle size={32}/>} title={status === 200 ? 'Success' : 'Error'} disc={status === 200 ? 'Employee deleted!' : 'Employee does not exist'} oFunc={open} cFunc={setOpen}/>
    :null}
    </div>
  )
}