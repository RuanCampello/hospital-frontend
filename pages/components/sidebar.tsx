import { Eye, House, PlusCircle, SidebarSimple } from '@phosphor-icons/react';
import SidebarItem from './subitems/sidebarItem';
import { useRecoilState } from 'recoil';
import { viewState } from '@/atoms/viewAtom';
import { Fragment } from 'react';

export default function Sidebar() {
   const [currentView, setViewState] = useRecoilState(viewState)
   const sidebarItems = [
      { view: 'home', title: 'Home', icon: <House size={24} /> },

      { isSeparator: true, separatorText: 'hospital' },
      { view: 'getHospitalView', title: 'Visualizar hospitais', icon: <Eye size={24} /> },
      { view: 'addHospitalView', title: 'Adicionar hospital', icon: <PlusCircle size={24} /> },
      
      { isSeparator: true, separatorText: 'paciente' },
      { view: 'getPatientView', title: 'Visualizar pacientes', icon: <Eye size={24} />},
      { view: 'addPatientView', title: 'Adicionar pacientes', icon: <PlusCircle size={24} />},
      
      { isSeparator: true, separatorText: 'funcionário' },
      { view: 'getEmployeeView', title: 'Visualizar funcionários', icon: <Eye size={24} />},
      { view: 'addEmployeeView', title: 'Adicionar funcionário', icon: <PlusCircle size={24} />},

      { isSeparator: true, separatorText: 'equipe' },
      { view: 'getTeamView', title: 'Visualizar equipes', icon: <Eye size={24} />},
      { view: 'addTeamView', title: 'Adicionar equipe', icon: <PlusCircle size={24} />},
    ]
   function handleItemClick(selectedView: string) {
      setViewState(selectedView)
    }
  return (
   <aside className='fixed top-0 left-0 z-40 w-72 h-screen transition-transform -translate-x-full sm:translate-x-0' aria-label='Sidebar'>
      <div className='h-full px-3 py-4 overflow-y-auto bg-yankees-blue-primary'>
      <ul className='space-y-2 font-medium'>
      {sidebarItems.map(({ isSeparator, separatorText, view, title, icon }, index) => (
         <Fragment key={index}>
            {isSeparator && (
               <Fragment>
               {/* <hr className='border-slate-600' /> */}
               <p className='text-slate-400 text-xs pt-4 uppercase'>{separatorText}</p>
               </Fragment>
            )}
            {!isSeparator && (
               <SidebarItem
               // view={view || ''}
               title={title || ''}
               icon={icon || <></>}
               isActive={view === currentView}
               onClick={()=>handleItemClick(view || '')}
               />
            )}
         </Fragment>
         ))}
      </ul>
    </div>
   </aside>
  )
}