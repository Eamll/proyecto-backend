const express = require("express");
const router = express.Router();
const { controladorInventario } = require('../../controllers/almacen/');
const authMiddleware = require("../../middlewares/authMiddleware");
const { reglasValidacionInventario } = require("../../middlewares/validators/almacen/");

//Rutas de catalogos
router.post("/crear", reglasValidacionInventario, authMiddleware, controladorInventario.crearInventario);
router.get("/mostrar", authMiddleware, controladorInventario.mostrarInventarios);
router.get("/mostrar/:id_almacen", authMiddleware, controladorInventario.mostrarInventariosPorAlmacen);
router.route("/id/:id_almacen/:id_catalogo")
    .get(authMiddleware, controladorInventario.obtInventarioPorId)
    .put(authMiddleware, reglasValidacionInventario, controladorInventario.editarInventario)
    .delete(authMiddleware, controladorInventario.borrarInventario);

module.exports = router;