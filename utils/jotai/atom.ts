import { atom } from 'jotai'

export const notifContent = atom<Record<string, string | null>>({
  title: null,
  message: null,
})
export const loadingAtom = atom<boolean>(false)