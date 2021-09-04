import { Link } from "react-router-dom";

const Recipe = ({ recipe }) => {
  return (
    <div className="recipe flex flex-col w-60 overflow-hidden p-5 bg-blue-300 shadow-xl shadow-blue-100 gap-5 border-2 rounded-md">
      <div className="recipe-img h-40 flex justify-center  overflow-hidden items-center rounded-xl">
        <img src={recipe.image_url} className="w-full block  " alt="" />
      </div>
      <div className="recipe-text">
        <span className="recipe-publisher text-sm text-blue-500 font-medium">
          {recipe.publisher}
        </span>
        <h4 className="recipe-title text-2xl truncate font-semibold text-blue-800">
          {recipe.title}
        </h4>
        <Link
          to={`/recipe-item/${recipe.id}`}
          className="text-white p-3 px-8 rounded-lg text-sm uppercase font-medium tracking-wider mt-2 bg-gradient-to-b bg-blue-600  inline-block  shadow-md  shadow-blue-200 hover:shadow-lg hover:shadow-blue-300 "
        >
          View Recipe
        </Link>
      </div>
    </div>
  );
};

export default Recipe;
