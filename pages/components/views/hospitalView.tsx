import FormField from "../formField"
export default function HospitalView() {
  return (
    <div className='h-screen'>
      <form className='py-16 bg-slate-300 xl:px-[400px] px-16' action="">
        <div className='grid md:grid-cols-2 md:gap-6'>
          <FormField name={'Name'} type={'text'} />
          <FormField name={'CNPJ'} type={'text'} />
        </div>
        <div className='grid md:grid-cols-2 md:gap-6 mt-6'>
          <FormField name={'Address'} type={'text'} />
          <FormField name={'Phone number'} type={'text'} />
        </div>        
        <button className='bg-teal-500 px-5 p-2 rounded-full' type='submit'>Submit</button>
      </form>
    </div>
  )
}