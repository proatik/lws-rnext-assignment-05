import { useContext } from "react";

// nav context.
import { NavContext } from "../contexts";

const useNav = () => {
  return useContext(NavContext);
};

export default useNav;
