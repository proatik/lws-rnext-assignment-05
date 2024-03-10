import { toast, Bounce } from "react-toastify";

export const notify = ({ message, type }) => {
  toast[type](message, {
    theme: "dark",
    autoClose: 2500,
    pauseOnHover: true,
    closeOnClick: true,
    transition: Bounce,
    hideProgressBar: false,
    position: "bottom-center",
  });
};

export const trimContent = (content = "") => {
  const len = content.length;

  if (len > 150) return content.slice(0, 180) + "...";
  else return content;
};
