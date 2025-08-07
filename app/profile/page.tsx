'use client'
import React, { useEffect, useState } from 'react'
import { useAppSelector } from '../redux/hooks'
import { Button, Card } from 'antd';
import Image from 'next/image';
import { apiRoom } from '../api/rooms/apiRoom';
import { TBookingRoom } from '../types/typeBookingRoom';
import RenderListBookingRoom from '@/components/RenderListBookingRoom';

const ProfilePage = () => {
  const { userLogin } = useAppSelector(state => state.user)
  const [bookingRoom, setBookingRoom] = useState<TBookingRoom[]>([]);

  console.log(userLogin)

  useEffect(() => {
    if (userLogin) {
      apiRoom.apiGetRoomByMaNguoiDung(userLogin?.user.id.toString())
        .then((reponse) => {
          console.log(reponse)
          setBookingRoom(reponse);
        })
    }
  }, [userLogin])

  const avatarUrl: string | undefined = userLogin?.user?.avatar || undefined;

  const name = `${userLogin?.user.name} đã xác nhận`

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
      <div className='user-profile flex justify-center col-span-1'>
        <Card
          title={
            <>
              <div className='flex flex-col items-center p-3'>
                <Image
                  src={avatarUrl as string}
                  alt=""
                  width={150}
                  height={150}
                  className='rounded-full mb-3' />
                <Button type='link' className='underline !text-lg'>Cập nhập ảnh</Button>
              </div>

              <div className='flex items-center'>
                <Image
                  src="https://cdn-icons-png.flaticon.com/512/5972/5972778.png"
                  alt=""
                  width={50}
                  height={50}
                  quality={100}
                />
                <span className='text-lg font-medium'>Xác minh danh tính</span>
              </div>

            </>
          }
          variant="outlined" style={{ width: 300 }}>
          <p className='text-xl font-medium mb-3'>{name.toLocaleUpperCase()}</p>
          <p className='text-sm text-gray-500'>Email: {userLogin?.user.email}</p>
          <p className='text-sm text-gray-500'>Số điện thoại: {userLogin?.user.phone}</p>

        </Card>
      </div>

      <div className='booking-room col-span-2'>
        <p className='font-medium text-xl'>Xin chào, tôi là {userLogin?.user.name}</p>
        <p className='text-sm text-gray-500'>Bắt đầu tham gia vào 2023</p>
        <Button type='link' className='underline !text-lg !p-0 !text-black !font-medium'>Chỉnh sửa hồ sơ</Button>

        <div className='list-room mt-4'>
          <h1 className='text-2xl font-medium'>Phòng đã thuê</h1>

          {bookingRoom.length > 0 ? <RenderListBookingRoom ListBookingRoom={bookingRoom} /> : (
            <p className='text-sm text-gray-500'>Bạn chưa thuê phòng nào</p>
          )}
        </div>
      </div>

    </div>
  )
}

export default ProfilePage