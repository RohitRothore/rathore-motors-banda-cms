import { GET_VEHICLE_DETAILS } from "@/constant/apiRouter/VEHICLE";
import { Vehicle } from "@/types/vehicle";
import { api, ApiResult } from "@/utils/apiHelper";

export const getVehicleDetails = async (
  id: string
): Promise<ApiResult<Vehicle>> => {
  const response = await api<Vehicle>(GET_VEHICLE_DETAILS.path.replace(":id", id), {
    authenticate: true,
  });
  return response;
};