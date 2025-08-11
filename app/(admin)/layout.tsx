import React from "react";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className='min-h-screen bg-[#f7f6f4]'>
            {children}
        </div>
    )
}
export default AdminLayout