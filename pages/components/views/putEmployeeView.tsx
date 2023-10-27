import FormField from "../formField"

export default function PutEmployeeView() {
  const idSession = localStorage.getItem('idEmployee')
  async function putEmployee() {
    const cpfEmployee = localStorage.getItem('cpfEmployee')
    const nameEmployee = localStorage.getItem('nameEmployee')
    const dateEmployee = localStorage.getItem('dateEmployee')
    const numberEmployee = localStorage.getItem('numberEmployee')
    const funcEmployee = localStorage.getItem('funcEmployee')

    const response = await fetch(`http://localhost:8080/employee/${idSession}`, {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        cpf: cpfEmployee,
        name: nameEmployee,
        date: dateEmployee,
        personal_number: numberEmployee,
        function: funcEmployee,
      })
    })
    const data = await response.json()
    console.log(data)
  }
  function handleSubmit(e:any) {
    e.preventDefault()
    putEmployee()
  }
  return (
    <div>
      <form className='py-16 xl:px-[200px] px-16' onSubmit={handleSubmit}>
        <div className='grid md:grid-cols-2 md:gap-6'>
          <FormField name={'nameEmployee'} isDefault={true} dName={'Nome'} />
          <FormField name={'cpfEmployee'} isDefault={true} dName={'CPF'} />
        </div>
        <div className='grid md:grid-cols-3 md:gap-6 mt-6'>
          <FormField name={'dateEmployee'} type="date" isDefault={true} dName={"Data de nascimento"}/>
          <FormField name={'numberEmployee'} isDefault={true} dName={'Telefone pessoal'}/>
          <FormField name={'funcEmployee'} isDefault={true} dName={'Função'}/>
        </div>
        <button className='bg-teal-600 text-md font-semibold px-6 p-3 hover:bg-teal-700 float-right rounded-full' type='submit'>Submit</button>
      </form>
    </div>
  )
}