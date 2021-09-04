import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div className="container mx-auto flex flex-col items-center">
      <h2 className="lg:text-4xl text-xl text-center text-red-300 font-semibold">
        Nothing in this page
      </h2>

      <Link
        to="/"
        className=" bg-blue-800 text-white p-3 px-8 rounded-md uppercase inline-block mt-2 shadow-lg shadow-cyand-200 hover:bg-cyan-400 hover:text-gray-50 hover:shadow-gray-300 duration-300"
      >
        Go Back To Home.
      </Link>
    </div>
  );
};

export default PageNotFound;
