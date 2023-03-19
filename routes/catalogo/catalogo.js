const express = require("express");
const router = express.Router();
const controlador = require("../../controllers/catalogo/catalogo");

//Rutas de catalogos
router.post("/crear", controlador.crearCatalogo);
router.get("/mostrar", controlador.mostrarCatalogos);
router.route("/id/:id")
    .get(controlador.obtCatalogoPorId)
    .put(controlador.editarCatalogo)
    .delete(controlador.borrarCatalogo);

module.exports = router;