import Icon from "@phosphor-icons/react"
import { viewState } from "@/atoms/viewAtom"
import { useRecoilState } from "recoil"
import { ReactElement, cloneElement } from "react"
interface SidebarItemProps {
  view: string
  icon: Icon.IconProps
  title: string
  isActive: boolean
  onClick: () => void
  isSeparator?: boolean
  separatorText?: string
}
const buttonStyle = "flex items-center p-2 rounded-lg text-slate-200 hover:bg-gray-700 group gap-3 w-full"
export default function SidebarItem({ view, icon, isActive, title, onClick }: SidebarItemProps) {
  const [currentView, setViewState] = useRecoilState(viewState)
  const handleClick = () => {
    setViewState(view)
  }
  return (
    <li>
      <button onClick={onClick} className={`${buttonStyle} ${isActive ? 'font-bold' : 'font-medium'}`}>
      <>
      {cloneElement(icon as ReactElement, { weight: isActive ? 'fill' : 'duotone' })}
      </>
        {title}
      </button>
    </li>
  )
}