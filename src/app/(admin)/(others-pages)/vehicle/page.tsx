import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { Metadata } from "next";
import React from "react";
import VehicleForm from "./VehicleForm";

export const metadata: Metadata = {
  title: "Create Vehicle",
  description: "Create a new vehicle",
};

export default function Vehicle() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Create Vehicle" />
      <div className="rounded-2xl border border-gray-200 bg-white px-5 py-7 dark:border-gray-800 dark:bg-white/[0.03] xl:px-10 xl:py-12">
        <div className="mx-auto w-full max-w-3xl">
          <h3 className="mb-6 text-2xl font-semibold text-gray-800 dark:text-white/90">
            Vehicle Details
          </h3>
          <VehicleForm />
        </div>
      </div>
    </div>
  );
}
