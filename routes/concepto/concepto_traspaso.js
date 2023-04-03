const express = require("express");
const { mostrarConceptosTraspaso } = require("../../controllers/concepto/concepto_traspaso");


const router = express.Router();

router.get("/mostrar", mostrarConceptosTraspaso);


module.exports = router;