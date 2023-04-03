const express = require("express");
const { createSalidaTransaction } = require("../controllers/maestro_salida");


const router = express.Router();



//Rutas de catalogos
router.post("/crear", createSalidaTransaction);


module.exports = router;