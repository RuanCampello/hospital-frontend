import { useState } from "react";
import FormField from "../formField";

export default function PutPatientView() {
  const [id, setId] = useState(null)
  const idSession = localStorage.getItem('idPatient')
  async function putPatient() {
    const nameSession = localStorage.getItem('namePatient')
    const dateSession = localStorage.getItem('datePatient')
    const cnpjSession = localStorage.getItem('cpfPatient')
    const numberPersonalSession = localStorage.getItem('numberPersonal')
    const numberResponsibleSession = localStorage.getItem('numberResponsible')

    const response = await fetch(`http://localhost:8080/patient/${idSession}`, {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        name: nameSession,
        date: dateSession,
        cpf: cnpjSession,
        personal_number: numberPersonalSession,
        responsible_number: numberResponsibleSession
      })
    })
  }
  function handleSubmit(e: any) {
    e.preventDefault()
    putPatient()
  }
  return (
    <div>
      <form className='py-16 xl:px-[200px] px-16' onSubmit={handleSubmit}>
        <div className='grid md:grid-cols-2 md:gap-6'>
          <FormField name={'namePatient'} isDefault={true} dName={'Nome'} />
          <FormField name={'cpfPatient'} isDefault={true} dName={'CPF'} />
        </div>
        <div className='grid md:grid-cols-3 md:gap-6 mt-6'>
          <FormField name={'datePatient'} type="date" isDefault={true} dName={""}/>
          <FormField name={'numberPersonal'} isDefault={true} dName={'Telefone pessoal'}/>
          <FormField name={'numberResponsible'} isDefault={true} dName={'Telefone do responsável'}/>
        </div>
        <button className='bg-teal-600 text-md font-semibold px-6 p-3 hover:bg-teal-700 float-right rounded-full' type='submit'>Submit</button>
      </form>
    </div>
  )
}