import { useEffect } from "react";
import { useParams } from "react-router-dom";

// react components.
import BlogList from "../components/profile/BlogList";
import ProfileInfo from "../components/profile/ProfileInfo";

// custom hooks.
import useTitle from "../hooks/useTitle";
import useProfile from "../hooks/useProfile";

const Profile = () => {
  const changeTitle = useTitle();
  const { userId } = useParams();
  const { fetchProfile, isFetching, isError } = useProfile();

  useEffect(() => {
    if (userId) fetchProfile(userId);
  }, [userId]);

  useEffect(() => {
    changeTitle("Profile");
  }, []);

  if (isFetching) {
    return (
      <div className="container grid h-[calc(100vh-210px)] animate-pulse place-items-center rounded-md border border-slate-800 bg-slate-800/50"></div>
    );
  } else if (isError) {
    return (
      <div className="container grid h-[calc(100vh-210px)] place-items-center rounded-md border border-slate-800 bg-slate-800/50 text-3xl font-mono font-semibold text-slate-500/50">
        Failed to fetch profile. Please try again.
      </div>
    );
  }

  return (
    <main className="mx-auto max-w-[1020px] py-8">
      <div className="container">
        <ProfileInfo />
        <BlogList />
      </div>
    </main>
  );
};

export default Profile;
