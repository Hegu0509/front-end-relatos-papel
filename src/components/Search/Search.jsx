import React, { useContext } from "react";
import { GlobalContext } from "../../context/global/GlobalContext";
import { AuthContext } from "../../context/auth/AuthContext";
import "./Search.css";

const Search = () => {
  const {
    cart,
    darkMode,
    setShowCart,
    setShowLoginMessage,
    searchTerm,
    setSearchTerm,
  } = useContext(GlobalContext);
  const { user } = useContext(AuthContext);

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  const handleSearch = () => {
    setSearchTerm(searchTerm.trim());
  };

  const handleCartClick = () => {
    if (!user) {
      setShowLoginMessage(true);
      return;
    }
    setShowCart(true);
  };

  return (
    <div className={`search ${darkMode ? "dark" : ""}`}>
      <input
        type="search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Buscar por titulo..."
        aria-label="Buscar libros por titulo"
      />
      <button onClick={handleSearch}>Buscar</button>
      <button className="cart" onClick={handleCartClick} aria-label="Abrir carrito">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M17,18C15.89,18 15,18.89 15,20A2,2 0 0,0 17,22A2,2 0 0,0 19,20C19,18.89 18.1,18 17,18M1,2V4H3L6.6,11.59L5.25,14.04C5.09,14.32 5,14.65 5,15A2,2 0 0,0 7,17H19V15H7.42A0.25,0.25 0 0,1 7.17,14.75C7.17,14.7 7.18,14.66 7.2,14.63L8.1,13H15.55C16.3,13 16.96,12.58 17.3,11.97L20.88,5.5C20.95,5.34 21,5.17 21,5A1,1 0 0,0 20,4H5.21L4.27,2M7,18C5.89,18 5,18.89 5,20A2,2 0 0,0 7,22A2,2 0 0,0 9,20C9,18.89 8.1,18 7,18Z" fill="currentColor"/>
        </svg>
        {totalItems > 0 && <span className="cart-count">{totalItems}</span>}
      </button>
    </div>
  );
};

export default Search;
