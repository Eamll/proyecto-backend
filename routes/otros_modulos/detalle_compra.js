const express = require("express");
const { controladorDetalleCompra } = require("../../controllers/otros_modulos");
const authMiddleware = require("../../middlewares/authMiddleware");
const router = express.Router();



//Rutas de catalogos
router.get("/mostrar", controladorDetalleCompra.mostrarDetalleCompras);
router.route("/id/:id")
    .get(controladorDetalleCompra.obtDetalleCompraPorId)

module.exports = router;