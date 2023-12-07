import { useState } from "react"
import FuncButton from "../funcButtons"
import { useRecoilState, useSetRecoilState } from "recoil"
import { actionState } from "@/atoms/actionAtom"
import { CheckCircle, XCircle } from "@phosphor-icons/react"
import ToastComponent from "../toast"
import { viewState } from "@/atoms/viewAtom"
import { teamFunct, teamId, teamName} from '@/atoms/updateTeamAtom'

interface TeamItemProps {
  id: string,
  name: string,
  funcList: Array<any>
}
export default function TeamItem({id, name, funcList}:TeamItemProps) {
  const [status, setStatus] = useState(Number)
  const [open, setOpen] = useState(false)

  const [tId, setTeamId] = useRecoilState(teamId)
  const [tName, setTeamName] = useRecoilState(teamName)
  const [tFunc, setTeamFunc] = useRecoilState(teamFunct)
  const [viewS, setViewState] = useRecoilState(viewState)
  const [actionS, setActionState] = useRecoilState(actionState)
  const [funcName, setFuncName] = useState('')

  async function delTeam(id: String) {
    const response = await fetch(`http://localhost:8080/team/${id}`, {
      method: 'DELETE',
      headers: {'Content-Type': 'application/json'},
    })
    setStatus(response.status)
  }

  function handlePut() {
    setTeamId(id)
    setTeamName(name)
    setTeamFunc(funcList)
    setViewState('putTeamView')
  }
  function handleDelete() {
    setActionState(true)
    setOpen(true)
    delTeam(id)
  }
  return (
    <div>
      <div className='grid grid-cols-8 py-2 items-center px-4 lg:px-8 xl:text-lg text-xs'>
        <div>{name}</div>
        <div className='col-span-5'>
        {
          funcList?.map((func) => {
            return (
              <div key={func['id']}>
                {func['name']}
              </div>
            )
          })  
        }
        </div>
        <div className='col-span-2 flex justify-around'>
          <FuncButton funcPut={handlePut} funcDelete={handleDelete}/>
        </div>
      </div>
      {status ?
      <ToastComponent icon={status !== 200 ? <CheckCircle size={32}/> : <XCircle size={32}/>} title={status === 200 ? 'Success' : 'Error'} disc={status === 200 ? 'Team deleted!' : 'Team does not exist'} oFunc={open} cFunc={setOpen}/>
    :null}
    </div>
  )
}