import { ReactNode } from 'react';

import { handleExtraClassNameSpace } from '@/utils/handleExtraClassNameSpace';

interface ModalBodyProps {
  children: ReactNode;
  className?: string;
}

export default function ModalBody({ children, className = '' }: ModalBodyProps) {
  return (
    <div className={`relative flex-auto p-3 md:px-6 md:pb-2 md:pt-4${handleExtraClassNameSpace(className)}`}>
      {children}
    </div>
  );
}
