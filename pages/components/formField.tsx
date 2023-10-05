interface FormFieldProps {
  name: string, 
  func?: Function
}
export default function FormField({name, func}: FormFieldProps) {
  return (
    <div className="relative z-0 w-full mb-6 group">
				<input onChange={e => func!(e.target.value)}
         type={"text"} name={name} id={name} className="block py-2.5 px-0 w-full text-sm text-slate-200 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-slate-800 peer" placeholder=" " required />
				<label htmlFor={name} className="peer-focus:font-medium absolute text-lg text-slate-200 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-slate-200 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
        {name}
			</label>
		</div>
  )
}