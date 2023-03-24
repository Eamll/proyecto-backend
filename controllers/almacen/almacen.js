const { Almacen } = require('../../db/models/almacen');
const { validationResult } = require('express-validator');


const crearAlmacen = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const errorMessages = errors.array().map(err => err.msg);
            return res.status(400).json({ status: 'error', message: errorMessages.join(', ') });
        }
        const sanitizedData = req.body;

        const { nombre, ubicacion, descripcion, activo, id_sucursal } = sanitizedData;

        const nuevoAlmacen = await Almacen.create({
            nombre,
            ubicacion,
            descripcion,
            activo,
            id_sucursal,
        });

        res.status(201).json({
            status: 'success',
            message: 'Almacen creado satisfactoriamente',
            almacen: nuevoAlmacen,
        });
    } catch (error) {
        next(error);
    }
};

const obtAlmacenPorId = async (req, res, next) => {
    try {
        const { id } = req.params;
        const almacen = await Almacen.findByPk(id);
        if (!almacen) {
            return res.status(404).json({ status: "error", message: 'No se ha encontrado el almacen' });
        }
        res.status(200).json({ status: "success", message: "Almacen obtenido satisfactoriamente", categoria: almacen });
    } catch (error) {
        next(error)
    }
};

const mostrarAlmacenes = async (req, res, next) => {
    try {
        const almacenes = await Almacen.findAll();

        res.status(200).json({
            status: 'success',
            message: 'Almacenes obtenidos satisfactoriamente',
            almacenes,
        });
    } catch (error) {
        next(error);
    }
};


const editarAlmacen = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const errorMessages = errors.array().map(err => err.msg);
            return res.status(400).json({ status: 'error', message: errorMessages.join(', ') });
        }
        const sanitizedData = req.body;

        const { nombre, ubicacion, descripcion, activo, id_sucursal } = sanitizedData;

        const almacen = await Almacen.findByPk(req.params.id);
        if (!almacen) {
            return res.status(404).json({
                status: 'error',
                message: 'El almacen especificado no existe en la base de datos',
            });
        }

        const nuevoAlmacen = await Almacen.update({
            nombre,
            ubicacion,
            descripcion,
            activo,
            id_sucursal,
        });

        res.status(201).json({
            status: 'success',
            message: 'Almacen creado satisfactoriamente',
            almacen: nuevoAlmacen,
        });
    } catch (error) {
        next(error);
    }
};

const borrarAlmacen = async (req, res, next) => {
    try {
        const { id } = req.params;

        // Eliminar la categoria
        const almacen = await Almacen.findByPk(id);
        if (!almacen) {
            return res.status(400).json({
                status: "error",
                message: "Almacen no encontrado"
            });
        }
        await almacen.destroy();


        res.status(200).json({
            status: 'success',
            message: 'Almacen eliminado satisfactoriamente',
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    crearAlmacen,
    obtAlmacenPorId,
    mostrarAlmacenes,
    editarAlmacen,
    borrarAlmacen
}