import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

// custom hooks.
import useAuth from "../hooks/useAuth";
import useTitle from "../hooks/useTitle";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const changeTitle = useTitle();
  const { loginUser } = useAuth();

  const submitForm = (data) => {
    loginUser(data);
  };

  useEffect(() => {
    changeTitle("Login");
  }, []);

  return (
    <main>
      <section className="container">
        <div className="w-full md:w-1/2 mx-auto bg-[#030317] p-8 rounded-md mt-12">
          <h2 className="mb-6 text-2xl font-bold">Login</h2>
          <form onSubmit={handleSubmit(submitForm)} autoComplete="off">
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
                Login
              </button>
            </div>

            <p className="text-center">
              Don't have an account?{" "}
              <Link to="/register" className="text-indigo-600 hover:underline">
                Register
              </Link>
            </p>
          </form>
        </div>
      </section>
    </main>
  );
};

export default Login;
