const { validationResult } = require('express-validator');
const { sequelize } = require('../../db/connection');
const { Inventario, Almacen } = require('../../db/models/almacen');
const { Catalogo } = require('../../db/models/catalogo');


const crearInventario = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const errorMessages = errors.array().map(err => err.msg);
            return res.status(400).json({ status: 'error', message: errorMessages.join(', ') });
        }

        const sanitizedData = req.body;

        const { id_almacen, id_catalogo, costo_actual, cantidad_actual } = sanitizedData;

        const nuevoInventario = await Inventario.create({ id_almacen, id_catalogo, costo_actual, cantidad_actual });

        res.status(200).send({
            status: "success",
            message: "Nuevo inventario creado satisfactoriamente",
            inventario: nuevoInventario
        });
    }
    catch (error) {

        next(error)
    }
};

const mostrarInventarios = async (req, res, next) => {
    try {
        const inventarios = await Inventario.findAll()

        res.send({
            status: "success",
            message: "Inventarios obtenidos satisfactoriamente",
            inventarios
        });
    } catch (error) {
        next(error);
    }
};



const obtInventarioPorId = async (req, res, next) => {
    try {
        const { id_almacen, id_catalogo } = req.params;

        const inventario = await Inventario.findOne({
            where: { id_almacen, id_catalogo },
            include: [
                { model: Almacen, as: 'almacen' },
                { model: Catalogo, as: 'catalogo' },
            ],
        });

        if (!inventario) {
            return res.status(404).json({ status: 'error', message: 'Inventario no encontrado' });
        }
        res.send({ status: "success", inventario });
    }
    catch (error) {
        next(error);
    }
};

const editarInventario = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const errorMessages = errors.array().map(err => err.msg);
            return res.status(400).json({ status: 'error', message: errorMessages.join(', ') });
        }

        const sanitizedData = req.body;
        const { id_almacen, id_catalogo } = req.params;

        const { costo_actual, cantidad_actual } = sanitizedData;

        const inventario = await Inventario.findOne({
            where: { id_almacen, id_catalogo },
            include: ['almacen', 'catalogo']
        });
        if (!inventario) {
            return res.status(404).json({ status: 'error', message: 'Inventario no encontrado' });
        }

        inventario.id_almacen = id_almacen;
        inventario.id_catalogo = id_catalogo;
        inventario.costo_actual = costo_actual;
        inventario.cantidad_actual = cantidad_actual;

        await inventario.save();
        res.send({ status: "success", inventario });
    }
    catch (error) {
        next(error);
    }
};


const borrarInventario = async (req, res, next) => {
    try {
        const { id_almacen, id_catalogo } = req.params;
        const inventario = await Inventario.destroy({
            where: {
                id_almacen: id_almacen,
                id_catalogo: id_catalogo,
            },
        });
        console.log(inventario)
        if (!inventario) {
            return res.status(404).json({ status: 'error', message: 'Inventario no encontrado' });
        }
        res.send({ status: "success", message: 'Inventario eliminado satisfactoriamente' });
    } catch (error) {
        next(error);
    }
};


module.exports = {
    crearInventario,
    mostrarInventarios,
    obtInventarioPorId,
    editarInventario,
    borrarInventario
}