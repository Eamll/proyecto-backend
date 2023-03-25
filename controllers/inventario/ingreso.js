const { validationResult } = require('express-validator');
const { Almacen } = require('../../db/models/almacen');
const { ConceptoIngreso } = require('../../db/models/concepto');
const { Ingreso } = require('../../db/models/inventario');
const { Compra, Personal } = require('../../db/models/otros_modulos');

const crearIngreso = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const errorMessages = errors.array().map(err => err.msg);
            return res.status(400).json({ status: 'error', message: errorMessages.join(', ') });
        }

        const {
            fecha,
            costo_transporte,
            costo_carga,
            costo_almacenes,
            otros_costos,
            observaciones,
            id_compra,
            id_concepto_ingreso,
            id_personal,
            id_almacen,
        } = req.body;

        const nuevoIngreso = await Ingreso.create({
            fecha,
            costo_transporte,
            costo_carga,
            costo_almacenes,
            otros_costos,
            observaciones,
            id_compra,
            id_concepto_ingreso,
            id_personal,
            id_almacen,
        });
        res.status(201).send({
            status: 'success',
            message: 'Nuevo ingreso creado satisfactoriamente',
            ingreso: nuevoIngreso,
        });
    }
    catch (error) {
        next(error)
    }
};

const obtIngresoPorId = async (req, res, next) => {
    try {
        const { id } = req.params;
        const ingreso = await Ingreso.findByPk(id, {
            include: [
                { model: Compra, as: 'compra' },
                { model: ConceptoIngreso, as: 'concepto_ingreso' },
                { model: Personal, as: 'personal' },
                { model: Almacen, as: 'almacen' }
            ]
        });
        if (!ingreso) {
            return res.status(404).json({ status: "error", message: 'No se ha encontrado el ingreso' });
        }
        res.status(200).json({ status: "success", ingreso });
    } catch (error) {
        next(error)
    }
};


const mostrarIngresos = async (req, res, next) => {
    try {
        const ingresos = await Ingreso.findAll({
            include: [
                { model: Compra, as: 'compra' },
                { model: ConceptoIngreso, as: 'concepto_ingreso' },
                { model: Personal, as: 'personal' },
                { model: Almacen, as: 'almacen' },
            ],
        });
        return res.status(200).json({ status: 'success', message: 'Ingresos obtenidos satisfactoriamente', ingresos });
    } catch (error) {
        next(error);
    }
};

const editarIngreso = async (req, res, next) => {
    try {
        const { id } = req.params;

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const errorMessages = errors.array().map(err => err.msg);
            return res.status(400).json({ status: 'error', message: errorMessages.join(', ') });
        }

        const {
            fecha,
            costo_transporte,
            costo_carga,
            costo_almacenes,
            otros_costos,
            observaciones,
            id_compra,
            id_concepto_ingreso,
            id_personal,
            id_almacen,
        } = req.body;

        const ingreso = await Ingreso.findByPk(id);
        if (!ingreso) {
            return res.status(404).send({ status: "error", message: 'Ingreso no encontrado' });
        }

        const ingresoActualizado = await ingreso.update({
            fecha,
            costo_transporte,
            costo_carga,
            costo_almacenes,
            otros_costos,
            observaciones,
            id_compra,
            id_concepto_ingreso,
            id_personal,
            id_almacen,
        });

        return res.status(200).send({ status: "success", message: "Catalogo actualizado satisfactoriamente", ingreso: ingresoActualizado });
    } catch (error) {
        next(error)
    }
};

const borrarIngreso = async (req, res, next) => {
    let { id } = req.params;
    try {
        const ingreso = await Ingreso.findByPk(id);
        if (!ingreso) {
            return res.status(400).json({
                status: "error",
                message: "Ingreso no encontrado"
            });
        }
        await ingreso.destroy();
        return res.status(200).json({
            status: "success",
            message: "Ingreso eliminado"
        });
    } catch (error) {
        next(error);
    }
};


module.exports = {
    crearIngreso,
    obtIngresoPorId,
    mostrarIngresos,
    editarIngreso,
    borrarIngreso
}
