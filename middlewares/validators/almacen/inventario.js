const { body } = require('express-validator');
const { Almacen } = require('../../../db/models/almacen');
const { Catalogo } = require('../../../db/models/catalogo');

const reglasValidacionInventario = [
    body('id_almacen')
        .isInt()
        .withMessage('El ID de almacen debe ser un número entero')
        .custom(async (id) => {
            const almacen = await Almacen.findByPk(id);
            if (!almacen) {
                throw new Error('El ID de almacen no existe en la base de datos');
            }
        }),

    body('id_catalogo')
        .isInt()
        .withMessage('El ID de catalogo debe ser un número entero')
        .custom(async (id) => {
            const catalogo = await Catalogo.findByPk(id);
            if (!catalogo) {
                throw new Error('El ID de catalogo no existe en la base de datos');
            }
        }),

    body('costo_actual')
        .isNumeric()
        .withMessage('El costo actual debe ser un número'),

    body('cantidad_actual')
        .isInt()
        .withMessage('La cantidad actual debe ser un número entero'),
];

module.exports = {
    reglasValidacionInventario,
};
