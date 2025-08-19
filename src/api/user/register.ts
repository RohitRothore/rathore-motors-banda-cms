import { SIGNUP } from "@/constant/apiRouter/USER";
import { User } from "@/types/user";

import { api, ApiResult } from "@/utils/apiHelper";

export const registerUser = async (userData: User): Promise<ApiResult<User>> => {
  const response = await api<User>(SIGNUP.path, {
    method: SIGNUP.method,
    body: userData,
  });
  return response;
};
