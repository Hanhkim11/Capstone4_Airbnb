import { api } from "./apiUtils";

export const userService = {
  // Lấy thông tin chi tiết user
  getUserDetails: async (userId: string) => {
    try {
      const response = await api.get(`/users/${userId}`);
      return response;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Không thể lấy thông tin user");
    }
  },

  // Cập nhật thông tin user
  updateUserDetails: async (userId: string, userData: any) => {
    try {
      const response = await api.put(`/users/${userId}`, userData);
      return response;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Cập nhật thông tin thất bại");
    }
  },

  // Upload avatar
  uploadAvatar: async (formData: FormData) => {
    try {
      const response = await api.post("/users/upload-avatar", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Upload avatar thất bại");
    }
  },

  // Lấy danh sách phòng đã đặt theo user
  getBookedRoomsByUser: async (userId: string) => {
    try {
      const response = await api.get(`/dat-phong/lay-theo-nguoi-dung/${userId}`);
      return response;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Không thể lấy danh sách phòng đã đặt");
    }
  },

  // Lấy thông tin chi tiết phòng
  getRoomById: async (roomId: string) => {
    try {
      const response = await api.get(`/phong-thue/${roomId}`);
      return response;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Không thể lấy thông tin phòng");
    }
  },
};

