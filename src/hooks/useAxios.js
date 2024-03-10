import axios from "axios";
import { useEffect } from "react";

// backed api.
import api from "../api";

// custom hooks.
import useAuth from "../hooks/useAuth";

// app variables.
import { baseURL } from "../configs";

const useAxios = () => {
  const { accessToken, refreshToken, setAuth, logout } = useAuth();

  useEffect(() => {
    // request interceptor
    const requestIntercept = api.interceptors.request.use(
      (config) => {
        if (accessToken) {
          config.headers.Authorization = `Bearer ${accessToken}`;
        }

        return config;
      },
      (error) => Promise.reject(error)
    );

    // response interceptor
    const responseIntercept = api.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        if (error?.response?.status === 403 && !originalRequest._retry) {
          originalRequest._retry = true;

          try {
            const response = await axios.post(`${baseURL}/auth/refresh-token`, {
              refreshToken,
            });

            const token = response.data.accessToken;

            setAuth((prev) => ({
              ...prev,
              accessToken: token,
            }));

            originalRequest.headers.Authorization = `Bearer ${token}`;

            return axios(originalRequest);
          } catch (error) {
            logout();
            return Promise.reject(error);
          }
        }

        return Promise.reject(error);
      }
    );

    return () => {
      api.interceptors.request.eject(requestIntercept);
      api.interceptors.response.eject(responseIntercept);
    };
  }, [accessToken]);

  return api;
};

export default useAxios;
