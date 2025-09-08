import React, { useState } from "react";
import { searchAnime } from "../services/api";
import { useApi } from "../hooks/useApi";
import AnimeList from "../components/AnimeList";
import "../styles/Search.css";

export default function Search() {
  const [query, setQuery] = useState("");
  const { data, loading, error, execute: search } = useApi(searchAnime, [query], false);

  const handleInput = (e) => setQuery(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) search(query);
  };

  return (
    <div className="search-page">
      <div className="search-container glassmorphism">
        <h1 className="search-title">Recherche d'animés</h1>
        <p className="search-subtitle">Trouvez vos animés préférés grâce à AniList !</p>

        <form onSubmit={handleSubmit} className="search-form">
          <input
            type="text"
            value={query}
            onChange={handleInput}
            placeholder="Tapez le nom d'un anime..."
            className="search-input"
            aria-label="Recherche d'anime"
          />
          <button
            type="submit"
            className="search-btn"
            disabled={loading || !query.trim()}
          >
            {loading ? "Recherche..." : "Rechercher"}
          </button>
        </form>

        {error && <div className="search-error">{error.message}</div>}

        {data && <AnimeList animes={data} />}

        {!data && !loading && !error && (
          <div className="search-placeholder">
            Entrez un nom d'anime pour commencer la recherche.
          </div>
        )}
      </div>
    </div>
  );
}
