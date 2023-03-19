const express = require("express");
const router = express.Router();
const { controladorTipoCatalogo } = require("../../controllers/catalogo");

// Rutas de subcategorias
router.post("/crear", controladorTipoCatalogo.crearTipoCatalogo);
router.get("/mostrar", controladorTipoCatalogo.mostrarTiposCatalogo);
router.route("/id/:id")
    .get(controladorTipoCatalogo.obtenerTipoCatalogoPorId)
    .put(controladorTipoCatalogo.editarTipoCatalogo)
    .delete(controladorTipoCatalogo.borrarTipoCatalogo);

module.exports = router;
