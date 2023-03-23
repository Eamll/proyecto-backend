const { body } = require('express-validator');

const reglasValidacionCategoria = [
    body('nombre')
        .trim()
        .isLength({ min: 1, max: 255 })
        .withMessage('El nombre debe tener entre 1 y 255 caracteres'),
];

module.exports = {
    reglasValidacionCategoria
};
