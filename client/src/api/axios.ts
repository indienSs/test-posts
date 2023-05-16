import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:4000",
});

instance.interceptors.request.use((config) => {
  let token = window.localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default instance;
