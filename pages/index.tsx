import { useRecoilState } from "recoil";
import { viewState } from '@/atoms/viewAtom'
import Header from "./components/header";
import HomeView from "./components/views/homeView";
import HospitalView from "./components/views/hospitalView";

export default function Home() {
  const [viewS, setViewState] = useRecoilState(viewState)
  return (
      <main className=''>
        <Header/>
        <div className='w-screen overflow-hidden'>
          {viewS === 'home' && <HomeView/>}
          {viewS === 'hospital' && <HospitalView/>}
        </div>
      </main>
  )
}
