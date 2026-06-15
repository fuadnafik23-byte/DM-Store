require('dotenv').config();
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();

app.use(cors());
app.use(bodyParser.json());

/* MEMBACA FOLDER PUBLIC */
app.use(express.static("public"));

/* HALAMAN UTAMA */
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Koneksi database
const db = mysql.createConnection({
  host: "127.0.0.1",        // DIUBAH: Menggunakan IP langsung agar tidak kena isu IPv6 Windows
  user: "root",
  password: "",             // Kosongkan jika menggunakan XAMPP bawaan
  database: "game_store"     // Pastikan nama databasenya sesuai dengan yang ada di phpMyAdmin
});

db.connect((err) => {
  if (err) {
    console.log("Database gagal terkoneksi");
    console.log(err);
  } else {
    console.log("Database berhasil terkoneksi");
  }
});
// READ
app.get("/api/pesanan", (req, res) => {
  db.query("SELECT * FROM orders", (err, result) => {
    if (err) return res.status(500).send(err);
    res.json(result);
  });
});

// CREATE
// EDIT DI BAGIAN INI:
app.post("/api/tambah", (req, res) => {
  const { nama, game, nominal, whatsapp, status } = req.body;

  db.query(
    "INSERT INTO orders (nama, game, nominal, whatsapp, status) VALUES (?,?,?,?,?)",
    [nama, game, nominal, whatsapp, status],
    (err, result) => {
      if (err) {
        console.log("❌ ERROR MYSQL TERJADI:"); // Tambahkan baris ini
        console.log(err);                      // Tambahkan baris ini untuk cetak error
        return res.status(500).send(err);
      }
      res.send("Pesanan berhasil ditambahkan");
    }
  );
});

// UPDATE STATUS
app.put("/api/status/:id", (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  db.query(
    "UPDATE orders SET status=? WHERE id=?",
    [status, id],
    (err, result) => {
      if (err) return res.status(500).send(err);
      res.send("Status berhasil diupdate");
    }
  );
});

// DELETE
app.delete("/api/hapus/:id", (req, res) => {
  const { id } = req.params;

  db.query(
    "DELETE FROM orders WHERE id=?",
    [id],
    (err, result) => {
      if (err) return res.status(500).send(err);
      res.send("Pesanan berhasil dihapus");
    }
  );
});

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Fungsi untuk menerima data pesanan dari frontend
app.post('/api/tambah', async (req, res) => {
  try {
    const dataPesanan = req.body;

    // Menyimpan data ke TiDB Cloud melalui Prisma
    // PENTING: Ganti 'orders' sesuai dengan nama tabel di schema.prisma Anda (misal: order, orders, atau transaksi)
    const pesananBaru = await prisma.orders.create({
      data: {
        nama: dataPesanan.nama,
        game: dataPesanan.game,     // Sesuaikan nama kolom ini dengan schema.prisma Anda
        nominal: dataPesanan.nominal,   // Sesuaikan nama kolom ini dengan schema.prisma Anda
        whatsapp: dataPesanan.whatsapp,     // Sesuaikan nama kolom ini dengan schema.prisma Anda
        harga: dataPesanan.harga
      }
    });

    // Kirim respons sukses ke frontend
    return res.status(200).json({
      success: true,
      message: "Pesanan berhasil dibuat!",
      data: pesananBaru
    });

  } catch (error) {
    console.error("Error backend:", error);
    return res.status(500).json({
      success: false,
      message: "Gagal menyimpan ke database",
      error: error.message
    });
  }
});

app.listen(3000, () => {
  console.log("Server jalan di port 3000");
});