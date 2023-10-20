import { PencilSimple, TrashSimple } from "@phosphor-icons/react";

interface FuncButtonProps {
  funcPut: Function,
  funcDelete: Function
}
export default function FuncButton({funcDelete, funcPut}: FuncButtonProps) {
  return (
    <div className='space-x-4'>
      <button className='border-[3px] hover:bg-yellow-500 border-yellow-500 p-2 rounded-full' onClick={()=>funcPut()}>
        <PencilSimple className='xl:h-6 xl:w-6 w-5 h-5' weight='fill'/>
      </button>
      <button className='border-[3px] hover:bg-red-500 border-red-500 p-2 rounded-full' onClick={()=> funcDelete()}>
        <TrashSimple className='xl:h-6 xl:w-6 w-5 h-5' weight='fill'/>
      </button>
    </div>
  )
}