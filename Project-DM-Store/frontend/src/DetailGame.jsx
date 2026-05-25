import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_URL = 'http://127.0.0.1:3000/api';

function DetailGame({ games }) {
  const { slug } = useParams();
  const navigate = useNavigate();

  const gameAktif = games.find(g => g.slug === slug) || { name: slug };

  // Form States
  const [userId, setUserId] = useState('');
  const [userServer, setUserServer] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedPayment, setSelectedPayment] = useState('QRIS');

  // Daftar Nominal Diamond
  const daftarNominal = [
    { id: 1, name: 'Weekly Diamond Pass (PROMO)', price: 'Rp 27.777' },
    { id: 2, name: '518 (467+51) Diamonds', price: 'Rp 138.888' },
    { id: 3, name: '1048 (946+112) Diamonds', price: 'Rp 274.444' },
    { id: 4, name: 'Weekly Elite Pack', price: 'Rp 14.088' },
    { id: 5, name: '5 (5+0) Diamonds', price: 'Rp 1.521' },
    { id: 6, name: '12 (11+1) Diamonds', price: 'Rp 3.082' },
  ];

  // Daftar Metode Pembayaran
  const metodePembayaran = ['QRIS', 'GoPay', 'DANA', 'OVO', 'Bank Transfer', 'ShopeePay'];

  const handleOrderSubmit = (e) => {
    e.preventDefault();
    if (!userId || !userServer || !selectedItem || !whatsapp) {
      alert("Harap isi semua data langkah berurutan terlebih dahulu!");
      return;
    }

    const payload = {
      nama: `${userId} (${userServer})`,
      game: gameAktif.name,
      nominal: selectedItem.name,
      whatsapp: whatsapp,
      status: 'Pending'
    };

    axios.post(`${API_URL}/tambah`, payload)
      .then((res) => {
        alert("Transaksi Berhasil Diproses!\n" + res.data);
        setUserId('');
        setUserServer('');
        setWhatsapp('');
        setSelectedItem(null);
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="container-detail">
      
      {/* ─── KOLOM KIRI: INFORMASI UTAMA GAME ─── */}
      <div className="game-info-sidebar">
        <button 
          onClick={() => navigate('/')} 
          style={{ background: 'transparent', border: '1px solid #eefb13', color: '#eefb13', padding: '8px 14px', borderRadius: '8px', cursor: 'pointer', marginBottom: '20px', fontWeight: '600', fontSize: '13px' }}
        >
          ← Kembali
        </button>
        {gameAktif.img && <img src={gameAktif.img} alt={gameAktif.name} className="game-banner" />}
        <div className="game-title-text">{gameAktif.name}</div>
        <div className="game-desc">
          Beli top up {gameAktif.name} termurah, aman, dan instan hanya di Zerostore. 
          Proses otomatis 24 jam nonstop. Silakan ikuti langkah pengisian di sebelah kanan untuk menyelesaikan pembelian Anda.
        </div>
      </div>

      {/* ─── KOLOM KANAN: PANEL LANGKAH FORMULIR ─── */}
      <div>
        
        {/* LANGKAH 1: DATA AKUN */}
        <div className="step-card">
          <div className="step-header">
            <div className="step-number">1</div>
            <div className="step-title">Masukkan Data Akun</div>
          </div>
          <div className="step-body input-flex-container">
            <div className="input-wrapper">
              <input 
                type="text" 
                placeholder="Masukkan User ID" 
                value={userId} 
                onChange={(e) => setUserId(e.target.value)} 
              />
            </div>
            <div className="input-wrapper">
              <input 
                type="text" 
                placeholder="Masukkan Zone / Server ID" 
                value={userServer} 
                onChange={(e) => setUserServer(e.target.value)} 
              />
            </div>
          </div>
        </div>

        {/* LANGKAH 2: PILIH NOMINAL */}
        <div className="step-card">
          <div className="step-header">
            <div className="step-number">2</div>
            <div className="step-title">Pilih Nominal Top Up</div>
          </div>
          <div className="step-body">
            <div className="nominal-grid-layout">
              {daftarNominal.map((item) => (
                <div 
                  key={item.id} 
                  className={`nominal-box ${selectedItem?.id === item.id ? 'selected' : ''}`}
                  onClick={() => setSelectedItem(item)}
                >
                  <div className="nominal-title">{item.name}</div>
                  <div className="nominal-price-tag">{item.price}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* LANGKAH 3: PILIH PEMBAYARAN */}
        <div className="step-card">
          <div className="step-header">
            <div className="step-number">3</div>
            <div className="step-title">Pilih Metode Pembayaran</div>
          </div>
          <div className="step-body">
            <div className="payment-grid-layout">
              {metodePembayaran.map((pay, i) => (
                <div 
                  key={i} 
                  className={`payment-box ${selectedPayment === pay ? 'selected' : ''}`}
                  onClick={() => setSelectedPayment(pay)}
                >
                  <div className="payment-name">{pay}</div>
                  <div className="payment-logo">E-Wallet</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* LANGKAH 4: KONTAK DETAIL */}
        <div className="step-card">
          <div className="step-header">
            <div className="step-number">4</div>
            <div className="step-title">Masukkan Nomor WhatsApp</div>
          </div>
          <div className="step-body input-wrapper">
            <input 
              type="text" 
              placeholder="Contoh: 081234567890" 
              value={whatsapp}
              onChange={(e) => setWhatsapp(e.target.value)}
            />
          </div>
        </div>

        {/* PANEL AKHIR: RINGKASAN & ACTION BUTTON */}
        <div className="action-panel">
          <div style={{ textAlign: 'left' }}>
            <div style={{ fontSize: '13px', color: '#94a3b8' }}>Produk Terpilih:</div>
            <div style={{ fontSize: '16px', fontWeight: '800', color: '#fff', marginTop: '4px' }}>
              {selectedItem ? `${selectedItem.name} (${selectedItem.price})` : 'Belum memilih produk'}
            </div>
            {userId && (
              <div style={{ fontSize: '12px', color: '#eefb13', marginTop: '2px' }}>
                Target Akun: {userId} {userServer && `(Server ${userServer})`}
              </div>
            )}
          </div>
          <button className="btn-checkout" onClick={handleOrderSubmit}>
            Beli Sekarang!
          </button>
        </div>

      </div>
    </div>
  );
}

export default DetailGame;