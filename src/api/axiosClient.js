import axios from "axios";
import queryString from "query-string";
import { ACCESS_TOKEN, API_BASE_URL } from "../constants";

const axiosClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  paramsSerializer: (params) => queryString.stringify(params),
});

axiosClient.interceptors.request.use(async (config) => {
  const token = localStorage.getItem(ACCESS_TOKEN);
  if (token) {
    config.headers.Authorization = "Bearer " + token;
  }
  return config;
});

export default axiosClient;
