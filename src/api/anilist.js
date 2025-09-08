/**
 * Nouveautés de la saison (seasonal anime)
 */
export async function fetchSeasonAnimeAniList(season, seasonYear, perPage = 15) {
  const query = `
    query ($season: MediaSeason, $seasonYear: Int, $perPage: Int) {
      Page(perPage: $perPage) {
        media(season: $season, seasonYear: $seasonYear, type: ANIME, sort: POPULARITY_DESC) {
          id
          title { romaji english native }
          coverImage { large medium }
          bannerImage
          episodes
          format
          status
          averageScore
          siteUrl
        }
      }
    }
  `;
  const data = await anilistQuery(query, { season, seasonYear, perPage });
  return data.Page.media;
}
// src/api/anilist.js
const API_URL = "https://graphql.anilist.co";

/**
 * Fonction pour envoyer des requêtes GraphQL à AniList
 */
async function anilistQuery(query, variables = {}) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json", "Accept": "application/json" },
    body: JSON.stringify({ query, variables }),
  });

  const json = await res.json();
  if (json.errors) throw new Error(json.errors.map(e => e.message).join(", "));
  return json.data;
}

/**
 * Recherche d'animes
 */
export async function searchAnimeAniList(search, perPage = 10) {
  const query = `
    query ($search: String, $perPage: Int) {
      Page(perPage: $perPage) {
        media(search: $search, type: ANIME) {
          id
          title { romaji english native }
          coverImage { large medium }
          genres
          averageScore
          trailer { id site }
        }
      }
    }
  `;
  const data = await anilistQuery(query, { search, perPage });
  return data.Page.media;
}

/**
 * Détails d'un anime
 */
export async function fetchAnimeDetailsAniList(id) {
  const query = `
    query ($id: Int) {
      Media(id: $id, type: ANIME) {
        id
        title { romaji english native }
        coverImage { large medium }
        bannerImage
        genres
        episodes
        duration
        averageScore
        status
        description
        trailer { id site }
        recommendations { nodes { media { id title { romaji } coverImage { large medium } } } }
      }
    }
  `;
  const data = await anilistQuery(query, { id });
  return data.Media;
}

/**
 * Top animes (par popularité)
 */
export async function fetchTopAnimeAniList(perPage = 20) {
  const query = `
    query ($perPage: Int) {
      Page(perPage: $perPage) {
        media(type: ANIME, sort: POPULARITY_DESC) {
          id
          title { romaji english native }
          coverImage { large medium }
          genres
          averageScore
          trailer { id site }
        }
      }
    }
  `;
  const data = await anilistQuery(query, { perPage });
  return data.Page.media;
}
