const express = require("express");
const router = express.Router();
const { controladorCategoria } = require("../../controllers/catalogo");

// Rutas de subcategorias
router.post("/crear", controladorCategoria.crearCategoria);
router.get("/mostrar", controladorCategoria.mostrarCategorias);
router.route("/id/:id")
    .get(controladorCategoria.obtenerCategoriaPorId)
    .put(controladorCategoria.editarCategoria)
    .delete(controladorCategoria.borrarCategoria);

module.exports = router;
