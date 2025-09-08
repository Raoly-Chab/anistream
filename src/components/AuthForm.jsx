import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import "../styles/AuthForm.css";

export default function AuthForm({ modeDefault = "login" }) {
  const { login, signup, resetPassword, user } = useAuth();
  const navigate = useNavigate();
  const [mode, setMode] = useState(modeDefault);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pseudo, setPseudo] = useState("");
  const [avatar, setAvatar] = useState(
    `https://api.dicebear.com/7.x/bottts/svg?seed=${Math.random().toString(36).substring(2, 8)}`
  );
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    setMode(modeDefault);
  }, [modeDefault]);

  const handleAvatar = () => {
    setAvatar(
      `https://api.dicebear.com/7.x/bottts/svg?seed=${Math.random().toString(36).substring(2, 8)}`
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setMessage("");
    setLoading(true);
    try {
      if (mode === "login") {
        const { user, error } = await login(email, password);
        if (!error && user) {
          setMessage("Connexion réussie !");
          navigate("/profile");
        } else if (error) {
          setError(error.message || "Erreur de connexion");
        }
      } else if (mode === "signup") {
        if (!pseudo.trim()) return setError("Veuillez choisir un pseudo.");
        const { user, error } = await signup(email, password);
        if (!error && user) {
          setMessage("Inscription réussie ! Vérifiez vos mails.");
        } else if (error) {
          setError(error.message || "Erreur d'inscription");
        }
      } else if (mode === "reset") {
        if (!email) return setError("Veuillez saisir votre email pour réinitialiser le mot de passe.");
        await resetPassword(email);
        setMessage("Email de réinitialisation envoyé !");
      }
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  if (user) {
    return (
      <div className="auth-form">
        Connecté en tant que <b>{user.email}</b>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <h2>
        {mode === "login" && "Connexion"}
        {mode === "signup" && "Créer un compte"}
        {mode === "reset" && "Mot de passe oublié"}
      </h2>

      {mode === "signup" && (
        <div className="auth-avatar-container">
          <img src={avatar} alt="avatar" />
          <button type="button" onClick={handleAvatar}>Changer d'avatar</button>
          <input
            className="auth-input"
            value={pseudo}
            onChange={(e) => setPseudo(e.target.value)}
            placeholder="Pseudo"
            maxLength={20}
            required
          />
        </div>
      )}

      <div>
        <label>Email</label>
        <input
          type="email"
          className="auth-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      {mode !== "reset" && (
        <div>
          <label>Mot de passe</label>
          <input
            type="password"
            className="auth-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
      )}

      {error && <p className="auth-error">{error}</p>}
      {message && <div className="auth-message">{message}</div>}

      <button type="submit" className="auth-btn" disabled={loading}>
        {loading
          ? "Chargement..."
          : mode === "login"
          ? "Se connecter"
          : mode === "signup"
          ? "Créer un compte"
          : "Envoyer le lien"}
      </button>

      <div className="auth-footer">
        {mode === "login" && (
          <>
            Pas encore de compte ? <Link to="/signup">S'inscrire</Link>
            <br />
            <Link to="/reset">Mot de passe oublié ?</Link>
          </>
        )}
        {mode === "signup" && (
          <>
            Déjà inscrit ? <Link to="/login">Se connecter</Link>
          </>
        )}
        {mode === "reset" && (
          <>
            <Link to="/login">Retour à la connexion</Link>
          </>
        )}
      </div>
    </form>
  );
}
