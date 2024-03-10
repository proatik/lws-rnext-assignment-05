import { Outlet, Navigate } from "react-router-dom";

// custom hooks.
import useAuth from "../hooks/useAuth";

const PrivateRoutes = () => {
  const { user, accessToken } = useAuth();

  const isLoggedIn = user && accessToken;

  if (isLoggedIn) {
    return <Outlet />;
  } else {
    return <Navigate to="/login" />;
  }
};

export default PrivateRoutes;
