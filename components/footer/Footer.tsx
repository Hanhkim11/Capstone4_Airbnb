import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-md text-gray-700 mt-10">
      <div className="max-w-7xl mx-auto px-4 py-10 border-t">
        {/* Danh mục */}
        <div>
          <h2 className="font-semibold text-lg mb-4">
            Nguồn cảm hứng cho những kỳ nghỉ sau này
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 border-b pb-8">
            {[
              "Hồ bơi tuyệt vời",
              "Bắc Cực",
              "Khu cắm trại",
              "Xe cắm trại",
              "Lâu đài",
              "Nông thôn",
              "Thiết kế",
              "Nhà dưới lòng đất",
              "Nông trại",
              "Công viên quốc gia",
              "Thật ấn tượng!",
              "Nhà nhỏ",
              "Tháp",
              "Cối xay gió",
              "Luxe",
              "Container",
              "Vườn nho",
            ].map((item, index) => (
              <p key={index} className="hover:underline cursor-pointer">
                {item}
              </p>
            ))}
          </div>
        </div>

        {/* Các cột thông tin */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-10">
          {/* Hỗ trợ */}
          <div>
            <h3 className="font-semibold mb-2">Hỗ trợ</h3>
            <ul className="space-y-1">
              {[
                "Trung tâm trợ giúp",
                "AirCover",
                "Chống phân biệt đối xử",
                "Hỗ trợ người khuyết tật",
                "Các tuỳ chọn huỷ",
                "Báo cáo lo ngại của khu dân cư",
              ].map((item, index) => (
                <li key={index} className="hover:underline cursor-pointer">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Đón tiếp khách */}
          <div>
            <h3 className="font-semibold mb-2">Đón tiếp khách</h3>
            <ul className="space-y-1">
              {[
                "Cho thuê nhà trên Airbnb",
                "Đưa trải nghiệm của bạn lên Airbnb",
                "Đưa dịch vụ của bạn lên Airbnb",
                "AirCover cho host",
                "Tài nguyên về đón tiếp khách",
                "Diễn đàn cộng đồng",
                "Đón tiếp khách có trách nhiệm",
                "Tham gia khoá học miễn phí về công việc Đón tiếp khách",
                "Tìm host hỗ trợ",
              ].map((item, index) => (
                <li key={index} className="hover:underline cursor-pointer">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Airbnb */}
          <div>
            <h3 className="font-semibold mb-2">Airbnb</h3>
            <ul className="space-y-1">
              {[
                "Bản phát hành Mùa hè 2025",
                "Trang tin tức",
                "Cơ hội nghề nghiệp",
                "Nhà đầu tư",
                "Chỗ ở khẩn cấp Airbnb.org",
              ].map((item, index) => (
                <li key={index} className="hover:underline cursor-pointer">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom footer */}
        <div className="mt-10 border-t pt-6 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
          <div className="space-x-4 mb-2 md:mb-0">
            <span>© 2025 Airbnb, Inc.</span>
            <span className="hover:underline cursor-pointer">
              Quyền riêng tư
            </span>
            <span className="hover:underline cursor-pointer">Điều khoản</span>
            <span className="hover:underline cursor-pointer">
              Sơ đồ trang web
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="hover:underline cursor-pointer">
              🌐 Tiếng Việt (VN)
            </span>
            <span className="hover:underline cursor-pointer">₫ VND</span>
            <span className="hover:underline cursor-pointer">📘</span>
            <span className="hover:underline cursor-pointer">✖</span>
            <span className="hover:underline cursor-pointer">📸</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
