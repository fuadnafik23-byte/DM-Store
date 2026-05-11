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
  host: "localhost",
  user: "root",
  password: "",
  database: "zerostore"
});

db.connect((err) => {
  if(err){
    console.log("Koneksi gagal:", err);
  } else {
    console.log("MySQL terkoneksi");
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
app.post("/api/tambah", (req, res) => {
  const { nama, game, nominal, whatsapp, status } = req.body;

  db.query(
    "INSERT INTO orders (nama, game, nominal, whatsapp, status) VALUES (?,?,?,?,?)",
    [nama, game, nominal, whatsapp, status],
    (err, result) => {
      if (err) return res.status(500).send(err);
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

app.listen(3000, () => {
  console.log("Server jalan di port 3000");
});