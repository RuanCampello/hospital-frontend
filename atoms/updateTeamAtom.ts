import { atom } from "recoil";
interface TeamEmployees {
  id: string,
  name: string
}
export const teamId = atom({
  key: 'teamId',
  default: ''
})
export const teamName = atom({
  key: 'teamName',
  default: ''
})
export const teamFunct = atom<TeamEmployees[]>({
  key: 'teamFunc',
  default: [],
})