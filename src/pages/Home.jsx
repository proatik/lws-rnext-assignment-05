import { useEffect } from "react";

//  react components.
import BlogList from "../components/home/BlogList";
import Sidebar from "../components/home/Sidebar";

// custom hooks.
import useTitle from "../hooks/useTitle";

const Home = () => {
  const changeTitle = useTitle();

  useEffect(() => {
    changeTitle("React Blogify");
  }, []);
  return (
    <main>
      <section>
        <div className="container">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-7">
            <BlogList />
            <Sidebar />
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
