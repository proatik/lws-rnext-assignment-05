import { useNavigate } from "react-router-dom";

// custom hooks.
import useNav from "../../hooks/useNav";

// utility functions.
import { trimContent } from "../../utils";
import { getThumbnail } from "../../utils/urls";

const BlogCard = ({ blog }) => {
  const navigate = useNavigate();
  const { closeModal } = useNav();

  const handleCardOnClick = () => {
    closeModal();
    navigate(`/single-blog/${blog?.id}`);
  };

  return (
    <div onClick={handleCardOnClick} className="flex gap-6 py-2 cursor-pointer">
      <img
        alt="Blog Thumbnail"
        className="blog-thumb h-28"
        src={getThumbnail(blog?.thumbnail)}
      />
      <div className="mt-2">
        <h3 className="text-xl font-bold text-slate-300">{blog?.title}</h3>
        <p className="mt-1 mb-6 text-sm text-slate-500">
          {trimContent(blog?.content)}
        </p>
      </div>
    </div>
  );
};

export default BlogCard;
