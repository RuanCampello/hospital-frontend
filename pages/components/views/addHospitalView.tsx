import { useState } from "react";
import FormField from "../formField"
import { Alert, AlertTitle, Collapse, IconButton } from "@mui/material";
import { XCircle } from "@phosphor-icons/react";
export default function AddHospitalView() {
  const [name, setName] = useState(null)
  const [cnpj, setCnpj] = useState(null)
  const [address, setAddress] = useState(null)
  const [number, setNumber] = useState(null)
  const [status, setStatus] = useState(Number)
  const [open, setOpen] = useState(false)
  const [dataErrors, setDataErrors] = useState(null)
  const [respo, setRespo] = useState(null)
  
  async function addHospital() {
    const response = await fetch(`http://localhost:8080/hospital/`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        name: name,
        address: address,
        cnpj: cnpj,
        number: number
      })
    })
    const data = await response.json()
    
    setStatus(response.status)
    console.log(status)
    if(data!['errors'] !== undefined && data){
      setDataErrors(data!['errors'][0]['defaultMessage'])
    }
    if(data) setRespo(data)
  }
  function handleSubmit(e:any) {
    e.preventDefault()
    addHospital()
    setOpen(true)
  }
  return (
    <div>
      <form className='py-16 xl:px-[400px] px-16' onSubmit={handleSubmit}>
        <div className='grid md:grid-cols-2 md:gap-6'>
          <FormField func={setName} name={'Name'} type={'text'} />
          <FormField func={setCnpj} name={'CNPJ'} type={'text'} />
        </div>
        <div className='grid md:grid-cols-2 md:gap-6 mt-6'>
          <FormField func={setAddress} name={'Address'} type={'text'} />
          <FormField func={setNumber} name={'Phone number'} type={'text'} />
        </div>
        <button className='bg-teal-600 text-md font-semibold px-6 p-3 hover:bg-teal-700 float-right rounded-full' type='submit'>Submit</button>
      </form>
        {respo ?
            <Collapse in={open}>
            <Alert color={status === 201 ? 'success' : 'error'} severity={status === 201 ? 'success' : 'error'} variant='filled' action={
              <IconButton aria-label='close' color='inherit' onClick={()=> {setOpen(false)}}>
                <XCircle className='mb-1' weight='duotone'/>
              </IconButton>
            } className={`xl:w-96 float-right mx-16 xl:me-[400px] mt-auto items-center`} > 
            { status === 201 ? 
            <span><AlertTitle><b>Success</b></AlertTitle>Hospital Registered!</span> : 
            status === 500 ? 
            <span><AlertTitle><b>Error</b></AlertTitle>CNPJ must be unique</span> : <span><AlertTitle><b>Error</b></AlertTitle>{dataErrors}</span> }
            </Alert>
            </Collapse> : null

        }
    </div>
  )
}