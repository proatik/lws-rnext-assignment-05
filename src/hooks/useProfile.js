import { useContext } from "react";

// profile context.
import { ProfileContext } from "../contexts";

const useProfile = () => {
  return useContext(ProfileContext);
};

export default useProfile;
