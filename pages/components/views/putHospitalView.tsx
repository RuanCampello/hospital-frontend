import { useState } from "react";
import FormField from "../formField";
import { Alert, AlertTitle, Collapse, IconButton } from "@mui/material";
import { XCircle } from "@phosphor-icons/react";

export default function PutHospitalView() {
  const [id, setId] = useState(null)
  const [status, setStatus] = useState(Number)
  const [open, setOpen] = useState(false)
  const [dataErrors, setDataErrors] = useState(false)
  const [respo, setRespo] = useState(null)

  const idSession = localStorage.getItem('id')
  
  async function putHospital() {
    const nameSession = localStorage.getItem('name')
    const addressSession = localStorage.getItem('address')
    const cnpjSession = localStorage.getItem('cnpj')
    const numberSession = localStorage.getItem('phone number')

    const response = await fetch(`http://localhost:8080/hospital/${idSession}`, {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        id: idSession,
        name: nameSession,
        address: addressSession,
        cnpj: cnpjSession,
        number: numberSession
      })
    })
    console.log(id, name, addressSession, cnpjSession, numberSession);
    
    const data = await response.json()
    console.log(data)
    
    if(data!['errors'] !== undefined && data){
      setDataErrors(data!['errors'][0]['defaultMessage'])
    }
    if(data) setRespo(data)
    setStatus(response.status)
  }
  function handleSubmit(e:any) {
    e.preventDefault()
    putHospital()
    setOpen(true)
  }
  return (
    <div>
      <form className='py-16 xl:px-[400px] px-16' onSubmit={handleSubmit}>
        <div className='grid md:grid-cols-2 md:gap-6'>
          <FormField key={'name'} name={'Name'} />
          <FormField key={'cnpj'} name={'CNPJ'} />
        </div>
        <div className='grid md:grid-cols-2 md:gap-6 mt-6'>
          <FormField key={'address'} name={'Address'}/>
          <FormField key={'number'} name={'Phone number'}/>
        </div>
        <button className='bg-teal-600 text-md font-semibold px-6 p-3 hover:bg-teal-700 float-right rounded-full' type='submit'>Submit</button>
      </form>
      {respo ?
          <Collapse in={open}>
          <Alert color={status === 200 ? 'success' : 'error'} severity={status === 200 ? 'success' : 'error'} variant='filled' action={
            <IconButton aria-label='close' color='inherit' onClick={()=> {setOpen(false)}}>
              <XCircle className='mb-1' weight='duotone'/>
            </IconButton>
          } className={`xl:w-96 float-right mx-16 xl:me-[400px] mt-auto items-center`} > 
          { status === 200 ? 
          <span><AlertTitle><b>Success</b></AlertTitle>Hospital Updated!</span> : 
          status === 500 ? 
          <span><AlertTitle><b>Error</b></AlertTitle>CNPJ must be unique</span> : <span><AlertTitle><b>Error</b></AlertTitle>{dataErrors}</span> }
          </Alert>
          </Collapse> : null
        }
    </div>
  )
}