import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_SERVER,
  // baseURL: "/api",
  // baseURL: "https://note.itsbohara.com/api",
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) =>
    Promise.reject(
      ((error.response && error.response.data.message) ??
        error.response.data.error?.message) ||
        "Something went wrong"
    )
);

const http = axiosInstance;
export default http;
