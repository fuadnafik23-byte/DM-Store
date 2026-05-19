import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Beranda from './Beranda';
import DetailGame from './DetailGame';
import './App.css';

function App() {
  // Master data game beserta SLUG URL-nya (menggunakan huruf kecil & tanda hubung)
  const dataGames = [
    { name: 'Mobile Legends', slug: 'mobile-legends', img: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=400&auto=format&fit=crop' },
    { name: 'Free Fire', slug: 'free-fire', img: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=400&auto=format&fit=crop' },
    { name: 'PUBG Mobile', slug: 'pubg-mobile', img: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?q=80&w=400&auto=format&fit=crop' },
    { name: 'Genshin Impact', slug: 'genshin-impact', img: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?q=80&w=400&auto=format&fit=crop' },
    { name: 'Valorant', slug: 'valorant', img: 'https://images.unsplash.com/photo-1560253023-3ec5d502959f?q=80&w=400&auto=format&fit=crop' }
  ];

  return (
    <Router>
      {/* NAVBAR AKAN SELALU MUNCUL DI SETIAP HALAMAN */}
      <nav className="navbar">
        <Link to="/" className="logo" style={{ textDecoration: 'none' }}>⚔️ TAKAPEDIA</Link>
        <div className="nav-links">
          <Link to="/">Semua Game</Link>
          <a href="#">Masuk</a>
        </div>
      </nav>

      {/* SISTEM NAVIGASI HALAMAN */}
      <Routes>
        {/* Jalur Utama: Membuka Halaman Beranda */}
        <Route path="/" element={<Beranda games={dataGames} />} />
        
        {/* Jalur Dinamis: Membuka Halaman Detail Game berdasarkan Slug */}
        <Route path="/game/:slug" element={<DetailGame games={dataGames} />} />
      </Routes>
    </Router>
  );
}

export default App;