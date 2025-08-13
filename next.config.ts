import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "airbnbnew.cybersoft.edu.vn",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "s1.media.ngoisao.vn",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "hoanghamobile.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.google.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "thesinhcafetouronline.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cdn-icons-png.flaticon.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "sc04.alicdn.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};


export default nextConfig;
