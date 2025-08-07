"use client";

import React, { useState } from "react";
import { Input, DatePicker, Dropdown, Button, Space, Divider } from "antd";
import { SearchOutlined, UserOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import type { RangePickerProps } from "antd/es/date-picker";
import { useAppSelector } from "@/app/redux/hooks";
import { useRouter } from "next/navigation";

const { RangePicker } = DatePicker;

const CustomSearch = () => {
  const [location, setLocation] = useState<number | null>(null);
  const [locationName, setLocationName] = useState<string>("");
  const [dates, setDates] = useState<[string, string] | null>(null);
  const [guestCounts, setGuestCounts] = useState({
    adults: 0,
    children: 0,
    infants: 0,
    pets: 0,
  });

  const router = useRouter();

  const { locations } = useAppSelector((state) => state.location);

  const [isOpen, setIsOpen] = useState(false);

  const handlerSearch = () => {
    if (location) {
      router.push(`/location/${location}`);
    }
  };

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

  return (
    <div
      className="rounded-full border border-gray-100 shadow-md px-6 py-2 flex items-center justify-between gap-4 "
      style={{ width: "60%" }}
    >
      <div className="flex gap-6 items-center text-sm w-full">
        {/* Địa điểm */}
        <div className="flex flex-col min-w-[180px]">
          <span className="font-medium">Địa điểm</span>
          <Input
            onFocus={() => {
              setIsOpen(true);
            }}
            onPressEnter={handlerSearch}
            variant="borderless"
            placeholder="Tìm kiếm điểm đến"
            value={locationName}
            onChange={(e) => setLocationName(e.target.value)}
            className="p-0 h-auto text-sm mt-1"
          />
          {isOpen && (
            <div
              className="absolute top-38 w-56 bg-white  border border-gray-300 rounded-lg shadow-lg h-[300px] overflow-y-auto"
              tabIndex={0}
              onMouseDown={(e) => e.preventDefault()}
              onBlur={() => setIsOpen(false)}
            >
              {locations.map((location, index) => (
                <div
                  onMouseDown={(e) => {
                    e.preventDefault();
                    setLocation(location.id);
                    setIsOpen(false);
                    setLocationName(location.tenViTri);
                  }}
                  onClick={() => {
                    console.log(location);
                  }}
                  key={location.id}
                  className="cursor-pointer p-2 hover:bg-gray-100"
                >
                  {location.tenViTri}
                </div>
              ))}
              {/* Render search results here */}
            </div>
          )}
        </div>
        <Divider type="vertical" className="h-10" />
        {/* Nhận phòng & Trả phòng */}
        <div className="flex flex-col min-w-[200px]">
          <div className="flex justify-between w-56 mb-0.5">
            <span className="font-medium">Nhận phòng</span>
            <span className="font-medium">Trả phòng</span>
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
            placeholder={["Thêm ngày", "Thêm ngày"]}
            className="p-0 text-sm mt-1 w-full"
            format="DD/MM/YYYY"
            disabledDate={(current) =>
              current && current < dayjs().startOf("day")
            }
          />
        </div>
        <Divider type="vertical" className="h-10" />
        {/* Khách */}
        <Dropdown popupRender={() => guestMenu} trigger={["click"]}>
          <div className="flex flex-col cursor-pointer min-w-[100px]">
            <span className="font-medium">Khách</span>
            <span className="text-gray-500 text-sm">Thêm khách</span>
          </div>
        </Dropdown>
      </div>
      <Button
        onClick={handlerSearch}
        shape="circle"
        type="primary"
        icon={<SearchOutlined />}
        style={{ background: "#FF385C", border: "none" }}
      />
    </div>
  );
};

export default CustomSearch;
