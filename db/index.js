const express = require('express');
const { connectDb } = require('./connection');
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
const rutasCatalogo = require("../routes/catalogo/catalogo");
const rutasSubcategoria = require("../routes/catalogo/subcategoria");
const rutasCategoria = require("../routes/catalogo/categoria");




//Cargo las rutas
app.use("/api/catalogo", rutasCatalogo);
app.use("/api/subcategoria", rutasSubcategoria);
app.use("/api/categoria", rutasCategoria);


app.listen(port, () => {
    console.log(`Express server listening on port ${port}`);
});

