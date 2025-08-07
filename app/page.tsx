"use client";

import Headers from "@/components/headers/Headers";
import Image from "next/image";
import { useEffect, useState } from "react";
import { apiLocations } from "./api/location/apiLocation";
import { useRouter } from "next/navigation";
import { TypeLocation, TypeLocationPagination } from "./types/typeLocationPagination";
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import { setLocations } from "./redux/slices/location.slice";

export default function Home() {
  const [listLocations, setListLocations] = useState<TypeLocationPagination | null>(null);
  const router = useRouter();

  const dispatch = useAppDispatch()

  useEffect(() => {
    apiLocations.apiLocationPaginations(1, 50)
      .then((res) => {
        setListLocations(res);
        console.log("response từ api, đẩy lên redux")
        dispatch(setLocations(res.data))
      })
  }, [])

  const handlerNavigate = (id: number) => {
    router.push(`location/${id}`)
  }

  const renderLocation = () => {
    return listLocations?.data.map((item: TypeLocation) => {
      return (
        <div
          onClick={() => handlerNavigate(item.id)}
          key={item.id}
          className="cursor-pointer hover:scale-102 transition-all duration-300">
          <img
            src={item.hinhAnh.length > 0 ? item.hinhAnh : '/vinh-Ha-Long.jpg'}
            alt={item.tenViTri}
            style={{ width: '200px', height: '200px' }}
            className="w-full h-full object-cover rounded-2xl"
          />
          <div className="font-medium text-black p-2">
            {item.tenViTri} / {item.tinhThanh}
          </div>
        </div>
      );
    })
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-5">
      {renderLocation()}
    </div>
  );
}
