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

export default function AddTeamView() {
  const [name, setName] = useState(null)
  const [fList, setFList] = useState([])
  const [status, setStatus] = useState(Number)
  const [data, setData] = useState(null)
  const [dataErrors, setDataErrors] = useState(null)
  const [open, setOpen] = useState(false)
  const [options, setOptions] = useState(Array())
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
        })
      }
    })    
  }
  setUnemployeesList()
  function setEmployee(name: String) {
    employees.map((emp) => {
      if(emp['name'] === name) fList.push(emp)
    })
  }
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
  const handleSelect = (e: any) => {
    const value = e.target.value[0][0]['name']
    setOptions(typeof value === 'string' ? value.split(',') : value,)
  }
  const handleChange = (e: any) => {
    const value = e.target.value
    const name = value[0][0]['name']
    if(name) setEmployee(String(name))
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
  return (
    <div>
      <form className='py-16 xl:px-[150px] px-16' onSubmit={handleSubmit}>
        <div className='grid md:grid-cols-2 md:gap-6'>
          <FormField func={setName} dName={'Nome'} isDefault={false}/>
        <FormControl className='w-full rounded-lg h-fit'>
        <InputLabel id='demo-multiple-chip-label' style={labelStyle}>Selecione os funcionários da equipe</InputLabel>
        <Select
          labelId='demo-multiple-chip-label'
          id='demo-multiple-chip'
          multiple
          value={options ? options : []}
          onChange={(e) => {
            handleChange(e)
            handleSelect(e)
          }}
          input={<OutlinedInput id='select-multiple-chip' label='Chip' />}
          className='bg-slate-800 text-slate-600'
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {selected.map((value) => (
                <Chip style={{color: 'white', background: 'rgb(71,85,105)'}} key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}>
          {employees.map((employee) => (
            <MenuItem
              key={employee['id']}
              value={[employee]}
              //style={{background: 'rgb(71,85,105)'}}
              style={getStyles(employee, options, theme)}>
              {employee['name']}
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