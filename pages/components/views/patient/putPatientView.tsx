import { useState } from "react";
import FormField from "../../formField";
import { useRecoilState } from "recoil";
import { viewState } from "@/atoms/viewAtom";
import { patientCpf, patientDate, patientId, patientName, patientPersonalNumber, patientResponsibleNumber } from "@/atoms/updatePatientAtom";
import ToastComponent from "../../toast";
import { CheckCircle, XCircle } from "@phosphor-icons/react";

export default function PutPatientView() {
  const [viewS, setViewState] = useRecoilState(viewState)
  const [id, setId] = useState(null)
  const [data, setData] = useState(null)
  const [open, setOpen] = useState(false)
  const [dataErrors, setDataErrors] = useState(null)
  const [status, setStatus] = useState(Number)

  const [pId, setPatientId] = useRecoilState(patientId)
  const [pName, setPatientName] = useRecoilState(patientName)
  const [pDate, setPatientDate] = useRecoilState(patientDate)
  const [pCpf, setPatientCpf] = useRecoilState(patientCpf)
  const [pPNumber, setPatientPersonalNumber] = useRecoilState(patientPersonalNumber)
  const [pRNumber, setPatientResponsibleNumber] = useRecoilState(patientResponsibleNumber)

  async function putPatient() {
    const response = await fetch(`http://localhost:8080/patient/${pId}`, {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        name: pName,
        date: pDate,
        cpf: pCpf,
        personal_number: pPNumber,
        responsible_number: pRNumber
      })
    })
    const data = await response.json()
    setData(data)
    if(data!['errors'] !== undefined && data){
      setDataErrors(data!['errors'][0]['defaultMessage'])
    }
    if(data) {
      setData(data)
      setStatus(response.status)
    }
  }
  function handleSubmit(e: any) {
    e.preventDefault()
    putPatient()
    setOpen(true)
  }
  return (
    <div>
      <form className='py-16 xl:px-[200px] px-16' onSubmit={handleSubmit}>
        <div className='grid md:grid-cols-2 md:gap-6'>
          <FormField id={6} func={setPatientName} isDefault={true} dName={'Nome'} />
          <FormField id={8} func={setPatientCpf} isDefault={true} dName={'CPF'} />
        </div>
        <div className='grid md:grid-cols-3 md:gap-6 mt-6'>
          <FormField id={7} func={setPatientDate} type="date" isDefault={true} dName={"Data de nascimento"}/>
          <FormField id={9} func={setPatientPersonalNumber} isDefault={true} dName={'Telefone pessoal'}/>
          <FormField id={10} func={setPatientResponsibleNumber} isDefault={true} dName={'Telefone do responsável'}/>
        </div>
        <button className='bg-teal-600 text-md font-semibold px-6 p-3 hover:bg-teal-700 float-right rounded-full' type='submit'>Submit</button>
      </form>
      { status ?
        <ToastComponent icon={status === 200 ? <CheckCircle size={32}/> : <XCircle size={32}/>} title={status === 200 ? 'Success' : 'Error'} disc={status === 200 ? 'Patient Updated!': status === 500 ? 'CPF must be unique' : String(dataErrors)} oFunc={open} cFunc={setOpen}/>
        : null
      }
    </div>
  )
}