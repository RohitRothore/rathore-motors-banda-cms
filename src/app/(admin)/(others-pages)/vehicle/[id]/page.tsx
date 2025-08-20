import React from 'react'

import PageBreadcrumb from '@/components/common/PageBreadCrumb'
import VehicleForm from '@/components/page/vehicle/VehicleForm'

export default function UpdateVehiclePage() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Update Vehicle" />
      <div className="rounded-2xl border border-gray-200 bg-white px-5 py-7 dark:border-gray-800 dark:bg-white/[0.03] xl:px-10 xl:py-12">
        <div className="mx-auto w-full max-w-3xl">
          <h3 className="mb-6 text-2xl font-semibold text-gray-800 dark:text-white/90">
            Vehicle Details
          </h3>
          <VehicleForm />
        </div>
      </div>
    </div>
  )
}
