import { Eye, House, Person, PlusCircle, SidebarSimple } from "@phosphor-icons/react";
import SidebarItem from "./sidebarItem";
import { useRecoilState } from "recoil";
import { viewState } from "@/atoms/viewAtom";

export default function Sidebar() {
   const [viewS, setViewState] = useRecoilState(viewState)
  return (
  <main>
  <button data-drawer-target="sidebar-multi-level-sidebar" data-drawer-toggle="sidebar-multi-level-sidebar" aria-controls="sidebar-multi-level-sidebar" type="button" className="inline-flex items-center p-2 mt-2 ml-3 text-sm rounded-lg sm:hidden focus:outline-none focus:ring-2 text-gray-400 hover:bg-gray-700 focus:ring-gray-600">
   <span className="sr-only">Open sidebar</span>
   <SidebarSimple aria-hidden='true' size={24}/>
</button>

<aside id="sidebar-multi-level-sidebar" className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
   <div className="h-full px-3 py-4 overflow-y-auto bg-gray-800">
      <ul className="space-y-2 font-medium">
      <SidebarItem view="home" title="Home" icon={<House size={24} weight={viewS === 'home' ? 'fill' : 'duotone'}/>}/>
      <hr className='border-slate-600'/>
      <p className='text-slate-400 text-sm'>hospital</p>
      <SidebarItem view="getHospitalView" title="Visualizar hospitais" icon={<Eye size={24} weight={viewS === 'getHospitalView' ? 'fill' : 'duotone'}/>}/>
      <SidebarItem view="addHospitalView" title="Adicionar hospital" icon={<PlusCircle size={24} weight={viewS === 'addHospitalView' ? 'fill' : 'duotone'}/>}/>
      <hr className='border-slate-600'/>
      <p className='text-slate-400 text-sm'>paciente</p>
      <SidebarItem view="getPatientView" title="Visualizar pacientes" icon={<Eye size={24} weight={viewS === 'getPatientView' ? 'fill' : 'duotone'}/>}/>
      <SidebarItem view="addPatientView" title="Adicionar pacientes" icon={<PlusCircle size={24} weight={viewS === 'addPatientView' ? 'fill' : 'duotone'}/>}/>
      </ul>
   </div>
</aside>
</main>
  )
}