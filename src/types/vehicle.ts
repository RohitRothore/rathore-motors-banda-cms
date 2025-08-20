export interface Vehicle {
  brand: string;
  fuelType: "Petrol" | "Diesel" | "Electric" | "Hybrid" | "CNG";
  images: string[];
  kmDriven?: number;
  mileage?: number;
  model: string;
  ownership?: "First" | "Second" | "Third";
  price: number;
  status: "Available" | "Sold";
  title: string;
  vehicleType: "Car" | "Truck" | "Bike" | "SUV" | "Van";
  year: number;
  imagesFiles?: File[];
}