import { viewState } from "@/atoms/viewAtom"
import { Menu } from "@headlessui/react"
import { useRecoilState } from "recoil"

interface ButtonComponentProps {
  name: string,
  view: string,
  color?: string,
  bgColor?: string,
}
export default function ButtonComponent({name, view, color = 'slate-200', bgColor = 'bg-teal-500'}: ButtonComponentProps) {
  const [viewS, setViewState] = useRecoilState(viewState)
  return (
    <Menu.Item>
      {({ active }) => (
        <button
          className={`${
            active ? `${bgColor} text-slate-200 font-bold` : `${color}`
          } group flex w-full items-center rounded-md p-2 text-md`}
        onClick={()=> setViewState(view)}
        >
          {name}
        </button>
      )}
    </Menu.Item>
  )
}