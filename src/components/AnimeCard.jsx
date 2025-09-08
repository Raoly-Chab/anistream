import React from "react";
import { Link } from "react-router-dom";
import { useAnime } from "../hooks/useAnime";
import "../styles/AnimeCard.css";

export default function AnimeCard({ anime }) {
	const { addToWatchlist, watchlist } = useAnime();
	const inWatchlist = watchlist.some((a) => a.anime_id === anime.id);

	const image = anime.coverImage?.large || anime.coverImage?.medium || anime.image_url;
	const title = anime.title?.romaji || anime.title?.english || anime.title?.native || anime.title;
	const score = anime.averageScore || anime.score;

	return (
		<div className="anime-card group glassmorphism" role="article" aria-label={title}>
			<Link
				to={`/anime/${anime.id}`}
				className="block"
				tabIndex={0}
				aria-label={title}
			>
				<img
					src={image}
					alt={title}
					className="anime-image"
				/>
				{score && (
					<span className="score-badge">
						⭐ {score}
					</span>
				)}
				<div className="gradient-hover" />
			</Link>
			<h3 className="home-anime-title">{title}</h3>
			<button
				onClick={() => addToWatchlist(anime)}
				disabled={inWatchlist}
				className={`home-btn-add ${inWatchlist ? 'btn-disabled' : ''}`}
				aria-label={inWatchlist ? "Déjà dans la watchlist" : "Ajouter à la watchlist"}
			>
				{inWatchlist ? "Dans la watchlist" : "Ajouter à la watchlist"}
			</button>
		</div>
	);
}
