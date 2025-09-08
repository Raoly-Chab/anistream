import React from "react";
import AnimeCard from "./AnimeCard";

export default function AnimeList({ animes }) {
	if (!animes || animes.length === 0)
		return <p className="text-white text-center py-8">Aucun anime trouvé.</p>;
	return (
		<div className="w-full max-w-6xl mx-auto px-2 md:px-4 py-4">
			<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
				{animes.map((anime) => (
					<AnimeCard key={anime.id} anime={anime} />
				))}
			</div>
		</div>
	);
}
