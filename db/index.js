//Session management
require('dotenv').config();
const express = require('express');
const { connectDb } = require('./connection');
const cors = require("cors");
const manejarError = require('../middlewares/errorHandler');


const { rutasCatalogo, rutasCategoria,
    rutasSubcategoria, rutasTipoCatalogo } = require('../routes/catalogo');
const { rutasInventario, rutasAlmacen } = require('../routes/almacen');
const rutasUnidadMedida = require('../routes/unidad_medida');
const rutasIniciarSesion = require('../routes/iniciarSesion');
const { rutasIngreso } = require('../routes/inventario');
// const authMiddleware = require('../middlewares/authMiddleware');






//Crear servidor node
const app = express();
const port = process.env.PORT || 3000;

//Configurar cors
app.use(cors());

//Conexion a base de datos mysql
connectDb();

app.use(express.json());


// Now, use the authMiddleware to protect any route you want to secure
app.use('/api/ruta-segura', rutasIniciarSesion);


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

//Inventario
app.use("/api/ingreso", rutasIngreso);

//Utilizaremos nuestro middleware para controlar errores
app.use(manejarError);

app.listen(port, () => {
    console.log(`Express server listening on port ${port}`);
});

