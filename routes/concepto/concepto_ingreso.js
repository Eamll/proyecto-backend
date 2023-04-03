const express = require("express");
const { mostrarConceptosIngreso } = require("../../controllers/concepto/concepto_ingreso");

const router = express.Router();



//Rutas de catalogos
router.get("/mostrar", mostrarConceptosIngreso);


module.exports = router;