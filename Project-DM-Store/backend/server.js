const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(__dirname)); // supaya index.html jalan

// koneksi database
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "zerostore"
});

db.connect((err) => {
    if (err) {
        console.log("Database gagal connect");
    } else {
        console.log("Database connected");
    }
});

// =========================
// API PRODUK
// =========================

// tampilkan semua produk
app.get("/api/produk", (req, res) => {
    db.query("SELECT * FROM produk", (err, result) => {
        if (err) throw err;
        res.json(result);
    });
});

// tambah pesanan
app.post("/api/pesan", (req, res) => {
    const { nama, game, nominal, whatsapp } = req.body;

    const sql = `
    INSERT INTO pesanan (nama, game, nominal, whatsapp)
    VALUES (?, ?, ?, ?)
    `;

    db.query(sql, [nama, game, nominal, whatsapp], (err, result) => {
        if (err) throw err;
        res.json({
            message: "Pesanan berhasil dibuat"
        });
    });
});

// tampilkan semua pesanan
app.get("/api/pesanan", (req, res) => {
    db.query("SELECT * FROM pesanan", (err, result) => {
        if (err) throw err;
        res.json(result);
    });
});

app.listen(3000, () => {
    console.log("Server jalan di http://localhost:3000");
});
app.put("/api/status/:id",(req,res)=>{ const id = req.params.id; const {status} = req.body; db.query( "UPDATE pesanan SET status=? WHERE id=?", [status,id], (err,result)=>{ res.json({message:"Status diupdate"}); }); }); app.delete("/api/hapus/:id",(req,res)=>{ const id = req.params.id; db.query( "DELETE FROM pesanan WHERE id=?", [id], (err,result)=>{ res.json({message:"Pesanan dihapus"}); }); });