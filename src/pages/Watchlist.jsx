import React from "react";
import { useAnime } from "../hooks/useAnime";
// import WatchlistFilter from "../components/WatchlistFilter";
import "../styles/Watchlist.css";

export default function Watchlist() {
  const { watchlist, removeFromWatchlist } = useAnime();

  const statusGroups = [
    { key: "to_watch", label: "À voir" },
    { key: "watching", label: "En cours" },
    { key: "in_progress", label: "En cours" },
    { key: "completed", label: "Terminé" },
  ];

  return (
    <div className="watchlist-page">
      {/* Dégradé de fond */}
      <div className="watchlist-bg" />

      <div className="container mx-auto max-w-screen-xl py-10 px-4">
        {/* Titre et filtre */}
        <div className="watchlist-header">
          <div>
            <h2 className="watchlist-title">Ma Watchlist</h2>
            <p className="watchlist-subtitle">
              Retrouve tes animés favoris et filtre ta liste facilement.
            </p>
          </div>
          {/* <div className="watchlist-filter-container">
            <WatchlistFilter />
          </div> */}
        </div>

        {/* Affichage de la watchlist groupée par statut */}
        {watchlist.length === 0 ? (
          <div className="watchlist-empty">
            <p>Votre watchlist est vide.</p>
          </div>
        ) : (
          statusGroups.map((group) => {
            const animes = watchlist.filter((a) => a.status === group.key);
            if (!animes.length) return null;
            return (
              <div key={group.key} className="watchlist-group">
                <h3 className="watchlist-group-title">{group.label}</h3>
                <div className="watchlist-grid">
                  {animes
                    .sort((a, b) => (a.title || "").localeCompare(b.title || ""))
                    .map((anime) => (
                      <div
                        key={anime.anime_id}
                        className="watchlist-card"
                        onClick={() => (window.location.href = `/anime/${anime.anime_id}`)}
                      >
                        <div className="watchlist-card-image">
                          <img src={anime.coverImage} alt={anime.title} />
                          <span className="watchlist-card-score">
                            {anime.averageScore || anime.score || "-"}
                          </span>
                        </div>
                        <div className="watchlist-card-title">
                          <h3>{anime.title}</h3>
                        </div>
                        <div className="watchlist-card-actions">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              removeFromWatchlist(anime.anime_id);
                            }}
                          >
                            Supprimer
                          </button>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
