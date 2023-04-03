const express = require("express");
const { mostrarConceptosAjuste } = require("../../controllers/concepto/concepto_ajuste");

const router = express.Router();



//Rutas de catalogos
router.get("/mostrar", mostrarConceptosAjuste);


module.exports = router;