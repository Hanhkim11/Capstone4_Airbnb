import axios from "axios";

export const api = axios.create({
    baseURL: "https://airbnbnew.cybersoft.edu.vn/api/"
})

api.interceptors.request.use((config: any) => {
    config.headers = {
        ...config.headers,
        tokenCybersoft: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCBTw6FuZyAxNiIsIkhldEhhblN0cmluZyI6IjA2LzAxLzIwMjYiLCJIZXRIYW5UaW1lIjoiMTc2NzY1NzYwMDAwMCIsIm5iZiI6MTc0NTM2NjQwMCwiZXhwIjoxNzY3ODMwNDAwfQ.sybvGKKtbTpgsO4tjkJrCOddpZhR6YiO6nlVCY2e4xw",
    }
    return config;

})