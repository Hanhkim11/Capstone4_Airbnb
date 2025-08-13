'use client'
import React, { useCallback, useEffect, useState } from "react";
import roomStyle from "./rooms.module.css";
import { apiAdmin } from "@/app/api/apiAdmin/apiAdmin";
import { ToastContainer, toast } from "react-toastify";
import Link from "next/link";
import { TRoom } from "@/app/types/typeRoom";

// Component AlertMessage (để hiển thị thông báo)
const AlertMessage = ({ message, type = "error" }: { message: string | null, type: string }) => {
    if (!message) return null;
    const alertStyle = {
        padding: "10px",
        margin: "10px 0",
        border: `1px solid ${type === "error" ? "red" : "green"}`,
        color: type === "error" ? "red" : "green",
        backgroundColor: type === "error" ? "#ffebee" : "#e8f5e9",
        borderRadius: "4px",
        textAlign: "center",
    };
    return <div style={{ ...alertStyle, textAlign: "center" }}>{message}</div>;
};

// State ban đầu cho form
const initialFormState = {
    tenPhong: "",
    khach: 1,
    phongNgu: 0,
    giuong: 0,
    phongTam: 0,
    moTa: "",
    giaTien: 0,
    mayGiat: false,
    banLa: false,
    tivi: false,
    dieuHoa: false,
    wifi: false,
    bep: false,
    doXe: false,
    hoBoi: false,
    // banUi: false, // Kiểm tra nếu trùng với banLa
    maViTri: 0, // Nếu API yêu cầu số, khởi tạo là 0 hoặc null
    hinhAnh: "", // Giữ lại để hiển thị URL ảnh hiện tại khi edit
};

const AdminsRoomsPage = () => {
    const [rooms, setRooms] = useState<TRoom[]>([]);
    const [searchRoom, setSearchRoom] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [showForm, setShowForm] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editingRoomId, setEditingRoomId] = useState<number | null>(null);
    const [form, setForm] = useState(initialFormState);
    const [selectedFile, setSelectedFile] = useState<File | null>(null); // State cho file hình ảnh đã chọn
    const [imagePreview, setImagePreview] = useState<string | null>(null); // State cho preview hình ảnh

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const itemsPerPage = 10;

    const fetchRooms = useCallback(() => {
        setLoading(true);
        setError(null);
        apiAdmin.getAllRoomAdmin()
            .then((res) => {
                if (res && res.data && res.data.content && Array.isArray(res.data.content)) {
                    setRooms(res.data.content);
                } else if (res && res.data && Array.isArray(res.data)) {
                    setRooms(res.data);
                } else if (res && Array.isArray(res)) {
                    setRooms(res);
                } else {
                    console.error('Unexpected response structure:', res);
                    setError('Invalid response format');
                    setRooms([]);
                }
            })
            .catch((err) => {
                console.error("Lỗi khi tải danh sách phòng (component):", err);
                setError(err.message || "Lỗi khi tải danh sách phòng.");
                setRooms([]);
            })
            .finally(() => setLoading(false));
    }, []);

    useEffect(() => {
        fetchRooms();
    }, [fetchRooms]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (!file) {
            setSelectedFile(null);
            setImagePreview(null);
            setError("Vui lòng chọn ảnh!");
            return;
        }

        const validTypes = ["image/jpeg", "image/png", "image/jpg"];
        if (!validTypes.includes(file.type)) {
            setSelectedFile(null);
            setImagePreview(null);
            setError(
                `File không hợp lệ (${file.type}). Chỉ chấp nhận JPG, JPEG hoặc PNG`
            );
            return;
        }

        setSelectedFile(file);
        setError(null);

        const reader = new FileReader();
        reader.onloadend = () => {
            setImagePreview(reader.result as string);
        };
        reader.readAsDataURL(file);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        let processedValue: string | boolean | number = value;
        
        if (type === "number") {
            processedValue = value === "" ? 0 : parseFloat(value);
            if (isNaN(Number(processedValue))) processedValue = 0;
        } else if (type === "checkbox") {
            const target = e.target as HTMLInputElement;
            processedValue = target.checked;
        }
        setForm({ ...form, [name]: processedValue });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccessMessage(null);

        console.log("🧪 Kiểm tra định dạng file:", selectedFile?.type);

        if (
            selectedFile &&
            !["image/jpeg", "image/png", "image/jpg"].includes(selectedFile.type)
        ) {
            setError(
                `File không hợp lệ (${selectedFile.type}). Chỉ chấp nhận JPG, JPEG hoặc PNG`
            );
            setLoading(false);
            return;
        }

        try {
            const payload = {
                ...form,
                khach: parseInt(form.khach.toString(), 10),
                phongNgu: parseInt(form.phongNgu.toString(), 10),
                giuong: parseInt(form.giuong.toString(), 10),
                phongTam: parseInt(form.phongTam.toString(), 10),
                giaTien: parseInt(form.giaTien.toString(), 10),
                maViTri: parseInt(form.maViTri.toString(), 10),
            } as any;
            delete payload.hinhAnh;

            let roomResult;

            if (isEditing && editingRoomId) {
                // Cập nhật phòng
                const updated = await apiAdmin.updateRoomService(editingRoomId, payload);
                roomResult = updated;

                // Upload ảnh nếu có
                if (selectedFile) {
                    try {
                        await apiAdmin.uploadRoomImageService(editingRoomId, selectedFile);
                        toast.success("Cập nhật ảnh thành công");
                    } catch (uploadErr) {
                        console.error("Lỗi upload ảnh:", uploadErr);
                        toast.warning(
                            "Cập nhật phòng thành công nhưng upload ảnh thất bại"
                        );
                    }
                }

                toast.success("Cập nhật phòng thành công!");
            } else {
                // Thêm phòng
                const created = await apiAdmin.addRoomService(payload);
                roomResult = created.content;

                // Upload ảnh nếu có
                if (selectedFile) {
                    try {
                        await apiAdmin.uploadRoomImageService(roomResult.id, selectedFile);
                        toast.success("Upload ảnh thành công");
                    } catch (uploadErr) {
                        console.warn("Lỗi upload ảnh:", uploadErr);
                        toast.warning("Thêm phòng thành công nhưng upload ảnh thất bại");
                    }
                }

                toast.success("Thêm phòng thành công!");
            }

            await fetchRooms();
            resetFormAndFile();
        } catch (error: any) {
            console.error("Lỗi chính:", error);
            toast.error(error.message || "Có lỗi xảy ra.");
        } finally {
            setLoading(false);
        }
    };

    const resetFormAndFile = () => {
        setForm(initialFormState);
        setIsEditing(false);
        setEditingRoomId(null);
        setShowForm(false);
        setSelectedFile(null);
        setImagePreview(null);
        setError(null);
        setSuccessMessage(null);
    };

    const handleDelete = async (id: number) => {
        if (window.confirm("Bạn có chắc muốn xóa phòng này không?")) {
            setLoading(true);
            try {
                await apiAdmin.deleteRoomService(id);
                setRooms((prevRooms) => prevRooms.filter((room) => room.id !== id));
                toast.success("Xóa phòng thành công!");
                fetchRooms();
            } catch (err: any) {
                console.error("Lỗi khi xóa phòng (component):", err);
                toast.error(err.message || "Lỗi khi xóa phòng.");
            } finally {
                setLoading(false);
            }
        }
    };

    const handleEdit = (room: TRoom) => {
        const formFields = {
            tenPhong: room.tenPhong || "",
            khach: room.khach || 0,
            phongNgu: room.phongNgu || 0,
            giuong: room.giuong || 0,
            phongTam: room.phongTam || 0,
            moTa: room.moTa || "",
            giaTien: room.giaTien || 0,
            mayGiat: room.mayGiat || false,
            banLa: room.banLa || false,
            tivi: room.tivi || false,
            dieuHoa: room.dieuHoa || false,
            wifi: room.wifi || false,
            bep: room.bep || false,
            doXe: room.doXe || false,
            hoBoi: room.hoBoi || false,
            maViTri: room.maViTri || 0,
            hinhAnh: room.hinhAnh || "", // Để hiển thị ảnh hiện tại
        };
        setForm(formFields);
        setIsEditing(true);
        setEditingRoomId(room.id);
        setShowForm(true);
        setSelectedFile(null); // Reset file đã chọn khi mở form edit
        setImagePreview(room.hinhAnh || null); // Hiển thị ảnh hiện tại của phòng làm preview
        setError(null);
        setSuccessMessage(null);
    };

    // filteredRoom, totalPages, startIndex, currentRooms, changePage (giữ nguyên)
    const filteredRoom = rooms?.filter((room) =>
        room?.tenPhong?.toLowerCase().includes(searchRoom.toLowerCase())
    );
    const totalPages = Math.ceil(filteredRoom?.length / itemsPerPage);

    const startIndex = (currentPage - 1) * itemsPerPage;

    const currentRooms = filteredRoom?.slice(
        startIndex,
        startIndex + itemsPerPage
    );
    const changePage = (newPage: number) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    useEffect(() => {
        if (error || successMessage) {
            const timer = setTimeout(() => {
                setError(null);
                setSuccessMessage(null);
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [error, successMessage]);

    return (
        <div className={roomStyle.roomlist_body}>
            <div className={roomStyle.roomlist_main}>
                <div className={roomStyle.roomlist_header}>
                    <h1 className={roomStyle.roomlist_h1}>Quản lý Phòng</h1>
                    <Link href="/admin" className={roomStyle.roomlist_home}>
                        <i className="fa fa-home"></i>
                    </Link>
                </div>

                <button
                    className={roomStyle.roomlist_btn_add}
                    onClick={() => {
                        resetFormAndFile();
                        setShowForm(true);
                    }}
                >
                    Thêm phòng mới
                </button>

                <div className={roomStyle.roomlist_search_box}>
                    <input
                        className={roomStyle.roomlist_input}
                        type="text"
                        placeholder="Tìm kiếm phòng..."
                        value={searchRoom}
                        onChange={(e) => setSearchRoom(e.target.value)}
                    />
                </div>

                {loading && (
                    <div className="loading-container">
                        <div className="loading-spinner"></div>
                        <p>Đang tải...</p>
                    </div>
                )}

                {error && <AlertMessage message={error} type="error" />}
                {successMessage && <AlertMessage message={successMessage} type="success" />}

                <table className={roomStyle.roomlist_table}>
                    <thead>
                        <tr>
                            <th>Mã phòng</th>
                            <th>Tên phòng</th>
                            <th>Khách</th>
                            <th>Phòng ngủ</th>
                            <th>Giường</th>
                            <th>Phòng tắm</th>
                            <th>Giá tiền</th>
                            <th>Hình ảnh</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentRooms && currentRooms.length > 0 ? (
                            currentRooms.map((room) => (
                                <tr key={room.id}>
                                    <td>{room.id}</td>
                                    <td>{room.tenPhong}</td>
                                    <td>{room.khach}</td>
                                    <td>{room.phongNgu}</td>
                                    <td>{room.giuong}</td>
                                    <td>{room.phongTam}</td>
                                    <td>${room.giaTien}</td>
                                    <td>
                                        {room.hinhAnh ? (
                                            <img
                                                src={room.hinhAnh}
                                                alt={room.tenPhong}
                                                className={roomStyle.roomlist_image}
                                            />
                                        ) : (
                                            <span>Không có ảnh</span>
                                        )}
                                    </td>
                                    <td>
                                        <button
                                            className={roomStyle.roomlist_a_edit}
                                            onClick={() => handleEdit(room)}
                                        >
                                            <i className="fas fa-edit"></i>
                                        </button>
                                        <button
                                            className={roomStyle.roomlist_a_delete}
                                            onClick={() => handleDelete(room.id)}
                                        >
                                            <i className="fas fa-trash-alt"></i>
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={9} className="text-center">
                                    {loading ? "Đang tải..." : "Không có phòng nào."}
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>

                {totalPages > 1 && (
                    <div className={roomStyle.roomlist_pagination}>
                        <button
                            onClick={() => changePage(currentPage - 1)}
                            disabled={currentPage === 1}
                            className={roomStyle.roomlist_button}
                        >
                            «
                        </button>
                        {Array.from({ length: totalPages }, (_, i) => (
                            <button
                                key={i}
                                onClick={() => changePage(i + 1)}
                                className={`${roomStyle.roomlist_button} ${
                                    currentPage === i + 1 ? roomStyle.active : ""
                                }`}
                            >
                                {i + 1}
                            </button>
                        ))}
                        <button
                            onClick={() => changePage(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className={roomStyle.roomlist_button}
                        >
                            »
                        </button>
                    </div>
                )}
            </div>

            {showForm && (
                <div className={roomStyle.roomlist_modal}>
                    <div className={roomStyle.roomlist_modal_content}>
                        <h2 className={roomStyle.roomlist_modal_title}>
                            {isEditing ? "Cập nhật phòng" : "Thêm phòng mới"}
                        </h2>
                        <form onSubmit={handleSubmit} className={roomStyle.roomlist_form}>
                            <div className={roomStyle.roomlist_form_group}>
                                <label htmlFor="tenPhong" className={roomStyle.roomlist_label}>
                                    Tên phòng:
                                </label>
                                <input
                                    type="text"
                                    id="tenPhong"
                                    name="tenPhong"
                                    value={form.tenPhong}
                                    onChange={handleChange}
                                    className={roomStyle.roomlist_input}
                                    required
                                />
                            </div>

                            <div className={roomStyle.roomlist_form_group}>
                                <label htmlFor="khach" className={roomStyle.roomlist_label}>
                                    Số khách:
                                </label>
                                <input
                                    type="number"
                                    id="khach"
                                    name="khach"
                                    value={form.khach}
                                    onChange={handleChange}
                                    className={roomStyle.roomlist_input}
                                    min="1"
                                    required
                                />
                            </div>

                            <div className={roomStyle.roomlist_form_group}>
                                <label htmlFor="phongNgu" className={roomStyle.roomlist_label}>
                                    Phòng ngủ:
                                </label>
                                <input
                                    type="number"
                                    id="phongNgu"
                                    name="phongNgu"
                                    value={form.phongNgu}
                                    onChange={handleChange}
                                    className={roomStyle.roomlist_input}
                                    min="0"
                                    required
                                />
                            </div>

                            <div className={roomStyle.roomlist_form_group}>
                                <label htmlFor="giuong" className={roomStyle.roomlist_label}>
                                    Giường:
                                </label>
                                <input
                                    type="number"
                                    id="giuong"
                                    name="giuong"
                                    value={form.giuong}
                                    onChange={handleChange}
                                    className={roomStyle.roomlist_input}
                                    min="0"
                                    required
                                />
                            </div>

                            <div className={roomStyle.roomlist_form_group}>
                                <label htmlFor="phongTam" className={roomStyle.roomlist_label}>
                                    Phòng tắm:
                                </label>
                                <input
                                    type="number"
                                    id="phongTam"
                                    name="phongTam"
                                    value={form.phongTam}
                                    onChange={handleChange}
                                    className={roomStyle.roomlist_input}
                                    min="0"
                                    required
                                />
                            </div>

                            <div className={roomStyle.roomlist_form_group}>
                                <label htmlFor="giaTien" className={roomStyle.roomlist_label}>
                                    Giá tiền:
                                </label>
                                <input
                                    type="number"
                                    id="giaTien"
                                    name="giaTien"
                                    value={form.giaTien}
                                    onChange={handleChange}
                                    className={roomStyle.roomlist_input}
                                    min="0"
                                    required
                                />
                            </div>

                            <div className={roomStyle.roomlist_form_group}>
                                <label htmlFor="maViTri" className={roomStyle.roomlist_label}>
                                    Mã vị trí:
                                </label>
                                <input
                                    type="number"
                                    id="maViTri"
                                    name="maViTri"
                                    value={form.maViTri}
                                    onChange={handleChange}
                                    className={roomStyle.roomlist_input}
                                    min="1"
                                    required
                                />
                            </div>

                            <div className={roomStyle.roomlist_form_group}>
                                <label htmlFor="moTa" className={roomStyle.roomlist_label}>
                                    Mô tả:
                                </label>
                                <textarea
                                    id="moTa"
                                    name="moTa"
                                    value={form.moTa}
                                    onChange={handleChange}
                                    className={roomStyle.roomlist_textarea}
                                    rows={3}
                                />
                            </div>

                            <div className={roomStyle.roomlist_form_group}>
                                <label htmlFor="hinhAnhFile" className={roomStyle.roomlist_label}>
                                    Hình ảnh phòng:
                                </label>
                                <input
                                    type="file"
                                    id="hinhAnhFile"
                                    className={roomStyle.roomlist_input_file}
                                    accept="image/png, image/jpeg, image/jpg"
                                    onChange={handleFileChange}
                                />
                                {imagePreview && (
                                    <div className="image-preview-container">
                                        <img src={imagePreview} alt="Xem trước" />
                                    </div>
                                )}
                                {selectedFile && (
                                    <p className="selected-file-name">
                                        Đã chọn: {selectedFile.name}
                                    </p>
                                )}
                            </div>

                            <div className={roomStyle.roomlist_form_group}>
                                <label className={roomStyle.roomlist_label}>Tiện ích:</label>
                                <div className={roomStyle.roomlist_checkbox_group}>
                                    <label>
                                        <input
                                            type="checkbox"
                                            name="mayGiat"
                                            checked={form.mayGiat}
                                            onChange={handleChange}
                                        />
                                        Máy giặt
                                    </label>
                                    <label>
                                        <input
                                            type="checkbox"
                                            name="banLa"
                                            checked={form.banLa}
                                            onChange={handleChange}
                                        />
                                        Bàn là
                                    </label>
                                    <label>
                                        <input
                                            type="checkbox"
                                            name="tivi"
                                            checked={form.tivi}
                                            onChange={handleChange}
                                        />
                                        TV
                                    </label>
                                    <label>
                                        <input
                                            type="checkbox"
                                            name="dieuHoa"
                                            checked={form.dieuHoa}
                                            onChange={handleChange}
                                        />
                                        Điều hòa
                                    </label>
                                    <label>
                                        <input
                                            type="checkbox"
                                            name="wifi"
                                            checked={form.wifi}
                                            onChange={handleChange}
                                        />
                                        WiFi
                                    </label>
                                    <label>
                                        <input
                                            type="checkbox"
                                            name="bep"
                                            checked={form.bep}
                                            onChange={handleChange}
                                        />
                                        Bếp
                                    </label>
                                    <label>
                                        <input
                                            type="checkbox"
                                            name="doXe"
                                            checked={form.doXe}
                                            onChange={handleChange}
                                        />
                                        Đỗ xe
                                    </label>
                                    <label>
                                        <input
                                            type="checkbox"
                                            name="hoBoi"
                                            checked={form.hoBoi}
                                            onChange={handleChange}
                                        />
                                        Hồ bơi
                                    </label>
                                </div>
                            </div>

                            <div className={roomStyle.roomlist_form_actions}>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className={roomStyle.roomlist_btn_submit}
                                >
                                    {loading ? "Đang xử lý..." : isEditing ? "Cập nhật" : "Thêm"}
                                </button>
                                <button
                                    type="button"
                                    onClick={resetFormAndFile}
                                    className={roomStyle.roomlist_btn_cancel}
                                >
                                    Hủy
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <ToastContainer position="top-right" autoClose={3000} />
        </div>
    );
};

export default AdminsRoomsPage;
