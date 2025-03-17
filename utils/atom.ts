import { ModalType } from "@/types/Modal";
import { atom } from "jotai";

export const notifContent = atom<Record<string, string | null>>({
  title: null,
  message: null,
});
export const loadingAtom = atom<boolean>(false);
export const modalAtom = atom<ModalType>({
  open: false,
  header: null,
  content: null,
  footer: null,
});
