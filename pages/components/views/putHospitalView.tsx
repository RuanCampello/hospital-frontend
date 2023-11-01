import { useState } from "react";
import FormField from "../formField";
import { Alert, AlertTitle, Collapse, IconButton } from "@mui/material";
import { CheckCircle, XCircle } from "@phosphor-icons/react";
import { hospitalId, hospitalName, hospitalCnpj, hospitalAddress, hospitalNumber } from "@/atoms/updateHospitalAtom";
import { useRecoilState } from "recoil";
import ToastComponent from "../toast";

export default function PutHospitalView() {
  const [id, setId] = useState(null)
  const [status, setStatus] = useState(Number)
  const [open, setOpen] = useState(false)
  const [dataErrors, setDataErrors] = useState(null)
  const [respo, setRespo] = useState(null)

  const [hId, setHospitalId] = useRecoilState(hospitalId)
  const [hName, setHospitalName] = useRecoilState(hospitalName)
  const [hCnpj, setHospitalCnpj] = useRecoilState(hospitalCnpj)
  const [hAddress, setHospitalAddress] = useRecoilState(hospitalAddress)
  const [hNumber, setHospitalNumber] = useRecoilState(hospitalNumber)
 
  async function putHospital() {
    const response = await fetch(`http://localhost:8080/hospital/${hId}`, {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        id: hId,
        name: hName,
        address: hAddress,
        cnpj: hCnpj,
        number: hNumber
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
      <form className='py-16 xl:px-[400px] px-16' onSubmit={handleSubmit}>
        <div className='grid md:grid-cols-2 md:gap-6'>
          <FormField id={1} func={setHospitalName} dName={'Name'} isDefault={true} />
          <FormField id={2} func={setHospitalCnpj} dName={'CNPJ'} isDefault={true} />
        </div>
        <div className='grid md:grid-cols-2 md:gap-6 mt-6'>
          <FormField id={3} func={setHospitalAddress} dName={'Address'} isDefault={true}/>
          <FormField id={4} func={setHospitalNumber} dName={'Phone number'} isDefault={true}/>
        </div>
        <button className='bg-teal-600 text-md font-semibold px-6 p-3 hover:bg-teal-700 float-right rounded-full' type='submit'>Submit</button>
      </form>
      { status ?
        <ToastComponent icon={status === 200 ? <CheckCircle size={32}/> : <XCircle size={32}/>} title={status === 200 ? 'Success' : 'Error'} disc={status === 200 ? 'Hospital Updated!': status === 500 ? 'CNPJ must be unique' : String(dataErrors)} oFunc={open} cFunc={setOpen}/>
        : null
      }
    </div>
  )
}