"use client";

import React from "react";
import ComponentCard from "../../common/ComponentCard";
import { useDropzone } from "react-dropzone";

interface DropzoneComponentProps {
  onFilesSelected: (files: File[]) => void;
  error?: string;
  title: string
}

const DropzoneComponent: React.FC<DropzoneComponentProps> = ({ onFilesSelected, error, title }) => {
  const onDrop = (acceptedFiles: File[]) => {
    console.log("Files dropped:", acceptedFiles);
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
    <ComponentCard title={title}>
      <div className="transition border border-gray-300 border-dashed cursor-pointer dark:hover:border-brand-500 dark:border-gray-700 rounded-xl hover:border-brand-500">
        <div
          {...getRootProps()}
          className={`dropzone rounded-xl border-dashed border-gray-300 p-7 lg:p-10
            ${isDragActive
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
    </ComponentCard>
  );
};

export default DropzoneComponent;
