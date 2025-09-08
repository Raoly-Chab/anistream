export function formatScore(score) {
	return `${score} pts`;
}

export function getStatusLabel(status) {
	switch (status) {
		case "to_watch":
			return "À voir";
		case "watching":
			return "En cours";
		case "completed":
			return "Terminé";
		default:
			return "Inconnu";
	}
}

export function getStatsByStatus(watchlist) {
	return watchlist.reduce(
		(acc, anime) => {
			acc[anime.status] = (acc[anime.status] || 0) + 1;
			return acc;
		},
		{ to_watch: 0, watching: 0, completed: 0 }
	);
}
