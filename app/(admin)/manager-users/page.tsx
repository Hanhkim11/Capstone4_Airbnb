'use client'
import React, { useEffect, useState } from "react";
import { apiAdmin } from "../../api/apiAdmin/apiAdmin";
import { TUser } from "../../types/typeUser";
import { useAppSelector } from "../../redux/hooks";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";

const AdminUsersPage = () => {
  const [listUser, setListUser] = useState<TUser[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const itemsPerPage = 10;

  const { isLoading: globalLoading } = useAppSelector(state => state.loading);

  useEffect(() => {
    fetchUsers();
  }, [currentPage, searchTerm]);

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const res = await apiAdmin.apiGetAllUser(currentPage, itemsPerPage, searchTerm);
      if (res && res.content && Array.isArray(res.content)) {
        setListUser(res.content);
        setTotalPages(Math.ceil(res.totalRow / itemsPerPage));
      } else if (res && Array.isArray(res)) {
        setListUser(res);
        setTotalPages(1);
      } else {
        console.error('Unexpected response structure:', res);
        toast.error("Invalid response format!");
      }
    } catch (err: any) {
      console.error("Lỗi khi tải danh sách người dùng:", err);
      toast.error("Không thể tải danh sách người dùng!");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (userId: number) => {
    if (window.confirm("Bạn có chắc muốn xóa người dùng này?")) {
      try {
        await apiAdmin.deleteUserService(userId);
        toast.success("Xóa người dùng thành công!");
        fetchUsers(); // Refresh the list
      } catch (error: any) {
        toast.error("Xóa người dùng thất bại!");
        console.error(error);
      }
    }
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
            <h1 className="text-3xl font-bold text-[#3b2322]">Quản lý Người dùng</h1>
            <Link 
              href="/admin/users/id"
              className="bg-[#ff8686] text-white px-4 py-2 rounded font-semibold hover:bg-[#ff5c5c] transition-colors"
            >
              + Thêm người dùng
            </Link>
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

          {/* Users table */}
          {!isLoading && !globalLoading && (
            <div className="overflow-x-auto rounded-lg shadow bg-white">
              <table className="min-w-full text-left">
                <thead className="bg-[#f7f6f4]">
                  <tr>
                    <th className="py-3 px-4 font-semibold">Mã ID</th>
                    <th className="py-3 px-4 font-semibold">Thông tin</th>
                    <th className="py-3 px-4 font-semibold">Email</th>
                    <th className="py-3 px-4 font-semibold">Số điện thoại</th>
                    <th className="py-3 px-4 font-semibold">Vai trò</th>
                    <th className="py-3 px-4 font-semibold">Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  {listUser.length > 0 ? (
                    listUser.map((user) => (
                      <tr key={user.id} className="border-t hover:bg-gray-50 transition-colors">
                        <td className="py-3 px-4 font-semibold">{user.id}</td>
                        <td className="py-3 px-4 flex items-center gap-2">
                          {user.avatar ? (
                            <img 
                              src={user.avatar} 
                              alt={user.name} 
                              className="w-9 h-9 rounded-full object-cover"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.src = "https://via.placeholder.com/36";
                              }}
                            />
                          ) : (
                            <div className="w-9 h-9 bg-gray-200 rounded-full flex items-center justify-center text-sm font-bold">
                              {user.name?.charAt(0)?.toUpperCase() || "U"}
                            </div>
                          )}
                          <div>
                            <div className="font-bold">{user.name}</div>
                            <div className="text-sm text-gray-500">@{user.email}</div>
                          </div>
                        </td>
                        <td className="py-3 px-4 underline text-blue-700">{user.email}</td>
                        <td className="py-3 px-4">{user.phone || "N/A"}</td>
                        <td className="py-3 px-4">
                          <span 
                            className={`px-2 py-1 rounded text-xs font-bold ${
                              user.role === "ADMIN" 
                                ? "bg-red-100 text-red-800" 
                                : "bg-green-100 text-green-800"
                            }`}
                          >
                            {user.role}
                          </span>
                        </td>
                        <td className="py-3 px-4 flex gap-3 text-xl">
                          <Link 
                            href={`/admin/users/id?edit=${user.id}`}
                            className="hover:text-blue-600 transition-colors"
                            title="Sửa"
                          >
                            ✏️
                          </Link>
                          <button 
                            onClick={() => handleDelete(user.id)}
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
                        {searchTerm ? "Không tìm thấy người dùng phù hợp." : "Chưa có người dùng nào."}
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

      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
};

export default AdminUsersPage;
