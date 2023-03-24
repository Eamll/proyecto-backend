const express = require("express");
const router = express.Router();
const { controladorAlmacen } = require('../../controllers/almacen/');
const { reglasValidacionAlmacen } = require("../../middlewares/validators/almacen/");

//Rutas de catalogos
router.post("/crear", reglasValidacionAlmacen, controladorAlmacen.crearAlmacen);
router.get("/mostrar", controladorAlmacen.mostrarAlmacenes);
router.route("/id/:id_almacen/:id_catalogo")
    .get(controladorAlmacen.obtAlmacenPorId)
    .put(reglasValidacionAlmacen, controladorAlmacen.editarAlmacen)
    .delete(controladorAlmacen.borrarAlmacen);

module.exports = router;