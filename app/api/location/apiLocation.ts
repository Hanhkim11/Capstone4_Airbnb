import { api } from "../apiUtils";

const apiLocationPaginations = async (pageIndex: number, pageSize: number, keyword?: string) => {
    try {
        const response = await api.get(`vi-tri/phan-trang-tim-kiem?pageIndex=${pageIndex}&pageSize=${pageSize}${keyword ? `&keyword=${keyword}` : ""}`);

        return response.data.content;
    } catch (error) {
        console.error("Error fetching location paginations:", error);
        throw error;
    }
}

export const apiLocations = {
    apiLocationPaginations,
}