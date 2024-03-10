import { useState } from "react";
import { Outlet } from "react-router-dom";

// profile context.
import { ProfileContext } from "../contexts";

// custom hooks.
import useAuth from "../hooks/useAuth";
import useAxios from "../hooks/useAxios";

// utility functions.
import { notify } from "../utils";

const ProfileProvider = () => {
  const [profile, setProfile] = useState(null);
  const [isError, setIsError] = useState(false);
  const [isFetching, setIsFetching] = useState(false);

  const api = useAxios();
  const { setAuth } = useAuth();

  const fetchProfile = async (userId) => {
    try {
      setIsError(false);
      setIsFetching(true);

      const response = await api.get(`profile/${userId}`);

      if (response.status === 200) {
        setProfile({ user: response.data });
      }
    } catch ({ response, code }) {
      let message = "";

      if (code === "ERR_NETWORK") {
        message = "Network error";
      } else {
        message = response?.data?.error;
      }

      setIsError(true);
      notify({ message, type: "error" });
    } finally {
      setIsFetching(false);
    }
  };

  const updateProfile = async (data, image) => {
    try {
      const response = await api.patch("profile", data);

      if (response.status === 200) {
        setProfile({ user: response.data?.user });

        if (image) {
          const avatar = response.data?.user?.avatar;

          setAuth((prev) => ({
            ...prev,
            user: {
              ...prev.user,
              avatar,
            },
          }));
        }

        notify({ message: response.data?.message, type: "success" });
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

  const value = {
    ...(profile && profile),

    isError,
    isFetching,
    fetchProfile,
    updateProfile,
  };

  return (
    <ProfileContext.Provider value={value}>
      <Outlet />
    </ProfileContext.Provider>
  );
};

export default ProfileProvider;
