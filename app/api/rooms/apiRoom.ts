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
export const apiRoom = {
  apiGetRoomByIdLocation,
};
