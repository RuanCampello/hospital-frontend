import { useEffect, useState } from "react"
import HospitalItem from "../../subitems/hospitalItem"
import { useRecoilState } from "recoil"
import {actionState} from '@/atoms/actionAtom'

export default function ViewHospital() {
  const [actionS, setActionState] = useRecoilState(actionState)
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
  setInterval(()=> {
    if(actionS) {
      getHospitals()
      setActionState(false)
    }
  }, 1500)
  return (
    <div className='w-full xl:px-16 lg:px-6 xl:py-6 px-4'>
      <div className='grid grid-cols-6 p-2 font-semibold bg-yankees-blue-primary text-sm xl:text-lg rounded-t-xl text-center mt-3'>
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