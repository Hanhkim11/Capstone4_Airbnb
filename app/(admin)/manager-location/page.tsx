'use client'
import React, { useEffect, useState } from "react";
import { apiAdmin } from "../../api/apiAdmin/apiAdmin";
import { TypeLocation } from "../../types/typeLocationPagination";
import { useAppSelector } from "../../redux/hooks";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";

interface LocationForm {
  tenViTri: string;
  tinhThanh: string;
  quocGia: string;
  hinhAnh: string;
}

const AdminLocationPage = () => {
  const [listLocation, setListLocation] = useState<TypeLocation[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingLocationId, setEditingLocationId] = useState<number | null>(null);
  const [form, setForm] = useState<LocationForm>({
    tenViTri: "",
    tinhThanh: "",
    quocGia: "",
    hinhAnh: "",
  });
  const itemsPerPage = 10;

  const { isLoading: globalLoading } = useAppSelector(state => state.loading);

  useEffect(() => {
    fetchLocations();
  }, [currentPage, searchTerm]);

  const fetchLocations = async () => {
    setIsLoading(true);
    try {
      const res = await apiAdmin.apiGetAllLocations(currentPage, itemsPerPage, searchTerm);
      setListLocation(res.data);
      setTotalPages(Math.ceil(res.totalRow / itemsPerPage));
    } catch (err: any) {
      console.error("Lỗi khi tải danh sách vị trí:", err);
      toast.error("Không thể tải danh sách vị trí!");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (locationId: number) => {
    if (window.confirm("Bạn có chắc muốn xóa vị trí này?")) {
      try {
        await apiAdmin.deleteLocationService(locationId);
        toast.success("Xóa vị trí thành công!");
        fetchLocations(); // Refresh the list
      } catch (error: any) {
        toast.error("Xóa vị trí thất bại!");
        console.error(error);
      }
    }
  };

  const handleEdit = (location: TypeLocation) => {
    setForm({
      tenViTri: location.tenViTri,
      tinhThanh: location.tinhThanh,
      quocGia: location.quocGia,
      hinhAnh: location.hinhAnh,
    });
    setEditingLocationId(location.id);
    setIsEditing(true);
    setShowForm(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (isEditing && editingLocationId) {
        await apiAdmin.updateLocationService(editingLocationId, form);
        toast.success("Cập nhật vị trí thành công!");
      } else {
        await apiAdmin.addLocationService(form);
        toast.success("Thêm vị trí thành công!");
      }
      
      // Reset form and close modal
      setShowForm(false);
      setIsEditing(false);
      setEditingLocationId(null);
      setForm({
        tenViTri: "",
        tinhThanh: "",
        quocGia: "",
        hinhAnh: "",
      });
      
      // Refresh the list
      fetchLocations();
    } catch (error: any) {
      toast.error(isEditing ? "Cập nhật vị trí thất bại!" : "Thêm vị trí thất bại!");
      console.error(error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page when searching
  };

  const changePage = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const openAddForm = () => {
    setIsEditing(false);
    setEditingLocationId(null);
    setForm({
      tenViTri: "",
      tinhThanh: "",
      quocGia: "",
      hinhAnh: "",
    });
    setShowForm(true);
  };

  return (
    <div className="flex min-h-screen bg-[#f7f6f4]">
      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between bg-[#3b2322] text-white px-8 py-4">
          <button className="md:hidden text-2xl mr-4">☰</button>
          <div></div>
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
              <span className="text-gray-600 font-bold">A</span>
            </div>
            <span className="font-bold">Admin</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-8 flex-1">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-[#3b2322]">Quản lý Vị trí</h1>
            <button 
              onClick={openAddForm}
              className="bg-[#ff8686] text-white px-4 py-2 rounded font-semibold hover:bg-[#ff5c5c] transition-colors"
            >
              + Thêm vị trí
            </button>
          </div>

          {/* Search */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="Nhập từ khóa tìm kiếm..."
              value={searchTerm}
              onChange={handleSearch}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Loading state */}
          {(isLoading || globalLoading) && (
            <div className="flex justify-center items-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          )}

          {/* Locations table */}
          {!isLoading && !globalLoading && (
            <div className="overflow-x-auto rounded-lg shadow bg-white">
              <table className="min-w-full text-left">
                <thead className="bg-[#f7f6f4]">
                  <tr>
                    <th className="py-3 px-4 font-semibold">Mã ID</th>
                    <th className="py-3 px-4 font-semibold">Hình ảnh</th>
                    <th className="py-3 px-4 font-semibold">Tên vị trí</th>
                    <th className="py-3 px-4 font-semibold">Tỉnh thành</th>
                    <th className="py-3 px-4 font-semibold">Quốc gia</th>
                    <th className="py-3 px-4 font-semibold">Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  {listLocation.length > 0 ? (
                    listLocation.map((location) => (
                      <tr key={location.id} className="border-t hover:bg-gray-50 transition-colors">
                        <td className="py-3 px-4 font-semibold">{location.id}</td>
                        <td className="py-3 px-4">
                          <img 
                            src={location.hinhAnh || "/R.jpeg"} 
                            alt={location.tenViTri} 
                            className="w-16 h-16 rounded object-cover"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = "/R.jpeg";
                            }}
                          />
                        </td>
                        <td className="py-3 px-4 font-bold">{location.tenViTri}</td>
                        <td className="py-3 px-4">{location.tinhThanh}</td>
                        <td className="py-3 px-4">{location.quocGia}</td>
                        <td className="py-3 px-4 flex gap-3 text-xl">
                          <button 
                            onClick={() => handleEdit(location)}
                            className="hover:text-blue-600 transition-colors"
                            title="Sửa"
                          >
                            ✏️
                          </button>
                          <button 
                            onClick={() => handleDelete(location.id)}
                            className="hover:text-red-600 transition-colors"
                            title="Xóa"
                          >
                            🗑️
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="py-8 text-center text-gray-500">
                        {searchTerm ? "Không tìm thấy vị trí phù hợp." : "Chưa có vị trí nào."}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-6">
              <button
                onClick={() => changePage(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-2 border rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                «
              </button>
              
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`px-3 py-2 border rounded hover:bg-gray-100 ${
                    currentPage === i + 1 
                      ? "bg-blue-600 text-white border-blue-600" 
                      : ""
                  }`}
                >
                  {i + 1}
                </button>
              ))}
              
              <button
                onClick={() => changePage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-2 border rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                »
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Add/Edit Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-lg">
            <h2 className="text-xl font-bold mb-4">
              {isEditing ? "CẬP NHẬT VỊ TRÍ" : "THÊM VỊ TRÍ MỚI"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Tên vị trí"
                className="w-full p-2 border rounded"
                name="tenViTri"
                value={form.tenViTri}
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                placeholder="Tỉnh thành"
                className="w-full p-2 border rounded"
                name="tinhThanh"
                value={form.tinhThanh}
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                placeholder="Quốc gia"
                className="w-full p-2 border rounded"
                name="quocGia"
                value={form.quocGia}
                onChange={handleInputChange}
                required
              />
              <input
                type="url"
                placeholder="URL hình ảnh"
                className="w-full p-2 border rounded"
                name="hinhAnh"
                value={form.hinhAnh}
                onChange={handleInputChange}
                required
              />
              <div className="flex justify-end gap-2">
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  {isEditing ? "Cập nhật" : "Thêm"}
                </button>
                <button
                  type="button"
                  className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
                  onClick={() => {
                    setShowForm(false);
                    setIsEditing(false);
                    setEditingLocationId(null);
                    setForm({
                      tenViTri: "",
                      tinhThanh: "",
                      quocGia: "",
                      hinhAnh: "",
                    });
                  }}
                >
                  Hủy
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
};

export default AdminLocationPage;