// Utilitaire pour réinitialiser toute la base Dexie (à utiliser pour debug)
export async function clearAllData() {
  await db.users.clear();
  await db.watchlist.clear();
}
// src/services/db.js
import Dexie from 'dexie';

// Création de la base Dexie
export const db = new Dexie('anistream');
db.version(1).stores({
  users: '++id, email, password, username, avatar_url',
  watchlist: '++id, user_id, anime_id, title, coverImage',
});

// Utilitaires pour les users
export async function addUser({ email, password, username, avatar_url }) {
  return db.users.add({ email, password, username, avatar_url });
}

export async function getUserByEmail(email) {
  return db.users.where('email').equals(email).first();
}

export async function updateUser(id, updates) {
  return db.users.update(id, updates);
}

// Utilitaires pour la watchlist
export async function addToWatchlist(user_id, anime) {
  return db.watchlist.add({ user_id, ...anime });
}

export async function getWatchlist(user_id) {
  return db.watchlist.where('user_id').equals(user_id).toArray();
}

export async function removeFromWatchlist(user_id, anime_id) {
  return db.watchlist.where({ user_id, anime_id }).delete();
}
