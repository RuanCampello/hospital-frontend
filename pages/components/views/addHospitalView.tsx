import { useState } from "react";
import FormField from "../formField"
import { CheckCircle, XCircle } from "@phosphor-icons/react";
import ToastComponent from "../toast";
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
      <form className='py-16 xl:px-[150px] px-16' onSubmit={handleSubmit}>
        <div className='grid md:grid-cols-2 md:gap-6'>
          <FormField dName="Nome" func={setName} isDefault={false} />
          <FormField dName="CNPJ" func={setCnpj} isDefault={false} />
        </div>
        <div className='grid md:grid-cols-2 md:gap-6 mt-6'>
          <FormField dName="Endereço" func={setAddress} isDefault={false} />
          <FormField dName="Telefone" func={setNumber} isDefault={false} />
        </div>
        <button className='bg-teal-600 text-md font-semibold px-6 p-3 hover:bg-teal-700 float-right rounded-full' type='submit'>Submit</button>
      </form>
      {respo ?
        <ToastComponent oFunc={open} cFunc={setOpen} icon={status === 201 ? <CheckCircle size={32}/> : <XCircle size={32}/>} title={status === 201 ? 'Success' : 'Error'} disc={status === 201 ? 'Hospital Registered!' : status === 500 ? 'CNPJ must be unique' : String(dataErrors)
      }/> : null
      }
    </div>
  )
}