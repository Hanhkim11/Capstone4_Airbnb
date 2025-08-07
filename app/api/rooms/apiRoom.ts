import { TBookingRoom } from "@/app/types/typeBookingRoom";
import { api } from "../apiUtils";

const apiGetRoomByIdLocation = async (id: string) => {
  try {
    const response = await api.get(
      `phong-thue/lay-phong-theo-vi-tri?maViTri=${id}`
    );
    return response.data.content;
  } catch (error) {
    throw error;
  }
};
const apiGetRoomByMaNguoiDung = async (maNguoiDung: string) => {
  try {
    const response = await api.get(
      `dat-phong/lay-theo-nguoi-dung/${maNguoiDung}`
    );
    return response.data.content;
  } catch (error) {
    throw error;
  }
};

const apiGetRoomById = async (id: string) => {
  try {
    const response = await api.get(`phong-thue/${id}`);
    return response.data.content;
  } catch (error) {
    throw error;
  }
};

const apiBookingRoom = async (data: TBookingRoom) => {
  try {
    const response = await api.post(`dat-phong`, data);
    return response.data.content;
  } catch (error) {
    throw error;
  }
};

export const apiRoom = {
  apiGetRoomByIdLocation,
  apiGetRoomByMaNguoiDung,
  apiGetRoomById,
  apiBookingRoom,
};
