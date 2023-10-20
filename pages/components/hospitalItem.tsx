import { viewState } from "@/atoms/viewAtom"
import { Collapse, Alert, IconButton, AlertTitle } from "@mui/material"
import { PencilSimple, TrashSimple, XCircle } from "@phosphor-icons/react"
import { useState } from "react"
import { useRecoilState } from "recoil"

interface HospitalItemProps {
  index: number,
  name: string,
  address: string,
  number: string,
  cnpj: string,
  id: string
}

export default function HospitalItem({index, name, address, number, cnpj, id}: HospitalItemProps) {
  const [viewS, setViewState] = useRecoilState(viewState) 
  const [open, setOpen] = useState(false)
  const [status, setStatus] = useState(Number)

  async function delHospital(id: String) {
    const response = await fetch(`http://localhost:8080/hospital/${id}`, {
      method: 'DELETE',
      headers: {'Content-Type': 'application/json'},
    })
    console.log(response.status)
    setStatus(response.status)
  }
  function handleDelete() {
    delHospital(id)
    setOpen(true)
  }
  function handlePut() {
    localStorage.setItem('id', id)
    localStorage.setItem('name', name)
    localStorage.setItem('cnpj', cnpj)
    localStorage.setItem('phone number', number)
    localStorage.setItem('address', address)

    setViewState('putHospitalView')
  }
  return (
  <div>
  <div className='grid grid-cols-6 xl:text-lg text-xs py-2 xl:px-3 items-center text-center'>
    <div className='col-span-2 grid grid-cols-5 items-center'>
      <div className='xl:w-8 w-5 bg-teal-500 rounded-full xl:h-8 h-5 text-slate-700 font-bold flex justify-center items-center'>
        <span className='col-span-1'>{index+1}</span>
        </div>
      <span className='col-span-4 text-start'>{name}</span>
    </div>
    <div className='col-span-1'>{address}</div>
    <div>{number}</div>
    <div>{cnpj}</div>
    <div className='col-span-1 flex justify-around'>
      <button className='border-2 hover:bg-yellow-500 border-yellow-500 p-2 rounded-full' onClick={()=>handlePut()}>
        <PencilSimple className='xl:h-6 xl:w-6 w-4 h-4' weight='fill'/>
      </button>
      <button className='border-2 hover:bg-red-500 border-red-500 p-2 rounded-full' onClick={()=> handleDelete()}>
        <TrashSimple className='xl:h-6 xl:w-6 w-4 h-4' weight='fill'/>
      </button>
    </div>
    
  </div>
  {status ?
      <Collapse in={open}>
      <Alert color={status === 200 ? 'success' : 'error'} severity={status === 200 ? 'success' : 'error'} variant='filled' action={
        <IconButton aria-label='close' color='inherit' onClick={()=> {setOpen(false)}}>
          <XCircle className='mb-1' weight='duotone'/>
        </IconButton>
      } className={`xl:w-96 float-right  my-8 items-center`} > 
      { 
        status === 200 ? 
        <span><AlertTitle><b>Success</b></AlertTitle>Hospital Excluido!</span> :
        <span><AlertTitle><b>Error</b></AlertTitle>Hospital não existe</span>
      }
      </Alert>
      </Collapse> 
    :null}
  </div>
  )
}