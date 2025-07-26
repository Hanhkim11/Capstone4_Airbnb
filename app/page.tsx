"use client";
import Headers from "@/components/headers/Headers";
import Image from "next/image";
import { useEffect, useState } from "react";
import { apiLocations } from "./api/location/apiLocation";
import { useRouter } from "next/navigation";
import {
  TypeLocation,
  TypeLocationPagination,
} from "./types/typeLocationPagination";
import { useAppDispatch } from "./redux/hooks";
import { setLocations } from "./redux/slices/location.slice";

export default function Home() {
  const [listLocation, setListLocation] =
    useState<TypeLocationPagination | null>(null);

  const router = useRouter();

  const dispatch = useAppDispatch();

  useEffect(() => {
    apiLocations.apiLocationPaginations(1, 50).then((res) => {
      setListLocation(res);
      dispatch(setLocations(res));
    });
  }, []);

  const handlerNavigate = (id: number) => {
    router.push(`location/${id}`);
  };

  const renderLocation = () => {
    return listLocation?.data.map((item: TypeLocation) => {
      return (
        <div
          onClick={() => {
            handlerNavigate(item.id);
          }}
          key={item.id}
          className="cursor-pointer hover:scale-105 transition-all duration-300"
        >
          <img
            src={item.hinhAnh.length > 0 ? item.hinhAnh : "/R.jpeg"}
            alt={item.tenViTri}
            className="w-full h-full object-cover rounded-2xl"
            style={{ width: "200px", height: "200px" }}
          />

          <div className="font-medium text-black p-2">
            {item.tenViTri}/{item.tinhThanh}
          </div>
        </div>
      );
    });
  };
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-5">
      {renderLocation()}
    </div>
  );
}
