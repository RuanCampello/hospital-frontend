import { PencilSimple, TrashSimple } from "@phosphor-icons/react";

interface FuncButtonProps {
  funcPut: Function,
  funcDelete: Function
}

export default function FuncButton({funcDelete, funcPut}: FuncButtonProps) {
  return (
    <div className='xl:space-x-5 md:space-x-3 space-x-2'>
      <button className='border-2 md:border-[3px] hover:bg-yellow-500 border-yellow-500 p-2 rounded-full' onClick={()=>funcPut()}>
        <PencilSimple className='xl:h-6 xl:w-6 md:w-4 md:h-4 w-3 h-3' weight='fill'/>
      </button>
      <button className='border-2 md:border-[3px] hover:bg-red-500 border-red-500 p-2 rounded-full' onClick={()=> funcDelete()}>
        <TrashSimple className='xl:h-6 xl:w-6 md:w-4 md:h-4 w-3 h-3' weight='fill'/>
      </button> 
    </div>
  )
}