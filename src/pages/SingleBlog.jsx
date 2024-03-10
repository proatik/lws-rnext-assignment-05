import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

// icons/images.
import LikeIcon from "../assets/icons/like.svg";
import Placeholder from "../assets/placeholder.png";
import HeartStroke from "../assets/icons/heart.svg";
import DeleteIcon from "../assets/icons/delete.svg";
import CommentIcon from "../assets/icons/comment.svg";
import HeartFilled from "../assets/icons/heart-filled.svg";

// custom hooks.
import useAuth from "../hooks/useAuth";
import useTitle from "../hooks/useTitle";
import useAxios from "../hooks/useAxios";

// utility functions.
import { notify } from "../utils";
import { formatDate } from "../utils/date";
import { getAvatar, getThumbnail } from "../utils/urls";

const Comment = ({ comment, deleteComment }) => {
  const [showAvatar, setShowAvatar] = useState(true);

  const { user } = useAuth();

  const isMe = user?.id === comment?.author?.id;

  const handleDeleteOnClick = () => {
    deleteComment(comment?.id);
  };

  return (
    <div className="flex border p-2 rounded-md border border-transparent hover:border hover:border-slate-800 items-start my-8 space-x-4">
      <Link to={`/profile/${comment?.author?.id}`}>
        <div className="text-white bg-orange-600 avater-img">
          {showAvatar && comment?.author?.avatar ? (
            <img
              alt="Avatar"
              className="rounded-full"
              onError={() => setShowAvatar(false)}
              src={getAvatar(comment?.author?.avatar)}
            />
          ) : (
            <span>{comment?.author?.firstName[0]}</span>
          )}
        </div>
      </Link>

      <div className="relative w-full">
        <Link to={`/profile/${comment?.author?.id}`}>
          <h5 className="font-bold inline text-slate-500">
            {comment?.author?.firstName} {comment?.author?.lastName}
          </h5>
        </Link>
        <p className="text-slate-300">{comment?.content}</p>

        {isMe && (
          <button
            onClick={handleDeleteOnClick}
            className="absolute top-0 right-0 grid rounded-full place-items-center h-7 w-7 bg-slate-700 hover:bg-slate-700/80"
          >
            <img src={DeleteIcon} alt="Delete" />
          </button>
        )}
      </div>
    </div>
  );
};

const SingleBlog = () => {
  const {
    reset,
    register,
    setFocus,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [blog, setBlog] = useState(null);
  const [isError, setIsError] = useState(false);
  const [showAvatar, setShowAvatar] = useState(true);
  const [isFetching, setIsFetching] = useState(false);

  const api = useAxios();
  const changeTitle = useTitle();
  const navigate = useNavigate();

  const { blogId } = useParams();
  const { user, accessToken, setAuth } = useAuth();

  const isLoggedIn = user && accessToken;
  const isFavorite = !!user?.favourites?.find((fav) => fav?.id === blog?.id);

  const fetchBlog = async () => {
    try {
      setIsError(false);
      setIsFetching(true);

      const response = await api.get(`blogs/${blogId}`);

      if (response.status === 200) {
        setBlog(response.data);
      }
    } catch ({ response, code }) {
      let message = "";

      if (code === "ERR_NETWORK") {
        message = "Network error";
      } else {
        message = response?.data?.error;
      }

      setIsError(true);
      notify({ message, type: "error" });
    } finally {
      setIsFetching(false);
    }
  };

  const handleCommentOnClick = () => {
    if (!isLoggedIn) return navigate("/login");
    setFocus("comment");
  };

  const handleLikeOnClick = async () => {
    try {
      if (!isLoggedIn) return navigate("/login");

      const response = await api.post(`blogs/${blogId}/like`);

      if (response.status === 200) {
        setBlog({ ...blog, likes: response.data?.likes });
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

  const handleFavoriteOnClick = async () => {
    try {
      if (!isLoggedIn) return navigate("/login");

      const response = await api.patch(`blogs/${blogId}/favourite`);

      if (response.status === 200) {
        if (response.data?.isFavourite) {
          const favourite = {
            id: blog?.id,
            title: blog?.title,
            tags: blog?.tags,
          };

          const updatedFavourites = [...user?.favourites, favourite];

          setAuth((prev) => ({
            ...prev,
            user: {
              ...prev?.user,
              favourites: updatedFavourites,
            },
          }));
        } else {
          const updatedFavourites = user?.favourites?.filter(
            (fav) => fav?.id !== blog?.id
          );

          setAuth((prev) => ({
            ...prev,
            user: {
              ...prev?.user,
              favourites: updatedFavourites,
            },
          }));
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
    }
  };

  const handleDeleteOnClick = async (commentId) => {
    try {
      const result = confirm("Are you sure you want to delete this comment?");

      if (!result) return;

      const response = await api.delete(`blogs/${blogId}/comment/${commentId}`);

      if (response.status === 200) {
        setBlog(response.data);
        notify({ message: "Comment deleted successfully", type: "success" });
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

  const submitForm = async ({ comment }) => {
    try {
      const response = await api.post(`blogs/${blogId}/comment`, {
        content: comment,
      });

      if (response.status === 200) {
        reset();
        setBlog(response.data);
        notify({ message: "Comment posted successfully", type: "success" });
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

  useEffect(() => {
    if (blogId) fetchBlog();
  }, [blogId]);

  useEffect(() => {
    if (blog) changeTitle(blog?.title);
  }, [blog]);

  if (isFetching) {
    return (
      <div className="container grid h-[calc(100vh-210px)] animate-pulse place-items-center rounded-md border border-slate-800 bg-slate-800/50"></div>
    );
  } else if (isError) {
    return (
      <div className="container grid h-[calc(100vh-210px)] place-items-center rounded-md border border-slate-800 bg-slate-800/50 text-3xl font-mono font-semibold text-slate-500/50">
        Failed to fetch blog. Please try again.
      </div>
    );
  }

  return (
    <div>
      <main>
        <section>
          <div className="container py-8 text-center">
            {/* title */}
            <h1 className="text-3xl font-bold md:text-5xl">{blog?.title}</h1>

            {/* author, date, likes */}
            <div className="flex items-center justify-center gap-4 my-4">
              <div className="flex items-center space-x-2 capitalize">
                <Link to={`/profile/${blog?.author?.id}`}>
                  <div className="text-white bg-indigo-600 avater-img">
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
                  </div>
                </Link>

                <Link to={`/profile/${blog?.author?.id}`}>
                  <h5 className="text-sm text-slate-500">
                    {blog?.author?.firstName} {blog?.author?.lastName}
                  </h5>
                </Link>
              </div>
              <span className="text-sm text-slate-700 dot">
                {formatDate(blog?.createdAt)}
              </span>
              <span className="text-sm text-slate-700 dot">
                {blog?.likes?.length || 0} Likes
              </span>
            </div>

            {/* thumbnail */}
            <img
              className="object-cover w-full mx-auto md:w-8/12 h-80 md:h-96"
              src={
                blog?.thumbnail ? getThumbnail(blog?.thumbnail) : Placeholder
              }
            />

            {/* tags */}
            <ul className="tags">
              {blog?.tags?.split(",")?.map((tag, index) => (
                <li key={index}>{tag?.trim()}</li>
              ))}
            </ul>

            {/* content */}
            <div
              dangerouslySetInnerHTML={{ __html: blog?.content }}
              className="mx-auto w-full md:w-10/12 text-slate-300 text-base md:text-lg leading-8 py-2 !text-left"
            ></div>
          </div>
        </section>

        {/* comments */}
        <section id="comments">
          <div className="container w-full mx-auto md:w-10/12">
            <h2 className="my-8 text-3xl font-bold">
              Comments ({blog?.comments?.length || 0})
            </h2>

            {isLoggedIn && (
              <div className="flex space-x-4">
                <Link to={`/profile/${user?.id}`}>
                  <div className="text-white bg-indigo-600 avater-img">
                    {showAvatar && user?.avatar ? (
                      <img
                        alt="Avatar"
                        className="rounded-full"
                        src={getAvatar(user?.avatar)}
                        onError={() => setShowAvatar(false)}
                      />
                    ) : (
                      <span>{user?.firstName[0]}</span>
                    )}
                  </div>
                </Link>

                <div className="w-full">
                  <form onSubmit={handleSubmit(submitForm)}>
                    <textarea
                      {...register("comment", {
                        required: "Comment is required",
                        validate: (value) =>
                          value.trim().length > 0 ||
                          "Comment must be non empty",
                      })}
                      id="comment"
                      name="comment"
                      placeholder="Write a comment"
                      className="w-full bg-[#030317] border border-slate-500 text-slate-300 p-4 rounded-md focus:outline-none"
                    />

                    {!!errors?.comment && (
                      <div role="alert" className="mt-1 text-sm text-red-500">
                        {errors?.comment.message}
                      </div>
                    )}

                    <div className="flex justify-end mt-4">
                      <button
                        type="submit"
                        className="px-6 py-2 text-white transition-all duration-200 bg-indigo-600 rounded-md md:py-3 hover:bg-indigo-700"
                      >
                        Comment
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {blog?.comments?.length === 0 && (
              <div className="py-4 mt-6 font-mono text-2xl font-semibold text-center border rounded-md border-slate-800 bg-slate-800/50 text-slate-500/50">
                No comments available.
              </div>
            )}

            {blog?.comments?.map((comment) => (
              <Comment
                key={comment?.id}
                comment={comment}
                deleteComment={handleDeleteOnClick}
              />
            ))}
          </div>
        </section>
      </main>

      {/* floating actions*/}
      <div className="floating-action">
        <ul className="floating-action-menus">
          <li onClick={handleLikeOnClick}>
            <img src={LikeIcon} alt="Likes" />
            <span>{blog?.likes?.length || 0}</span>
          </li>
          <li onClick={handleFavoriteOnClick}>
            <img
              alt="Favourites"
              src={isFavorite ? HeartFilled : HeartStroke}
            />
          </li>
          <li onClick={handleCommentOnClick}>
            <img src={CommentIcon} alt="Comments" />
            <span>{blog?.comments?.length || 0}</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SingleBlog;
