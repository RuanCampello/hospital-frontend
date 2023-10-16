import { useEffect, useState } from "react"
import PatientItem from "../patientItem"

export default function HomeView() {
  const [patients, setPatients] = useState([])
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
  return (
    <main className='h-full w-full px-8 text-center'>
    <div className='grid grid-cols-5 bg-slate-700 rounded-t-xl 2xl:text-lg md:text-base items-center py-2 mt-6 mb-2 font-semibold md:px-8 px-2 text-xs'>
      <div className='text-start truncate'>Nome</div>
      <div>CPF</div>
      <div>Data de nascimento</div>
      <div>Telefone pessoal</div>
      <div>Telefone do responsavél</div>
    </div>
    <div>
      {
        patients?.map((patient) => {
          return (
            <div key={patient['id']}>
              <PatientItem cpf={patient['cpf']} name={patient['name']} date={patient['date']} personalNumber={patient['personal_number']} responsibleNumber={patient['responsible_number']}/>
            </div>
          )
        })
      }
    </div>
    </main>
  )
}