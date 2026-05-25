import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Beranda from './Beranda';
import DetailGame from './DetailGame';
import './App.css';

function App() {
  // Master data game beserta SLUG URL-nya (menggunakan huruf kecil & tanda hubung)
  const dataGames = [
    { name: 'Mobile Legends', slug: 'mobile-legends', img: 'https://i.scdn.co/image/ab6761610000e5eb1698da6a6a04bf2edc35ed94' },
    { name: 'Free Fire', slug: 'free-fire', img: 'https://cdn-bgp.bluestacks.com/BGP/id/gametiles_com.dts.freefireth.jpg' },
    { name: 'PUBG Mobile', slug: 'pubg-mobile', img: 'https://static0.xdaimages.com/wordpress/wp-content/uploads/2018/06/pubg.jpg' },
  ];

  return (
    <Router>
      {/* NAVBAR AKAN SELALU MUNCUL DI SETIAP HALAMAN */}
      <nav className="navbar">
        <Link to="/" className="logo" style={{ textDecoration: 'none' }}>ZEROSTORE</Link>
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