const express = require("express");
const { createTraspasoTransaction } = require("../controllers/maestro_traspaso");


const router = express.Router();



//Rutas de catalogos
router.post("/crear", createTraspasoTransaction);


module.exports = router;