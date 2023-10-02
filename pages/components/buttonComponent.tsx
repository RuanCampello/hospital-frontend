import { viewState } from "@/atoms/viewAtom"
import { Menu } from "@headlessui/react"
import { useRecoilState } from "recoil"

interface ButtonComponentProps {
  name: string,
  view: string,
  color?: string
}
export default function ButtonComponent({name, view, color = 'text-slate-200'}: ButtonComponentProps) {
  const [viewS, setViewState] = useRecoilState(viewState)
  return (
    <Menu.Item>
      {({ active }) => (
        <button
          className={`${
            active ? 'bg-teal-500 text-slate-700 font-bold' : `${color}`
          } group flex w-full items-center rounded-md p-2 text-md`}
        onClick={()=> setViewState(view)}
        >
          {name}
        </button>
      )}
    </Menu.Item>
  )
}