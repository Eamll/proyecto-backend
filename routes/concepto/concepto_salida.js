const express = require("express");
const { mostrarConceptosSalida } = require("../../controllers/concepto/concepto_salida");

const router = express.Router();

router.get("/mostrar", mostrarConceptosSalida);


module.exports = router;