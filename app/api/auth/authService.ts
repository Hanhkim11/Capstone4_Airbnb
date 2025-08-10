import { api } from "../apiUtils";

interface LoginData {
  email: string;
  password: string;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
  phone: string;
  birthday: string;
  gender: boolean;
  role: string;
}

const CYBER_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA4MSIsIkhldEhhblN0cmluZyI6IjI4LzExLzIwMjUiLCJIZXRIYW5UaW1lIjoiMTc2NDI4ODAwMDAwMCIsIm5iZiI6MTczNTM0NDAwMCwiZXhwIjoxNzY0NDYwODAwfQ.Vl0ntLG6G7ajYZQonTAwyAmHVk9GLbkXalVz4BbqmLk";

export const authService = {
  // Đăng nhập
  login: async (loginData: LoginData) => {
    try {
      const response = await api.post("/auth/signin", loginData, {
        headers: {
          tokenCybersoft: CYBER_TOKEN,
        },
      });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Đăng nhập thất bại");
    }
  },

  // Đăng ký
  register: async (registerData: RegisterData) => {
    try {
      const response = await api.post("/auth/signup", registerData, {
        headers: {
          tokenCybersoft: CYBER_TOKEN,
        },
      });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Đăng ký thất bại");
    }
  },

  // Lấy thông tin user hiện tại
  getCurrentUser: async () => {
    try {
      const response = await api.get("/auth/profile");
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Không thể lấy thông tin user");
    }
  },

  // Cập nhật thông tin user
  updateProfile: async (userData: Partial<RegisterData>) => {
    try {
      const response = await api.put("/auth/profile", userData);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Cập nhật thông tin thất bại");
    }
  },

  // Đăng xuất
  logout: () => {
    // Xóa token và user info từ localStorage
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  },
}; 