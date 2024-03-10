import { useEffect, useState, useCallback } from "react";

// icons/images.
import CloseIcon from "../../assets/icons/close.svg";

// react components.
import BlogCard from "./BlogCard";

// custom hook.
import useNav from "../../hooks/useNav";
import useAxios from "../../hooks/useAxios";

// utility functions.
import { notify } from "../../utils";
import { debounce } from "../../utils/debounce";

const Search = () => {
  const [blogs, setBlogs] = useState([]);
  const [value, setValue] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [isFetching, setIsFetching] = useState(false);

  const api = useAxios();
  const { closeModal } = useNav();

  const searchBlogs = async (query) => {
    try {
      setIsFetching(true);

      const response = await api.get(`search?q=${query}`);

      if (response.status === 200) {
        setBlogs(response.data?.data);
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

  const debouncedSearch = useCallback(
    debounce((query) => {
      setSearchTerm(query);
    }, 500),
    []
  );

  const statuses = {
    initial: searchTerm.trim().length === 0,
    fetching: isFetching,
    empty: !isFetching && searchTerm.trim().length > 0 && blogs.length === 0,
  };

  useEffect(() => {
    if (!searchTerm.trim()) setBlogs([]);
    else searchBlogs(searchTerm);
  }, [searchTerm]);

  useEffect(() => {
    debouncedSearch(value);
  }, [value]);

  return (
    <section className="absolute top-0 left-0 z-50 grid w-full h-full place-items-center bg-slate-800/50 backdrop-blur-sm">
      <div className="relative w-6/12 p-4 mx-auto border rounded-lg shadow-lg bg-slate-900 border-slate-600/50 shadow-slate-400/10">
        <div>
          <h3 className="pl-2 my-2 text-xl font-bold text-slate-400">
            Search for Your Desire Blogs
          </h3>
          <input
            type="search"
            value={value}
            placeholder="Start Typing to Search"
            onChange={(e) => setValue(e.target.value)}
            className="w-full p-2 text-base text-white bg-transparent border-none rounded-lg outline-none focus:ring focus:ring-indigo-600"
          />
        </div>

        {/* search result */}
        <div>
          <h3 className="mt-6 font-bold text-slate-400">Search Results</h3>
          <div className="my-4 divide-y-2 divide-slate-500/30 max-h-[440px] overflow-y-scroll overscroll-contain">
            {statuses.initial && (
              <div className="py-8 font-mono text-3xl font-semibold text-center border rounded-md select-none bg-slate-800/50 border-slate-800 text-slate-500/50">
                Start typing to search.
              </div>
            )}

            {statuses.fetching && (
              <div className="flex gap-6 py-2 animate-pulse">
                <div className="bg-gray-800 rounded-md aspect-video h-28"></div>
                <div className="flex-grow mt-2">
                  <div className="w-3/4 h-5 bg-gray-800 rounded"> </div>
                  <div className="mt-2 h-3 bg-gray-800 rounded w-[95%]"> </div>
                  <div className="mt-2 h-3 bg-gray-800 rounded w-[80%]"> </div>
                  <div className="mt-2 h-3 bg-gray-800 rounded w-[90%]"> </div>
                  <div className="mt-2 h-3 bg-gray-800 rounded w-[85%]"> </div>
                </div>
              </div>
            )}

            {statuses.empty && (
              <div className="py-8 font-mono text-2xl font-semibold text-center border rounded-md select-none bg-slate-800/50 border-slate-800 text-slate-500/50">
                Sorry, no matching results found.
              </div>
            )}

            {!isFetching &&
              blogs?.map((blog) => <BlogCard key={blog?.id} blog={blog} />)}
          </div>
        </div>

        <button onClick={closeModal}>
          <img
            alt="Close"
            src={CloseIcon}
            className="absolute w-8 h-8 cursor-pointer right-2 top-2"
          />
        </button>
      </div>
    </section>
  );
};

export default Search;
