const { body } = require('express-validator');

const reglasValidacionIngreso = [
    body('fecha')
        .isDate()
        .withMessage('La fecha debe ser una fecha válida'),
    body('costo_transporte')
        .isDecimal()
        .withMessage('El costo de transporte debe ser un número decimal'),
    body('costo_carga')
        .isDecimal()
        .withMessage('El costo de carga debe ser un número decimal'),
    body('costo_almacenes')
        .isDecimal()
        .withMessage('El costo de almacenes debe ser un número decimal'),
    body('otros_costos')
        .isDecimal()
        .withMessage('Otros costos debe ser un número decimal'),
    body('observaciones')
        .isString()
        .withMessage('Las observaciones deben ser una cadena de caracteres'),
    body('id_compra')
        .optional(),
    // .isInt()
    // .withMessage('El ID de compra debe ser un número entero'),
    body('id_concepto_ingreso')
        .isInt()
        .withMessage('El ID de concepto de ingreso es requerido y debe ser un número entero'),
    body('id_personal')
        .isInt()
        .withMessage('El ID de personal es requerido y debe ser un número entero'),
    body('id_almacen')
        .isInt()
        .withMessage('El ID de almacén es requerido y debe ser un número entero'),
];

module.exports = {
    reglasValidacionIngreso
};