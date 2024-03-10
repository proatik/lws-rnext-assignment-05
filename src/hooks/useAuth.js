import { useContext } from "react";

// auth context.
import { AuthContext } from "../contexts";

const useAuth = () => {
  return useContext(AuthContext);
};

export default useAuth;
