const { body } = require('express-validator');

const reglasValidacionSubcategoria = [
    body('nombre')
        .trim()
        .isLength({ min: 1, max: 255 })
        .withMessage('El nombre debe tener entre 1 y 255 caracteres'),
    body('id_categoria')
        .isInt()
        .withMessage('El id de categoria debe ser entero'),
];

module.exports = {
    reglasValidacionSubcategoria
};
