const express = require('express');
const { connectDb } = require('./db/connection');
const cors = require("cors");

//Crear servidor node
const app = express();
const port = process.env.PORT || 3000;

//Configurar cors
app.use(cors());

//Conexion a base de datos mysql
connectDb();

app.use(express.json());

//Rutas
const rutas = require("./routes/catalogo");

//Cargo las rutas
app.use("/api/catalogo", rutas);

app.listen(port, () => {
    console.log(`Express server listening on port ${port}`);
});