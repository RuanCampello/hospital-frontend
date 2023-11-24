import { atom } from "recoil";
export const teamId = atom({
  key: 'teamId',
  default: ''
})
export const teamName = atom({
  key: 'teamName',
  default: ''
})
export const teamFunct = atom({
  key: 'teamFunc',
  default: [],
})