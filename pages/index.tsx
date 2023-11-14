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

export default function Home() {
  const [viewS, setViewState] = useRecoilState(viewState)
  return (
      <main className='h-screen bg-slate-600'>
        <Sidebar/>
        <div className='w-screen overflow-hidden'>
          <div className='sm:ml-64'>
            {viewS === 'getPatientView' && <ViewPatient/>}
            {viewS === 'addHospitalView' && <AddHospitalView/>}
            {viewS === 'putHospitalView' && <PutHospitalView/>}
            {viewS === 'getHospitalView' && <ViewHospital/>}
            {viewS === 'addPatientView' && <AddPatientView/>}
            {viewS === 'putPatientView' && <PutPatientView/>}
            {viewS === 'getEmployeeView' && <ViewEmployee/>}
            {viewS === 'putEmployeeView' && <PutEmployeeView/>} 
            {viewS === 'addEmployeeView' && <AddEmployeeView/>}
            {viewS === 'getTeamView' && <ViewTeam/>}
            {viewS === 'home' && <Homepage/>}
          </div>
        </div>
      </main>
  )
}
