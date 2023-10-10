import { viewState } from "@/atoms/viewAtom"
import { ArrowClockwise, Eye, FirstAid, PlusCircle, TrashSimple } from "@phosphor-icons/react"
import { useRecoilState } from "recoil"
import { Menu, Transition } from "@headlessui/react"
import { Fragment } from "react"

export default function Header() {
  const [viewS, setViewState] = useRecoilState(viewState)
  return (
    <div className='bg-slate-700 text-slate-100 text-lg px-12 py-3 flex justify-between items-center'>
      <button onClick={()=> setViewState('home')}>
        <FirstAid size={32} weight={'duotone'}/>
      </button>
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="inline-flex w-full justify-center rounded-full text-lg px-4 py-2 font-medium bg-black bg-opacity-20 hover:bg-opacity-30">
            Hospital
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right rounded-md bg-slate-600 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
            <div className="p-2">
            <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? 'bg-teal-500' : 'text-slate-200'
                    } group flex w-full items-center rounded-md p-2 gap-2`}
                    onClick={() => setViewState('getHospitalView')}>
                    {active ? (
                      <Eye size={28} weight="fill" />) : (
                      <Eye size={28} weight="duotone" />)}
                    View Hospitals</button>)}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? 'bg-teal-500' : 'text-slate-200'
                    } group flex w-full items-center rounded-md p-2 gap-2`}
                    onClick={() => setViewState('addHospitalView')}>
                    {active ? (
                      <PlusCircle size={28} weight="fill"/>) : (
                      <PlusCircle size={28} weight="duotone"/>)}
                    Add Hospital
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  )
}