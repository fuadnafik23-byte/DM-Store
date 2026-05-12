// Mengambil data dari LocalStorage agar data tidak hilang saat refresh
let listPesanan = JSON.parse(localStorage.getItem('pesanan')) || [];
let editIndex = null;

// 1. FUNGSI TAMPILKAN DATA (READ)
function tampilkanData() {
    const tableBody = document.getElementById('data');
    tableBody.innerHTML = ""; // Bersihkan tabel sebelum isi ulang

    listPesanan.forEach((order, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${order.gameId} (${order.server})</td>
            <td>${order.nama}</td>
            <td>${order.game}</td>
            <td>Rp ${parseInt(order.nominal).toLocaleString('id-ID')}</td>
            <td><span class="status-badge">${order.status}</span></td>
            <td>
                <button onclick="bukaEdit(${index})" style="color: #3498db; cursor: pointer; border:none; background:none;">
                    <i class="fa-solid fa-pen-to-square"></i> Edit
                </button>
                <button onclick="hapusPesanan(${index})" style="color: #e74c3c; cursor: pointer; border:none; background:none; margin-left:10px;">
                    <i class="fa-solid fa-trash"></i> Hapus
                </button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// 2. FUNGSI TAMBAH DATA (CREATE)
document.getElementById('formTambah').addEventListener('submit', function(e) {
    e.preventDefault();

    const pesananBaru = {
        gameId: document.getElementById('gameId').value,
        server: document.getElementById('server').value,
        nama: document.getElementById('nama').value, // Pastikan ID "nama" ada di HTML
        game: document.getElementById('game').value,
        nominal: document.getElementById('nominal').value,
        whatsapp: document.getElementById('whatsapp').value,
        status: document.getElementById('status').value
    };

    listPesanan.push(pesananBaru);
    simpanDanRefresh();
    
    this.reset();
    alert('Pesanan berhasil disimpan!');
});

// 3. FUNGSI HAPUS (DELETE)
function hapusPesanan(index) {
    if (confirm('Yakin ingin menghapus pesanan ini?')) {
        listPesanan.splice(index, 1);
        simpanDanRefresh();
    }
}

// 4. FUNGSI EDIT (UPDATE)
function bukaEdit(index) {
    editIndex = index;
    const data = listPesanan[index];
    
    // Gunakan prompt sederhana atau buat modal di HTML untuk inputan baru
    const namaBaru = prompt("Edit Nama Pelanggan:", data.nama);
    const statusBaru = prompt("Edit Status (Baru/Diproses/Selesai):", data.status);

    if (namaBaru !== null && statusBaru !== null) {
        listPesanan[editIndex].nama = namaBaru;
        listPesanan[editIndex].status = statusBaru;
        simpanDanRefresh();
    }
}

// 5. HELPER: SIMPAN KE LOCALSTORAGE & REFRESH TABEL
function simpanDanRefresh() {
    localStorage.setItem('pesanan', JSON.stringify(listPesanan));
    tampilkanData();
}

// Jalankan fungsi tampilkanData pertama kali saat halaman dimuat
tampilkanData();