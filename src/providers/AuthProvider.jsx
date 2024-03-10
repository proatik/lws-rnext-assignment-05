import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// auth context.
import { AuthContext } from "../contexts";

// backend api.
import api from "../api";

// utility functions.
import { notify } from "../utils";

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null);

  const navigate = useNavigate();

  const loginUser = async (data) => {
    try {
      const response = await api.post("/auth/login", data);

      if (response.status === 200) {
        const authData = {
          user: response.data?.user,
          accessToken: response.data?.token?.accessToken,
          refreshToken: response.data?.token?.refreshToken,
        };

        setAuth(authData);
        notify({ message: "Login successful", type: "success" });
        navigate("/");
      }
    } catch ({ response, code }) {
      let message = "";

      if (code === "ERR_NETWORK") {
        message = "Network error";
      } else {
        message = response?.data?.error;
      }

      notify({ message, type: "error" });
    }
  };

  const registerUser = async (data) => {
    try {
      const response = await api.post("/auth/register", data);

      if (response.status === 201) {
        const authData = {
          user: response.data?.user,
          accessToken: response.data?.token?.accessToken,
          refreshToken: response.data?.token?.refreshToken,
        };

        setAuth(authData);
        notify({ message: "Registration successful", type: "success" });
        navigate("/");
      }
    } catch ({ response, code }) {
      let message = "";

      if (code === "ERR_NETWORK") {
        message = "Network error";
      } else {
        message = response?.data?.error;
      }

      notify({ message, type: "error" });
    }
  };

  const logout = () => {
    setAuth(null);
  };

  // retrieve auth data from the local storage.
  useEffect(() => {
    const data = localStorage.getItem("auth");
    const parsedData = JSON.parse(data);
    if (parsedData) setAuth(parsedData);
  }, []);

  // set auth data to the local storage.
  useEffect(() => {
    localStorage.setItem("auth", JSON.stringify(auth));
  }, [auth]);

  const state = {
    ...(auth && auth),

    logout,
    setAuth,
    loginUser,
    registerUser,
  };

  return <AuthContext.Provider value={state}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
