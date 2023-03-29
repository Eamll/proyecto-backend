const express = require("express");
const router = express.Router();
const { controladorCatalogo } = require('../../controllers/catalogo');
const authMiddleware = require("../../middlewares/authMiddleware");
const { reglasValidacionCatalogo } = require("../../middlewares/validators/catalogo");

//Rutas de catalogos
router.post("/crear", reglasValidacionCatalogo, authMiddleware, controladorCatalogo.crearCatalogo);
router.get("/mostrar", authMiddleware, controladorCatalogo.mostrarCatalogos);
router.route("/id/:id", authMiddleware,)
    .get(controladorCatalogo.obtCatalogoPorId)
    .put(reglasValidacionCatalogo, controladorCatalogo.editarCatalogo)
    .delete(controladorCatalogo.borrarCatalogo);

module.exports = router;