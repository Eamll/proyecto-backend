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
const rutasMaestroIngreso = require('../routes/maestro_ingreso');
const rutasCompra = require('../routes/otros_modulos/compra');
const rutasDetalleCompra = require('../routes/otros_modulos/detalle_compra');

const rutasMaestroSalida = require('../routes/maestro_salida');
const rutasConceptoIngreso = require('../routes/concepto/concepto_ingreso');
const rutasConceptoSalida = require('../routes/concepto/concepto_salida');

const rutasMaestroTraspaso = require('../routes/maestro_traspaso');
const rutasConceptotraspaso = require('../routes/concepto/concepto_traspaso');



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
app.use("/api/transaction-ingreso", rutasMaestroIngreso);
app.use("/api/transaction-salida", rutasMaestroSalida);
app.use("/api/transaction-traspaso", rutasMaestroTraspaso);

//Concepto
app.use("/api/concepto_ingreso", rutasConceptoIngreso);
app.use("/api/concepto_salida", rutasConceptoSalida);
app.use("/api/concepto_traspaso", rutasConceptotraspaso);
//Otros modulos
app.use("/api/compra", rutasCompra);
app.use("/api/detalle_compra", rutasDetalleCompra);


//Utilizaremos nuestro middleware para controlar errores
app.use(manejarError);

app.listen(port, () => {
    console.log(`Express server listening on port ${port}`);
});

