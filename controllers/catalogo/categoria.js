const { Categoria } = require('../../db/models/catalogo');
const { validationResult } = require('express-validator');


const crearCategoria = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const errorMessages = errors.array().map(err => err.msg);
            return res.status(400).json({ status: 'error', message: errorMessages.join(', ') });
        }
        const sanitizedData = req.body;

        const { nombre } = sanitizedData;

        const nuevaCategoria = await Categoria.create({ nombre });

        res.status(201).json({
            status: 'success',
            message: 'Categoria creada satisfactoriamente',
            categoria: nuevaCategoria,
        });
    } catch (error) {
        next(error);
    }
};

const obtenerCategoriaPorId = async (req, res, next) => {
    try {
        const { id } = req.params;
        const categoria = await Categoria.findByPk(id);
        if (!categoria) {
            return res.status(404).json({ status: "error", message: 'No se ha encontrado la categoria' });
        }
        res.status(200).json({ status: "success", message: "Categoria obtenida satisfactoriamente", categoria });
    } catch (error) {
        next(error)
    }
};

const mostrarCategorias = async (req, res, next) => {
    try {
        const categorias = await Categoria.findAll();

        res.status(200).json({
            status: 'success',
            message: 'Categorias obtenidas satisfactoriamente',
            categorias,
        });
    } catch (error) {
        next(error);
    }
};


const editarCategoria = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const errorMessages = errors.array().map(err => err.msg);
            return res.status(400).json({ status: 'error', message: errorMessages.join(', ') });
        }
        const sanitizedData = req.body;

        const { nombre } = sanitizedData;

        const categoria = await Categoria.findByPk(req.params.id);
        if (!categoria) {
            return res.status(404).json({
                status: 'error',
                message: 'La categoria especificada no existe en la base de datos',
            });
        }

        const categoriaActualizada = await categoria.update({ nombre });

        res.status(200).json({
            status: 'success',
            message: 'Categoria actualizada satisfactoriamente',
            categoria: categoriaActualizada,
        });
    } catch (error) {
        next(error);
    }
};

const borrarCategoria = async (req, res, next) => {
    try {
        const { id } = req.params;

        // Eliminar la categoria
        const categoria = await Categoria.findByPk(id);
        if (!categoria) {
            return res.status(400).json({
                status: "error",
                message: "Categoria no encontrada"
            });
        }
        await categoria.destroy();


        res.status(200).json({
            status: 'success',
            message: 'Categoria eliminada satisfactoriamente',
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    crearCategoria,
    obtenerCategoriaPorId,
    mostrarCategorias,
    editarCategoria,
    borrarCategoria
}