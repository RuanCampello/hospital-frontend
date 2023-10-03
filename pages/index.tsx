import { useRecoilState } from "recoil";
import { viewState } from '@/atoms/viewAtom'
import Header from "./components/header";
import HomeView from "./components/views/homeView";
import AddHospitalView from "./components/views/addHospitalView";
import DelHospitalView from "./components/views/delHospitalView";
import ViewHospital from "./components/views/viewHospitals";

export default function Home() {
  const [viewS, setViewState] = useRecoilState(viewState)
  return (
      <main className='h-screen bg-slate-600'>
        <Header/>
        <div className='w-screen overflow-hidden'>
          {viewS === 'home' && <HomeView/>}
          {viewS === 'addHospitalView' && <AddHospitalView/>}
          {viewS === 'delHospitalView' && <DelHospitalView/>}
          {viewS === 'getHospitalView' && <ViewHospital/>}
        </div>
      </main>
  )
}
