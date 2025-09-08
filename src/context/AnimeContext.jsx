import { AnimeContext } from "./AnimeContextValue.js";
import { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { addToWatchlist as dbAddToWatchlist, getWatchlist as dbGetWatchlist, removeFromWatchlist as dbRemoveFromWatchlist } from "../services/db";

export function AnimeProvider({ children }) {
       const { user } = useAuth();
       const [watchlist, setWatchlist] = useState([]);
       const [statusFilter, setStatusFilter] = useState("all");
       // Charger la watchlist Dexie de l'utilisateur connecté
       useEffect(() => {
	       if (user && user.id) {
		       dbGetWatchlist(user.id).then(setWatchlist);
	       } else {
		       setWatchlist([]);
	       }
       }, [user]);

       // Ajout d'un anime à la watchlist Dexie
       const addToWatchlist = async (anime, status = "to_watch") => {
	       if (!user || !user.id) return;
	       if (!watchlist.find((a) => a.anime_id === anime.id)) {
		       await dbAddToWatchlist(user.id, {
			       anime_id: anime.id,
			       title: anime.title?.romaji || anime.title?.english || anime.title?.native || anime.title,
			       coverImage: anime.coverImage?.large || anime.coverImage?.medium || anime.image_url,
			       averageScore: anime.averageScore || anime.score || null,
			       status
		       });
		       const updated = await dbGetWatchlist(user.id);
		       setWatchlist(updated);
	       }
       };

       // Mise à jour du statut d'un anime (à compléter si besoin)
       const updateStatus = async (anime_id, status) => {
	       if (!user || !user.id) return;
	       // À implémenter : update dans Dexie si besoin
	       setWatchlist(
		       watchlist.map((a) =>
			       a.anime_id === anime_id ? { ...a, status } : a
		       )
	       );
       };

       // Suppression d'un anime de la watchlist Dexie
       const removeFromWatchlist = async (anime_id) => {
	       if (!user || !user.id) return;
	       await dbRemoveFromWatchlist(user.id, anime_id);
	       const updated = await dbGetWatchlist(user.id);
	       setWatchlist(updated);
       };

       // Filtrage par statut
       const filteredWatchlist =
	       statusFilter === "all"
		       ? watchlist
		       : watchlist.filter((a) => a.status === statusFilter);

       return (
	       <AnimeContext.Provider
		       value={{
			       watchlist,
			       addToWatchlist,
			       updateStatus,
			       removeFromWatchlist,
			       statusFilter,
			       setStatusFilter,
			       filteredWatchlist,
		       }}
	       >
		       {children}
	       </AnimeContext.Provider>
       );
}

// Le hook useAnime doit être défini dans src/hooks/useAnime.js
