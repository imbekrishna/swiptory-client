import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_PROXY_API,
});

api.interceptors.request.use(function (config) {
  const user = window.localStorage.getItem("swiptoryuser");
  const token = user ? JSON.parse(user).token : "";
  config.headers.Authorization = token ? `Bearer ${token}` : "";
  return config;
});

export default api;
