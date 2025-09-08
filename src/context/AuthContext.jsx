import { AuthContext } from "./AuthContextValue.js";
import { useState, useEffect } from "react";
import { addUser, getUserByEmail, updateUser } from "../services/db";

export function AuthProvider({ children }) {
	const [user, setUser] = useState(null); // Auth user (id, email...)
	const [profile, setProfile] = useState(null); // Profil complet (table users)
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);


	// Auth persistante avec Dexie (IndexedDB)
	useEffect(() => {
			const stored = localStorage.getItem("anistream_user");
			if (stored) {
				const u = JSON.parse(stored);
				setUser(u);
				setProfile({ username: u.username, avatar_url: u.avatar_url });
			}
			setLoading(false);
	}, []);

	// Supabase auth logic has been removed for offline mode
	// const { data: listener } = supabase.auth.onAuthStateChange(async (_event, session) => {
	// 	...
	// });
	// return () => {
	// 	listener.subscription.unsubscribe();
	// };


	// Login avec Dexie
	const login = async (email, password) => {
			setLoading(true);
			setError(null);
			const user = await getUserByEmail(email);
			if (!user) {
				setError("Utilisateur non trouvé");
				setLoading(false);
				return { user: null, error: "Utilisateur non trouvé" };
			}
			if (user.password !== password) {
				setError("Mot de passe incorrect");
				setLoading(false);
				return { user: null, error: "Mot de passe incorrect" };
			}
			setUser(user);
			setProfile({ username: user.username, avatar_url: user.avatar_url });
			localStorage.setItem("anistream_user", JSON.stringify(user));
			setLoading(false);
			return { user, error: null };
	};

	// Signup avec Dexie
	const signup = async (email, password, username = null, avatar_url = null) => {
			setLoading(true);
			setError(null);
			const exists = await getUserByEmail(email);
			if (exists) {
				setError("Email déjà utilisé");
				setLoading(false);
				return { user: null, error: "Email déjà utilisé" };
			}
			const id = await addUser({ email, password, username: username || email.split("@")[0], avatar_url });
			const user = await getUserByEmail(email);
			setUser(user);
			setProfile({ username: user.username, avatar_url: user.avatar_url });
			localStorage.setItem("anistream_user", JSON.stringify(user));
			setLoading(false);
			return { user, error: null };
	};


	// Update profile (username, avatar, etc.)
	const updateProfile = async (updates) => {
		if (!user) return { error: "Non connecté" };
		setLoading(true);
		await updateUser(user.id, updates);
		const updated = await getUserByEmail(user.email);
		setUser(updated);
		setProfile({ username: updated.username, avatar_url: updated.avatar_url });
		localStorage.setItem("anistream_user", JSON.stringify(updated));
		setLoading(false);
		return { user: updated, error: null };
	};

	// Logout
	const logout = async () => {
		setLoading(true);
		setUser(null);
		setProfile(null);
		localStorage.removeItem("anistream_user");
		setLoading(false);
	};

		return (
			<AuthContext.Provider value={{ user, profile, loading, error, login, signup, logout, updateProfile }}>
				{children}
			</AuthContext.Provider>
		);
}

// Le hook useAuth doit être défini dans src/hooks/useAuth.js
