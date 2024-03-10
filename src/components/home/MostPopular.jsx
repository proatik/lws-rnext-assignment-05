import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

// custom hooks.
import useAxios from "../../hooks/useAxios";

// utility functions.
import { notify } from "../../utils";

const MostPopular = () => {
  const [blogs, setBlogs] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  const api = useAxios();

  const fetchPopularBlogs = async () => {
    try {
      setIsFetching(true);

      const response = await api.get("blogs/popular");

      if (response.status === 200) {
        setBlogs(response.data.blogs);
      }
    } catch ({ response, code }) {
      let message = "";

      if (code === "ERR_NETWORK") {
        message = "Network error";
      } else {
        message = response?.data?.error;
      }

      notify({ message, type: "error" });
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    fetchPopularBlogs();
  }, []);

  return (
    <div className="sidebar-card">
      <h3 className="text-xl font-semibold text-slate-300 lg:text-2xl">
        Most Popular 👍️
      </h3>
      <ul className="my-5 space-y-5">
        {blogs.map((blog) => (
          <li key={blog?.id}>
            <Link to={`/single-blog/${blog?.id}`}>
              <h3 className="font-medium transition-all cursor-pointer text-slate-400 hover:text-slate-300">
                {blog?.title}
              </h3>
            </Link>
            <p className="text-sm text-slate-600">
              by{" "}
              <Link to={`/profile/${blog?.author?.id}`}>
                {blog?.author?.firstName} {blog?.author?.lastName}
              </Link>{" "}
              <span>·</span> <span>{blog?.likes?.length || 0} Likes</span>
            </p>
          </li>
        ))}

        {/* loading spinner */}
        {isFetching && (
          <div className="flex items-center justify-center w-full">
            <div className="border-[8px] h-14 w-14 rounded-full border-x-blue-500 border-y-slate-800 animate-spin"></div>
          </div>
        )}

        {/* message for no blogs */}
        {!isFetching && blogs?.length === 0 && (
          <div className="px-2 py-4 font-mono text-xl font-semibold text-center border rounded-md border-slate-800 bg-slate-800/50 text-slate-500/50">
            No popular blogs found.
          </div>
        )}
      </ul>
    </div>
  );
};

export default MostPopular;
