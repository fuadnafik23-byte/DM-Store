import React from 'react';
import { useNavigate } from 'react-router-dom';

function Beranda({ games }) {
  const navigate = useNavigate();

  return (
    <div className="container">
      <div className="section-title">Pilih Game Favorit</div>
      <div className="game-grid">
        {games.map((g, index) => (
          <div 
            key={index} 
            className="game-card"
            // PENTING: Saat diklik, pindah halaman ke /game/nama-game
            onClick={() => navigate(`/game/${g.slug}`)}
          >
            <img src={g.img} alt={g.name} />
            <span>{g.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Beranda;