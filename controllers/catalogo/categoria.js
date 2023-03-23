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

const mostrarCategorias = async (req, res) => {
    try {
        const categorias = await Categoria.findAll();

        res.status(200).json({
            status: 'success',
            message: 'Categorias obtenidas satisfactoriamente',
            categorias,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 'error',
            message: 'Error al obtener categorias',
        });
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

        const categoriaActualizada = await subcategoria.update({ nombre });

        res.status(200).json({
            status: 'success',
            message: 'Categoria actualizada satisfactoriamente',
            categoria: categoriaActualizada,
        });
    } catch (error) {
        next(error);
    }
};

const borrarCategoria = async (req, res) => {
    try {
        const { id } = req.params;

        // Verificar si la categoria existe en la bd
        const categoria = await Categoria.findOne({ where: { id } });
        if (!categoria) {
            return res.status(404).json({
                status: 'error',
                message: 'La categoria especificada no existe en la base de datos',
            });
        }

        // Eliminar la categoria
        try {
            await categoria.destroy();
        } catch (error) {
            if (error.message === 'No se puede eliminar una categoria que tiene subcategorias asociadas') {
                return res.status(400).json({
                    status: 'error',
                    message: error.message,
                });
            } else {
                throw error;
            }
        }

        res.status(200).json({
            status: 'success',
            message: 'Categoria eliminada satisfactoriamente',
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 'error',
            message: 'Error al eliminar la categoria',
        });
    }
};

module.exports = {
    crearCategoria,
    obtenerCategoriaPorId,
    mostrarCategorias,
    editarCategoria,
    borrarCategoria
}