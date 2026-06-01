import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_URL = 'http://127.0.0.1:3000/api';

function DetailGame({ games }) {
  const { slug } = useParams();
  const navigate = useNavigate();

  const gameAktif = games.find(g => g.slug === slug) || { name: slug, nominal: [] };

  // ─── FORM STATES ───
  const [userId, setUserId] = useState('');
  const [userServer, setUserServer] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedPayment, setSelectedPayment] = useState('QRIS');

  // ─── POP-UP & WARNING STATES ───
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showQRCode, setShowQRCode] = useState(false);
  const [errorToast, setErrorToast] = useState('');

  useEffect(() => {
    setSelectedItem(null);
    setIsModalOpen(false);
    setShowQRCode(false);
  }, [slug]);

  const metodePembayaran = ['QRIS', 'GoPay', 'DANA', 'OVO', 'Bank Transfer', 'ShopeePay'];

  // Pemicu Klik Tombol "Beli Sekarang!"
  const handlePreOrderCheck = (e) => {
    e.preventDefault();
    
    // Validasi data (Gambar 4)
    if (!userId || !userServer || !selectedItem || !whatsapp) {
      setErrorToast('Silahkan isi data akun terlebih dahulu.');
      // Hilangkan notifikasi otomatis setelah 4 detik
      setTimeout(() => setErrorToast(''), 4000);
      return;
    }

    // Jika data lengkap, buka pop-up Detail Pesanan (Gambar 1)
    setIsModalOpen(true);
    setShowQRCode(false);
  };

  // Pemicu Klik Tombol "Konfirm" di dalam Pop-up (Gambar 2)
  const handleConfirmOrder = () => {
    const payload = {
      nama: `${userId} (${userServer})`,
      game: gameAktif.name,
      nominal: selectedItem.name,
      whatsapp: whatsapp,
      status: 'Pending'
    };

    // Kirim data ke backend terlebih dahulu
    axios.post(`${API_URL}/tambah`, payload)
      .then((res) => {
        // Setelah sukses masuk backend, ganti tampilan ke QR Code (Gambar 2)
        setShowQRCode(true);
      })
      .catch((err) => {
        console.error(err);
        alert("Gagal memproses pesanan ke server.");
      });
  };

  // Fungsi menutup modal total & reset form belanjaan
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setShowQRCode(false);
    setUserId('');
    setUserServer('');
    setWhatsapp('');
    setSelectedItem(null);
  };

  return (
  <div className="container-detail" style={{ position: 'relative', width: '100%' }}>
    
    {/* ─── TOAST ALERT WARNING (GAMBAR 4) ─── */}
    {errorToast && (
      <div className="toast-warning" style={{
        position: 'fixed', top: '20px', left: '50%', transform: 'translateX(-50%)',
        backgroundColor: '#fff', color: '#333', padding: '12px 24px', borderRadius: '8px',
        boxShadow: '0 4px 15px rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', gap: '10px',
        zIndex: 9999, borderLeft: '5px solid #ef4444', fontWeight: '500', fontSize: '14px'
      }}>
        {/* Perbaikan typo: justifyCenter diubah menjadi justifyContent */}
        <span style={{ backgroundColor: '#ef4444', color: '#fff', borderRadius: '50%', width: '18px', height: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px' }}>X</span>
        {errorToast}
      </div>
    )}

    {/* ─── BAGIAN ATAS: INFORMASI UTAMA GAME (IKUT TER-SCROLL KE ATAS) ─── */}
    {/* Menggunakan inline style untuk memaksa posisi 'relative' dan menghilangkan efek 'fixed' dari CSS luar */}
    <div className="game-info-sidebar" style={{ 
      position: 'relative', 
      top: '0', 
      left: '0', 
      width: '100%', 
      display: 'block', 
      marginBottom: '30px',
      height: 'auto'
    }}>
      <button 
        onClick={() => navigate('/')} 
        style={{ background: 'transparent', border: '1px solid #eefb13', color: '#eefb13', padding: '8px 14px', borderRadius: '8px', cursor: 'pointer', marginBottom: '20px', fontWeight: '600', fontSize: '13px' }}
      >
        ← Kembali
      </button>
      
      {gameAktif.img && (
        <img 
          src={gameAktif.img} 
          alt={gameAktif.name} 
          className="game-banner" 
          style={{ 
            position: 'relative', // Memaksa gambar mengikuti aliran scroll normal
            width: '100%', 
            maxHeight: '300px', // Membatasi tinggi gambar agar tidak terlalu besar di layar laptop
            objectFit: 'cover', 
            borderRadius: '16px',
            display: 'block'
          }} 
        />
      )}
      
      {/* Menggunakan style tambahan untuk memastikan teks judul tidak tumpang tindih */}
      <div className="game-title-text" style={{ 
        position: 'relative', 
        fontSize: '28px', 
        fontWeight: '800', 
        color: '#fff', 
        marginTop: '15px',
        zIndex: 1 
      }}>
        {gameAktif.name}
      </div>
      
      <div className="game-desc" style={{ marginTop: '10px', color: '#94a3b8', lineHeight: '1.5' }}>
        Beli top up {gameAktif.name} termurah, aman, dan instan hanya di Zerostore. 
        Proses otomatis 24 jam nonstop. Silakan ikuti langkah pengisian di sebelah kanan untuk menyelesaikan pembelian Anda.
      </div>
    </div>

    {/* ─── BAGIAN BAWAH: PANEL LANGKAH FORMULIR ─── */}
    <div style={{ position: 'relative', width: '100%' }}>
      {/* LANGKAH 1: DATA AKUN */}
      <div className="step-card">
        <div className="step-header">
          <div className="step-number">1</div>
          <div className="step-title">Masukkan Data Akun</div>
        </div>
        <div className="step-body input-flex-container">
          <div className="input-wrapper">
            <input type="text" placeholder="Masukkan User ID" value={userId} onChange={(e) => setUserId(e.target.value)} />
          </div>
          <div className="input-wrapper">
            <input type="text" placeholder="Masukkan Zone / Server ID" value={userServer} onChange={(e) => setUserServer(e.target.value)} />
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
            {(gameAktif.nominal || []).map((item) => (
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
          <input type="text" placeholder="Contoh: 081234567890" value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} />
        </div>
      </div>

      {/* PANEL AKHIR: ACTION BUTTON */}
      <div className="action-panel">
        <div style={{ textAlign: 'left' }}>
          <div style={{ fontSize: '13px', color: '#94a3b8' }}>Produk Terpilih:</div>
          <div style={{ fontSize: '16px', fontWeight: '800', color: '#fff', marginTop: '4px' }}>
            {selectedItem ? `${selectedItem.name} (${selectedItem.price})` : 'Belum memilih produk'}
          </div>
        </div>
        <button className="btn-checkout" onClick={handlePreOrderCheck}>
          Beli Sekarang!
        </button>
      </div>
    </div>

      {/* ─── SYSTEM MODAL DUA TAHAP (GAMBAR 1 & GAMBAR 2) ─── */}
      {isModalOpen && (
        <div className="modal-overlay" style={{
          position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.75)', display: 'flex', justifyContent: 'center',
          alignItems: 'center', zIndex: 1000, padding: '20px'
        }}>
          <div className="modal-content" style={{
            backgroundColor: '#fff', color: '#111', borderRadius: '16px',
            width: '100%', exhibitors: 'block', maxWidth: '480px', padding: '24px', position: 'relative'
          }}>
            
            {/* Tombol Close Silang */}
            <button onClick={handleCloseModal} style={{
              position: 'absolute', top: '16px', right: '16px', background: 'transparent',
              border: 'none', fontSize: '20px', cursor: 'pointer', color: '#666'
            }}>✕</button>

            {/* KONDISI TAHAP 1: DETAIL PESANAN (GAMBAR 1) */}
            {!showQRCode ? (
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '4px' }}>Detail pesanan</h3>
                <p style={{ fontSize: '13px', color: '#666', marginBottom: '20px' }}>Mohon konfirmasi detail pesanan anda sudah benar.</p>
                
                <div style={{ backgroundColor: '#f1f5f9', padding: '14px', borderRadius: '12px', marginBottom: '20px', fontWeight: '600' }}>
                  📦 {selectedItem?.name}
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '14px', borderBottom: '1px dashed #e2e8f0', paddingBottom: '15px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: '#666' }}>Nickname:</span> <strong>User_Store_Test</strong></div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: '#666' }}>ID:</span> <strong>{userId} ({userServer})</strong></div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: '#666' }}>Bayar dengan:</span> <strong>{selectedPayment}</strong></div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: '#666' }}>Harga:</span> <strong>{selectedItem?.price}</strong></div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '15px', marginBottom: '25px' }}>
                  <span style={{ fontSize: '14px', color: '#111', fontWeight: '500' }}>Total pembayaran:</span>
                  <strong style={{ fontSize: '20px', color: '#ef4444' }}>{selectedItem?.price}</strong>
                </div>

                <button onClick={handleConfirmOrder} style={{
                  width: '100%', backgroundColor: '#6366f1', color: '#fff', border: 'none',
                  padding: '12px', borderRadius: '30px', fontWeight: '600', cursor: 'pointer', fontSize: '15px'
                }}>
                  Konfirm
                </button>
              </div>
            ) : (
              /* KONDISI TAHAP 2: TAMPILAN QRIS (GAMBAR 2) */
              <div style={{ textAlign: 'center' }}>
                <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '4px' }}>Pembayaran Melalui {selectedPayment}</h3>
                <div style={{ backgroundColor: '#f8fafc', padding: '12px', borderRadius: '8px', fontSize: '13px', marginBottom: '15px' }}>
                  {selectedItem?.name} - <strong>{selectedItem?.price}</strong>
                </div>
                
                <p style={{ fontSize: '14px', fontWeight: '700', margin: '15px 0 5px' }}>Kode QR</p>
                <p style={{ fontSize: '12px', color: '#666', marginBottom: '15px' }}>Pindai atau unggah kode QR ini menggunakan aplikasi perbankan/dompet digital Anda.</p>
                
                {/* QR Code Dummy Menggunakan API QR Server Gratis */}
                <div style={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}>
                  <img 
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=Zerostore_${slug}_${userId}`} 
                    alt="QR Code Pembayaran" 
                    style={{ border: '4px solid #fff', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}
                  />
                </div>

                <button onClick={handleCloseModal} style={{
                  width: '100%', backgroundColor: '#22c55e', color: '#fff', border: 'none',
                  padding: '12px', borderRadius: '30px', fontWeight: '600', cursor: 'pointer', fontSize: '15px', marginTop: '10px'
                }}>
                  Selesai Bayar
                </button>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
}

export default DetailGame;