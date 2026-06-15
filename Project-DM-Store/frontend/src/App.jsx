import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Beranda from './Beranda';
import DetailGame from './DetailGame';
import './App.css';

function App() {
  // MASTER DATA: Sekarang nominal sudah menyatu dengan game masing-masing
  const dataGames = [
    { 
      name: 'Mobile Legends', 
      slug: 'mobile-legends', 
      img: 'https://i.scdn.co/image/ab6761610000e5eb1698da6a6a04bf2edc35ed94',
      nominal: [
        { id: 1, name: 'Weekly Diamond Pass (PROMO)', price: 'Rp 27.777' },
        { id: 2, name: '518 (467+51) Diamonds', price: 'Rp 138.888' },
        { id: 3, name: '1048 (946+112) Diamonds', price: 'Rp 274.444' },
        { id: 4, name: 'Weekly Elite Pack', price: 'Rp 14.088' },
        { id: 5, name: '5 (5+0) Diamonds', price: 'Rp 1.521' },
        { id: 6, name: '12 (11+1) Diamonds', price: 'Rp 3.082' },
      ]
    },
    { 
      name: 'Free Fire', 
      slug: 'free-fire', 
      img: 'https://cdn-bgp.bluestacks.com/BGP/id/gametiles_com.dts.freefireth.jpg',
      nominal: [
        { id: 1, name: '5 Diamonds', price: 'Rp 965' },
        { id: 2, name: '12 Diamonds', price: 'Rp 1.930' },
        { id: 3, name: '50 Diamonds', price: 'Rp 7.250' },
        { id: 4, name: '70 Diamonds', price: 'Rp 9.645' },
        { id: 5, name: 'Member Mingguan', price: 'Rp 29.447' },
        { id: 6, name: 'Member Bulanan', price: 'Rp 88.270' },
      ]
    },
    { 
      name: 'PUBG Mobile', 
      slug: 'pubg-mobile', 
      img: 'https://static0.xdaimages.com/wordpress/wp-content/uploads/2018/06/pubg.jpg',
      nominal: [
        { id: 1, name: '60 UC', price: 'Rp 14.500' },
        { id: 2, name: '325 UC', price: 'Rp 72.000' },
        { id: 3, name: '660 UC', price: 'Rp 145.000' },
        { id: 4, name: '1.650 UC', price: 'Rp 365.000' },
        { id: 5, name: '3.300 UC', price: 'Rp 725.000' },
        { id: 6, name: '6.600 UC', price: 'Rp 1.450.000' },
        { id: 7, name: '12.000 UC', price: 'Rp 2.650.000' },
        { id: 8, name: '25.000 UC', price: 'Rp 5.000.000' },
        { id: 9, name: '50.000 UC', price: 'Rp 9.500.000' },
      ]
    },
  ];

  return (
    <Router>
      <nav className="navbar">
        <Link to="/" className="logo" style={{ textDecoration: 'none' }}>ZEROSTORE</Link>
        <a 
          href="https://wa.me/6285857430930" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="whatsapp-link"
        >
          KONTAK
        </a>
      </nav>
      
      <Routes>
        <Route path="/" element={<Beranda games={dataGames} />} />
        <Route path="/game/:slug" element={<DetailGame games={dataGames} />} />
      </Routes>
    </Router>
  );
}

export default App;