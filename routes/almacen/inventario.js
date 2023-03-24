const express = require("express");
const router = express.Router();
const { controladorInventario } = require('../../controllers/almacen/');
const { reglasValidacionInventario } = require("../../middlewares/validators/almacen/");

//Rutas de catalogos
router.post("/crear", reglasValidacionInventario, controladorInventario.crearInventario);
router.get("/mostrar", controladorInventario.mostrarInventarios);
router.route("/id/:id_almacen/:id_catalogo")
    .get(controladorInventario.obtInventarioPorId)
    .put(reglasValidacionInventario, controladorInventario.editarInventario)
    .delete(controladorInventario.borrarInventario);

module.exports = router;