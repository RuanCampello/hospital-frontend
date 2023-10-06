import { useEffect, useState } from "react"
import HospitalItem from "../hospitalItem"
import { ArrowCounterClockwise } from "@phosphor-icons/react"

export default function ViewHospital() {
  const [hospitals, setHospitals] = useState([])
  async function getHospitals() {
    const response = await fetch('http://localhost:8080/hospital/all', {
      method: 'GET',
      headers: {'Content-Type': 'application/json'},
    })
    const data = await response.json()
    setHospitals(data)
  } 
  useEffect(() => {
    getHospitals()
  }, [])
  return (
    <div className='w-full px-8'>
      <button className='ms-auto py-2 px-3 gap-2 m-3 hover:bg-teal-700 bg-teal-600 rounded-full font-semibold flex text-center items-center' onClick={()=> getHospitals()}>
        Recarregar Lista
        <ArrowCounterClockwise size={28} />
      </button>
      <div className='grid grid-cols-6 p-2 font-semibold bg-slate-700 text-lg rounded-t-xl text-center'>
        <div className='grid grid-cols-5 col-span-2'>
          <span className='col-span-1 w-8 text-end'>#</span>
          <span className='col-span-4 text-start'>Nome</span>
        </div>
        <div className='col-span-1'>Endereço</div>
        <div>Telefone</div>
        <div>CNPJ</div>
      </div>
      {
        hospitals?.map((hospital, index) => {
          return (
            <div key={hospital['id']}>
              <HospitalItem index={index} name={hospital['name']} address={hospital['address']} number={hospital['number']} cnpj={hospital['cnpj']} id={hospital['id']}/>
            </div>
          )
        })
      }
    </div>
  )
}