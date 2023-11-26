import { employeeId, employeeName, employeeCpf, employeeDate, employeeNumber, employeeFunction } from "@/atoms/updateEmployeeAtom"
import { hospitalId, hospitalName, hospitalCnpj, hospitalAddress, hospitalNumber } from "@/atoms/updateHospitalAtom"
import { patientId, patientName, patientDate, patientCpf, patientPersonalNumber, patientResponsibleNumber } from "@/atoms/updatePatientAtom"
import { useRecoilState } from "recoil"
import { formatDate } from "./subitems/patientItem"
import { teamId, teamName, teamFunct } from "@/atoms/updateTeamAtom"

interface FormFieldProps {
  dName: string,
  id?: number,
  func?: Function,
  type?: string,
  isDefault?: boolean,
}
export default function FormField({id, dName, type = 'text', isDefault = false, func}: FormFieldProps) {
  const [hId, setHospitalId] = useRecoilState(hospitalId)
  const [hName, setHospitalName] = useRecoilState(hospitalName)
  const [hCnpj, setHospitalCnpj] = useRecoilState(hospitalCnpj)
  const [hAddress, setHospitalAddress] = useRecoilState(hospitalAddress)
  const [hNumber, setHospitalNumber] = useRecoilState(hospitalNumber)
  const [pId, setPatientId] = useRecoilState(patientId)
  const [pName, setPatientName] = useRecoilState(patientName)
  const [pDate, setPatientDate] = useRecoilState(patientDate)
  const [pCpf, setPatientCpf] = useRecoilState(patientCpf)
  const [pPNumber, setPatientPersonalNumber] = useRecoilState(patientPersonalNumber)
  const [pRNumber, setPatientResponsibleNumber] = useRecoilState(patientResponsibleNumber)
  const [eId, setEmployeeId] = useRecoilState(employeeId)
  const [eName, setEmployeeName] = useRecoilState(employeeName)
  const [eCpf, setEmployeeCpf] = useRecoilState(employeeCpf)
  const [eDate, setEmployeeDate] = useRecoilState(employeeDate)
  const [eNumber, setEmployeeNumber] = useRecoilState(employeeNumber)
  const [eFunc, setEmployeeFunction] = useRecoilState(employeeFunction)
  const [tId, setTeamId] = useRecoilState(teamId)
  const [tName, setTeamName] = useRecoilState(teamName)
  const [tFunc, setTeamFunc] = useRecoilState(teamFunct)

  const constArray = [hId, hName, hCnpj, hAddress, hNumber, pId, pName, pDate, pCpf, pPNumber, pRNumber, eId, eName, eCpf, eDate, eNumber, eFunc, tId, tName, tFunc]  
  return (
    <div className="relative z-0 w-full mb-6 group">
      { isDefault && id && func ? <input onChange={(event) => func(event.target.value)}
        type={type} name={dName} id={dName} className="block py-2.5 px-0 w-full text-sm text-slate-200 bg-transparent border-0 border-b-2 appearance-none border-gray-700 focus:outline-none focus:ring-0 focus:border-slate-800 peer" defaultValue={constArray[id]} required/> :
        <input onChange={(e) => func!(e.target.value)}
         type={type} name={dName} id={dName} className="block py-2.5 px-0 w-full text-sm text-slate-200 bg-transparent border-0 border-b-2 appearance-none border-gray-700 focus:outline-none focus:ring-0 focus:border-slate-800 peer" placeholder=" " required />
      }
				<label htmlFor={dName} className="peer-focus:font-medium absolute text-lg text-slate-200 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-slate-200 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
        {dName}
			</label>
		</div>
  )
}