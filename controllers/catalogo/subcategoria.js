const { Subcategoria, Categoria } = require("../../db/models/catalogo");
const validator = require('validator');

// Crea una nueva subcategoría
const crearSubcategoria = async (req, res) => {
    try {
        const { nombre, id_categoria } = req.body;
        // Hacer un trim al nombre
        const nombreLimpio = validator.trim(nombre);


        // Validatar el largo del nombre
        if (!validator.isLength(nombreLimpio, { min: 1, max: 255 })) {
            return res.status(400).json({
                status: 'error',
                message: 'El nombre debe tener entre 1 y 255 caracteres',
            });
        }

        // Verificar si la categoria existe en la bd
        const categoria = await Categoria.findOne({ where: { id: id_categoria } });
        if (!categoria) {
            return res.status(404).json({
                status: 'error',
                message: 'La categoria especificada no existe en la base de datos',
            });
        }


        const subcategoria = await Subcategoria.create({
            nombre: nombreLimpio,
            id_categoria,
        });

        res.status(201).json({
            status: 'success',
            message: 'Subcategoria creada satisfactoriamente',
            subcategoria,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 'error',
            message: 'Error al crear nueva subcategoria',
        });
    }
};


// Obtiene todas las subcategorías
const mostrarSubcategorias = async (req, res) => {
    try {
        const subcategorias = await Subcategoria.findAll();
        res.status(200).send({
            status: 'success',
            subcategorias,
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            status: 'error',
            message: 'Error al obtener subcategorías',
        });
    }
};

// Obtiene una subcategoría por id
const obtenerSubcategoriaPorId = async (req, res) => {
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
        console.error(error);
        res.status(500).send({
            status: 'error',
            message: 'Error al obtener subcategoría',
        });
    }
};

// Actualiza una subcategoría existente
const editarSubcategoria = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, id_categoria } = req.body;


        // Hacer un trim al nombre
        const nombreLimpio = validator.trim(nombre);

        // Validar el largo del nombre
        if (!validator.isLength(nombreLimpio, { min: 1, max: 255 })) {
            return res.status(400).json({
                status: 'error',
                message: 'El nombre debe tener entre 1 y 255 caracteres',
            });
        }
        // Verificar si la categoria existe en la bd
        const categoria = await Categoria.findOne({ where: { id: id_categoria } });
        if (!categoria) {
            return res.status(404).json({
                status: 'error',
                message: 'La categoria especificada no existe en la base de datos',
            });
        }

        const subcategoria = await Subcategoria.findByPk(id);

        if (!subcategoria) {
            return res.status(404).send({
                status: 'error',
                message: 'Subcategoría no encontrada',
            });
        }

        const subcategoriaActualizada = await subcategoria.update({
            nombre: nombreLimpio,
            id_categoria,
        });

        res.status(200).send({
            status: 'success',
            message: 'Subcategoría actualizada satisfactoriamente',
            subcategoria: subcategoriaActualizada,
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            status: 'error',
            message: 'Error al actualizar subcategoría',
        });
    }
};

const borrarSubcategoria = async (req, res) => {
    try {
        const { id } = req.params;

        const subcategoria = await Subcategoria.findByPk(id);

        if (!subcategoria) {
            return res.status(404).send({
                status: 'error',
                message: 'Subcategoría no encontrada',
            });
        }

        try {
            await subcategoria.destroy();
        } catch (error) {
            if (error.message === 'No se puede eliminar una subcategoria que tiene catalogos asociados') {
                return res.status(400).json({
                    status: 'error',
                    message: error.message,
                });
            } else {
                throw error;
            }
        }
        res.status(200).send({
            status: 'success',
            message: 'Subcategoría eliminada satisfactoriamente',
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            status: 'error',
            message: 'Error al eliminar subcategoría',
        });
    }
};

module.exports = {
    crearSubcategoria,
    obtenerSubcategoriaPorId,
    mostrarSubcategorias,
    editarSubcategoria,
    borrarSubcategoria
}