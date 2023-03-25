const express = require("express");
const { controladorIngreso } = require("../../controllers/inventario");
const { reglasValidacionIngreso } = require("../../middlewares/validators/inventario");

const router = express.Router();



//Rutas de catalogos
router.post("/crear", reglasValidacionIngreso, controladorIngreso.crearIngreso);
router.get("/mostrar", controladorIngreso.mostrarIngresos);
router.route("/id/:id")
    .get(controladorIngreso.obtIngresoPorId)
    .put(reglasValidacionIngreso, controladorIngreso.editarIngreso)
    .delete(controladorIngreso.borrarIngreso);

module.exports = router;