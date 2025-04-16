import constant from "@/utils/constants";
import axios from "axios";
import Cookie from "js-cookie";

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_APP_API_URL || "http://localhost:3000",
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const accessToken = Cookie.get(constant.ACCESS_TOKEN_KEY);

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

export default api;
