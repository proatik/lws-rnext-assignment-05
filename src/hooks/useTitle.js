const useTitle = () => {
  return (title = "") => {
    const check = title.length > 25;
    if (check) title = title?.slice(0, 25) + "...";
    document.title = title + " | LWS";
  };
};

export default useTitle;
