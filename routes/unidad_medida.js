const express = require("express");
const router = express.Router();
const controladorUnidadMedida = require('../controllers/unidad_medida');

// Rutas de subcategorias
router.post("/crear", controladorUnidadMedida.crearUnidadMedida);
router.get("/mostrar", controladorUnidadMedida.mostrarUnidadesMedida);
router.route("/id/:id")
    .get(controladorUnidadMedida.obtenerUnidadMedidaPorId)
    .put(controladorUnidadMedida.editarUnidadMedida)
    .delete(controladorUnidadMedida.borrarUnidadMedida);

module.exports = router;
