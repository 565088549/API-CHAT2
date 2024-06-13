const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors()); // Permitir todas las solicitudes de origen

const PORT = 3000;
app.listen(PORT, () => {
    console.log("servidor corriendo en http://localhost:" + PORT);
});

const connection = mysql.createConnection({
    host: "brkv2ocph4sbbnue9bwg-mysql.services.clever-cloud.com",
    user: "u7ioql1nyxt93cs7",
    password: "oK5R1twCg04VbzR4FTuG",
    port: 3306,
    database: "brkv2ocph4sbbnue9bwg"
});

connection.connect((err) => {
    if (err) {
        console.error(err.message || "No se pudo conectar a la base de datos");
    } else {
        console.log("Conectado a la base de datos");
    }
});

app.get("/", (req, res) => {
    connection.query("SELECT * FROM usuarios", (error, results) => {
        if (error) res.status(500).json({ message: error.message || "No se pueden obtener datos en este momento para la tabla usuarios" });
        else res.status(200).json(results);
    });
});

app.post("/", (req, res) => {
    const { nombre } = req.body;
    connection.query('INSERT INTO usuarios (nombre) VALUES (?)', [nombre], (error, results) => {
        if (error) res.status(500).json({ message: error.message || "No se pudo insertar el dato en este momento" });
        else res.json(results);
    });
});

app.patch("/", (req, res) => {
    const { id, nombre } = req.body;
    connection.query(`UPDATE usuarios SET nombre=? WHERE id=?`, [nombre, id], (error, results) => {
        if (error) res.status(500).json({ message: error.message || "No se pudo actualizar en este momento" });
        else res.json(results);
    });
});

app.delete("/", (req, res) => {
    const { id } = req.body;
    connection.query(`DELETE FROM usuarios WHERE id=?`, [id], (error, results) => {
        if (error) res.status(500).json({ message: error.message || "No se pudo eliminar en este momento" });
        else res.json(results);
    });
});
