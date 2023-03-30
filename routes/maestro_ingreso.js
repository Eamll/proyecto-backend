const express = require("express");
const { createIngresoTransaction } = require("../controllers/maestro_ingreso");

const router = express.Router();



//Rutas de catalogos
router.post("/crear", createIngresoTransaction);


module.exports = router;