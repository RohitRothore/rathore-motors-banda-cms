"use client";

import React, { useState } from "react";
import ComponentCard from "../../common/ComponentCard";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import { CloseIcon } from "@/icons";
import { ResponsiveModal } from "@/components/ui/ResponsiveModal";

interface DropzoneComponentProps {
  onFilesSelected: (files: File[]) => void;
  error?: string;
  title: string;
  className?: string;
}

const DropzoneComponent: React.FC<DropzoneComponentProps> = ({
  onFilesSelected,
  error,
  title,
  className = "",
}) => {
  const [files, setFiles] = useState<File[]>([]);
  const [modal, setModal] = useState<File | null>(null);

  const onDrop = (acceptedFiles: File[]) => {
    console.log("Files dropped:", acceptedFiles);
    setFiles((prev) => [...prev, ...acceptedFiles]); // keep adding
    onFilesSelected(acceptedFiles);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles: 10,
    maxSize: 5 * 1024 * 1024, // 5MB
    accept: {
      "image/png": [],
      "image/jpeg": [],
      "image/webp": [],
      "image/avif": [],
    },
  });

  return (
    <ComponentCard className={className} title={title}>
      <div className="transition border border-gray-300 border-dashed cursor-pointer dark:hover:border-brand-500 dark:border-gray-700 rounded-xl hover:border-brand-500">
        <div
          {...getRootProps()}
          className={`dropzone rounded-xl border-dashed border-gray-300 p-7 lg:p-10
            ${
              isDragActive
                ? "border-brand-500 bg-gray-100 dark:bg-gray-800"
                : "border-gray-300 bg-gray-50 dark:border-gray-700 dark:bg-gray-900"
            }`}
        >
          <input {...getInputProps()} />

          <div className="dz-message flex flex-col items-center">
            <div className="mb-[22px] flex justify-center">
              <div className="flex h-[68px] w-[68px] items-center justify-center rounded-full bg-gray-200 text-gray-700 dark:bg-gray-800 dark:text-gray-400">
                📁
              </div>
            </div>
            <h4 className="mb-3 font-semibold text-gray-800 text-theme-xl dark:text-white/90">
              {isDragActive ? "Drop Files Here" : "Drag & Drop Files Here"}
            </h4>
            <span className="text-center mb-5 block w-full max-w-[290px] text-sm text-gray-700 dark:text-gray-400">
              Drag and drop PNG, JPG, WebP, AVIF images here or click to browse.
            </span>
            <span className="font-medium underline text-theme-sm text-brand-500">
              Browse File
            </span>
          </div>
        </div>

        {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
      </div>
      {/* Preview Section */}
      {files.length > 0 && (
        <div className="mt-4 grid lg:grid-cols-2 gap-4 pr-4 pt-4 max-h-96 overflow-y-auto overflow-x-hidden custom-scrollbar">
          {files.map((file, index) => (
            <div
              key={index}
              className="relative flex gap-4 cursor-pointer rounded-lg border border-gray-200 p-3 dark:border-gray-700"
              onClick={() => setModal(file)}
            >
              <Image
                src={URL.createObjectURL(file)}
                alt={file.name}
                className="h-28 w-full object-cover rounded-md"
                width={112}
                height={112}
              />
              <div
                className="absolute -top-3 z-10 -right-3 bg-error-50 border cursor-pointer border-error-500 rounded-full"
                onClick={() =>
                  setFiles((prev) => prev.filter((_, i) => i !== index))
                }
              >
                <CloseIcon className="fill-error-500" />
              </div>
            </div>
          ))}
        </div>
      )}
      {modal && (
        <ResponsiveModal
          isOpen={!!modal}
          cancelHandler={() => setModal(null)}
          bottomSheetProps={{ heading: modal.name as string }}
          modalProps={{ title: modal.name as string, size: "lg" }}
        >
          <Image
            src={URL.createObjectURL(modal)}
            alt={modal.name}
            className="h-full w-full object-cover pb-4 rounded-md"
            width={512}
            height={512}
          />
        </ResponsiveModal>
      )}
    </ComponentCard>
  );
};

export default DropzoneComponent;
