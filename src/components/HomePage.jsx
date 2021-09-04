import Recipe from "./Recipe";

const HomePage = ({ recipes, loading, error }) => {
  return (
    <div className="py-8 container mx-auto flex flex-wrap justify-center gap-10">
      {recipes.length === 0 && !loading && !error ? (
        <div>
          <p className="lg:text-4xl text-xl text-center text-white font-semibold">
            Nothing to show, please search something!
          </p>
        </div>
      ) : null}
      {loading && (
        <p className=" text-white font-semibold">
          {error ? error : "Loading..."}
        </p>
      )}
      {recipes?.length > 0 &&
        recipes.map((recipe) => <Recipe recipe={recipe} key={recipe.id} />)}
    </div>
  );
};

export default HomePage;
