const { check } = require('express-validator');

const reglasValidacionAlmacen = [
    check('nombre')
        .notEmpty()
        .withMessage('El nombre del almacén es obligatorio')
        .isLength({ max: 100 })
        .withMessage('El nombre del almacén no debe exceder los 100 caracteres'),

    check('ubicacion')
        .optional()
        .isLength({ max: 255 })
        .withMessage('La ubicación no debe exceder los 255 caracteres'),

    check('descripcion')
        .optional()
        .isLength({ max: 255 })
        .withMessage('La descripción no debe exceder los 255 caracteres'),

    check('activo')
        .optional(),
    // .isIn(['A', 'I'])
    // .withMessage('El valor del campo activo debe ser "A" (activo) o "I" (inactivo)'),

    check('id_sucursal')
        .notEmpty()
        .withMessage('El ID de la sucursal es obligatorio')
        .isInt()
        .withMessage('El ID de la sucursal debe ser un número entero'),
];

module.exports = {
    reglasValidacionAlmacen,
};
