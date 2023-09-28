import { viewState } from "@/atoms/viewAtom"
import { FirstAid } from "@phosphor-icons/react"
import { useRecoilState } from "recoil"

export default function Header() {
  const [viewS, setViewState] = useRecoilState(viewState)
  return (
    <div className='bg-slate-600 text-slate-100 text-lg px-12 py-3 flex justify-between items-center'>
      <button onClick={()=> setViewState('home')} className=''>
        <FirstAid size={32} weight={'duotone'}/>
      </button>
      <div className='bg-teal-500 hover:bg-teal-600 px-4 p-2 rounded-full transition-all ease-in-out duration-300'>
        <button onClick={()=> setViewState('hospital')}>Hospital</button>
      </div>
    </div>
  )
}