'use client'
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { apiAdmin } from "../../api/apiAdmin/apiAdmin";
import { TUser } from "../../types/typeUser";
import { useAppSelector } from "../../redux/hooks";
import { useRouter } from "next/navigation";

const AdminDashboard = () => {
  const [listUser, setListUser] = useState<TUser[]>([])
  const router = useRouter();

  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return;
    
    apiAdmin.apiGetAllUser(1, 10, "")
      .then((res) => {
        setListUser(res.data)
      }).catch((err) => {
        console.log(err)
      })
  }, [])

  const handlerEditUser = () => {
    // Handle edit user
  }

  return (
      <div className="flex min-h-screen bg-[#f7f6f4]">
        {/* Main content */}
        <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between bg-[#3b2322] text-white px-8 py-4">
          <button 
            onClick={() => router.push("/")}
            className="text-white hover:text-gray-300"
          >
            ← Back to Home
          </button>
          <div className="flex items-center gap-2">
            <Image src="/R.jpeg" alt="avatar" width={40} height={40} className="rounded-full object-cover" />
            <span className="font-bold">ADMIN</span>
          </div>
        </div>
        
        {/* Navigation */}
        <div className="flex justify-center gap-4 p-4 bg-white shadow-sm">
          <button
            onClick={() => router.push("/manager-users")}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Manage Users
          </button>
          <button
            onClick={() => router.push("/manager-location")}
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
          >
            Manage Locations
          </button>
          <button
            onClick={() => router.push("/manager-rooms")}
            className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
          >
            Manage Rooms
          </button>
          <button
            onClick={() => router.push("/manager-booking-room")}
            className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
          >
            Manage Bookings
          </button>
        </div>

        {/* Content */}
        <div className="p-8 flex-1">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-[#3b2322]">Admin Dashboard</h1>
            <button className="bg-[#ff8686] text-white px-4 py-2 rounded font-semibold hover:bg-[#ff5c5c]">+ Thêm người dùng</button>
          </div>
          <input
            type="text"
            placeholder="Nhập từ khóa tìm kiếm..."
            className="w-full mb-4 px-4 py-2 border rounded focus:outline-none"
          />
          <div className="overflow-x-auto rounded-lg shadow bg-white">
            <table className="min-w-full text-left">
              <thead className="bg-[#f7f6f4]">
                <tr>
                  <th className="py-3 px-4">Mã ID</th>
                  <th className="py-3 px-4">Username</th>
                  <th className="py-3 px-4">Birthday</th>
                  <th className="py-3 px-4">Email</th>
                  <th className="py-3 px-4">Người dùng</th>
                  <th className="py-3 px-4">Hành động</th>
                </tr>
              </thead>
              <tbody>
                {listUser.map((user) => {
                  return <tr key={user.id} className="border-t hover:bg-gray-50">
                    <td className="py-3 px-4 font-semibold">{user.id}</td>
                    <td className="py-3 px-4 flex items-center gap-2">
                      {user.avatar ? (
                        <Image src={user.avatar} alt={user.name} width={36} height={36} className="rounded-full object-cover" />
                      ) : (
                        <span className="w-9 h-9 bg-gray-200 rounded-full flex items-center justify-center text-2xl">👤</span>
                      )}
                      <span className="font-bold uppercase">{user.name}</span>
                    </td>
                    <td className="py-3 px-4">{user.birthday}</td>
                    <td className="py-3 px-4 underline text-blue-700">{user.email}</td>
                    <td className="py-3 px-4 font-bold" style={{ color: user.role === "ADMIN" ? "#ff0000" : "#009900" }}>{user.role}</td>
                    <td className="py-3 px-4 flex gap-3 text-xl">
                      <button onClick={handlerEditUser} title="Sửa"><span>✏️</span></button>
                      <button title="Xóa"><span>🗑️</span></button>
                    </td>
                  </tr>
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      </div>
  );
};

export default AdminDashboard;
