import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_PROXY_API,
});

api.interceptors.request.use(function (config) {
  const { token } = JSON.parse(localStorage.getItem("swiptoryuser"));
  config.headers.Authorization = token ? `Bearer ${token}` : "";
  return config;
});

export default api;
