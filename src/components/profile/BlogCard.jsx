import { useState } from "react";
import { useNavigate } from "react-router-dom";

// utility functions.
import { trimContent } from "../../utils";
import { formatDate } from "../../utils/date";
import { getAvatar, getThumbnail } from "../../utils/urls";

const BlogCard = ({ blog }) => {
  const [showAvatar, setShowAvatar] = useState(true);

  const navigate = useNavigate();

  const handleCardOnClick = () => {
    navigate(`/single-blog/${blog?.id}`);
  };

  return (
    <div onClick={handleCardOnClick} className="blog-card">
      <img
        alt="Blog Thumbnail"
        className="blog-thumb"
        src={getThumbnail(blog?.thumbnail)}
      />
      <div className="mt-2">
        <h3 className="text-xl text-slate-300 lg:text-2xl"> {blog?.title}</h3>
        <p className="mt-1 mb-6 text-base text-slate-500">
          {trimContent(blog?.content)}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 capitalize">
            <div className="text-white bg-indigo-600 avater-img">
              <span onClick={(e) => e.stopPropagation()}>
                {showAvatar && blog?.author?.avatar ? (
                  <img
                    alt="Avatar"
                    className="rounded-full"
                    onError={() => setShowAvatar(false)}
                    src={getAvatar(blog?.author?.avatar)}
                  />
                ) : (
                  <span>{blog?.author?.firstName[0]}</span>
                )}
              </span>
            </div>
            <div>
              <span onClick={(e) => e.stopPropagation()}>
                <h5 className="text-sm text-slate-500">
                  {blog?.author?.firstName} {blog?.author?.lastName}
                </h5>
              </span>
              <div className="flex items-center text-xs text-slate-700">
                <span>{formatDate(blog?.createdAt)}</span>
              </div>
            </div>
          </div>
          <div className="px-2 py-1 text-sm text-slate-700">
            <span>{blog?.likes?.length || 0} Likes</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
