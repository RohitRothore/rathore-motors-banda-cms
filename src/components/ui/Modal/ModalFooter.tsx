export default function ModalFooter({ children }: { children: React.ReactNode }) {
  return <div className='flex items-center justify-end gap-4 p-3 md:px-6 md:py-4'>{children}</div>;
}
