import { useContext } from "react";
import { AnimeContext } from "../context/AnimeContextValue.js";

export function useAnime() {
	return useContext(AnimeContext);
}
