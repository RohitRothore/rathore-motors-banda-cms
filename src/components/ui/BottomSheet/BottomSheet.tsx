import { ReactNode, useEffect } from "react";

import { handleExtraClassNameSpace } from "@/utils/handleExtraClassNameSpace";
import preventBodyScroll from "@/utils/preventBodyScrollHelper";

import { CloseIcon } from "@/icons";
import { noop } from "@/utils/common";
import Button from "../button/Button";

export interface BottomSheetProps {
  backDropClass?: string;
  cancelHandler: () => void;
  children: ReactNode;
  className?: string;
  coverMoreThanHalf?: boolean;
  disableOutsideClick?: boolean;
  divideInSections?: boolean;
  footer?: ReactNode;
  footerClassName?: string;
  heading?: ReactNode;
  headingClass?: string;
  isOpen: boolean;
  renderHeadingElement?: ReactNode;
  showClose?: boolean;
  wrapperClass?: string;
}

function BottomSheet({
  backDropClass = "",
  cancelHandler,
  children,
  className = "",
  coverMoreThanHalf = false,
  disableOutsideClick = false,
  divideInSections = false,
  footer = "",
  footerClassName = "",
  heading = "",
  headingClass = "",
  isOpen,
  renderHeadingElement = null,
  showClose = true,
  wrapperClass = "",
}: BottomSheetProps) {
  const closeBottomSheet = () => {
    cancelHandler();
    preventBodyScroll(false);
  };

  useEffect(() => {
    const FABContainer = document.getElementById("layoutFAB");
    if (isOpen) {
      if (FABContainer) FABContainer.style.zIndex = "unset";
      preventBodyScroll(true);
    }

    return () => {
      if (FABContainer) FABContainer.style.zIndex = "revert-layer";
      preventBodyScroll(false);
    };
  }, [isOpen]);

  return (
    <div className={isOpen ? "auto" : "hidden"}>
      <div
        aria-hidden={disableOutsideClick}
        aria-label="close"
        className={`${backDropClass} fixed left-0 top-0 z-[21] h-screen w-screen bg-black/50`}
        onClick={disableOutsideClick ? noop : closeBottomSheet}
      />
      <div
        className={`fixed bottom-0 left-0 z-[22] w-full ${
          coverMoreThanHalf ? "max-h-[75%]" : "max-h-[50%]"
        } rounded-t-xl bg-white${isOpen ? " animate-slideInUp" : ""}${
          wrapperClass ? ` ${wrapperClass}` : ""
        }`}
      >
        {showClose && (
          <Button className="absolute right-0 top-1" onClick={closeBottomSheet}>
            <CloseIcon className="fill-gray-800" />
          </Button>
        )}
        {renderHeadingElement || (
          <div
            className={`mt-2 flex w-full items-center justify-center border-b p-4 font-semibold${
              headingClass ? ` ${headingClass}` : ""
            }`}
          >
            {heading}
          </div>
        )}
        <div
          className={`content-font overflow-y-auto px-3 pb-9 pt-6 ${className} ${
            divideInSections
              ? "grid max-h-64 grid-cols-2 gap-y-4"
              : "flex max-h-[20rem] flex-col"
          }${footer ? " pb-28" : ""}`}
        >
          {children}
        </div>
        {footer && (
          <div
            className={`sticky bottom-0 flex justify-end gap-x-3 border-t bg-white py-3 px-4${handleExtraClassNameSpace(
              footerClassName
            )}`}
          >
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}

export default BottomSheet;
