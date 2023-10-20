import { useState } from "react"
import FuncButton from "./funcButtons"
import { useRecoilState } from "recoil"
import { viewState } from "@/atoms/viewAtom"

interface EmployeeItemProps {
  id: string,
  name: string,
  cpf: string,
  date: Date,
  number: string,
  func: string
}

export default function EmployeeItem({id, name, cpf, date, number, func}: EmployeeItemProps) {
  const [open, setOpen] = useState(false)
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
    setOpen(true)
  }
  function handlePut() {
    localStorage.setItem('idEmployee', id)
    localStorage.setItem('nameEmployee', name)
    localStorage.setItem('cpfEmployee', cpf)
    localStorage.setItem('dateEmployee', String(date))
    localStorage.setItem('numberEmployee', number)
    localStorage.setItem('funcEmployee', func)

    setViewState('putEmployeeView')
  }
  return (
    <div>
      <div className='grid grid-cols-6 items-center text-center xl:text-lg py-2 text-sm xl:px-3'>
        <div>{name}</div>
        <div>{cpf}</div>
        <div>{String(date).replaceAll('-', '/')}</div>
        <div>{number}</div>
        <div>{func}</div>
        <div>
          <FuncButton funcDelete={handleDelete} funcPut={handlePut}/>
        </div>
      </div>
    </div>
  )
}