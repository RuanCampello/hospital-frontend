import { useEffect, useState } from "react"
import PatientItem from "../subitems/patientItem"
import { actionState } from "@/atoms/actionAtom"
import { useRecoilState } from "recoil"

export default function HomeView() {
  const [patients, setPatients] = useState([])
  const [actionS, setActionState] = useRecoilState(actionState)
  async function getPatients() {
    const response = await fetch('http://localhost:8080/patient/all', {
      method: 'GET',
      headers: {'Content-type':'application/json'}
    })
    const data = await response.json()
    setPatients(data)
    console.log(data)    
  }
  useEffect(()=> {
    getPatients()
  }, [])
  setInterval(() => {
    if(actionS) {
      getPatients()
      setActionState(false)
    }
  }, 1500)
  return (
    <main className='h-full w-full xl:px-16 lg:px-6 xl:py-6 px-4 text-center'>
    <div className='mt-3 grid grid-cols-6 bg-yankees-blue-primary rounded-t-xl 2xl:text-lg text-sm items-center py-2 mb-2 font-semibold lg:px-8 px-4'>
      <div className='text-start truncate'>Nome</div>
      <div>CPF</div>
      <div>Data de nascimento</div>
      <div>Número pessoal</div>
      <div>Número do responsavél</div>
    </div>
    <div>
      {
        patients?.map((patient) => {
          return (
            <div key={patient['id']}>
              <PatientItem id={patient['id']} cpf={patient['cpf']} name={patient['name']} date={patient['date']} personalNumber={patient['personal_number']} responsibleNumber={patient['responsible_number']}/>
            </div>
          )
        })
      }
    </div>
    </main>
  )
}