import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
		return (
			<div className="min-h-screen w-full font-sans text-white flex flex-col items-center justify-center px-4 relative" style={{fontFamily: 'Poppins, Inter, Nunito, sans-serif'}}>
				{/* Dégradé animé en fond */}
				<div className="fixed inset-0 -z-10 animate-gradient-x bg-gradient-to-br from-[#1a1333] via-[#23235b] to-[#2d1a3a] opacity-90" style={{background: 'linear-gradient(120deg, #1a1333 0%, #23235b 50%, #2d1a3a 100%)'}} />
				<div className="bg-white/10 rounded-2xl shadow-2xl p-10 text-center max-w-md w-full backdrop-blur border border-white/10">
					<span className="text-7xl mb-4 block animate-bounce" role="img" aria-label="Erreur">😢</span>
					<h1 className="text-4xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-400 via-blue-400 to-pink-400 drop-shadow-lg">Page non trouvée</h1>
					<p className="mb-6 text-white/80">Oups, cette page n'existe pas ou a été déplacée.</p>
					<Link
						to="/"
						className="inline-block px-6 py-3 rounded-full font-bold bg-gradient-to-r from-fuchsia-500 to-blue-500 text-white shadow-lg hover:scale-105 hover:from-blue-500 hover:to-fuchsia-500 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-fuchsia-400"
						aria-label="Retour à l'accueil"
					>
						Retour à l'accueil
					</Link>
				</div>
			</div>
		);
}
