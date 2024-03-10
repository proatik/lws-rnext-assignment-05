import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

// custom hooks.
import useAuth from "../hooks/useAuth";
import useTitle from "../hooks/useTitle";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const changeTitle = useTitle();
  const { registerUser } = useAuth();

  const submitForm = (data) => {
    registerUser(data);
  };

  useEffect(() => {
    changeTitle("Register");
  }, []);

  return (
    <main>
      <section className="container">
        <div className="w-full md:w-1/2 mx-auto bg-[#030317] p-8 rounded-md mt-12">
          <h2 className="mb-6 text-2xl font-bold">Register</h2>
          <form onSubmit={handleSubmit(submitForm)} autoComplete="off">
            {/* first name */}
            <div className="mb-6">
              <label htmlFor="firstName" className="block mb-2">
                First Name
              </label>
              <input
                {...register("firstName", {
                  required: "First Name is required",
                  validate: (value) =>
                    value.trim().length > 3 ||
                    "First Name must be at least 4 characters long",
                })}
                type="text"
                id="firstName"
                name="firstName"
                className={`w-full p-3 bg-[#030317] border  rounded-md focus:outline-none focus:border-indigo-500 ${
                  !!errors?.firstName
                    ? "border-red-500 focus:border-red-500"
                    : "border-white/20"
                }`}
              />

              {!!errors?.firstName && (
                <div role="alert" className="mt-1 text-sm text-red-500">
                  {errors?.firstName.message}
                </div>
              )}
            </div>

            {/* last name */}
            <div className="mb-6">
              <label htmlFor="lastName" className="block mb-2">
                Last Name
              </label>
              <input
                {...register("lastName", {
                  required: "Last Name is required",
                  validate: (value) =>
                    value.trim().length > 3 ||
                    "Last Name must be at least 4 characters long",
                })}
                type="text"
                id="lastName"
                name="lastName"
                className={`w-full p-3 bg-[#030317] border  rounded-md focus:outline-none focus:border-indigo-500 ${
                  !!errors?.lastName
                    ? "border-red-500 focus:border-red-500"
                    : "border-white/20"
                }`}
              />

              {!!errors?.lastName && (
                <div role="alert" className="mt-1 text-sm text-red-500">
                  {errors?.lastName.message}
                </div>
              )}
            </div>

            {/* email */}
            <div className="mb-6">
              <label htmlFor="email" className="block mb-2">
                Email
              </label>
              <input
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[\w-]+(\.[\w-]+)*@([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/,
                    message: "Invalid email address",
                  },
                })}
                id="email"
                type="email"
                name="email"
                className={`w-full p-3 bg-[#030317] border  rounded-md focus:outline-none focus:border-indigo-500 ${
                  !!errors?.email
                    ? "border-red-500 focus:border-red-500"
                    : "border-white/20"
                }`}
              />

              {!!errors?.email && (
                <div role="alert" className="mt-1 text-sm text-red-500">
                  {errors?.email.message}
                </div>
              )}
            </div>

            {/* password */}
            <div className="mb-6">
              <label htmlFor="password" className="block mb-2">
                Password
              </label>
              <input
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters long",
                  },
                })}
                id="password"
                type="password"
                name="password"
                className={`w-full p-3 bg-[#030317] border  rounded-md focus:outline-none focus:border-indigo-500 ${
                  !!errors?.password
                    ? "border-red-500 focus:border-red-500"
                    : "border-white/20"
                }`}
              />

              {!!errors?.password && (
                <div role="alert" className="mt-1 text-sm text-red-500">
                  {errors?.password.message}
                </div>
              )}
            </div>

            {/* submit */}
            <div className="mb-6">
              <button
                type="submit"
                className="w-full p-3 text-white transition-all duration-200 bg-indigo-600 rounded-md hover:bg-indigo-700"
              >
                Create Account
              </button>
            </div>

            <p className="text-center">
              Already have account?{" "}
              <Link to="/login" className="text-indigo-600 hover:underline">
                Login
              </Link>
            </p>
          </form>
        </div>
      </section>
    </main>
  );
};

export default Register;
