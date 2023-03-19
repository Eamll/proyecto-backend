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

const { rutasCatalogo, rutasCategoria,
    rutasSubcategoria, rutasTipoCatalogo } = require('../routes/catalogo');


// const { TipoCatalogo } = require('./models/catalogo');
// console.log(TipoCatalogo.prototype);

//Cargo las rutas
app.use("/api/catalogo", rutasCatalogo);
app.use("/api/subcategoria", rutasSubcategoria);
app.use("/api/categoria", rutasCategoria);
app.use("/api/tipo_catalogo", rutasTipoCatalogo);


app.listen(port, () => {
    console.log(`Express server listening on port ${port}`);
});

