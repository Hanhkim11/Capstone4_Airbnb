"use client";
import { Poppins } from "next/font/google";
import Link from "next/link";
import { join } from "path";
import React, { useState } from "react";
import { LiaAirbnb } from "react-icons/lia";
import { HiHomeModern } from "react-icons/hi2";
import { GiAirBalloon } from "react-icons/gi";
import { FaConciergeBell, FaUser } from "react-icons/fa";
import { FaEarthAmericas } from "react-icons/fa6";
import { FaBars } from "react-icons/fa";
import type { MenuProps } from "antd";
import { Dropdown, notification, Space } from "antd";

import "./headers.css";

import { Button } from "antd";
import CustomSearch from "./CustomSearch";
import { link } from "fs";
import ModalLoginRegister from "./ModalLoginRegister";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/app/redux/hooks";
import { setUserLogin } from "@/app/redux/slices/user.slice";
import BackToTop from "../backToTop/BackToTop";

const poppins = Poppins({
  subsets: ["latin"],
  weight: "400",
});
// danh sách các link trong header
const itemsLink = [
  {
    key: 1,
    icon: <HiHomeModern size={40} />,
    name: "Nơi lưu trú",
    link: "/",
    color: "#adadad",
  },
  {
    key: 2,
    icon: <GiAirBalloon size={40} />,
    name: "Trải nghiệm",
    link: "/",
    color: "#fa9244",
  },

  {
    key: 3,
    icon: <FaConciergeBell size={40} />,
    name: "Dịch vụ",
    link: "/",
    color: "#354453",
  },
];

const Headers = () => {
  const [isOpen, setIsOpen] = useState(false);

  const dispatch = useAppDispatch();

  const [apiNotification, contextHolder] = notification.useNotification();

  const router = useRouter();

  const { userLogin } = useAppSelector((state) => state.user);

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("userLogin");
    dispatch(setUserLogin(null));
    apiNotification.success({
      message: "Đăng xuất thành công!",
      description: "Bạn đã đăng xuất thành công!",
      placement: "top",
      duration: 2,
    });
    router.push("/");
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  // danh sách các label trong dropdown
  const items: MenuProps["items"] = [
    ...(userLogin
      ? [
          { label: <Link href={"/profile"}>Profile</Link>, key: "0" },
          {
            label: <a onClick={handleLogout}>Đăng xuất</a>,
            key: "1",
          },
        ]
      : [
          {
            label: (
              <a
                onClick={handleOpenModal}
                className="text-red-500 font-semibold"
              >
                {" "}
                Đăng nhập hoặc đăng ký
              </a>
            ),
            key: "1",
          },
        ]),
  ];
  return (
    <div className="">
      {contextHolder}
      <div className="container mx-auto py-5 fixed top-0 z-10 bg-white px-4 border-b-2 border-gray-200">
        <section className="flex justify-between">
          {/* Logo */}

          <div
            className={`logo items-center cursor-pointer  ${poppins.className} md:flex hidden`}
            onClick={() => {
              router.push("/");
            }}
            style={{ cursor: "pointer" }}
          >
            <LiaAirbnb color="#FF385C" size={50} />
            <p
              className="font-semibold text-2xl lg:block hidden"
              style={{ color: "#FF385C" }}
            >
              airbnb
            </p>
          </div>

          {/* Navbar */}
          <div className="list-link flex gap-4 md:mr-10 justify-between">
            {itemsLink.map((item) => {
              return (
                <div key={item.key} className="flex items-center">
                  <span className="icon-link" style={{ color: item.color }}>
                    {item.icon}
                  </span>
                  <Link
                    href={item.link}
                    className="ml-1 font-medium text-nowrap"
                  >
                    {item.name}
                  </Link>
                </div>
              );
            })}
          </div>

          {/* List Function */}
          <div className="function flex items-center">
            <div className="font-medium cursor-pointer host lg:block hidden">
              Trở thành host
            </div>

            <div className="logo-language mx-2">
              <FaEarthAmericas />
            </div>

            <Dropdown menu={{ items }} trigger={["click"]}>
              <Space className="btn-bar">
                {userLogin ? (
                  <FaUser className="cursor-pointer" />
                ) : (
                  <FaBars className="cursor-pointer" />
                  
                )}
              </Space>
            </Dropdown>
          </div>
        </section>
        <section className="mt-2">
          <div className="search flex justify-center">
            <CustomSearch />
          </div>
        </section>
      </div>
      <ModalLoginRegister isOpen={isOpen} onClose={handleCloseModal} />

      <BackToTop />
    </div>
  );
};

export default Headers;
