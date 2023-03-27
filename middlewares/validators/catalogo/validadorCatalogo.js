const { body } = require('express-validator');

const reglasValidacionCatalogo = [
    body('nombre')
        .trim()
        .isLength({ min: 1, max: 100 })
        .withMessage('El nombre debe tener entre 1 y 100 caracteres'),
    body('codigo_interno')
        .notEmpty()
        .withMessage('El codigo interno es requerido'),
    body('codigo_de_barras')
        .optional({ checkFalsy: true }) // Esta bien si esta vacio o no enviado
        .isLength({ min: 1, max: 20 })
        .withMessage('El codigo de barras debe tener entre 1 y 20 caracteres'),
    // body('codigo_proveedor')
    //     .optional({ checkFalsy: true }) // Esta bien si esta vacio o no enviado
    //     .isLength({ min: 1, max: 20 })
    //     .withMessage('El codigo proveedor debe tener entre 1 y 20 caracteres'),
    body('descripcion')
        .optional({ checkFalsy: true }) // Esta bien si esta vacio o no enviado
        .isLength({ max: 255 })
        .withMessage('La descripcion no puede exceder los 255 caracteres'),
    // body('activo')
    //     .isIn(['A', 'I'])
    //     .withMessage('El estado activo debe ser "A" (activo) o "I" (inactivo)'),
    body('id_unidad_medida')
        .isInt()
        .withMessage('El id de unidad de medida debe ser entero'),
    body('id_tipo_catalogo')
        .isInt()
        .withMessage('El id de tipo de catalogo debe ser entero'),
    body('id_subcategoria')
        .isInt()
        .withMessage('El id de subcategoria debe ser entero'),
];

module.exports = {
    reglasValidacionCatalogo
};