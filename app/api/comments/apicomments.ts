import { TCommentPost } from "@/app/types/typeComments";
import { api } from "../apiUtils";

const apiGetComments = async () => {
  try {
    const response = await api.get(`binh-luan`);
    return response.data.content;
  } catch (error) {
    throw error;
  }
};

const apiGetCommentsByRoomId = async (id: string) => {
  try {
    const response = await api.get(`binh-luan/lay-binh-luan-theo-phong/${id}`);
    return response.data.content;
  } catch (error) {
    throw error;
  }
};

const apiPostComment = async (data: TCommentPost) => {
  try {
    const response = await api.post(`binh-luan`, data);
    return response.data.content;
  } catch (error) {
    throw error;
  }
};

export const apiComments = {
  apiGetComments,
  apiGetCommentsByRoomId,
  apiPostComment,
};
