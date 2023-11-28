import { PencilSimple, TrashSimple } from "@phosphor-icons/react";

interface FuncButtonProps {
  funcPut: Function,
  funcDelete: Function
}

export default function FuncButton({funcDelete, funcPut}: FuncButtonProps) {
  return (
    <div className='md:space-x-3 space-x-2'>
      <button className='border-[2.5px] hover:bg-bittersweet border-bittersweet p-2 rounded-full' onClick={()=>funcPut()}>
        <PencilSimple className='md:w-6 md:h-6 w-3 h-3' weight='fill'/>
      </button>
      <button className='border-[2.5px] hover:bg-razzmatazz border-razzmatazz p-2 rounded-full' onClick={()=> funcDelete()}>
        <TrashSimple className='md:w-6 md:h-6 w-3 h-3' weight='fill'/>
      </button> 
    </div>
  )
}