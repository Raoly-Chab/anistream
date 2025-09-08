import React, { useState, useMemo, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchAnimeDetails, fetchTopAnime } from "../services/api";
import { useApi } from "../hooks/useApi";
import { useAnime } from "../hooks/useAnime";
import "../styles/AnimeDetails.css";

export default function AnimeDetails() {
  const { id } = useParams();

  const { data, loading, error } = useApi(fetchAnimeDetails, [id], true);
  const { addToWatchlist, watchlist } = useAnime();
  const [selectedStatus, setSelectedStatus] = useState("to_watch");
  const [fallbackRecommendations, setFallbackRecommendations] = useState([]);

  const anime = useMemo(() => (data ? data.data || data : null), [data]);
  const inWatchlist = useMemo(
    () => (anime ? watchlist.some((a) => a.anime_id === anime.id) : false),
    [anime, watchlist]
  );
  const coverImage = useMemo(
    () => (anime ? anime.coverImage?.large || anime.coverImage?.medium || anime.bannerImage : ""),
    [anime]
  );

  // Recommandations : prendre celles de l'anime sinon fallback
  const recommendations = useMemo(() => {
    let recs = [];
    if (anime?.recommendations?.nodes?.length > 0) {
      recs = anime.recommendations.nodes
        .map((rec) => rec.media)
        .filter((recMedia) => recMedia.id !== anime.id);
    }
    if (recs.length < 4 && fallbackRecommendations.length > 0) {
      const needed = 4 - recs.length;
      const additional = fallbackRecommendations
        .filter((f) => f.id !== anime.id && !recs.find((r) => r.id === f.id))
        .slice(0, needed);
      recs = [...recs, ...additional];
    }
    return recs.slice(0, 4);
  }, [anime, fallbackRecommendations]);

  // Charger fallback si pas assez de recommandations
  useEffect(() => {
    async function loadFallback() {
      try {
  const popular = await fetchTopAnime(10); // récupère 10 animes populaires
        setFallbackRecommendations(popular);
      } catch (err) {
        console.error("Erreur récupération fallback recommandations", err);
      }
    }
    loadFallback();
  }, []);

  if (loading) return <p className="text-fuchsia-300 animate-pulse">Chargement...</p>;
  if (error) return <p className="text-pink-400">{error.message}</p>;
  if (!anime) return <p>Aucun anime trouvé.</p>;

  return (
    <div className="anime-details">
      <div className="anime-details-bg" style={{ backgroundImage: `url(${coverImage})` }} />

      <div className="anime-details-container">
        {/* Poster et actions */}
        <div className="anime-details-poster">
          <img src={coverImage} alt={anime.title?.romaji} className="anime-poster" />

          <div className="anime-actions">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              disabled={inWatchlist}
              className="anime-select"
            >
              <option value="to_watch">À voir</option>
              <option value="in_progress">En cours</option>
              <option value="completed">Terminé</option>
            </select>

            <button
              onClick={() => addToWatchlist(anime, selectedStatus)}
              disabled={inWatchlist}
              className={`anime-btn ${inWatchlist ? "disabled" : ""}`}
            >
              {inWatchlist ? "✔ Dans ma liste" : "➕ Ajouter à ma liste"}
            </button>

            {anime.trailer?.site === "youtube" && anime.trailer?.id && (
              <>
                <a
                  href={`https://www.youtube.com/watch?v=${anime.trailer.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="anime-btn trailer-btn"
                >
                  ▶ Regarder maintenant
                </a>
                <a
                  href={`https://www.crunchyroll.com/fr/search?from=&q=${encodeURIComponent(anime.title?.romaji || anime.title?.english || anime.title?.native || "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="anime-btn trailer-btn"
                  style={{ marginLeft: 8 }}
                >
                  🍊 Voir sur Crunchyroll
                </a>
              </>
            )}
          </div>
        </div>

        {/* Infos principales */}
        <div className="anime-details-info">
          <h1>{anime.title?.romaji || anime.title?.english}</h1>

          <div className="anime-tags">
            {anime.format && <span>{anime.format}</span>}
            {anime.status && <span>{anime.status}</span>}
            {anime.season && <span>{anime.season} {anime.seasonYear}</span>}
            {anime.episodes && <span>{anime.episodes} épisodes</span>}
            {anime.duration && <span>{anime.duration} min/ep</span>}
            {anime.averageScore && <span className="score">⭐ {anime.averageScore}</span>}
            {anime.studios?.nodes?.length > 0 && (
              <span>Studio: {anime.studios.nodes.map(s => s.name).join(", ")}</span>
            )}
          </div>

          <p dangerouslySetInnerHTML={{ __html: anime.description }} />

          <div className="anime-genres">
            {Array.isArray(anime.genres) &&
              anime.genres.map((g, i) => <span key={g || i}>{g}</span>)}
          </div>

          {anime.trailer?.site === "youtube" && anime.trailer?.id && (
            <div className="anime-trailer">
              <h2>🎥 Trailer</h2>
              <iframe
                src={`https://www.youtube.com/embed/${anime.trailer.id}`}
                title="Trailer"
                allowFullScreen
              />
            </div>
          )}

          {/* Recommandations */}
          {recommendations.length > 0 ? (
            <div className="anime-recommendations">
              <h2>🔗 Recommandations</h2>
              <div className="recommendations-grid">
                {recommendations.map((recMedia) => (
                  <a
                    key={recMedia.id}
                    href={`/anime/${recMedia.id}`}
                    className="recommendation-card"
                  >
                    <img
                      src={recMedia.coverImage?.large || recMedia.coverImage?.medium || '/fallback.jpg'}
                      alt={recMedia.title?.romaji || recMedia.title?.english}
                    />
                    <div className="recommendation-title">
                      {recMedia.title?.romaji || recMedia.title?.english}
                    </div>
                  </a>
                ))}
              </div>
            </div>
          ) : (
            <p>Aucune recommandation disponible.</p>
          )}
        </div>
      </div>
    </div>
  );
}
