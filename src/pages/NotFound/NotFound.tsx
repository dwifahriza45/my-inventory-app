import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-900 via-gray-900 to-black px-6">
      <div className="text-center max-w-md">
        <h1 className="text-8xl font-extrabold text-white tracking-widest">
          404
        </h1>

        <p className="mt-4 text-xl font-semibold text-gray-200">
          Page Not Found
        </p>

        <p className="mt-2 text-gray-400">
          Sorry, the page you are looking for may have moved or is
          unavailable.
        </p>

        <Link
          to="/login"
          className="inline-block mt-8 rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all duration-200 hover:bg-indigo-500 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        >
          ← Back
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
