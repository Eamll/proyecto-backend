const express = require("express");
const router = express.Router();
const { controladorSubcategoria } = require("../../controllers/catalogo");

// Rutas de subcategorias
router.post("/crear", controladorSubcategoria.crearSubcategoria);
router.get("/mostrar", controladorSubcategoria.mostrarSubcategorias);
router.route("/id/:id")
    .get(controladorSubcategoria.obtenerSubcategoriaPorId)
    .put(controladorSubcategoria.editarSubcategoria)
    .delete(controladorSubcategoria.borrarSubcategoria);

module.exports = router;
