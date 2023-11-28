import { useEffect, useState } from 'react'
import FormField from '../formField'
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import Chip from '@mui/material/Chip';
import { CheckCircle, XCircle } from '@phosphor-icons/react';
import ToastComponent from '../toast';
import { Checkbox, ListItemText } from '@mui/material';

export interface Employee {
  id: string
  cpf: string
  date: Date
  func: string
  name: string
  personal_number: string
}
export interface Team {
  name: string
  funcionarioList: Employee[]
}
export const labelStyle = {
  color: 'rgb(226,232,240)',
  background: 'rgb(30,41,59)',
  padding: '3px'
}
export const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: 48 * 4.5 + 8,
      width: 250}}
}
export function isEmployeeOnTeam(employeeId: string, teams: Team[]): { id: string, isOnTeam: boolean } {
  for (const team of teams) {
    for (const employee of team.funcionarioList) {
      if (employee.id === employeeId) {
        // Employee is on a team
        return { id: employeeId, isOnTeam: true };
      }
    }
  }
  // Employee is not on any team
  return { id: employeeId, isOnTeam: false };
}
export default function AddTeamView() {
  const [name, setName] = useState(null)
  const [fList, setFList] = useState<Employee[]>([])
  const [status, setStatus] = useState(Number)
  const [data, setData] = useState(null)
  const [dataErrors, setDataErrors] = useState(null)
  const [open, setOpen] = useState(false)
  const [employees, setEmployees] = useState<Employee[]>([])
  const [teams, setTeams] = useState<Team[]>([])
  const [options, setOptions] = useState<string[]>([])
  const idToNameMap = new Map<string, string>()

  async function getEmployees() {
    const response = await fetch(`http://localhost:8080/employee/all`, {
      method: 'GET',
      headers: {'Content-type':'application/json'}
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
  async function addTeam() {
    const response = await fetch(`http://localhost:8080/team/`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        name: name,
        funcionarioList: fList
      })
    })
    const data = await response.json()
    setStatus(response.status)
    if(data!['errors'] !== undefined && data) setDataErrors(data['errors'][0]['defaultMessage'])
    if (data) setData(data)
  }
  const setUnemployeesList = () => {
    // setting employees without team 
    const updatedEmployees = [...employees]
    teams.forEach((team) => {
      team.funcionarioList.forEach((func) => {
        const funcName = func.name
        const funcId = func.id
        const index = updatedEmployees.findIndex((employee) => employee.name === funcName && employee.id === funcId)
        if (index !== -1) {
          updatedEmployees.splice(index, 1)
        }
      })
    }) 
    setEmployees(updatedEmployees)
  }
  function handleSubmit(e: any) {
    e.preventDefault()
    addTeam()
    setOpen(true)
  }
  useEffect(() => {
    const uniqueOptionIds = new Set(options) // get the unique ids on options
    const updatedList: Employee[] = employees.filter((emp) => uniqueOptionIds.has(emp.id)) // filter employees only with same id as its in options
    // filter out employees already present in fList
    const uniqueUpdatedList = updatedList.filter((emp) => !fList.some((existingEmp) => existingEmp.id === emp.id))
    // update fList state by combining existing fList with the unique updated list
    setFList((prevFList) => [...prevFList, ...uniqueUpdatedList])
  }, [options])

  const handleChange = (event: SelectChangeEvent<typeof options>) => {
    const {
      target: { value },
    } = event;
    setOptions(typeof value === 'string' ? value.split(',') : value)
  }
  useEffect(() => {
    // fetch employees and teams
    getEmployees()
    getTeams()
  }, [])
  useEffect(() => {
    // update unemployees list when teams or employees change
    setUnemployeesList()
  }, [teams, employees])
  return (
    <div>
      <form className='py-16 xl:px-[150px] px-16' onSubmit={handleSubmit}>
        <div className='grid md:grid-cols-2 md:gap-6'>
          <FormField func={setName} dName={'Nome'} isDefault={false}/>
  <FormControl className='w-full rounded-lg h-fit'>
    <InputLabel id="demo-multiple-checkbox-label" style={labelStyle}>Selecione os funcionários da equipe</InputLabel>
    <Select
      labelId="demo-multiple-checkbox-label"
      id="demo-multiple-checkbox"
      multiple
      value={options}
      onChange={(e) => {
        handleChange(e)
      }}
      input={<OutlinedInput label="Selecione os funcionários da equipe" />}
      className='bg-slate-800 text-slate-600'
      renderValue={(selected) => (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75 }}>
          {options.map((optionId) => (
           <Chip
           key={optionId}
           style={{ color: 'white', background: 'rgb(71,85,105)' }}
           label={idToNameMap.get(optionId)}
         />
          ))}
        </Box>
      )}
      MenuProps={MenuProps}>
          {employees.map((employee) => {
          idToNameMap.set(String(employee.id), employee.name);
          return (
            <MenuItem key={employee.id} value={employee.id}>
              <Checkbox checked={options.includes(employee.id.toString())} />
              <ListItemText primary={employee.name} />
            </MenuItem>
          )
        })}
    </Select>
  </FormControl>
    </div>
    <button className='bg-teal-600 text-md font-semibold px-6 p-3 hover:bg-teal-700 float-right rounded-full mt-5' type='submit'>Submit</button>
    </form>
    {data ?
        <ToastComponent oFunc={open} cFunc={setOpen} icon={status === 201 ? <CheckCircle size={32}/> : <XCircle size={32}/>} title={status === 201 ? 'Success' : 'Error'} disc={status === 201 ? 'Team Registered!' : String(dataErrors)
      }/> : null
      }
    </div>
  )
}