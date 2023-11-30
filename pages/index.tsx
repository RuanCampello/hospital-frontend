import { useRecoilState } from "recoil";
import { viewState } from '@/atoms/viewAtom'
import AddHospitalView from "./components/views/addHospitalView";
import ViewHospital from "./components/views/viewHospitals";
import PutHospitalView from "./components/views/putHospitalView";
import Sidebar from "./components/sidebar";
import ViewPatient from "./components/views/viewPatient";
import AddPatientView from "./components/views/addPatientView";
import PutPatientView from "./components/views/putPatientView";
import ViewEmployee from "./components/views/viewEmployee";
import PutEmployeeView from "./components/views/putEmployeeView";
import Homepage from "./components/views/homepage";
import AddEmployeeView from "./components/views/addEmployeeView";
import ViewTeam from "./components/views/viewTeam";
import AddTeamView from "./components/views/addTeamView";
import PutTeamView from "./components/views/putTeamView";

export default function Home() {
  const [currentView, setViewState] = useRecoilState(viewState)
  return (
      <main className='h-screen bg-police-blue-primary'>
        <Sidebar/>
        <div className='w-screen overflow-hidden'>
          <div className='sm:ml-72'> 
            {currentView === 'getPatientView' && <ViewPatient/>}
            {currentView === 'addHospitalView' && <AddHospitalView/>}
            {currentView === 'putHospitalView' && <PutHospitalView/>}
            {currentView === 'getHospitalView' && <ViewHospital/>}
            {currentView === 'addPatientView' && <AddPatientView/>}
            {currentView === 'putPatientView' && <PutPatientView/>}
            {currentView === 'getEmployeeView' && <ViewEmployee/>}
            {currentView === 'putEmployeeView' && <PutEmployeeView/>} 
            {currentView === 'addEmployeeView' && <AddEmployeeView/>}
            {currentView === 'getTeamView' && <ViewTeam/>}
            {currentView === 'addTeamView' && <AddTeamView/>}
            {currentView === 'putTeamView' && <PutTeamView/>}
            {currentView === 'home' && <Homepage/>}
          </div>
        </div>
      </main>
  )
}
