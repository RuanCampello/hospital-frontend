import { useEffect, useState } from 'react'
import FormField from '../../formField'
import Box from '@mui/material/Box'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import Chip from '@mui/material/Chip'
import { useRecoilState } from 'recoil'
import { teamFunct, teamId, teamName } from '@/atoms/updateTeamAtom'
import { Checkbox, ListItemText } from '@mui/material'
import { MenuProps, labelStyle } from './addTeamView'
import { CheckCircle, XCircle } from '@phosphor-icons/react'
import ToastComponent from '../../toast'

interface Employee {
  id: string
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
export default function PutTeamView() {
  const [data, setData] = useState(null)
  const [dataErrors, setDataErrors] = useState(null)
  const [status, setStatus] = useState(Number)
  const [open, setOpen] = useState(false)
  const [employees, setEmployees] = useState<Employee[]>([])
  const [teams, setTeams] = useState<Team[]>([])
  const [options, setOptions] = useState<string[]>([])
  const initialFList: Employee[] = []
  const [fList, setFList] = useState<Employee[]>(initialFList)

  const [tId, setTeamId] = useRecoilState(teamId)
  const [tName, setTeamName] = useRecoilState(teamName)
  const [tFunc, setTeamFunc] = useRecoilState(teamFunct)
  
  async function getEmployees() {
    const response = await fetch(`http://localhost:8080/employee/all`, {
      method: 'GET',
      headers: {'Content-type':'application/json'}
    })
    const data = await response.json()
    setEmployees(data)
  }
  async function putTeam() {
    const response = await fetch(`http://localhost:8080/team/${tId}`, {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        name: tName,
        funcionarioList: fList
      })
    })
    const data = await response.json()    
    if(data!['errors'] !== undefined && data){
      setDataErrors(data!['errors'][0]['defaultMessage'])
    }
    if(data) {
      setData(data)
      setStatus(response.status)
    }    
  }
  
  async function getTeams() {
    const response = await fetch('http://localhost:8080/team/all', {
      method: 'GET',
      headers: {'Content-type':'application/json'}
    })
    const data = await response.json()
    setTeams(data)
  }
  const setUnemployeesList = () => {
    // setting employees without team and employees from selected team
    setEmployees((prevEmployees) => {
      const updatedEmployees = [...prevEmployees];
      // remove employees from teams
      teams.forEach((team) => {
        team.funcionarioList.forEach((func) => {
          const funcName = func.name
          const funcId = func.id
          let index = updatedEmployees.findIndex((employee) => employee.name === funcName && employee.id === funcId)
          while (index !== -1) {
            updatedEmployees.splice(index, 1)
            // find the next occurrence, if theres any
            const nextIndex = updatedEmployees.findIndex(
              (employee) => employee.name === funcName && employee.id === funcId
            )
            index = nextIndex
          }
        })
      })
      // add employees from tFunc array
      tFunc.forEach((func) => {
        const funcName = func['name']
        const funcId = func['id']
        const existsInUpdatedEmployees = updatedEmployees.some((employee) => employee.name === funcName && employee.id === funcId)
        if (!existsInUpdatedEmployees) updatedEmployees.push(func)
      })
      return updatedEmployees
    })
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
  function handleSubmit(e: any) {
    e.preventDefault()
    putTeam()
    setOpen(true)
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
  const idToNameMap = new Map<string, string>();
  return (
    <div>
      <form className='py-16 xl:px-[150px] px-16' onSubmit={handleSubmit}>
      <div className='grid md:grid-cols-2 md:gap-6'>
        <FormField id={18} func={setTeamName} dName={'Nome'} isDefault={true}/>
      <FormControl className='w-full rounded-lg h-fit'>
      <InputLabel id='demo-multiple-chip-label' style={labelStyle}>Selecione os funcionários da equipe</InputLabel>
      <Select
        labelId='demo-multiple-chip-label'
        id='demo-multiple-chip'
        multiple
        value={options}
        onChange={(e) => {
          handleChange(e)
        }}
        input={<OutlinedInput id='select-multiple-chip' label='Chip' />}
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
        <ToastComponent oFunc={open} cFunc={setOpen} icon={status === 200 ? <CheckCircle size={32}/> : <XCircle size={32}/>} title={status === 200 ? 'Success' : 'Error'} disc={status === 200 ? 'Team Updated!' : String(dataErrors)
      }/> : null
      }
    </div>
  )
}