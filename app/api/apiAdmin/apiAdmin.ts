import { api } from "../apiUtils"

const apiGetAllUser = async (pageIndex: number, pageSize: number, keyword: string) => {
    try {
        const res = await api.get(`users/phan-trang-tim-kiem?pageIndex=${pageIndex}&pageSize=${pageSize}&keyword=${keyword}`)
        return res.data.content
    } catch (error) {
        throw error
    }
}

const deleteUserService = async (id: number) => {
    try {
        const res = await api.delete(`users?id=${id}`)
        return res.data
    } catch (error) {
        throw error
    }
}

const updateUserService = async (id: number, userData: any) => {
    try {
        const res = await api.put(`users/${id}`, userData)
        return res.data
    } catch (error) {
        throw error
    }
}

const addUserService = async (userData: any) => {
    try {
        const res = await api.post(`users`, userData)
        return res.data
    } catch (error) {
        throw error
    }
}

// Location Services
const apiGetAllLocations = async (pageIndex: number, pageSize: number, keyword: string) => {
    try {
        const res = await api.get(`vi-tri/phan-trang-tim-kiem?pageIndex=${pageIndex}&pageSize=${pageSize}&keyword=${keyword}`)
        return res.data.content
    } catch (error) {
        throw error
    }
}

const deleteLocationService = async (id: number) => {
    try {
        const res = await api.delete(`vi-tri?id=${id}`)
        return res.data
    } catch (error) {
        throw error
    }
}

const updateLocationService = async (id: number, locationData: any) => {
    try {
        const res = await api.put(`vi-tri/${id}`, locationData)
        return res.data
    } catch (error) {
        throw error
    }
}

const addLocationService = async (locationData: any) => {
    try {
        const res = await api.post(`vi-tri`, locationData)
        return res.data
    } catch (error) {
        throw error
    }
}

// Room Services
const getAllRoomAdmin = () => {
    return api.get("phong-thue")
        .catch((err: any) => {
            console.log(err)
            throw err.response?.data || new Error("Không thể tải danh sách phòng.");
        });
};

const addRoomService = async (roomData: any) => {
    try {
        const res = await api.post("phong-thue", roomData)
        return res.data
    } catch (error) {
        throw error
    }
}

const updateRoomService = async (id: number, roomData: any) => {
    try {
        const res = await api.put(`phong-thue/${id}`, roomData)
        return res.data
    } catch (error) {
        throw error
    }
}

const deleteRoomService = async (id: number) => {
    try {
        const res = await api.delete(`phong-thue?id=${id}`)
        return res.data
    } catch (error) {
        throw error
    }
}

/**
 * 🆕 API: Upload hình ảnh phòng
 * @param {string | number} roomId - mã phòng (API Swagger ghi là string, nhưng number cũng thường được chấp nhận)
 * @param {File} file - file hình ảnh (.jpg/.png)
 */
const uploadRoomImageService = async (roomId: string | number, file: File) => {

    const validTypes = ["image/jpeg", "image/png", "image/jpg"];
    console.log("File được chọn:", file);
    console.log("Loại file:", file.type);

    if (!validTypes.includes(file.type)) {
        throw new Error(`File không hợp lệ (${file.type}). Chỉ chấp nhận JPG/PNG`);
    }

    const formData = new FormData();
    formData.append("formFile", file); // <-- kiểm tra lại nếu backend yêu cầu key khác

    try {
        const response = await api.post(`rooms/upload-hinh-phong?maPhong=${roomId}`, formData);

        if (!response.data) {
            throw new Error("Không nhận được phản hồi từ server");
        }

        return response.data;
    } catch (error: any) {
        console.error("Chi tiết lỗi upload:", {
            status: error.response?.status,
            data: error.response?.data,
            config: error.config,
        });
        throw new Error(error.response?.data?.message || "Lỗi khi upload ảnh");
    }
};

// Reservation Services
const getReservationService = async () => {
    try {
        const res = await api.get("dat-phong")
        return res.data
    } catch (error) {
        throw error
    }
}

const addReservationService = async (reservationData: any) => {
    try {
        const res = await api.post("dat-phong", reservationData)
        return res.data
    } catch (error) {
        throw error
    }
}

const updateReservationService = async (id: number, reservationData: any) => {
    try {
        const res = await api.put(`dat-phong/${id}`, reservationData)
        return res.data
    } catch (error) {
        throw error
    }
}

const deleteReservationService = async (id: number) => {
    try {
        const res = await api.delete(`dat-phong?id=${id}`)
        return res.data
    } catch (error) {
        throw error
    }
}

export const apiAdmin = {
    apiGetAllUser,
    deleteUserService,
    updateUserService,
    addUserService,
    apiGetAllLocations,
    deleteLocationService,
    updateLocationService,
    addLocationService,
    getAllRoomAdmin,
    addRoomService,
    updateRoomService,
    deleteRoomService,
    uploadRoomImageService,
    getReservationService,
    addReservationService,
    updateReservationService,
    deleteReservationService
}
