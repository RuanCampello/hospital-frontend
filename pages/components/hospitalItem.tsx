import { viewState } from "@/atoms/viewAtom"
import { Dialog, Transition } from "@headlessui/react"
import { Collapse, Alert, IconButton, AlertTitle } from "@mui/material"
import { PencilSimple, TrashSimple, XCircle } from "@phosphor-icons/react"
import { Fragment, useState } from "react"
import { useRecoilState } from "recoil"
import FormField from "./formField"

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
  const [dataErrors, setDataErrors] = useState(null)
  const [respo, setRespo] = useState(null)
  const [status, setStatus] = useState(Number)
  const [show, setShow] = useState(false)

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
  async function putHospital() {
    const response = await fetch(`http://localhost:8080/hospital/${id}`, {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        id: id,
        name: name,
        address: address,
        cnpj: cnpj,
        number: number
      })
    })
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
  <div className='grid grid-cols-6 xl:text-lg text-sm py-2 xl:px-3 items-center text-center'>
    <div className='col-span-2 grid grid-cols-5 items-center'>
      <div className='w-8 bg-teal-500 rounded-full h-8 text-slate-700 font-bold flex justify-center items-center'>
        <span className='col-span-1'>{index+1}</span>
        </div>
      <span className='col-span-4 text-start'>{name}</span>
    </div>
    <div className='col-span-1'>{address}</div>
    <div>{number}</div>
    <div>{cnpj}</div>
    <div className='col-span-1 flex justify-around'>
      <button className='border-2 hover:bg-yellow-500 border-yellow-500 p-2 rounded-full' onClick={()=>handlePut()}>
        <PencilSimple size={24} weight='fill'/>
      </button>
      <button className='border-2 hover:bg-red-500 border-red-500 p-2 rounded-full' onClick={()=> handleDelete()}>
        <TrashSimple size={24} weight='fill'/>
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