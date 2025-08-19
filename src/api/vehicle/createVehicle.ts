import { CREATE_VEHICLE } from "@/constant/apiRouter/VEHICLE";
import { Vehicle } from "@/types/vehicle";
import { api, ApiResult } from "@/utils/apiHelper";

export const createVehicle = async (
  vehicleData: Vehicle
): Promise<ApiResult<Vehicle>> => {
  const response = await api<Vehicle>(CREATE_VEHICLE.path, {
    method: CREATE_VEHICLE.method,
    body: vehicleData,
    authenticate: true,
    isMultipartFormData: true,
  });
  return response;
};