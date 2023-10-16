import Icon from "@phosphor-icons/react"
import { viewState } from "@/atoms/viewAtom"
import { useRecoilState } from "recoil"

interface SidebarItemProps {
  view: string,
  icon: Icon.IconProps,
  title: string
}
export default function SidebarItem({view, icon, title}: SidebarItemProps) {
  const [viewS, setViewState] = useRecoilState(viewState)
  return (
    <li>
      <button onClick={() => setViewState(view)} className="flex items-center p-2 rounded-lg text-slate-200 hover:bg-gray-700 group gap-3 w-full">
        <>
          {icon}
        </>
        {title}
      </button>
    </li>
  )
}