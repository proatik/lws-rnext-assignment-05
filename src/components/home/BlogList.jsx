import { useState, useEffect, useRef } from "react";

// react components.
import BlogCard from "./BlogCard";

// custom hook.
import useAuth from "../../hooks/useAuth";
import useAxios from "../../hooks/useAxios";

// utility functions.
import { notify } from "../../utils";

// blogs per page.
const limit = 2;

const BlogList = () => {
  const [page, setPage] = useState(1);
  const [blogs, setBlogs] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [isFetching, setIsFetching] = useState(false);

  const api = useAxios();
  const loaderRef = useRef(null);
  const { user, setAuth } = useAuth();

  const fetchBlogs = async () => {
    try {
      setIsFetching(true);

      const response = await api.get(`blogs?page=${page}&limit=${limit}`);

      if (response.status === 200) {
        const data = response.data;

        if (data?.blogs?.length === 0) {
          setHasMore(false);
        } else {
          setBlogs((prevBlogs) => [...prevBlogs, ...data.blogs]);
          setPage((prevPage) => prevPage + 1);
        }
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

  const deleteBlog = async (id, favourite) => {
    try {
      const result = confirm("Are you sure you want to delete this blog?");

      if (!result) return;

      if (favourite) removeFavourite(id);

      const response = await api.delete(`/blogs/${id}`);

      if (response.status === 200) {
        const updatedBlogs = blogs.filter((blog) => blog.id !== id);

        setBlogs(updatedBlogs);
        notify({ message: response.data?.message, type: "success" });
      }
    } catch ({ response, code }) {
      let message = "";

      if (code === "ERR_NETWORK") {
        message = "Network error";
      } else {
        message = response?.data?.error;
      }

      notify({ message, type: "error" });
    }
  };

  const removeFavourite = async (id) => {
    try {
      const response = await api.patch(`blogs/${id}/favourite`);

      if (response.status === 200) {
        const updatedFavourites = user?.favourites?.filter(
          (fav) => fav?.id !== id
        );

        setAuth((prev) => ({
          ...prev,
          user: {
            ...prev?.user,
            favourites: updatedFavourites,
          },
        }));
      }
    } catch ({ response, code }) {
      let message = "";

      if (code === "ERR_NETWORK") {
        message = "Network error";
      } else {
        message = response?.data?.error;
      }

      notify({ message, type: "error" });
    }
  };

  // intersection observer.
  const observer = new IntersectionObserver((items) => {
    const loaderItem = items[0];

    if (loaderItem.isIntersecting && hasMore) {
      fetchBlogs();
    }
  });

  useEffect(() => {
    if (observer && loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    // cleanup
    return () => {
      if (observer) observer.disconnect();
    };
  }, [page]);

  return (
    <div className="space-y-3 md:col-span-5">
      {blogs.map((blog) => (
        <BlogCard key={blog?.id} blog={blog} deleteBlog={deleteBlog} />
      ))}

      <div ref={loaderRef}> </div>

      {/* loading spinner */}
      {isFetching && (
        <div className="flex items-center justify-center w-full">
          <div className="border-[10px] h-16 w-16 rounded-full border-x-blue-500 border-y-slate-800 animate-spin"></div>
        </div>
      )}

      {/* message for no blogs */}
      {!isFetching && blogs?.length === 0 && (
        <div className="py-4 font-mono text-2xl font-semibold text-center border rounded-md border-slate-800 bg-slate-800/50 text-slate-500/50">
          No blogs found.
        </div>
      )}

      {/* message for no more blogs */}
      {!hasMore && blogs?.length > 0 && (
        <div className="py-4 font-mono text-2xl font-semibold text-center border rounded-md border-slate-800 bg-slate-800/50 text-slate-500/50">
          No more blogs available.
        </div>
      )}
    </div>
  );
};

export default BlogList;
