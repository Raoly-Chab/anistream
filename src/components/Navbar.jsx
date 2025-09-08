import React from "react";
import { NavLink } from "react-router-dom";
import { FaSearch, FaUser, FaSignInAlt } from "react-icons/fa";
import Logo from "../assets/A.png";
import { useAuth } from "../hooks/useAuth";

const Navbar = () => {
  const { user, loading } = useAuth();

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px 20px",
        backgroundColor: "#000",
        color: "#fff",
      }}
    >
      {/* Partie gauche : logo + liens */}
      <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
        <NavLink to="/">
          <img src={Logo} alt="Anistream Logo" style={{ height: "40px" }} />
        </NavLink>

        <NavLink to="/discover">Découvrir</NavLink>

        {/* Watchlist visible seulement si connecté */}
        {user && <NavLink to="/watchlist">Watchlist</NavLink>}
      </div>

      {/* Partie droite : icônes */}
      <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
        {/* Icône Recherche */}
        <NavLink to="/search">
          <FaSearch size={20} />
        </NavLink>

        {/* Icône Connexion ou Profil */}
        {!loading &&
          (user ? (
            <NavLink to="/profile" title="Mon Profil" style={{ display: "flex", alignItems: "center", gap: "5px" }}>
              <FaUser size={20} />
          
            </NavLink>
          ) : (
            <NavLink to="/login" title="Connexion" style={{ display: "flex", alignItems: "center", gap: "5px" }}>
              <FaSignInAlt size={20} />       
            </NavLink>
          ))}
      </div>
    </nav>
  );
};

export default Navbar;
