import { NavLink } from "react-router-dom";

const Navbar = ({
  handleSearch,
  searchItem,
  setSeachItem,
  input,
  saveItem,
}) => {
  const navActive = ({ isActive }) => {
    return {
      color: isActive ? "#002D62" : null,
    };
  };

  return (
    <nav className="navbar flex justify-between items-center py-8 container mx-auto flex-col lg:flex-row gap-5 lg:gap-0 ">
      <h2 className="brand text-2xl font-bold text-center text-white ">
        Global Recipes
      </h2>

      <form className="search-bar" onSubmit={handleSearch}>
        <input
          type="search"
          ref={input}
          value={searchItem}
          onChange={(e) => setSeachItem(e.target.value)}
          className="bg-white p-3 px-8 rounded-md outline-none lg:w-96 shadow-lg focus:shadow-blue-400 "
          placeholder="Search Items...."
        />
      </form>
      <ul className="flex gap-5 ">
        <li>
          <NavLink
            end
            to="/"
            style={navActive}
            className="text-white hover:text-gray-700 duration-300 "
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/favourites"
            style={navActive}
            className="text-white hover:text-gray-600 duration-300  "
          >
            Favourites({saveItem.length})
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
