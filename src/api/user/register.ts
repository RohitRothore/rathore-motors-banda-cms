import { User } from "@/types/user";

import { api, ApiResult } from "@/utils/apiHelper";

export const registerUser = async (userData: User): Promise<ApiResult<User>> => {
  const response = await api<User>("/api/auth/register", {
    method: "POST",
    body: userData,
  });
  return response;
};
