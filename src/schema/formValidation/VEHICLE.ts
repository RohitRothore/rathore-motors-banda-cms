import * as yup from "yup";

export const VEHICLE_SCHEMA = yup
  .object({
    title: yup
      .string()
      .trim()
      .required("Title is required"),
    brand: yup
      .string()
      .trim()
      .required("Brand is required"),
    model: yup
      .string()
      .trim()
      .required("Model is required"),
    vehicleType: yup
      .mixed<"Car" | "Truck" | "Bike" | "SUV" | "Van">()
      .oneOf(["Car", "Truck", "Bike", "SUV", "Van"], "Select a vehicle type")
      .required("Vehicle type is required"),
    fuelType: yup
      .mixed<"Petrol" | "Diesel" | "Electric" | "Hybrid" | "CNG">()
      .oneOf(["Petrol", "Diesel", "Electric", "Hybrid", "CNG"], "Select a fuel type")
      .required("Fuel type is required"),
    ownership: yup
      .mixed<"First" | "Second" | "Third">()
      .oneOf(["First", "Second", "Third"])
      .optional(),
    year: yup
      .number()
      .typeError("Year must be a number")
      .integer("Year must be an integer")
      .min(1900, "Year seems too old")
      .max(new Date().getFullYear(), "Year cannot be in the future")
      .required("Year is required"),
    price: yup
      .number()
      .typeError("Price must be a number")
      .min(0, "Price cannot be negative")
      .required("Price is required"),
    kmDriven: yup
      .number()
      .typeError("KM driven must be a number")
      .min(0, "KM driven cannot be negative")
      .optional(),
    mileage: yup
      .number()
      .typeError("Mileage must be a number")
      .min(0, "Mileage cannot be negative")
      .optional(),
    status: yup
      .mixed<"Available" | "Sold">()
      .oneOf(["Available", "Sold"], "Select status")
      .required("Status is required"),
    images: yup.array().of(yup.string().url("Image URL must be valid")).optional(),
    imagesFiles: yup
      .mixed<File[]>()
      .test("file-count", "At least one image is required", function (value) {
        const hasFiles = value && (value as File[]).length > 0;
        const images = this.parent.images;
        const hasImages = images && images.length > 0;
        return hasFiles || hasImages;
      })
      .optional(),
  })
  .required();

export type VehicleFormValues = yup.InferType<typeof VEHICLE_SCHEMA>;