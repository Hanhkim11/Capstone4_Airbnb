"use client";
import { apiRoom } from "@/app/api/rooms/apiRoom";
import { TRoom } from "@/app/types/typeRoom";
import { Spin } from "antd";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const Location = () => {
  const param = useParams<{ id: string }>();
  const [listRooms, setListRooms] = useState<TRoom[]>([]);

  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    apiRoom
      .apiGetRoomByIdLocation(param.id)
      .then((res) => {
        console.log(res);
        setListRooms(res);
        setLoading(false);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [param.id]);

  const renderRooms = () => {
    return listRooms.map((item: TRoom) => {
      return (
        <div key={item.id} className="p-1 rounded-lg">
          <img
            src={item.hinhAnh}
            alt={item.tenPhong}
            className="w-full h-48 object-cover rounded-lg mb-2"
          />
          <div className="flex flex-col justify-between h-1/3">
            <div>
              <h3 className="text-lg font-semibold">{item.tenPhong}</h3>
              <p>
                {item.moTa.length > 50
                  ? item.moTa.slice(0, 50) + "..."
                  : item.moTa}
              </p>
            </div>
            <p className="text-green-600 font-bold">${item.giaTien}/night</p>
          </div>
        </div>
      );
    });
  };

  return (
    <div style={{ width: "100%" }} className="flex justify-between">
      {/* render list room */}
      <div
        style={{ width: "49%" }}
        className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        {loading ? <Spin size="large" /> : renderRooms()}
      </div>
      {/* render map */}
      <div style={{ width: "49%" }} className="w-1/2">
        {/* Map component can be add here */}

        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.023778781234!2d105.78014061540257!3d21.03065329313045!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135abc123456789%3A0x1234567890abcdef!2zVHLGsOG7nW5nIMSQ4buTbmcgUGhp!5e0!3m2!1svi!2s!4v1711135084321"
          className="w-full border-0 rounded-xl"
          style={{ height: "80vh" }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </div>
  );
};

export default Location;
