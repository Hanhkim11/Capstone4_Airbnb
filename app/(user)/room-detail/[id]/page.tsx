"use client";
import { apiRoom } from "@/app/api/rooms/apiRoom";
import { TRoom } from "@/app/types/typeRoom";
import { useParams } from "next/navigation";
import React, { ComponentType, ReactElement, useEffect, useState } from "react";
import {
  Typography,
  Image,
  Avatar,
  List,
  Divider,
  Descriptions,
  Card,
  Space,
  DatePicker,
  Button,
  Dropdown,
  notification,
  message,
} from "antd";
import type { NotificationArgsProps } from "antd";
import { IoPeopleCircleOutline } from "react-icons/io5";
import {
  FaBed,
  FaBath,
  FaWifi,
  FaTv,
  FaSnowflake,
  FaCar,
  FaSwimmingPool,
  FaTshirt,
  FaUtensils,
  FaHome,
  FaCrown,
  FaRegClock,
} from "react-icons/fa";
import { GiWashingMachine, GiBroom } from "react-icons/gi";
import { icons } from "antd/es/image/PreviewGroup";
import dayjs from "dayjs";
import useApp from "antd/es/app/useApp";
import { useAppSelector } from "@/app/redux/hooks";
import Comments from "@/components/Comments";

const { Title } = Typography;

const data = [
  {
    title: "Toàn bộ nhà",
    desc: "Bạn sẽ có  chung cư cao cấp cho riêng mình",
    icon: (
      <FaHome
        size={25}
        color="#FF385C
    "
      />
    ),
  },
  {
    title: "Vệ sinh tăng cường",
    desc: "Chủ nhà này cung cấp cam kết quy trình vệ sinh tăng cường 5 bước của airbnb.",
    icon: <GiBroom size={25} color="#FF385C" />,
  },
  {
    title: "Phong là chủ nhà siêu cấp",
    desc: " Chủ nhà siêu cấp là những người đã cam kết cung cấp dịch vụ xuất sắc cho khách.",
    icon: <FaCrown size={25} color="#FF385C" />,
  },
  {
    title: "Miễn phí hủy trong 48 giờ",
    desc: "",
    icon: <FaRegClock size={25} color="#FF385C" />,
  },
];

const { RangePicker } = DatePicker;

const RoomDetail = () => {
  const [roomDetail, setRoomDetail] = useState<TRoom | null>(null);

  const [dates, setDates] = useState<[string, string] | null>(null);
  const [guestCounts, setGuestCounts] = useState({
    adults: 0,
    children: 0,
    infants: 0,
    pets: 0,
  });

  const [api, contextHolder] = notification.useNotification();

  const param = useParams<{ id: string }>();
  console.log(param);

  const { userLogin } = useAppSelector((state) => state.user);
  console.log(userLogin);
  console.log(dates);

  useEffect(() => {
    if (param.id) {
      apiRoom
        .apiGetRoomById(param.id)
        .then((res) => {
          console.log(res);
          setRoomDetail(res);
        })
        .catch((error) => {
          console.error("Error fetching room details:", error);
        });
    }
  }, [param.id]);

  const guestMenu = (
    <div className="p-4 w-64 bg-gray-200 rounded-xl">
      <div className="flex justify-between items-center mb-2">
        <div>
          <div className="font-medium">Người lớn</div>
          <div className="text-xs text-gray-500">Từ 13 tuổi trở lên</div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            size="small"
            onClick={() =>
              setGuestCounts({
                ...guestCounts,
                adults: Math.max(guestCounts.adults - 1, 0),
              })
            }
          >
            -
          </Button>
          <span>{guestCounts.adults}</span>
          <Button
            size="small"
            onClick={() =>
              setGuestCounts({ ...guestCounts, adults: guestCounts.adults + 1 })
            }
          >
            +
          </Button>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <div>
          <div className="font-medium">Trẻ em</div>
          <div className="text-xs text-gray-500">Từ 2 - 12 tuổi</div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            size="small"
            onClick={() =>
              setGuestCounts({
                ...guestCounts,
                children: Math.max(guestCounts.children - 1, 0),
              })
            }
          >
            -
          </Button>
          <span>{guestCounts.children}</span>
          <Button
            size="small"
            onClick={() =>
              setGuestCounts({
                ...guestCounts,
                children: guestCounts.children + 1,
              })
            }
          >
            +
          </Button>
        </div>
      </div>
      <div className="flex justify-between items-center mb-2">
        <div>
          <div className="font-medium">Em bé</div>
          <div className="text-xs text-gray-500">Dưới 2 tuổi</div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            size="small"
            onClick={() =>
              setGuestCounts({
                ...guestCounts,
                infants: Math.max(guestCounts.infants - 1, 0),
              })
            }
          >
            -
          </Button>
          <span>{guestCounts.infants}</span>
          <Button
            size="small"
            onClick={() =>
              setGuestCounts({
                ...guestCounts,
                infants: guestCounts.infants + 1,
              })
            }
          >
            +
          </Button>
        </div>
      </div>
      <div className="flex justify-between items-center mb-2">
        <div>
          <div className="font-medium">Thú cưng</div>
          <div className="text-xs text-gray-500 underline">
            Bạn sẽ mang theo động vật phục vụ?
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            size="small"
            onClick={() =>
              setGuestCounts({
                ...guestCounts,
                pets: Math.max(guestCounts.pets - 1, 0),
              })
            }
          >
            -
          </Button>
          <span>{guestCounts.pets}</span>
          <Button
            size="small"
            onClick={() =>
              setGuestCounts({ ...guestCounts, pets: guestCounts.pets + 1 })
            }
          >
            +
          </Button>
        </div>
      </div>
    </div>
  );

  const renderIcon = (
    Icon: React.ElementType,
    text: string,
    value: number | undefined
  ) => {
    return (
      <div className="flex items-center text-nowrap gap-2">
        <Icon size={25} color="black" />
        {value} {text}
      </div>
    );
  };

  const renderAmenity = (Icon: React.ElementType, text: string) => {
    return (
      <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
        <Icon size={20} color="#1890ff" />
        <span className="text-sm font-medium">{text}</span>
      </div>
    );
  };

  const openNotification = (message: string, description: string) => {
    api.warning({
      message: message,
      description: description,
      placement: "top",
    });
  };

  const handleBookingRoom = () => {
    if (!userLogin) {
      openNotification(
        "Thông báo: Đặt phòng thất bại",
        "Vui lòng đăng nhập để đặt phòng"
      );
      return;
    }
    if (!dates) {
      openNotification(
        "Đặt phòng thất bại",
        "vui lòng chọn ngày đến và ngày đi"
      );
      return;
    }
    if (
      guestCounts.adults +
        guestCounts.children +
        guestCounts.infants +
        guestCounts.pets ===
      0
    ) {
      openNotification("Đặt phòng thất bại", "Vui lòng chọn ít nhất 1 khách");
      return;
    }

    const data = {
      id: 0,
      maPhong: Number(param.id),
      ngayDen: dayjs(dates?.[0]).format("YYYY-MM-DDTHH:mm:ss.SSS") + "Z",
      ngayDi: dayjs(dates?.[1]).format("YYYY-MM-DDTHH:mm:ss.SSS") + "Z",
      soLuongKhach:
        guestCounts.adults +
        guestCounts.children +
        guestCounts.infants +
        guestCounts.pets,
      maNguoiDung: userLogin.user.id,
    };
    console.log(data);
    apiRoom
      .apiBookingRoom(data)
      .then((res) => {
        console.log(res);
        api.success({
          message: "Đặt phòng thành công",
          description: "Bạn đã đặt phòng thành công",
          placement: "top",
          duration: 2,
        });
        setDates(null);
        setGuestCounts({ adults: 0, children: 0, infants: 0, pets: 0 });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="px-6">
      {contextHolder}
      <Title level={2}>{roomDetail ? roomDetail.tenPhong : "Loading..."}</Title>
      <div className="">
        <Image
          src={roomDetail?.hinhAnh as string}
          alt=""
          width="100%"
          height={500}
          className="object-cover "
        />
      </div>
      {/* info room */}
      <div className="info mt-5 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5">
        <div className="description col-span-1 md:col-span-3 lg:col-span-3">
          <Title level={3}>Chi Tiết phòng</Title>
          <div>
            {/* render room Icon */}
            <div className=" flex text-lg font-medium flex-wrap text-gray-500 gap-5 items-center">
              {renderIcon(IoPeopleCircleOutline, "khách", roomDetail?.khach)}
              {renderIcon(FaBed, "phòng ngủ", roomDetail?.phongNgu)}
              {renderIcon(FaBed, "Giường", roomDetail?.giuong)}
              {renderIcon(FaBath, "phòng tắm", roomDetail?.phongTam)}
            </div>
          </div>

          <Divider />

          <List
            itemLayout="horizontal"
            dataSource={data}
            renderItem={(item, index) => (
              <List.Item>
                <List.Item.Meta
                  avatar={item.icon}
                  title={<p className="font-medium">{item.title}</p>}
                  description={item.desc}
                />
              </List.Item>
            )}
          />
          <Divider />

          {/* render Amenity  */}
          <div className="mt-8">
            <Title level={3}>Nơi này có những gì cho bạn</Title>
            <div className="grid grid-cols-2 gap-4 mt-4 md:grid-cols-3 lg:grid-cols-4">
              {roomDetail?.mayGiat &&
                renderAmenity(GiWashingMachine, "Máy giặt")}
              {roomDetail?.banLa && renderAmenity(FaTshirt, "Bàn là")}
              {roomDetail?.tivi && renderAmenity(FaTv, "Tivi")}
              {roomDetail?.dieuHoa && renderAmenity(FaSnowflake, "Điều hòa ")}
              {roomDetail?.wifi && renderAmenity(FaWifi, "Wifi")}
              {roomDetail?.bep && renderAmenity(FaUtensils, "Bếp")}
              {roomDetail?.doXe && renderAmenity(FaCar, "Đỗ xe")}
              {roomDetail?.hoBoi && renderAmenity(FaSwimmingPool, "Hồ bơi")}
            </div>
          </div>
        </div>

        {/* Đặt phòng */}
        <div className="card-booking col-span-3 lg:col-span-1">
          <div className="card-booking-content">
            <div className="card">
              <Space className="!w-full" direction="vertical">
                <Card
                  className="shadow-lg"
                  title={
                    <>
                      <div className="text-xl font-medium text-gray-800 flex items-center">
                        {roomDetail?.giaTien + "$"}
                        <span className="text-sm text-gray-700">/đêm</span>
                      </div>
                    </>
                  }
                >
                  <div className="flex flex-col ">
                    <div className="flex justify-around mb-0.5">
                      <span className="font-medium">Ngày đến</span>
                      <span className="font-medium">Ngày đi</span>
                    </div>
                    <RangePicker
                      variant="borderless"
                      onChange={(_, dateStrings) =>
                        setDates(
                          Array.isArray(dateStrings)
                            ? (dateStrings as [string, string])
                            : null
                        )
                      }
                      placeholder={["Ngày đến", "Ngày đi"]}
                      className="p-0 text-sm mt-1 w-full cursor-pointer"
                      format="DD/MM/YYYY"
                      disabledDate={(current) =>
                        current && current < dayjs().startOf("day")
                      }
                    />
                  </div>
                  <Divider />
                  <Dropdown
                    className="hover:shadow-xl hover:bg-gray-50 duration-300 p-2 rounded-lg"
                    popupRender={() => guestMenu}
                    trigger={["click"]}
                  >
                    <div className="flex flex-col cursor-pointer min-w-[100px]">
                      <span className="font-medium">Khách</span>
                      <span className="text-gray-500 text-sm">{`${guestCounts.adults} người lớn, ${guestCounts.children} trẻ em, ${guestCounts.infants} trẻ sơ sinh, ${guestCounts.pets} thú cưng`}</span>
                    </div>
                  </Dropdown>
                  <Button
                    style={{ backgroundColor: "#FF385C", border: "none" }}
                    className="w-full mt-5 !p-5 !rounded-3xl !font-medium !text-2xl !text-white hover:!shadow-md hover:!shadow-red-400 !duration-400"
                    onClick={handleBookingRoom}
                  >
                    Đặt phòng
                  </Button>
                </Card>
              </Space>
            </div>
          </div>
        </div>
      </div>

      <Comments id={param.id} />
    </div>
  );
};

export default RoomDetail;
