type ModalWrapperProps = {
  active: boolean;
  backgroundColor: string;
  children: React.ReactNode;
  className?: string;
  containerClassName: string;
  maxHeight?: string;
  requiredPadding: boolean;
  size: "full" | "lg" | "md" | "sm";
  toggleFunc: () => void;
  SidebarComponent?: React.ReactNode;
};

export default function ModalWrapper({
  active,
  backgroundColor,
  children,
  className = "w-auto",
  containerClassName,
  maxHeight = "max-h-[95vh]",
  requiredPadding,
  size,
  toggleFunc,
  SidebarComponent = null,
}: ModalWrapperProps) {
  const modalSize = {
    full: "max-w-full",
    lg: "max-w-6xl",
    md: "max-w-3xl",
    sm: "max-w-sm",
  };

  return (
    <>
      <div
        className={`${
          active
            ? "pointer-events-auto animate-showTranslateY opacity-100"
            : "pointer-events-none opacity-0"
        } fixed inset-0 z-999999 flex items-center justify-center overflow-hidden transition-all duration-500 focus:outline-none ${containerClassName}`}
        id="UNModal"
        onClick={toggleFunc}
      >
        <div
          className={`${className} transform ${
            active ? "translate-y-0 opacity-100" : "-translate-y-10 opacity-0"
          } ${modalSize[size]} transition-all duration-500`}
        >
          {SidebarComponent}
          <div
            className={`border-0${
              requiredPadding ? "" : " p-3 md:px-6 md:py-4"
            } ${
              size === "lg"
                ? "rounded-xl shadow-xl"
                : size === "full"
                ? "h-full rounded-none"
                : "rounded-xl shadow-lg"
            } flex w-full flex-col bg-white focus:outline-none ${backgroundColor} ${maxHeight} overflow-y-auto`}
            onClick={(e) => e.stopPropagation()}
          >
            {children}
          </div>
        </div>
      </div>
      <div
        className={`${
          active
            ? "pointer-events-auto opacity-25"
            : "pointer-events-none opacity-0"
        } fixed inset-0 z-99999 bg-black transition-all duration-500`}
      />
    </>
  );
}
