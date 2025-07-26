import { Poppins } from "next/font/google";
import React from "react";
import { LiaAirbnb } from "react-icons/lia";
import { HiOutlineHomeModern } from "react-icons/hi2";
import { GiAirBalloon } from "react-icons/gi";
import { FaBellConcierge } from "react-icons/fa6";
import { FaEarthAmericas } from "react-icons/fa6";
import { FaBars } from "react-icons/fa";
import { Button } from "antd";
import "./header.css";
import CustomSearch from "./CustomSearch";
import Link from "next/link";

const poppins = Poppins({
  subsets: ["latin"],
  weight: "400",
});

const itemsLink = [
  {
    key: 1,
    icon: <HiOutlineHomeModern size={40} />,
    name: "Nơi lưu trú",
    link: "/",
    color: "#adadad",
  },
  {
    key: 2,
    icon: <GiAirBalloon size={40} />,
    name: "Trãi nghiệm",
    link: "trai-nghiem",
    color: "#fa9244",
  },
  {
    key: 3,
    icon: <FaBellConcierge size={40} />,
    name: "Dịch vụ",
    link: "dich-vu",
    color: "#354453",
  },
];

const Headers = () => {
  return (
    <div className="">
      <div className="container top-0 py-5 mx-auto fixed bg-white px-4 z-10 border-b-2 border-gray-200 ">
        <section className="flex justify-between">
          {/* logo */}
          <div className={`logo flex items-center ${poppins.className}`}>
            <LiaAirbnb color="#FF385C" size={50} />
            <p className="font-semibold text-2xl" style={{ color: "#FF385C" }}>
              airbnb
            </p>
          </div>

          {/* navbar */}
          <div className="list-link flex justify-between">
            {itemsLink.map((item) => {
              return (
                <div key={item.key} className="flex items-center">
                  <span className="icon-link" style={{ color: item.color }}>
                    {item.icon}
                  </span>

                  <Link href={item.link} className="ml-1 font-medium">
                    {item.name}
                  </Link>
                </div>
              );
            })}
          </div>
          {/* list function */}
          <div className="function flex items-center">
            <div className="font-medium cursor-pointer host">
              Trở thành host
            </div>
            <div className="logo-language mx-3">
              <FaEarthAmericas />
            </div>
            <div className="btn-bar">
              <FaBars />
            </div>
          </div>
        </section>
        <section>
          <div className="search flex justify-center">
            <CustomSearch />
          </div>
        </section>
      </div>
    </div>
  );
};

export default Headers;
