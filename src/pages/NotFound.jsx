const NotFound = () => {
  return (
    <div className="container grid h-[calc(100vh-210px)] place-items-center">
      <div className="text-center ">
        <h1 className="mb-4 text-6xl font-semibold text-red-500">404</h1>
        <p className="mb-4 text-2xl text-gray-600">
          Oops! Looks like you're lost.
        </p>
        <div className="py-4 animate-bounce">
          <svg
            className="w-16 h-16 mx-auto text-red-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
            />
          </svg>
        </div>
        <p className="mt-4 text-lg text-gray-600">
          Let's get you back{" "}
          <a href="/" className="text-blue-500">
            Home
          </a>
          .
        </p>
      </div>
    </div>
  );
};

export default NotFound;
