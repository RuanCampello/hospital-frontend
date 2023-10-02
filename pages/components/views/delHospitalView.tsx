import { useState } from "react";
import FormField from "../formField";
import { Collapse, Alert, IconButton, AlertTitle } from "@mui/material";
import { XCircle } from "@phosphor-icons/react";

export default function delHospitalView() {
  const [id, setId] = useState(null)
  const [open, setOpen] = useState(false)
  const [status, setStatus] = useState(Number)
  function handleSubmit(e:any) {
    e.preventDefault()
    delHospital()
    setOpen(true)
  }
  async function delHospital() {
    const response = await fetch(`http://localhost:8080/hospital/${id}`, {
      method: 'DELETE',
      headers: {'Content-Type': 'application/json'},
    })
    setStatus(response.status)
  }
  return (
    <main>
    <div className='w-full p-16 flex-col xl:px-[400px]'>
      <form onSubmit={handleSubmit}>
        <FormField func={setId} name={'Hospital ID'} type={'text'}/>
        <button className='bg-teal-600 text-md font-semibold px-6 p-3 hover:bg-teal-700 float-right rounded-full' type='submit'>Submit</button>
      </form>
    </div>
      {status ?
      <Collapse in={open}>
      <Alert color={status === 200 ? 'success' : 'error'} severity={status === 200 ? 'success' : 'error'} variant='filled' action={
        <IconButton aria-label='close' color='inherit' onClick={()=> {setOpen(false)}}>
          <XCircle className='mb-1' weight='duotone'/>
        </IconButton>
      } className={`xl:w-96 float-right mx-16 xl:me-[400px] mt-auto items-center`} > 
      { 
        status === 200 ? 
        <span><AlertTitle><b>Success</b></AlertTitle>Hospital Deleted!</span> :
        <span><AlertTitle><b>Error</b></AlertTitle>Hospital does not exist</span>
      }
      </Alert>
      </Collapse> 
      :null}
    </main>
  )
}