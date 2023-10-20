interface EmployeeItemProps {
  name: string,
  cpf: string,
  date: Date,
  number: string,
  func: string
}

export default function EmployeeItem({name, cpf, date, number, func}: EmployeeItemProps) {
  return (
    <div>
      <div className='grid grid-cols-5 text-center xl:text-lg py-2 text-sm xl:px-3'>
        <div>{name}</div>
        <div>{cpf}</div>
        <div>{String(date).replaceAll('-', '/')}</div>
        <div>{number}</div>
        <div>{func}</div>
      </div>
    </div>
  )
}