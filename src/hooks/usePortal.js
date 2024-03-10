import { createPortal } from "react-dom";

const usePortal = () => {
  const refNode = document.getElementById("portal") || document.body;

  return ({ children }) => createPortal(children, refNode);
};

export default usePortal;
