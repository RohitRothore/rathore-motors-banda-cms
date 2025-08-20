"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "sonner";

import {
  VEHICLE_SCHEMA,
  VehicleFormValues,
} from "@/schema/formValidation/VEHICLE";
import { Vehicle } from "@/types/vehicle";
import {
  fuelTypeOptions,
  ownershipOptions,
  statusOptions,
  vehicleTypeOptions,
} from "@/constant/vehicle/VAHICLE_FORM";

import { createVehicle } from "@/api/vehicle/createVehicle";

import Input from "@/components/form/input/InputField";
import Select from "@/components/form/Select";
import { getVehicleDetails } from "@/api/vehicle/getVehicleDetail";
import { useParams } from "next/navigation";
import DropzoneComponent from "@/components/form/form-elements/DropZone";

export default function VehicleForm() {
  const { id } = useParams<{ id: string }>();
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<VehicleFormValues>({
    resolver: yupResolver(VEHICLE_SCHEMA) as never,
    defaultValues: {
      title: "",
      brand: "",
      model: "",
      vehicleType: undefined as unknown as Vehicle["vehicleType"],
      fuelType: undefined as unknown as Vehicle["fuelType"],
      ownership: undefined,
      year: undefined as unknown as number,
      price: undefined as unknown as number,
      kmDriven: undefined,
      mileage: undefined,
      status: "Available",
      images: [],
      imagesFiles: undefined,
    },
  });

  const onSubmit: Parameters<typeof handleSubmit>[0] = async (
    data: VehicleFormValues
  ) => {
    const vehiclePayload = {
      ...data,
      images: getValues("images") as string[],
    };

    const res = await createVehicle(vehiclePayload);
    if (res.success) {
      toast.success("Vehicle created successfully");
    } else {
      toast.error(res.error?.message || "Failed to create vehicle");
    }
  };

  useEffect(() => {
    const fetchVehicleDetails = async () => {
      const vehicleResponse = await getVehicleDetails(id);
      if (vehicleResponse.success) {
        reset(vehicleResponse.data);
        toast.success("Vehicle details fetched successfully");
      } else {
        toast.error(
          vehicleResponse.error?.message || "Failed to fetch vehicle details"
        );
      }
    };
    if (id) {
      fetchVehicleDetails();
    }
  }, [id]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-5">
        <div className="rounded-2xl border border-gray-200 lg:col-span-3 grid gap-y-3 gap-x-5 lg:grid-cols-2 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] xl:p-8">
          <Input
            placeholder="e.g. 2019 Honda City VX"
            {...register("title")}
            error={!!errors.title}
            hint={errors.title?.message}
            label="Title"
            required
            id="title"
          />
          <Input
            placeholder="e.g. Honda"
            {...register("brand")}
            error={!!errors.brand}
            hint={errors.brand?.message}
            label="Brand"
            required
            id="brand"
          />
          <Input
            placeholder="e.g. City VX"
            {...register("model")}
            error={!!errors.model}
            hint={errors.model?.message}
            label="Model"
            required
            id="model"
          />
          <Select
            options={vehicleTypeOptions}
            placeholder="Select vehicle type"
            onChange={(v) =>
              setValue("vehicleType", v as Vehicle["vehicleType"], {
                shouldValidate: true,
              })
            }
            hint={errors.vehicleType?.message}
            label="Vehicle Type"
            required
            id="vehicleType"
            error={!!errors.vehicleType}
          />
          <Select
            options={fuelTypeOptions}
            placeholder="Select fuel type"
            onChange={(v) =>
              setValue("fuelType", v as Vehicle["fuelType"], {
                shouldValidate: true,
              })
            }
            hint={errors.fuelType?.message}
            label="Fuel Type"
            required
            id="fuelType"
            error={!!errors.fuelType}
          />
          <Select
            options={ownershipOptions}
            placeholder="Select ownership"
            onChange={(v) =>
              setValue("ownership", v as VehicleFormValues["ownership"], {
                shouldValidate: true,
              })
            }
            hint={errors.ownership?.message}
            label="Ownership"
            id="ownership"
            error={!!errors.ownership}
          />
          <Input
            type="number"
            placeholder="e.g. 2019"
            {...register("year")}
            error={!!errors.year}
            hint={errors.year?.message}
            id="year"
            label="Year"
            required
          />
          <Input
            type="number"
            placeholder="e.g. 850000"
            {...register("price")}
            error={!!errors.price}
            hint={errors.price?.message}
            id="price"
            label="Price"
            required
          />
          <Input
            type="number"
            placeholder="e.g. 25000"
            {...register("kmDriven")}
            error={!!errors.kmDriven}
            hint={errors.kmDriven?.message}
            id="kmDriven"
            label="KM Driven"
            required
          />
          <Input
            type="number"
            placeholder="e.g. 18"
            {...register("mileage")}
            error={!!errors.mileage}
            hint={errors.mileage?.message}
            id="mileage"
            label="Mileage (km/l)"
            required
          />
          <Select
            options={statusOptions}
            placeholder="Select status"
            onChange={(v) =>
              setValue("status", v as Vehicle["status"], {
                shouldValidate: true,
              })
            }
            hint={errors.status?.message}
            label="Status"
            required
            id="status"
            error={!!errors.status}
          />
        </div>
        <div className="rounded-2xl border border-gray-200 lg:col-span-2 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] xl:p-8">
          <DropzoneComponent
            onFilesSelected={(files) =>
              setValue("imagesFiles", files, { shouldValidate: true })
            }
            error={errors.imagesFiles?.message}
            title="Images (max 10)"
          />
        </div>
      </div>
      <div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex w-full items-center justify-center rounded-lg bg-brand-500 px-4 py-3 text-sm font-medium text-white shadow-theme-xs transition-colors hover:bg-brand-600 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
        >
          {isSubmitting ? "Creating..." : "Create Vehicle"}
        </button>
      </div>
    </form>
  );
}
