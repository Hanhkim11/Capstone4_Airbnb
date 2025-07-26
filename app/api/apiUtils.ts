import axios from "axios";
import { config } from "process";

export const api = axios.create({
  baseURL: "https://airbnbnew.cybersoft.edu.vn/api/",
});
api.interceptors.request.use((config: any) => {
  config.headers = {
    ...config.headers,
    tokenCybersoft:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA4MSIsIkhldEhhblN0cmluZyI6IjI4LzExLzIwMjUiLCJIZXRIYW5UaW1lIjoiMTc2NDI4ODAwMDAwMCIsIm5iZiI6MTczNTM0NDAwMCwiZXhwIjoxNzY0NDYwODAwfQ.Vl0ntLG6G7ajYZQonTAwyAmHVk9GLbkXalVz4BbqmLk",
  };
  return config;
});
