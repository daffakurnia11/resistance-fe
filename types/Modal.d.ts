export type ModalType = {
  open: boolean;
  header: string | null;
  content: React.ReactNode | string | null;
  footer: React.ReactNode | string | null;
}