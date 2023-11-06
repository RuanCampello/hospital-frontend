import { useEffect, useState } from "react"
import EmployeeItem from "../subitems/employeeItem"
import { useRecoilState } from "recoil"
import { actionState } from "@/atoms/actionAtom"

export default function ViewEmployee(){
  const [actionS, setActionState] = useRecoilState(actionState)
  const [employees, setEmployees] = useState([])
  async function getEmployees() {
    const response = await fetch(`http://localhost:8080/employee/all`, {
      method: 'GET',
      headers: {'Content-type':'application/json'}
    })
    const data = await response.json()
    setEmployees(data)
    console.log(data)
  }
  useEffect(()=> {
    getEmployees()
  }, [])
  setInterval(()=> {
    if(actionS) {
      getEmployees()
      setActionState(false)
    }
  }, 1500)
  return (
    <div className='w-full xl:px-8 lg:px-6 px-4 py-2'>
      <div className='grid grid-cols-6 p-2 rounded-t-lg font-semibold xl:text-lg text-sm text-center items-center bg-slate-700'>
        <div>Nome</div>
        <div>CPF</div>
        <div>Data de nascimento</div>
        <div>Telefone</div>
        <div>Função</div>
      </div>
      {
        employees.map((employee)=> {
          return (
          <div key={employee['id']}>
            <EmployeeItem id={employee['id']} name={employee['name']} cpf={employee['cpf']} func={employee['function']} date={employee['date']} number={employee['personal_number']}/>
          </div>
          )
        })
      }
    </div>
  )
}