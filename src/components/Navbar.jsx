import { Link } from "react-router-dom";
import { Fragment, useState } from "react";

// icons/images.
import LwsLogo from "../assets/logo.svg";
import SearchIcon from "../assets/icons/search.svg";

// react components.
import Search from "./search/Search";

// custom hooks.
import useNav from "../hooks/useNav";
import useAuth from "../hooks/useAuth";
import usePortal from "../hooks/usePortal";

// utility functions.
import { notify } from "../utils";
import { getAvatar } from "../utils/urls";

/**
 * For Not Logged in User - Write, Login
 * For Logged in User - Write, Search, Logout, Profile
 **/

const Navbar = () => {
  const { showModal, openModal } = useNav();
  const { user, accessToken, logout } = useAuth();
  const [showAvatar, setShowAvatar] = useState(true);

  const SearchPortal = usePortal();

  const isLoggedIn = user && accessToken;

  const handleLogout = () => {
    logout();
    notify({ message: "Logout successful", type: "success" });
  };

  return (
    <Fragment>
      <header>
        <nav className="container">
          <div>
            <Link to="/">
              <img className="w-32" src={LwsLogo} alt="Lws Logo" />
            </Link>
          </div>

          <div>
            <ul className="flex items-center space-x-5">
              {/* write */}
              <li>
                <Link
                  to="/blogs/create"
                  className="px-6 py-2 text-white transition-all duration-200 bg-indigo-600 rounded-md md:py-3 hover:bg-indigo-700"
                >
                  Write
                </Link>
              </li>

              {/* search */}
              {isLoggedIn && (
                <li>
                  <button
                    onClick={openModal}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <img src={SearchIcon} alt="Search" />
                    <span>Search</span>
                  </button>
                </li>
              )}

              {/* login */}
              {!isLoggedIn && (
                <li>
                  <Link
                    to="/login"
                    className="transition-all duration-200 text-white/50 hover:text-white"
                  >
                    Login
                  </Link>
                </li>
              )}

              {/* logout */}
              {isLoggedIn && (
                <li>
                  <button
                    onClick={handleLogout}
                    className="transition-all duration-200 text-white/50 hover:text-white"
                  >
                    Logout
                  </button>
                </li>
              )}

              {/* user */}
              {isLoggedIn && (
                <li className="flex items-center">
                  <div className="text-white bg-orange-600 avater-img">
                    {showAvatar && user?.avatar ? (
                      <img
                        alt="Avatar"
                        className="rounded-full"
                        src={getAvatar(user?.avatar)}
                        onError={() => setShowAvatar(false)}
                      />
                    ) : (
                      <span>{user?.firstName[0]}</span>
                    )}
                  </div>

                  <Link to={`/profile/${user?.id}`}>
                    <span className="ml-2 text-white">
                      {user?.firstName} {user?.lastName}
                    </span>
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </nav>
      </header>

      {showModal && (
        <SearchPortal>
          <Search />
        </SearchPortal>
      )}
    </Fragment>
  );
};

export default Navbar;
