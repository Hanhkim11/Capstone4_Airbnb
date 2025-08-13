'use client'
import { apiRoom } from '@/app/api/rooms/apiRoom'
import { TBookingRoom } from '@/app/types/typeBookingRoom'
import { TRoom } from '@/app/types/typeRoom'
import React, { useEffect, useState } from 'react'

interface Props {
    ListBookingRoom: TBookingRoom[]
}

const RenderListBookingRoom = ({ ListBookingRoom }: Props) => {
    const [listRoomBookingDetails, setListRoomBookingDetails] = useState<TRoom[]>([]);

    const fetchAllRoomDetails = async () => {
        const promiseList = ListBookingRoom.map((booking) => {
            return apiRoom.apiGetRoomById(booking.maPhong.toString())
        })
        const results = await Promise.allSettled(promiseList)

        const fulfilledValues = results
            .filter(
                (r): r is PromiseFulfilledResult<TRoom> => r.status === 'fulfilled'
            )
            .map(r => r.value);
        setListRoomBookingDetails(fulfilledValues);
    }

    useEffect(() => {

        fetchAllRoomDetails()
    }, [ListBookingRoom])

    return (
        <div>RenderListBookingRoom</div>
    )
}

export default RenderListBookingRoom