import { Outlet, Navigate } from "react-router-dom";

// custom hooks.
import useAuth from "../hooks/useAuth";

const PublicRoutes = () => {
  const { user, accessToken } = useAuth();

  const isLoggedIn = user && accessToken;

  if (!isLoggedIn) {
    return <Outlet />;
  } else {
    return <Navigate to="/" />;
  }
};

export default PublicRoutes;
