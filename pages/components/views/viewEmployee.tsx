import { useEffect, useState } from "react"
import EmployeeItem from "../employeeItem"

export default function ViewEmployee(){
  const [employees, setEmployees] = useState([])
  async function getEmployees() {
    const response = await fetch(`http://localhost:8080/employee/all`, {
      method: 'GET',
      headers: {'Content-type':'application/json'}
    })
    const data = await response.json()
    setEmployees(data)
    console.log(data);
  }
  useEffect(()=> {
    getEmployees()
  }, [])
  return (
    <div className='w-full xl:px-8 lg:px-6 px-4'>
      <div className='grid grid-cols-5 p-2 rounded-t-lg font-semibold text-sm text-center items-center bg-slate-700'>
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
            <EmployeeItem name={employee['name']} cpf={employee['cpf']} func={employee['function']} date={employee['date']} number={employee['personal_number']}/>
          </div>
          )
        })
      }
    </div>
  )
}