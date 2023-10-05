interface HospitalItemProps {
  index: number,
  name: string,
  address: string,
  number: string,
  cnpj: string,
  id: string
}

export default function HospitalItem({index, name, address, number, cnpj, id}: HospitalItemProps) {
  return (
    <div className='grid grid-cols-9 xl:text-lg text-sm py-2 xl:px-3 items-center text-center'>
      <div className='col-span-2 grid grid-cols-5 items-center'>
        <div className='w-8 bg-teal-500 rounded-full h-8 text-slate-700 font-bold flex justify-center items-center'>
          <span className='col-span-1'>{index+1}</span>
          </div>
        <span className='col-span-4 text-start'>{name}</span>
      </div>
      <div className='col-span-2'>{address}</div>
      <div>{number}</div>
      <div>{cnpj}</div>
      <div className='col-span-3'>{id}</div>
    </div>
  )
}