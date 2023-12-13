import { HealthRecord } from "../views/homepage";

export default function HealthRecordItem({heart_rate, blood_oxygen_concentration, blood_pressure, respiratory_frequency, temperature, timestamp, paciente}: HealthRecord) {
  function formatTimestamp(timestamp: string): string {
    const date = new Date(timestamp)
    const day = String(date.getDate()).padStart(2, '0')
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0')
    const minutes = String(date.getMinutes()).padStart(2, '0')
    const seconds = String(date.getSeconds()).padStart(2, '0')
    const formattedDate = `${day}/${month}/${year}`
    const formattedTime = `${hours}:${minutes}:${seconds}`
    return `${formattedDate} ${formattedTime}`
  }
  return (
    <div className='grid grid-cols-7 text-xs 2xl:text-lg p-2 items-center text-center bg-police-blue-primary'>
      <span className='text-start'>{paciente.name}</span>
      <span>{blood_pressure}</span>
      <span>{heart_rate}</span>
      <span>{respiratory_frequency}</span>
      <span>{temperature}</span>
      <span>{blood_oxygen_concentration}</span>
      <span>{formatTimestamp(timestamp)}</span>
    </div>
  )
}