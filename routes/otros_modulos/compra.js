const express = require("express");
const { controladorCompra } = require("../../controllers/otros_modulos");

const router = express.Router();



//Rutas de catalogos
router.get("/mostrar", controladorCompra.mostrarCompras);


module.exports = router;