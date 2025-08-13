import React, { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    if (typeof window != "undefined") {
      window.addEventListener("scroll", () => {
        if (window.scrollY > 100) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      });
    }
  }, []);

  const handleSrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <div className="fixed z-20 bottom-10 right-5 ">
      {isVisible && (
        <button
          onClick={handleSrollToTop}
          className="bg-white rounded-full p-2 shadow-lg hover:bg-gray-300 cursor-pointer"
        >
          <FaArrowUp color="#FF385C" size={30} />
        </button>
      )}
    </div>
  );
};

export default BackToTop;
