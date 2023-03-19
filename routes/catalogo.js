const express = require("express");
const router = express.Router();
const controlador = require("../controllers/catalogo");

//Rutas de catalogos
router.get('/', (req, res) => { res.send('Hello World!'); });
router.post("/crear", controlador.crearCatalogo);
router.get("/mostrar", controlador.mostrarCatalogos);
router.route("/id/:id")
    .get(controlador.obtCatalogoPorId)
    .put(controlador.editarCatalogo)
    .delete(controlador.borrarCatalogo);

module.exports = router;