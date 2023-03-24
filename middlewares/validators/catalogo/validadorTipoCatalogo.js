const { body } = require('express-validator');
const { TipoCatalogo } = require('../../../db/models/catalogo/');


const reglasValidacionTipoCatalogo = [
    body('id')
        .isInt()
        .withMessage('El ID debe ser un número entero'),

    body('nombre')
        .trim()
        .isLength({ min: 1, max: 100 })
        .withMessage('El nombre debe tener entre 1 y 100 caracteres'),

    // Custom validator to check if the ID already exists in the database
    body('id').custom(async (id) => {
        const tipoCatalogo = await TipoCatalogo.findByPk(id);
        if (tipoCatalogo) {
            throw new Error('El ID ya existe en la base de datos');
        }
    }),
];

module.exports = {
    reglasValidacionTipoCatalogo,
};
