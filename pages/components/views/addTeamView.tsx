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

interface Employee {
  id: number
  cpf: string
  date: Date
  function: string
  name: string
  personal_number: string
}
interface Team {
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
  const setEmployeeList = () => {
    // setting array that will be sent to api post
    const updatedList: Employee[] = [...fList]
    employees.forEach((emp) => {
      updatedList.push({
        id: emp.id,
        cpf: emp.cpf,
        date: emp.date,
        function: emp.function,
        name: emp.name,
        personal_number: emp.personal_number,
      })
    })
    setFList(updatedList) 
  }
  const handleChange = (event: SelectChangeEvent<typeof options>) => {
    const {
      target: { value },
    } = event;
    setOptions(typeof value === 'string' ? value.split(',') : value)
    setEmployeeList()
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
          {selected.map((value) => (
            <Chip style={{color: 'white', background: 'rgb(71,85,105)'}} key={value} label={value} />
          ))}
        </Box>
      )}
      MenuProps={MenuProps}
    >
      {employees.map((employee) => (
        <MenuItem key={employee.id} value={employee.name}>
          <Checkbox checked={options.indexOf(employee.name) > -1} />
          <ListItemText primary={employee.name} />
        </MenuItem>
      ))}
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