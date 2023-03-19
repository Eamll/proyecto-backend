const express = require("express");
const router = express.Router();
const subcategoriaController = require("../../controllers/catalogo/subcategoria");

// Rutas de subcategorias
router.post("/crear", subcategoriaController.crearSubcategoria);
router.get("/mostrar", subcategoriaController.mostrarSubcategorias);
router.route("/id/:id")
    .get(subcategoriaController.obtenerSubcategoriaPorId)
    .put(subcategoriaController.actualizarSubcategoria)
    .delete(subcategoriaController.borrarSubcategoria);

module.exports = router;
