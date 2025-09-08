import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AnimeCarousel from "../components/AnimeCarousel";
import { useAnime } from "../hooks/useAnime";
import "../styles/Discover.css";
import { fetchTopAnimeAniList, fetchSeasonAnimeAniList } from "../api/anilist";

export default function Discover() {
  const navigate = useNavigate();
  const { addToWatchlist, watchlist } = useAnime();
  const [seasonAnime, setSeasonAnime] = useState([]);
  const [topAnime, setTopAnime] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const date = new Date();
      const month = date.getMonth() + 1;
      let season = "WINTER";
      if (month >= 4 && month <= 6) season = "SPRING";
      else if (month >= 7 && month <= 9) season = "SUMMER";
      else if (month >= 10 && month <= 12) season = "FALL";
      const year = date.getFullYear();

      const seasonData = await fetchSeasonAnimeAniList(season, year, 15);
      setSeasonAnime(seasonData);

      const topData = await fetchTopAnimeAniList(10);
      setTopAnime(topData);

    } catch (err) {
      console.error("Erreur API:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) return (
    <div className="discover-bg min-h-screen flex items-center justify-center">
      <div className="glassmorphism p-8 rounded-2xl shadow-lg text-center animate-fade-in-slow">
        <span className="text-2xl text-white animate-pulse">Chargement des animés...</span>
      </div>
    </div>
  );

  return (
    <div className="discover-bg min-h-screen w-full text-white relative overflow-x-hidden animate-fade-in-slow">
      <div className="fixed inset-0 -z-20 bg-gradient-to-br from-[#1a1333] via-[#23235b] to-[#2d1a3a] animate-gradient-x opacity-90" />
      <div className="fixed inset-0 -z-10 bg-black/30" />

      <div className="container mx-auto px-6 py-12 space-y-16">
        {/* Nouveautés - Carousel */}
        <section>
          <h2 className="home-category-title text-3xl mb-6">✨ Nouveautés de la saison</h2>
          <AnimeCarousel
            animes={seasonAnime.slice(0, 15)}
            onWatch={(anime) => navigate(`/anime/${anime.id}`)}
          />
        </section>

        {/* Top 10 Animes */}
        <section>
          <h2 className="home-category-title text-3xl mb-6">🔥 Top 10 Animes</h2>
          <div className="anime-grid">
            {topAnime.map((anime) => {
              const inWatchlist = watchlist.some(a => a.anime_id === anime.id);
              const image = anime.coverImage?.large || anime.coverImage?.medium || anime.images?.jpg?.image_url;
              const title = anime.title?.romaji || anime.title?.english || anime.title?.native || anime.title;
              const score = anime.averageScore || anime.score;
              return (
                <div
                  key={anime.id}
                  className="anime-card group"
                >
                  <div
                    className="anime-image-wrapper"
                    onClick={() => navigate(`/anime/${anime.id}`)}
                  >
                    <img src={image} alt={title} className="anime-image" />
                    <div className="anime-overlay">
                      <span className="anime-title">{title}</span>
                      <span className="anime-score">⭐ {score || "-"}</span>
                    </div>
                  </div>

                  <div className="anime-actions">
                    <button
                      onClick={() => addToWatchlist(anime)}
                      disabled={inWatchlist}
                      className={`anime-btn ${inWatchlist ? "disabled" : ""}`}
                    >
                      {inWatchlist ? "Dans la watchlist" : "Ajouter"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}
