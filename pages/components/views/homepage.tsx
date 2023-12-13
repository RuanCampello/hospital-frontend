import { useEffect, useRef, useState } from 'react'
import HealthRecordItem from '../subitems/healthRecordItem'
interface Patient {
  id: string
  cpf: string
  name: string
  date: string
  personal_number: string
  responsible_number: string
}
export interface HealthRecord {
  id: string;
  heart_rate: number
  blood_pressure: number
  respiratory_frequency: number
  temperature: number
  blood_oxygen_concentration: number
  timestamp: string
  paciente: Patient
}
function useInterval(callback: () => void, delay: number) {
  const savedCallback = useRef<() => void>()
  useEffect(() => {
    savedCallback.current = callback
  }, [callback])
  useEffect(() => {
    function tick() {
      if (savedCallback.current) {
        savedCallback.current()
      }
    }
    if (delay !== null) {
      const intervalId = setInterval(tick, delay)
      return () => clearInterval(intervalId)
    }
  }, [delay])
}
export default function Homepage() {
  const [HealthRecord, setHealthRecord] = useState<HealthRecord[]>([])
  async function getTracks() {
    const response = await fetch('http://localhost:8080/track/latest')
    const data = await response.json()
    setHealthRecord(data)
  }
  useInterval(() => {
    getTracks()
  }, 5000)
  useEffect(() => {
    getTracks()
  },[])
  return (
    <div className='w-full xl:px-16 lg:px-6 px-4 xl:py-6 py-2'>
      <div className='grid grid-cols-7 p-2 rounded-t-lg font-semibold 2xl:text-lg text-xs text-center items-center bg-yankees-blue-primary'>
        <div className='text-start'>Paciente</div>
        <div>Pre Sanguínea</div>
        <div>Freq Cardíaca</div>
        <div>Freq Respiratória</div>
        <div>Temperatura</div>
        <div>Oxigênio no sangue</div>
        <div>Registrado em</div>
      </div>
      <ul>
        {HealthRecord.map((track) => {
          return (
            <li key={track.id}>
              <HealthRecordItem id={track.id} heart_rate={track.heart_rate} respiratory_frequency={track.respiratory_frequency} blood_pressure={track.blood_pressure} temperature={track.temperature} blood_oxygen_concentration={track.blood_oxygen_concentration} timestamp={track.timestamp} paciente={track.paciente}/>
            </li>
          )
        })}
      </ul>
    </div>
  )
}