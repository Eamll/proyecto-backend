const express = require('express');
const { connectDb } = require('./connection');
const cors = require("cors");
const manejarError = require('../middlewares/errorHandler');


const { rutasCatalogo, rutasCategoria,
    rutasSubcategoria, rutasTipoCatalogo } = require('../routes/catalogo');
const { rutasInventario, rutasAlmacen } = require('../routes/almacen');
const rutasUnidadMedida = require('../routes/unidad_medida');






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

//Almacen
app.use("/api/inventario", rutasInventario);
app.use("/api/almacen", rutasAlmacen);


//Unidad de medida
app.use("/api/unidad_medida", rutasUnidadMedida);



//Utilizaremos nuestro middleware para controlar errores
app.use(manejarError);

app.listen(port, () => {
    console.log(`Express server listening on port ${port}`);
});

