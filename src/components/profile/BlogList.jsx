import { Fragment } from "react";

// react components.
import BlogCard from "./BlogCard";

// custom hooks.
import useProfile from "../../hooks/useProfile";

const Profile = () => {
  const { user } = useProfile();

  const blogs = user?.blogs || [];

  return (
    <Fragment>
      <h4 className="mt-6 text-xl lg:mt-8 lg:text-2xl">Your Blogs</h4>
      <div className="my-6 space-y-4">
        {blogs?.length === 0 && (
          <div className="container grid p-4 font-mono text-3xl font-semibold border rounded-md place-items-center border-slate-800 bg-slate-800/50 text-slate-500/50">
            Currently you have no blogs.
          </div>
        )}

        {blogs?.map((blog) => (
          <BlogCard key={blog?.id} blog={blog} />
        ))}
      </div>
    </Fragment>
  );
};

export default Profile;
