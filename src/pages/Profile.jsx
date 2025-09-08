import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { Navigate } from "react-router-dom";
// import { updateUserProfile } from "../services/supabase";
import "../styles/Profile.css";

export default function Profile() {
  const { user, profile, loading, logout, updateProfile } = useAuth();
  const [edit, setEdit] = useState(false);
  const [pseudo, setPseudo] = useState(profile?.username || "");
  const [avatar, setAvatar] = useState(profile?.avatar_url || "https://api.dicebear.com/7.x/bottts/svg?seed=otaku");
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");

  if (loading) return <div className="profile-loading">Chargement...</div>;
  if (!user) return <Navigate to="/login" />;

  const handleSave = async () => {
    setSaving(true);
    setMsg("");
    const { error } = await updateProfile({ username: pseudo, avatar_url: avatar });
    setSaving(false);
    setEdit(false);
    setMsg(error ? "Erreur lors de la sauvegarde" : "Profil mis à jour !");
  };

  const handleAvatar = () => {
    setAvatar(`https://api.dicebear.com/7.x/bottts/svg?seed=${Math.random().toString(36).substring(2, 8)}`);
  };

  return (
    <div className="profile-page">
      <div className="profile-background" />
      <div className="profile-card">
        <div className="profile-avatar-border">
          <img src={avatar} alt="avatar" className="profile-avatar" />
        </div>

        {edit ? (
          <>
            <input
              className="profile-input"
              value={pseudo}
              onChange={e => setPseudo(e.target.value)}
              placeholder="Pseudo"
              maxLength={20}
            />
            <button className="profile-avatar-btn" onClick={handleAvatar}>Changer d'avatar</button>

            <div className="profile-btn-group">
              <button
                className="profile-btn-save"
                onClick={handleSave}
                disabled={saving}
              >
                {saving ? "Sauvegarde..." : "Enregistrer"}
              </button>
              <button
                className="profile-btn-cancel"
                onClick={() => setEdit(false)}
                disabled={saving}
              >
                Annuler
              </button>
            </div>
          </>
        ) : (
          <>
            <h2 className="profile-name">{profile?.username || user.email}</h2>
            <span className="profile-username">@{profile?.username || user.email?.split("@")[0]}</span>

            <div className="profile-btn-group">
              <button className="profile-btn-edit" onClick={() => setEdit(true)}>
                Modifier profil
              </button>
              <button className="profile-btn-logout" onClick={logout}>
                Se déconnecter
              </button>
            </div>
          </>
        )}

        {msg && <div className="profile-msg">{msg}</div>}
      </div>
    </div>
  );
}
