"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "sonner";

import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import Select from "@/components/form/Select";
import FileInput from "@/components/form/input/FileInput";

import { VEHICLE_SCHEMA, VehicleFormValues } from "@/schema/formValidation/VEHICLE";
import { Vehicle } from "@/types/vehicle";
import { createVehicle } from "@/api/vehicle/createVehicle";

type VehicleFormData = VehicleFormValues;

const vehicleTypeOptions = [
  { value: "Car", label: "Car" },
  { value: "Truck", label: "Truck" },
  { value: "Bike", label: "Bike" },
  { value: "SUV", label: "SUV" },
  { value: "Van", label: "Van" },
];

const fuelTypeOptions = [
  { value: "Petrol", label: "Petrol" },
  { value: "Diesel", label: "Diesel" },
  { value: "Electric", label: "Electric" },
  { value: "Hybrid", label: "Hybrid" },
  { value: "CNG", label: "CNG" },
];

const ownershipOptions = [
  { value: "First", label: "First" },
  { value: "Second", label: "Second" },
  { value: "Third", label: "Third" },
];

const statusOptions = [
  { value: "Available", label: "Available" },
  { value: "Sold", label: "Sold" },
];

export default function VehicleForm() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<VehicleFormData>({
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
      imagesInput: "",
      imagesFiles: undefined,
    },
  });

const onSubmit: Parameters<typeof handleSubmit>[0] = async (data) => {
  const images = (data.imagesInput || "")
    .split(",")
    .map((s: string) => s.trim())
    .filter(Boolean);

  const vehiclePayload: Vehicle & { imagesFiles?: FileList } = {
    title: data.title,
    brand: data.brand,
    model: data.model,
    vehicleType: data.vehicleType,
    fuelType: data.fuelType,
    ownership: data.ownership,
    year: Number(data.year),
    price: Number(data.price),
    kmDriven: data.kmDriven ? Number(data.kmDriven) : undefined,
    mileage: data.mileage ? Number(data.mileage) : undefined,
    status: data.status,
    images: data.imagesFiles,
    // imagesFiles: data.imagesFiles,
  };

  console.log("🚀 ~ onSubmit ~ vehiclePayload:", vehiclePayload)
  const res = await createVehicle(vehiclePayload);
  if (res.success) {
    toast.success("Vehicle created successfully");
  } else {
    toast.error(res.error?.message || "Failed to create vehicle");
  }
};


  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" >
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <Label>
            Title<span className="text-error-500">*</span>
          </Label>
          <Input placeholder="e.g. 2019 Honda City VX" {...register("title")} error={!!errors.title} />
          {errors.title && <p className="mt-1 text-sm text-red-500">{errors.title.message}</p>}
        </div>

        <div>
          <Label>
            Brand<span className="text-error-500">*</span>
          </Label>
          <Input placeholder="e.g. Honda" {...register("brand")} error={!!errors.brand} />
          {errors.brand && <p className="mt-1 text-sm text-red-500">{errors.brand.message}</p>}
        </div>

        <div>
          <Label>
            Model<span className="text-error-500">*</span>
          </Label>
          <Input placeholder="e.g. City VX" {...register("model")} error={!!errors.model} />
          {errors.model && <p className="mt-1 text-sm text-red-500">{errors.model.message}</p>}
        </div>

        <div>
          <Label>
            Vehicle Type<span className="text-error-500">*</span>
          </Label>
          <Select
            options={vehicleTypeOptions}
            placeholder="Select vehicle type"
            onChange={(v) => setValue("vehicleType", v as Vehicle["vehicleType"], { shouldValidate: true })}
          />
          {errors.vehicleType && <p className="mt-1 text-sm text-red-500">{String(errors.vehicleType.message)}</p>}
        </div>

        <div>
          <Label>
            Fuel Type<span className="text-error-500">*</span>
          </Label>
          <Select
            options={fuelTypeOptions}
            placeholder="Select fuel type"
            onChange={(v) => setValue("fuelType", v as Vehicle["fuelType"], { shouldValidate: true })}
          />
          {errors.fuelType && <p className="mt-1 text-sm text-red-500">{String(errors.fuelType.message)}</p>}
        </div>

        <div>
          <Label>Ownership</Label>
          <Select
            options={ownershipOptions}
            placeholder="Select ownership"
            onChange={(v) => setValue("ownership", v as VehicleFormData["ownership"], { shouldValidate: true })}
          />
          {errors.ownership && <p className="mt-1 text-sm text-red-500">{String(errors.ownership.message)}</p>}
        </div>

        <div>
          <Label>
            Year<span className="text-error-500">*</span>
          </Label>
          <Input type="number" placeholder="e.g. 2019" {...register("year")} error={!!errors.year} />
          {errors.year && <p className="mt-1 text-sm text-red-500">{errors.year.message as string}</p>}
        </div>

        <div>
          <Label>
            Price<span className="text-error-500">*</span>
          </Label>
          <Input type="number" placeholder="e.g. 850000" {...register("price")} error={!!errors.price} />
          {errors.price && <p className="mt-1 text-sm text-red-500">{errors.price.message as string}</p>}
        </div>

        <div>
          <Label>KM Driven</Label>
          <Input type="number" placeholder="e.g. 25000" {...register("kmDriven")} error={!!errors.kmDriven} />
          {errors.kmDriven && <p className="mt-1 text-sm text-red-500">{errors.kmDriven.message as string}</p>}
        </div>

        <div>
          <Label>Mileage (km/l)</Label>
          <Input type="number" placeholder="e.g. 18" {...register("mileage")} error={!!errors.mileage} />
          {errors.mileage && <p className="mt-1 text-sm text-red-500">{errors.mileage.message as string}</p>}
        </div>

        <div>
          <Label>
            Status<span className="text-error-500">*</span>
          </Label>
          <Select
            options={statusOptions}
            placeholder="Select status"
            onChange={(v) => setValue("status", v as Vehicle["status"], { shouldValidate: true })}
          />
          {errors.status && <p className="mt-1 text-sm text-red-500">{String(errors.status.message)}</p>}
        </div>

        <div className="sm:col-span-2">
          <Label>Images (max 10)</Label>
          <FileInput className="" onChange={(e) => setValue("imagesFiles", e.target.files as FileList)} />
          <p className="mt-1 text-xs text-gray-500">Only images up to 5MB each. JPG, PNG, WEBP, AVIF.</p>
        </div>

        <div className="sm:col-span-2">
          <Label>Image URLs (optional, comma separated)</Label>
          <Input placeholder="https://..., https://..." {...register("imagesInput")} error={!!errors.imagesInput} />
          {errors.imagesInput && (
            <p className="mt-1 text-sm text-red-500">{errors.imagesInput.message as string}</p>
          )}
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


