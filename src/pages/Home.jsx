import React from "react";
import { useApi } from "../hooks/useApi";
import { fetchTopAnime } from "../services/api";
import { useAnime } from "../hooks/useAnime";
import { useNavigate } from "react-router-dom";
import AnimeCarousel from "../components/AnimeCarousel";
import "../styles/Home.css";

// Grouper les animes par genre
const groupByCategory = (animes) => {
  const grouped = {};
  animes.forEach((anime) => {
    anime.genres?.forEach((genre) => {
      if (!grouped[genre]) grouped[genre] = [];
      grouped[genre].push(anime);
    });
  });
  return grouped;
};

export default function Home() {
  const { data: topData, loading, error } = useApi(fetchTopAnime, [], true);
  const { addToWatchlist } = useAnime();
  const navigate = useNavigate();

  if (loading) return <p className="loading-text">Chargement...</p>;
  if (error) return <p className="error-text">Erreur : {error.message}</p>;

  const animes = topData || [];
  const groupedAnimes = groupByCategory(animes);

  const handleWatch = (anime) => navigate(`/anime/${anime.id}`);

  return (
    <div className="home-container">
      {/* Hero / Carrousel */}
      <section className="home-hero">
        <h1 className="home-title">Bienvenue sur Anistream</h1>
        <p className="home-subtitle">Découvre les animés les plus populaires.</p>
        {animes.length > 0 ? (
          <AnimeCarousel animes={animes.slice(0, 8)} onWatch={handleWatch} />
        ) : (
          <p className="no-anime-text">Aucun anime pour le moment.</p>
        )}
      </section>

      {/* Sections par genre */}
      {Object.keys(groupedAnimes).map((category) => (
        <section key={category} className="home-category-section">
          <h2 className="home-category-title">{category}</h2>
          <div className="home-category-list">
            {groupedAnimes[category].map((anime) => (
              <div
                key={anime.id}
                onClick={() => handleWatch(anime)}
                className="anime-card"
              >
                <img
                  src={anime.coverImage?.large || anime.coverImage?.medium}
                  alt={anime.title?.romaji || anime.title?.english}
                  className="anime-image"
                />
                <h3 className="anime-title">{anime.title?.romaji || anime.title?.english}</h3>
                <p className="anime-score">⭐ {anime.averageScore || "-"}</p>
                <div className="anime-actions">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      addToWatchlist(anime);
                    }}
                    className="btn-add"
                  >
                    Ajouter
                  </button>
                  {anime.trailer?.id && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open(`https://www.youtube.com/watch?v=${anime.trailer.id}`, "_blank");
                      }}
                      className="btn-watch"
                    >
                      Regarder
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
