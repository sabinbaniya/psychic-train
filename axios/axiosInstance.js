import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_URL,
  credentials: "include",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    crossDomain: true,
  },
});

export const axiosAuthInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_HOST_URL,
  credentials: "include",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    crossDomain: true,
  },
});

export default axiosInstance;
