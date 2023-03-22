const express = require('express');
const { connectDb } = require('./connection');
const cors = require("cors");
const { rutasCatalogo, rutasCategoria,
    rutasSubcategoria, rutasTipoCatalogo } = require('../routes/catalogo');
const rutasUnidadMedida = require('../routes/unidad_medida');
const manejarError = require('../middlewares/errorHandler');




//Crear servidor node
const app = express();
const port = process.env.PORT || 3000;

//Configurar cors
app.use(cors());

//Conexion a base de datos mysql
connectDb();

app.use(express.json());

// const UnidadMedida = require('./models/unidad_medida');
// console.log(UnidadMedida.prototype);

//Cargo las rutas
//Catalogo
app.use("/api/catalogo", rutasCatalogo);
app.use("/api/subcategoria", rutasSubcategoria);
app.use("/api/categoria", rutasCategoria);
app.use("/api/tipo_catalogo", rutasTipoCatalogo);

//Unidad de medida
app.use("/api/unidad_medida", rutasUnidadMedida);



//Utilizaremos nuestro middleware para controlar errores
app.use(manejarError);

app.listen(port, () => {
    console.log(`Express server listening on port ${port}`);
});

