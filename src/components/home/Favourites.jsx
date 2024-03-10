import { Link } from "react-router-dom";

// custom hooks.
import useAuth from "../../hooks/useAuth";

// utility functions.
const formatTags = (tags) => {
  return tags
    ?.split(", ")
    .map((tag) => `#${tag.replace(/ /g, "")}`)
    .join(", ");
};

const Favourites = () => {
  const { user } = useAuth();

  const favourites = user?.favourites || [];

  return (
    <div className="sidebar-card">
      <h3 className="text-xl font-semibold text-slate-300 lg:text-2xl">
        Your Favourites ❤️
      </h3>
      <ul className="my-5 space-y-5">
        {favourites?.length === 0 && (
          <div className="px-2 py-4 font-mono text-xl font-semibold text-center border rounded-md border-slate-800 bg-slate-800/50 text-slate-500/50">
            You have no favourite blogs.
          </div>
        )}

        {favourites?.map((fav) => (
          <li key={fav?.id}>
            <Link to={`/single-blog/${fav?.id}`}>
              <h3 className="font-medium transition-all cursor-pointer text-slate-400 hover:text-slate-300">
                {fav?.title}
              </h3>
            </Link>
            <p className="text-sm text-slate-600">{formatTags(fav?.tags)}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Favourites;
