document.getElementById('formTambah').addEventListener('submit', function(e) {
    e.preventDefault();

    // 1. Ambil data dari input
    const gameId = document.getElementById('gameId').value;
    const server = document.getElementById('server').value;
    const game = document.getElementById('game').value;
    const nominal = document.getElementById('nominal').value;
    const whatsapp = document.getElementById('whatsapp').value;
    const status = document.getElementById('status').value;

    // 2. Buat ID Transaksi acak
    const idTransaksi = 'TRX-' + Math.floor(Math.random() * 1000000);

    // 3. Buat baris tabel baru
    const tableBody = document.getElementById('data');
    const row = document.createElement('tr');

    row.innerHTML = `
        <td>${idTransaksi}</td>
        <td>${gameId} (${server})</td>
        <td>Admin</td>
        <td>${game}</td>
        <td>Rp ${parseInt(nominal).toLocaleString('id-ID')}</td>
        <td><span class="status-badge">${status}</span></td>
        <td>
            <button onclick="hapusBaris(this)" style="color: red; cursor: pointer;">
                <i class="fa-solid fa-trash"></i> Hapus
            </button>
        </td>
    `;

    // 4. Masukkan ke tabel
    tableBody.appendChild(row);

    // 5. Reset form setelah simpan
    document.getElementById('formTambah').reset();
    alert('Pesanan berhasil disimpan!');
});

// Fungsi untuk menghapus baris
function hapusBaris(btn) {
    if (confirm('Yakin ingin menghapus pesanan ini?')) {
        const row = btn.parentNode.parentNode;
        row.parentNode.removeChild(row);
    }
}