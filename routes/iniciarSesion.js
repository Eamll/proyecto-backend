const express = require("express");


const iniciarSesion = require("../controllers/iniciarSesion");


const router = express.Router();



//Rutas de catalogos
router.post("/login", iniciarSesion);


module.exports = router;