const express = require("express");
const router = express.Router();
const { controladorCatalogo } = require('../../controllers/catalogo');
const { reglasValidacionCatalogo } = require("../../middlewares/validators/validadorCatalogo");

//Rutas de catalogos
router.post("/crear", reglasValidacionCatalogo, controladorCatalogo.crearCatalogo);
router.get("/mostrar", controladorCatalogo.mostrarCatalogos);
router.route("/id/:id")
    .get(controladorCatalogo.obtCatalogoPorId)
    .put(reglasValidacionCatalogo, controladorCatalogo.editarCatalogo)
    .delete(controladorCatalogo.borrarCatalogo);

module.exports = router;