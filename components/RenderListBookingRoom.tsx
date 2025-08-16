"use client";
import { apiRoom } from "@/app/api/rooms/apiRoom";
import { TBookingRoom } from "@/app/types/typeBookingRoom";
import { TRoom, TRoomBooking } from "@/app/types/typeRoom";
import React, { useEffect, useState } from "react";
import {
  DollarCircleFilled,
  HomeOutlined,
  LikeOutlined,
  MessageOutlined,
  StarOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar, List, Space } from "antd";
import { FaBed } from "react-icons/fa";

const data = Array.from({ length: 23 }).map((_, i) => ({
  href: "https://ant.design",
  title: `ant design part ${i}`,
  avatar: `https://api.dicebear.com/7.x/miniavs/svg?seed=${i}`,
  description:
    "Ant Design, a design language for background applications, is refined by Ant UED Team.",
  content:
    "We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.",
}));

const IconText = ({ icon, text }: { icon: React.FC; text: string }) => (
  <Space className="text-lg font-medium " style={{ color: "#FF385C" }}>
    {React.createElement(icon)}
    {text}
  </Space>
);

interface Props {
  ListBookingRoom: TBookingRoom[];
}

const RenderListBookingRoom = ({ ListBookingRoom }: Props) => {
  const [listRoomBookingDetails, setListRoomBookingDetails] = useState<
    TRoomBooking[]
  >([]);

  const fetchAllRoomDetails = async () => {
    const promiseList = ListBookingRoom.map((booking) => {
      return apiRoom.apiGetRoomById(booking.maPhong.toString());
    });
    const results = await Promise.allSettled(promiseList);

    const fulfilledValues = results
      .filter(
        (r): r is PromiseFulfilledResult<TRoom> => r.status === "fulfilled"
      )
      .map((r) => {
        const booking = ListBookingRoom.find(
          (booking) => booking.maPhong === r.value.id
        );
        return {
          ...r.value,
          soLuongNguoiDat: booking ? booking.soLuongKhach : 0,
        };
      });
    setListRoomBookingDetails(fulfilledValues);
  };

  useEffect(() => {
    fetchAllRoomDetails();
  }, [ListBookingRoom]);

  return (
    <div>
      <List
        itemLayout="vertical"
        size="large"
        pagination={{
          onChange: (page) => {
            console.log(page);
          },
          pageSize: 3,
        }}
        dataSource={listRoomBookingDetails}
        renderItem={(item) => (
          <List.Item
            className="!p-0 mt-5"
            key={item.id}
            actions={[
              <IconText
                icon={DollarCircleFilled}
                text={item.giaTien.toString() + "$"}
                key="list-vertical-star-o"
              />,
              <IconText
                icon={UserOutlined}
                text={item.soLuongNguoiDat.toString()}
                key="list-vertical-like-o"
              />,
              <IconText
                icon={FaBed}
                text={item.phongNgu.toString()}
                key="list-vertical-message"
              />,
            ]}
            extra={<img width={272} alt="logo" src={item.hinhAnh} />}
          >
            <List.Item.Meta
              title={<p className="text-lg font-medium">{item.tenPhong}</p>}
              description={item.moTa}
            />
          </List.Item>
        )}
      />
    </div>
  );
};

export default RenderListBookingRoom;
