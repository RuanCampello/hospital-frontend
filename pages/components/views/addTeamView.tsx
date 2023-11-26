import { useEffect, useState } from 'react'
import FormField from '../formField'
import { Theme, useTheme } from '@mui/material/styles'
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import Chip from '@mui/material/Chip';
import { CheckCircle, XCircle } from '@phosphor-icons/react';
import ToastComponent from '../toast';
import { ListItemText } from '@mui/material';
import { Checkbox } from 'flowbite-react';

export default function AddTeamView() {
  const [name, setName] = useState(null)
  const [fList, setFList] = useState([])
  const [status, setStatus] = useState(Number)
  const [data, setData] = useState(null)
  const [dataErrors, setDataErrors] = useState(null)
  const [open, setOpen] = useState(false)
  const [employees, setEmployees] = useState([])
  const [teams, setTeams] = useState([])

  async function getEmployees() {
    const response = await fetch(`http://localhost:8080/employee/all`, {
      method: 'GET',
      headers: {'Content-type':'application/json'}
    })
    const data = await response.json()
    setEmployees(data)
  }
  const setUnemployeesList = () => {
    teams.map((team) => {
      if(team['funcionarioList'][0]) {
        const employeeName = (team['funcionarioList'][0]['name'])
        employees.map((emp) => {
          const name = emp['name']
          if(name === employeeName) employees.splice(name, 1)
        }) //get only employee without a team
      }
    })    
  }
  setUnemployeesList()
  async function getTeams() {
    const response = await fetch('http://localhost:8080/team/all', {
      method: 'GET',
      headers: {'Content-type':'application/json'}
    })
    const data = await response.json()
    setTeams(data)
  }
  function getStyles(name: string, personName: readonly string[], theme: Theme) {
    if(personName) {
        return {
        fontWeight:
          personName.indexOf(name) === -1
            ? theme.typography.fontWeightRegular
            : theme.typography.fontWeightMedium } }
          }
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: 48 * 4.5 + 8,
        width: 250}}
  }
  const theme = useTheme()

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
  function handleSubmit(e: any) {
    e.preventDefault()
    addTeam()
    setOpen(true)
  }
  function setEmployee(name: String) {
    employees.map((emp) => {
      if(emp['name'] === name) fList.push(emp)
    })
  }  
  const [options, setOptions] = useState<string[]>([]);
  const handleChange = (event: SelectChangeEvent<typeof options>) => {
    const {
      target: { value },
    } = event;
    setOptions(typeof value === 'string' ? value.split(',') : value)
  }
  const handleSelect = (event: any) => {
    setEmployee(String(event.target.value))
  }  
  const labelStyle = {
    color: 'rgb(226,232,240)',
    background: 'rgb(30,41,59)',
    padding: '3px'
  }
  useEffect(()=> {
    getEmployees()
    getTeams()
  }, [])
  console.log(fList) // verify on set employee if its already on it
  // change the function to search options names/ids in the employees array
  // so it will be need just to call the func on post
  
  return (
    <div>
      <form className='py-16 xl:px-[150px] px-16' onSubmit={handleSubmit}>
        <div className='grid md:grid-cols-2 md:gap-6'>
          <FormField func={setName} dName={'Nome'} isDefault={false}/>
  <FormControl sx={{ m: 1, width: 300 }}>
    <InputLabel id="demo-multiple-checkbox-label">Tag</InputLabel>
    <Select
      labelId="demo-multiple-checkbox-label"
      id="demo-multiple-checkbox"
      multiple
      value={options}
      onChange={(e) => {
        handleChange(e)
        handleSelect(e)
      }}
      input={<OutlinedInput label="Tag" />}
      renderValue={(selected) => selected.join(', ')}
      MenuProps={MenuProps}
    >
      {employees.map((employee) => (
        <MenuItem key={employee['id']} value={employee['name']}>
          <Checkbox checked={options.indexOf(employee['name']) > -1} />
          <ListItemText primary={employee['name']} />
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