import Icon from "@phosphor-icons/react"
import { viewState } from "@/atoms/viewAtom"
import { useRecoilState } from "recoil"
import { ReactElement, cloneElement } from "react"
interface SidebarItemProps {
  // view: string
  icon: Icon.IconProps
  title: string
  isActive: boolean
  onClick: () => void
  isSeparator?: boolean
  separatorText?: string
}
const buttonStyle = "flex p-2 items-center rounded-lg text-slate-200 group gap-3 w-full"
export default function SidebarItem({ icon, isActive, title, onClick }: SidebarItemProps) {
  return (
    <li>
      <button onClick={onClick} className={`${buttonStyle} ${isActive ? 'font-bold text-slate-200 bg-police-blue-primary' : 'hover:bg-police-blue-primary/40 font-medium text-slate-400'}`}>
      <>
      {cloneElement(icon as ReactElement, { weight: isActive ? 'fill' : 'duotone' })}
      </>
        {title}
      </button>
    </li>
  )
}