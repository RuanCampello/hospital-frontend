import { actionState } from "@/atoms/actionAtom"
import { useEffect, useState } from "react"
import { useRecoilState } from "recoil"
import TeamItem from "../subitems/teamItem"

export default function ViewTeam() {
  const [teams, setTeams] = useState([])
  const [actionS, setActionState] = useRecoilState(actionState)

  async function getTeams() {
    const response = await fetch('http://localhost:8080/team/all', {
      method: 'GET',
      headers: {'Content-type':'application/json'}
    })
    const data = await response.json()
    setTeams(data)
    console.log(data)
  }
  useEffect(() => {
    getTeams()
  },[])
  setInterval(() => {
    if(actionS) {
      getTeams()
      setActionState(false)
    }
  }, 1500)
  return (
    <main className='h-full w-full xl:px-8 lg:px-6 px-4 text-center'>
      <div className='mt-3 grid grid-cols-6 bg-slate-700 rounded-t-xl 2xl:text-lg text-sm items-center py-2 mb-2 font-semibold lg:px-8 px-4'>
        <div>Nome</div>
        <div className='col-span-5'>Funcionários</div>
      </div>
      <div>
        {
          teams?.map((team) => {
            return (
              <div key={team['id']}>
                <TeamItem id={team['id']} name={team['name']} funcList={team['funcionarioList']}/>
              </div>
            )
          })
        }
      </div>
    </main> 
  )
}