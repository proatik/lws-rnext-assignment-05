import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

// icons/images.
import EditIcon from "../../assets/icons/edit.svg";
import MoreIcon from "../../assets/icons/3dots.svg";
import DeleteIcon from "../../assets/icons/delete.svg";

// custom hooks.
import useAuth from "../../hooks/useAuth";

// utility functions.
import { trimContent } from "../../utils";
import { formatDate } from "../../utils/date";
import { getAvatar, getThumbnail } from "../../utils/urls";

const BlogCard = ({ blog, deleteBlog }) => {
  const [showAvatar, setShowAvatar] = useState(true);
  const [showActions, setShowActions] = useState(false);

  const { user } = useAuth();
  const navigate = useNavigate();
  const actionsRef = useRef(null);

  const isMe = user?.id === blog?.author?.id;
  const isFavorite = !!user?.favourites?.find((fav) => fav?.id === blog?.id);

  const handleEditOnClick = () => {
    navigate(`/blogs/${blog?.id}/edit`);
  };

  const handleDeleteOnClick = () => {
    deleteBlog(blog?.id, isFavorite);
    setShowActions(false);
  };

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
      <div className="relative mt-2">
        <h3 className="pr-8 text-xl text-slate-300 lg:text-2xl">
          {blog?.title}
        </h3>

        <p className="mt-1 mb-6 text-base text-slate-500">
          {trimContent(blog?.content)}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 capitalize">
            <div className="text-white bg-indigo-600 avater-img">
              <span onClick={(e) => e.stopPropagation()}>
                <Link to={`/profile/${blog?.author?.id}`}>
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
                </Link>
              </span>
            </div>
            <div>
              <h5 className="text-sm text-slate-500">
                <span onClick={(e) => e.stopPropagation()}>
                  <Link to={`/profile/${blog?.author?.id}`}>
                    {blog?.author?.firstName} {blog?.author?.lastName}
                  </Link>
                </span>
              </h5>
              <div className="flex items-center text-xs text-slate-700">
                <span>{formatDate(blog?.createdAt)}</span>
              </div>
            </div>
          </div>
          <div className="px-2 py-1 text-sm text-slate-700">
            <span>{blog?.likes?.length || 0} Likes</span>
          </div>
        </div>

        {/* actions */}
        {isMe && (
          <div
            className="absolute top-0 right-0"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="more-button"
              onClick={() => setShowActions(!showActions)}
            >
              <img src={MoreIcon} alt="More" />
            </button>

            {showActions && (
              <div ref={actionsRef} className="action-modal-container">
                <button
                  onClick={handleEditOnClick}
                  className="action-menu-item hover:text-[#00DA92]"
                >
                  <img src={EditIcon} alt="Edit" />
                  Edit
                </button>
                <button
                  onClick={handleDeleteOnClick}
                  className="action-menu-item hover:text-red-500"
                >
                  <img src={DeleteIcon} alt="Delete" />
                  Delete
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogCard;
