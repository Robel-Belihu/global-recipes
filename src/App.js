import { useEffect, useRef, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import HomePage from "./components/HomePage";
import Navbar from "./components/Navbar";
import Favourites from "./components/Favourites";
import PageNotFound from "./components/PageNotFound";
import RecipeItem from "./components/RecipeItem";
import Footer from "./components/Footer";

function App() {
  const [searchItem, setSeachItem] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [recipes, setRecipes] = useState([]);
  const [saveItem, setsaveItem] = useState(() => {
    const localData = localStorage.getItem("recipeData");
    return localData ? JSON.parse(localData) : [];
  });
  const input = useRef(null);
  const navigate = useNavigate();
  const handleSearch = (e) => {
    e.preventDefault();

    //api call
    getData(searchItem);

    input.current.blur();
    setSeachItem("");
    setRecipes([]);
    setError("");
    navigate("/");
  };

  // data fatching from api
  const getData = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `https://forkify-api.herokuapp.com/api/v2/recipes?search=${searchItem}`
      );
      if (!res.ok) throw new Error("Oops! something went wrong");
      const data = await res.json();
      if (data.results === 0) {
        throw new Error("0 recipes found. Try different ones");
      }
      setRecipes(data?.data?.recipes);
      setLoading(false);
    } catch (err) {
      setError(err.message);
    }
  };

  const checkLocalData = (data) => {
    const localData = JSON.parse(localStorage.getItem("recipeData"));
    const existingData = localData?.some((item) => item.id === data.id);

    if (!existingData) {
      setsaveItem([...saveItem, data]);
    } else {
      const filterData = localData.filter((item) => item.id !== data.id);
      setsaveItem(filterData);
    }
  };

  const handleFavourites = (id) => {
    fetch(`https://forkify-api.herokuapp.com/api/v2/recipes/${id}`)
      .then((res) => res.json())
      .then((data) => checkLocalData(data.data.recipe));

    navigate("/favourites");
  };

  useEffect(() => {
    localStorage.setItem("recipeData", JSON.stringify(saveItem));
  }, [saveItem]);
  return (
    <>
      <div className="app min-h-screen bg-blue-800 text-gray-600 text-lg">
        <Navbar
          saveItem={saveItem}
          searchItem={searchItem}
          setSeachItem={setSeachItem}
          input={input}
          handleSearch={handleSearch}
        />
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                recipes={recipes}
                setRecipes={setRecipes}
                loading={loading}
                error={error}
              />
            }
          />

          <Route
            path="/favourites"
            element={<Favourites saveItem={saveItem} />}
          />
          <Route
            path="/recipe-item/:id"
            element={
              <RecipeItem
                handleFavourites={handleFavourites}
                saveItem={saveItem}
              />
            }
          />

          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>

      <Footer />
    </>
  );
}

export default App;
