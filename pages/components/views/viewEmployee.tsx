import { useEffect, useState } from 'react'
import EmployeeItem from '../subitems/employeeItem'
import { useRecoilState } from 'recoil'
import { actionState } from '@/atoms/actionAtom'
import { Team } from './addTeamView'

const API_ENDPOINT = 'http://localhost:8080/employee/all'
const VERIFY_INTERVAL = 1500

interface Employee {
  id: string
  name: string
  cpf: string;
  function: string
  date: Date
  personal_number: string
}
export default function ViewEmployee () {
  const [actionS, setActionState] = useRecoilState(actionState)
  const [employees, setEmployees] = useState<Employee[]>([])
  const [teams, setTeams] = useState<Team[]>([])

  async function getEmployees() {
    const response = await fetch(API_ENDPOINT, {
      method: 'GET',
      headers: { 'Content-type': 'application/json' },
    })
    const data = await response.json()
    setEmployees(data) 
  }
  async function getTeams() {
    const response = await fetch('http://localhost:8080/team/all', {
      method: 'GET',
      headers: {'Content-type':'application/json'}
    })
    const data = await response.json()
    setTeams(data)
  }
  setInterval(() => {
    if (actionS) {
      getEmployees()
      setActionState(false)
    }
  }, VERIFY_INTERVAL)
  useEffect(() => {
    getEmployees()
    getTeams()
  }, [])
  const isEmployeeOnTeam = (employeeId: string) => {
    for (const team of teams) {
      if (team.funcionarioList.some((employee) => employee.id === employeeId)) {
        return true
      }
    }
    return false
  }

  return (
    <div className='w-full xl:px-16 lg:px-6 px-4 xl:py-6 py-2'>
      <div className='grid grid-cols-8 p-2 rounded-t-lg font-semibold xl:text-lg text-sm text-center items-center bg-yankees-blue-primary'>
        <div className='col-span-2 text-left gap-2 flex'>
          <span>#</span>
          <span>Nome</span>
        </div>
        <div>CPF</div>
        <div>Data de nascimento</div>
        <div>Telefone</div>
        <div className='col-span-2'>Função</div>
      </div>

      {employees.map((employee) => (
          <div key={employee.id}>
            <EmployeeItem
              isOnTeam={isEmployeeOnTeam(employee.id)}
              id={employee.id}
              name={employee.name}
              cpf={employee.cpf}
              func={employee.function}
              date={employee.date}
              number={employee.personal_number}
            />
          </div>
        )
      )}
      <div className='absolute bottom-6 bg-yankees-blue-primary rounded-md px-2 p-1'>
        <ul className='inline'>
          <div className='flex items-center gap-1'>
            <div className='w-3 h-3 bg-razzmatazz'></div>
            <span>com time</span>
          </div>
          <div className='flex items-center gap-1'>
            <div className='w-3 h-3 bg-bittersweet'></div>
            <span>sem time</span>
          </div>
        </ul>
      </div>
    </div>
  )
}