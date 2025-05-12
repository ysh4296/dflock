// src/utils/axiosInstance.ts
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL, // Set your API base URL here
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
