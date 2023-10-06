import { useRecoilState } from "recoil";
import { viewState } from '@/atoms/viewAtom'
import Header from "./components/header";
import HomeView from "./components/views/homeView";
import AddHospitalView from "./components/views/addHospitalView";
import ViewHospital from "./components/views/viewHospitals";
import PutHospitalView from "./components/views/putHospitalView";

export default function Home() {
  const [viewS, setViewState] = useRecoilState(viewState)
  return (
      <main className='h-screen bg-slate-600'>
        <Header/>
        <div className='w-screen overflow-hidden'>
          {viewS === 'home' && <HomeView/>}
          {viewS === 'addHospitalView' && <AddHospitalView/>}
          {viewS === 'putHospitalView' && <PutHospitalView/>}
          {viewS === 'getHospitalView' && <ViewHospital/>}
        </div>
      </main>
  )
}
