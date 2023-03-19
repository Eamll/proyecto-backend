const express = require("express");
const router = express.Router();
const { controladorCatalogo } = require('../../controllers/catalogo');

//Rutas de catalogos
router.post("/crear", controladorCatalogo.crearCatalogo);
router.get("/mostrar", controladorCatalogo.mostrarCatalogos);
router.route("/id/:id")
    .get(controladorCatalogo.obtCatalogoPorId)
    .put(controladorCatalogo.editarCatalogo)
    .delete(controladorCatalogo.borrarCatalogo);

module.exports = router;