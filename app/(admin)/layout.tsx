import Sidebar from "@/components/sidebar/Sidebar";
import React from "react";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className='flex h-screen'>
            {/* Sidebar bên trái kéo dài toàn bộ màn hình */}
            <div className='w-64 h-full bg-blue-900'>
                <Sidebar />
            </div>
            {/* Nội dung chính */}
            <div className='flex-grow p-4 overflow-auto'>
                {children}
            </div>
        </div>
    )
}
export default AdminLayout