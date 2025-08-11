import { TRegister } from "@/app/types/typeRegister";
import { api } from "../apiUtils";

export const apiRegister = async (data: TRegister) => {
  try {
    const response = await api.post(`auth/signup`, data);
    console.log(response);
    return response.data.content;
  } catch (error) {
    throw error;
  }
};
