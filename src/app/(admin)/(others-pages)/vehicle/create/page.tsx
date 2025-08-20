import React from "react";

import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import VehicleForm from "@/components/page/vehicle/VehicleForm";

export default function CreateVehiclePage() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Create Vehicle" />
      <VehicleForm />
    </div>
  );
}
