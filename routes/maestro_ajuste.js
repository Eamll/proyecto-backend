const express = require("express");
const { createAjusteTransaction } = require("../controllers/maestro_ajuste");


const router = express.Router();



//Rutas de catalogos
router.post("/crear", createAjusteTransaction);


module.exports = router;