import { handleExtraClassNameSpace } from '@/utils/handleExtraClassNameSpace';
import Button from '../button/Button';
import { CloseIcon } from '@/icons';

type ModalHeaderProps = {
  children?: React.ReactNode;
  hideClose: boolean;
  toggleFunc: () => void;
  backgroundColor: string;
  showModalInFullScreen: boolean;
  containerClassName?: string;
  closeIconClassName?: string;
};

export default function ModalHeader({
  children = '',
  hideClose,
  toggleFunc,
  backgroundColor,
  showModalInFullScreen,
  containerClassName = '',
  closeIconClassName = '',
}: ModalHeaderProps) {
  const handleClose = () => {
    toggleFunc();
  };

  return (
    <div
      className={`sticky top-0 z-[1] flex items-center border-b bg-white p-3 md:px-6 md:py-4 ${children ? 'justify-between' : 'justify-end'} ${containerClassName}`}
    >
      {children && (
        <div className='text-left text-lg font-bold leading-6 text-gray-800 md:text-xl md:leading-7'>{children}</div>
      )}
      {!hideClose && !showModalInFullScreen && (
        <Button
          className={`-mr-2 !size-8 flex-shrink-0 !rounded-full !fill-white !p-1 leading-none outline-none transition-colors focus:outline-none ${
            backgroundColor === 'bg-black' ? 'bg-black hover:bg-black/10' : 'border-gray-300 bg-white hover:bg-gray-100'
          }${handleExtraClassNameSpace(closeIconClassName)}`}
          onClick={handleClose}
        >
          <CloseIcon className={`size-5 fill-gray-800${handleExtraClassNameSpace(closeIconClassName)}`} />
        </Button>
      )}
    </div>
  );
}
