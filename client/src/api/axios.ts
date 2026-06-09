import axios from "axios";
import type { AxiosInstance } from "axios";

const API: AxiosInstance = axios.create({

  baseURL:
    "http://localhost:5000/api"
});

API.interceptors.request.use(
  (req) => {

    const token =
      localStorage.getItem("token");

    if (token) {

      req.headers.Authorization =
        `Bearer ${token}`;
    }

    return req;
  }
);

export default API;
