interface PatientItemProps {
  cpf: string,
  name: string,
  date: Date,
  personalNumber: string,
  responsibleNumber: string
}

export default function PatientItem({cpf, name, date, personalNumber, responsibleNumber}: PatientItemProps) {
  return (
  <div className='grid grid-cols-5 px-2 md:px-8 xl:text-lg md:text-base text-xs'>
    <div className='text-start inline'>
      <p className='truncate max-w-[28rem]'>
        {name}
      </p>
    </div>
    <div>{cpf}</div>
    <div>{date.toString().replace(/-/gi, '/')}</div>
    <div>{personalNumber}</div>
    <div>{responsibleNumber}</div>
  </div>
  )
}