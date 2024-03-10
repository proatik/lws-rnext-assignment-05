import { useState, useEffect } from "react";

// nav context.
import { NavContext } from "../contexts";

const NavProvider = ({ children }) => {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    if (showModal) document.body.style.overflowY = "hidden";
    else document.body.style.overflowY = "unset";

    return () => {
      document.body.style.overflowY = "unset";
    };
  }, [showModal]);

  return (
    <NavContext.Provider value={{ showModal, openModal, closeModal }}>
      {children}
    </NavContext.Provider>
  );
};

export default NavProvider;
