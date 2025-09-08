
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import AnimeDetails from "./pages/AnimeDetails";
import Watchlist from "./pages/Watchlist";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ResetPassword from "./pages/ResetPassword";
import { AnimeProvider } from "./context/AnimeContext";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import Search from "./pages/Search";
import Discover from "./pages/discover"; 
import "./index.css";

function App() {
  return (
    <AuthProvider>
      <AnimeProvider>
        <Router>
          <Navbar />
          <div className="container mx-auto px-2 py-4">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/anime/:id" element={<AnimeDetails />} />
              <Route path="/watchlist" element={<PrivateRoute><Watchlist /></PrivateRoute>} />
              <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/reset" element={<ResetPassword />} />
              <Route path="*" element={<NotFound />} />
              <Route path="/search" element={<Search />} />
              <Route path="/discover" element={<Discover />} />
            </Routes>
          </div>
        </Router>
      </AnimeProvider>
    </AuthProvider>
  );
}

export default App;
