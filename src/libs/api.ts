/* eslint-disable @typescript-eslint/no-unused-expressions */
import { QUAYS_USER_TOKEN } from "@/constants";
// import { deleteUserSession } from "@/store/features/user/user-slice";
import { makeStore } from "@/store/store";
import axios from "axios";
import { getCookie } from "cookies-next";
import toast from "react-hot-toast";

export const httpSignal = axios.CancelToken.source();
const CancelToken = axios.CancelToken;
let requestSignal;

const API = axios.create({
  // baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  baseURL: "https://quays-insurance-service.mintfintech.com",
  headers: {
    'Content-Type': 'application/json',
  },
});

API.interceptors.request.use(
  (config) => {
    config.headers["x-request-client-key"] = "cXVheXMtd2ViLWNsaWVudC1rZXktMDAxMDAx"; // To-Do: Put in env
    config.headers["x-timezone"] = "Africa/Lagos";
    const accessToken = getCookie(QUAYS_USER_TOKEN);
    accessToken && (config.headers["Authorization"] = "Bearer " + accessToken);
    requestSignal = CancelToken.source();
    config.cancelToken = requestSignal.token;
    return config;
  },
  (error) => {
    Promise.reject(error);
  },
);


API.interceptors.response.use(
  async (response) => {
    return response;
  },
  async (error) => {
    // const status = error.response.status;
    const { response } = error || {};
    const { status, data } = response || {};
    const originalRequest = error.config;
    const { baseURL, url } = originalRequest;
    const requestPATH = url.replace(baseURL, "");

    // if (status === 401 && data.message.includes("Invalid authorization token.")) {
    //   makeStore().dispatch(deleteUserSession());
    //   toast.error("Your session has been invalidated. Please login again.");
    //   setTimeout(() => {
    //     window.location.href = "/login";
    //   }, 400);
    // }

    return Promise.reject(error);
  },
);

API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    console.log('Token in request interceptor:', token); // Debugging
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`; // Set the Bearer token
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

API.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      console.log('Token expired or invalid, redirecting to /admin-login'); // Debugging
      localStorage.removeItem('token'); // Remove the expired token
      localStorage.removeItem('user'); // Remove user data
      window.location.href = '/admin-login'; // Redirect to login page
    }
    return Promise.reject(error);
  }
);

export { API, requestSignal };
