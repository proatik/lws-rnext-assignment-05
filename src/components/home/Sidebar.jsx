// react components.
import MostPopular from "./MostPopular";
import Favourites from "./Favourites";

// custom hooks.
import useAuth from "../../hooks/useAuth";

const Sidebar = () => {
  const { user, accessToken } = useAuth();

  const isLoggedIn = user && accessToken;

  return (
    <div className="w-full h-full space-y-5 md:col-span-2">
      <MostPopular />
      {isLoggedIn && <Favourites />}
    </div>
  );
};

export default Sidebar;
