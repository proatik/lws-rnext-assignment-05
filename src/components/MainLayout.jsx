import { Fragment } from "react";

// react components.
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// context providers.
import NavProvider from "../providers/NavProvider";

const MainLayout = ({ children }) => {
  return (
    <Fragment>
      <NavProvider>
        <Navbar />
      </NavProvider>
      {children}
      <Footer />
    </Fragment>
  );
};

export default MainLayout;
