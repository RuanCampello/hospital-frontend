import { useState } from "react"
import HospitalItem from "../hospitalItem"

export default function ViewHospital() {
  const [hospitals, setHospitals] = useState([])
  async function getHospitals() {
    const response = await fetch('http://localhost:8080/hospital/all', {
      method: 'GET',
      headers: {'Content-Type': 'application/json'},
    })
    const data = await response.json()
    setHospitals(data)
  } getHospitals()

  return (
    <div className='w-full p-8'>
      <div className='grid grid-cols-8 p-2 font-semibold bg-slate-700 text-lg rounded-t-xl'>
        <div className='grid grid-cols-5 col-span-2'>
          <span className='col-span-1 w-8 text-end'>#</span>
          <span className='col-span-4'>Name</span>
        </div>
        <div className='col-span-2'>Address</div>
        <div>Number</div>
        <div>CNPJ</div>
        <div className='col-span-2'>ID</div>
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