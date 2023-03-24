const { Subcategoria, Categoria } = require("../../db/models/catalogo");
const validator = require('validator');

// Crea una nueva subcategoría
const crearSubcategoria = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const errorMessages = errors.array().map(err => err.msg);
            return res.status(400).json({ status: 'error', message: errorMessages.join(', ') });
        }
        const sanitizedData = req.body;

        const { nombre, id_categoria } = sanitizedData;

        const subcategoria = await Subcategoria.create({
            nombre,
            id_categoria,
        });

        res.status(201).json({
            status: 'success',
            message: 'Subcategoria creada satisfactoriamente',
            subcategoria,
        });
    } catch (error) {
        next(error)
    }
};


// Obtiene todas las subcategorías
const mostrarSubcategorias = async (req, res, next) => {
    try {
        const subcategorias = await Subcategoria.findAll();
        res.status(200).send({
            status: 'success',
            subcategorias,
        });
    } catch (error) {
        next(error)
    }
};

// Obtiene una subcategoría por id
const obtenerSubcategoriaPorId = async (req, res, next) => {
    try {
        const { id } = req.params;

        const subcategoria = await Subcategoria.findByPk(id);

        if (!subcategoria) {
            return res.status(404).send({
                status: 'error',
                message: 'Subcategoría no encontrada',
            });
        }

        res.status(200).send({
            status: 'success',
            subcategoria,
        });
    } catch (error) {
        next(error)
    }
};

// Actualiza una subcategoría existente
const editarSubcategoria = async (req, res, next) => {
    try {
        const { id } = req.params;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const errorMessages = errors.array().map(err => err.msg);
            return res.status(400).json({ status: 'error', message: errorMessages.join(', ') });
        }
        const sanitizedData = req.body;

        const { nombre, id_categoria } = sanitizedData;

        const subcategoria = await Subcategoria.findByPk(id);

        if (!subcategoria) {
            return res.status(404).send({
                status: 'error',
                message: 'Subcategoría no encontrada',
            });
        }

        const subcategoriaActualizada = await subcategoria.update({
            nombre,
            id_categoria,
        });

        res.status(200).send({
            status: 'success',
            message: 'Subcategoría actualizada satisfactoriamente',
            subcategoria: subcategoriaActualizada,
        });
    } catch (error) {
        next(error)
    }
};

const borrarSubcategoria = async (req, res, next) => {
    try {
        const { id } = req.params;

        const subcategoria = await Subcategoria.findByPk(id);

        if (!subcategoria) {
            return res.status(404).send({
                status: 'error',
                message: 'Subcategoría no encontrada',
            });
        }
        await subcategoria.destroy();
        res.status(200).send({
            status: 'success',
            message: 'Subcategoría eliminada satisfactoriamente',
        });
    } catch (error) {
        next(error)
    }
};

module.exports = {
    crearSubcategoria,
    obtenerSubcategoriaPorId,
    mostrarSubcategorias,
    editarSubcategoria,
    borrarSubcategoria
}