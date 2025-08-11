import { api } from "../apiUtils";

const apiLogin = async (email: string, password: string) => {
  try {
    const response = await api.post("auth/signin", { email, password });
    return response.data.content;
  } catch (error) {
    console.error("Login failed:", error);
  }
};
export const apiUsers = {
  apiLogin,
};
