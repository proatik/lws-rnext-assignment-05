import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useRef, useState, useEffect } from "react";

// custom hooks.
import useAxios from "../hooks/useAxios";
import useTitle from "../hooks/useTitle";

// utility functions.
import { notify } from "../utils";

const CreateBlog = () => {
  const {
    register,
    setValue,
    clearErrors,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const api = useAxios();
  const changeTitle = useTitle();
  const navigate = useNavigate();

  const fileRef = useRef(null);
  const [image, setImage] = useState(null);
  const [isCreating, setIsCreating] = useState(false);

  const submitForm = async (data) => {
    try {
      setIsCreating(true);

      const formData = new FormData();

      for (const [key, val] of Object.entries(data)) {
        formData.append(key, val);
      }

      const response = await api.post("/blogs", formData);

      if (response.status === 201) {
        notify({ message: response.data?.message, type: "success" });

        const blogId = response.data?.blog?.id;
        navigate(`/single-blog/${blogId}`);
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
      setIsCreating(false);
    }
  };

  const handleImageOnSelect = () => {
    const file = fileRef.current.files[0];

    setImage(URL.createObjectURL(file));
    setValue("thumbnail", file);
    clearErrors("thumbnail");
  };

  const handleImageOnClick = () => {
    fileRef.current.click();
  };

  useEffect(() => {
    changeTitle("Create Post");
  }, []);

  return (
    <main>
      <section>
        <div className="container">
          <form onSubmit={handleSubmit(submitForm)} className="createBlog">
            <div className="relative grid place-items-center bg-slate-600/20 h-[150px] rounded-md my-4">
              <div className="flex items-center gap-4 p-2 transition-all rounded cursor-pointer bg-slate-700 hover:scale-110">
                <svg
                  fill="none"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                  className="w-6 h-6"
                  stroke="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                  />
                </svg>
                <p onClick={handleImageOnClick}>Upload Your Image</p>

                <input
                  {...register("thumbnail", { required: "Image is required" })}
                  hidden
                  type="file"
                  ref={fileRef}
                  accept=".png, .jpg, .jpeg"
                  onChange={handleImageOnSelect}
                />
              </div>

              {!!errors?.thumbnail && (
                <div role="alert" className="text-sm text-red-500">
                  {errors?.thumbnail.message}
                </div>
              )}

              {image && (
                <img
                  src={image}
                  alt="Blog Image"
                  className="absolute top-0 max-h-full -z-[1]"
                />
              )}
            </div>

            <div className="mb-6">
              <input
                {...register("title", {
                  required: "Title is required",
                  validate: (value) =>
                    value.trim().length > 0 || "Title must be non empty",
                })}
                id="title"
                type="text"
                name="title"
                placeholder="Enter your blog title"
              />

              {!!errors?.title && (
                <div role="alert" className="mt-1 text-sm text-red-500">
                  {errors?.title.message}
                </div>
              )}
            </div>

            <div className="mb-6">
              <input
                {...register("tags", {
                  required: "Tags is required",
                  validate: (value) =>
                    value.trim().length > 0 || "Tags must be non empty",
                })}
                id="tags"
                type="text"
                name="tags"
                placeholder="Your Comma Separated Tags Ex. JavaScript, React, Node, Express,"
              />

              {!!errors?.tags && (
                <div role="alert" className="mt-1 text-sm text-red-500">
                  {errors?.tags.message}
                </div>
              )}
            </div>

            <div className="mb-6">
              <textarea
                {...register("content", {
                  required: "Content is required",
                  validate: (value) =>
                    value.trim().length > 0 || "Content be must non empty",
                })}
                rows={6}
                id="content"
                name="content"
                placeholder="Write your blog content"
              />

              {!!errors?.content && (
                <div role="alert" className="mt-1 text-sm text-red-500">
                  {errors?.content.message}
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={isCreating}
              className="px-6 py-2 text-white transition-all duration-200 bg-indigo-600 rounded-md md:py-3 hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Create Blog
            </button>
          </form>
        </div>
      </section>
    </main>
  );
};

export default CreateBlog;
