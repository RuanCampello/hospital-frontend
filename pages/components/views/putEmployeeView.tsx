import { employeeId, employeeName, employeeCpf, employeeDate, employeeNumber, employeeFunction } from "@/atoms/updateEmployeeAtom"
import { useRecoilState } from "recoil"
import FormField from "../formField"
import { useState } from "react"
import ToastComponent from "../toast"
import { CheckCircle, XCircle } from "@phosphor-icons/react"

export default function PutEmployeeView() {
  const [eId, setEmployeeId] = useRecoilState(employeeId)

  const [eName, setEmployeeName] = useRecoilState(employeeName)
  const [eCpf, setEmployeeCpf] = useRecoilState(employeeCpf)
  const [eDate, setEmployeeDate] = useRecoilState(employeeDate)
  const [eNumber, setEmployeeNumber] = useRecoilState(employeeNumber)
  const [eFunc, setEmployeeFunction] = useRecoilState(employeeFunction)
  const [open, setOpen] = useState(false)
  const [status, setStatus] = useState(Number)
  const [dataErrors, setDataErrors] = useState(null)
  const [data, setData] = useState(null)
  async function putEmployee() {
    const response = await fetch(`http://localhost:8080/employee/${eId}`, {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        cpf: eCpf,
        name: eName,
        date: eDate,
        personal_number: eNumber,
        function: eFunc,
      })
    })
    const data = await response.json()
    console.log(data)
    if(data!['errors'] !== undefined && data){
      setDataErrors(data!['errors'][0]['defaultMessage'])
    }
    if(data) setData(data)
    setStatus(response.status)
  }
  function handleSubmit(e:any) {
    e.preventDefault()
    putEmployee()
    setOpen(true)
  }
  return (
    <div>
      <form className='py-16 xl:px-[200px] px-16' onSubmit={handleSubmit}>
        <div className='grid md:grid-cols-2 md:gap-6'>
          <FormField id={12} func={setEmployeeName} isDefault={true} dName={'Nome'} />
          <FormField id={13} func={setEmployeeCpf} isDefault={true} dName={'CPF'} />
        </div>
        <div className='grid md:grid-cols-3 md:gap-6 mt-6'>
          <FormField id={14} func={setEmployeeDate} type="date" isDefault={true} dName={"Data de nascimento"}/>
          <FormField id={15} func={setEmployeeNumber} isDefault={true} dName={'Telefone pessoal'}/>
          <FormField id={16} func={setEmployeeFunction} isDefault={true} dName={'Função'}/>
        </div>
        <button className='bg-teal-600 text-md font-semibold px-6 p-3 hover:bg-teal-700 float-right rounded-full' type='submit'>Submit</button>
      </form>
      { status ?
        <ToastComponent icon={status === 200 ? <CheckCircle size={32}/> : <XCircle size={32}/>} title={status === 200 ? 'Success' : 'Error'} disc={status === 200 ? 'Employee Updated!': status === 500 ? 'CPF must be unique' : String(dataErrors)} oFunc={open} cFunc={setOpen}/>
        : null
      }
    </div>
  )
}