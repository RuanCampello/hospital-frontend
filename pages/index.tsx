import { useRecoilState } from "recoil";
import { viewState } from '@/atoms/viewAtom'
import AddHospitalView from "./components/views/hospital/addHospitalView";
import ViewHospital from "./components/views/hospital/viewHospitals";
import PutHospitalView from "./components/views/hospital/putHospitalView";
import Sidebar from "./components/sidebar";
import ViewPatient from "./components/views/patient/viewPatient";
import AddPatientView from "./components/views/patient/addPatientView";
import PutPatientView from "./components/views/patient/putPatientView";
import ViewEmployee from "./components/views/employee/viewEmployee";
import PutEmployeeView from "./components/views/employee/putEmployeeView";
import AddEmployeeView from "./components/views/employee/addEmployeeView";
import Homepage from "./components/views/homepage";
import ViewTeam from "./components/views/team/viewTeam";
import AddTeamView from "./components/views/team/addTeamView";
import PutTeamView from "./components/views/team/putTeamView";

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
