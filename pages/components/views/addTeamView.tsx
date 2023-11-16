import { useState } from "react"
import FormField from "../formField"
import { Theme, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Chip from '@mui/material/Chip';

export default function AddTeamView() {
  const [name, setName] = useState(null)
  const [fList, setFList] = useState([])
  const [status, setStatus] = useState(Number)
  const [data, setData] = useState(null)
  const [dataErrors, setDataErrors] = useState(null)
  const [open, setOpen] = useState(false)
  const [option, setOption] = useState([])
  const theme = useTheme()
  //const [names, setNames] = useState([])
  const names = [
    'Oliver Hansen',
    'Van Henry',
    'April Tucker',
    'Ralph Hubbard',
    'Omar Alexander',
    'Carlos Abbott',
    'Miriam Wagner',
    'Bradley Wilkerson',
    'Virginia Andrews',
    'Kelly Snyder',
  ];
  function getStyles(name: string, personName: readonly string[], theme: Theme) {
    return {
      fontWeight:
        personName.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: 48 * 4.5 + 8,
        width: 250,
      },
    },
  };

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
    if(data!['errors'] !== undefined && data) {
      setDataErrors(data['errors'][0]['defaultMessage'])
    }
    if (data) setData(data)
  }

  function handleSubmit(e:any) {
    e.preventDefault()
    addTeam()
    setOpen(true)
  }
  const handleChange = (e: any) => {
    const value = e.target.value
    setOption(typeof value === 'string' ? value.split(',') : value,)
  }
  const labelStyle = {
    color: 'rgb(226,232,240)',
    background: 'rgb(30,41,59)',
    padding: '3px'
  }
  console.log(option)
  
  return (
    <div>
      <form className='py-16 xl:px-[150px] px-16' onSubmit={handleSubmit}>
        <div className='grid md:grid-cols-2 md:gap-6'>
          <FormField dName={'Nome'} />
        <FormControl className='w-full bg-slate-400 text-slate-200 rounded-lg h-fit'>
        <InputLabel id="demo-multiple-chip-label" style={labelStyle}>Selecione os funcionários da equipe</InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={option}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
          className='bg-slate-800'
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {names.map((name) => (
            <MenuItem
              key={name}
              value={name}
              style={getStyles(name, option, theme)}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
    <button className='bg-teal-600 text-md font-semibold px-6 p-3 hover:bg-teal-700 float-right rounded-full mt-5' type='submit'>Submit</button>
    </form>
    </div>
  )
}