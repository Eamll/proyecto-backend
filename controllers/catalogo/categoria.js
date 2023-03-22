const { Categoria } = require('../../db/models/catalogo');
const validator = require('validator');


const crearCategoria = async (req, res) => {
    try {
        const { nombre } = req.body;
        // Hacer un trim al nombre
        const nombreLimpio = validator.trim(nombre);

        // Validar el largo del nombre
        if (!validator.isLength(nombreLimpio, { min: 1, max: 255 })) {
            return res.status(400).json({
                status: 'error',
                message: 'El nombre debe tener entre 1 y 255 caracteres',
            });
        }

        const categoria = await Categoria.create({ nombre: nombreLimpio });

        res.status(201).json({
            status: 'success',
            message: 'Categoria creada satisfactoriamente',
            categoria,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 'error',
            message: 'Error al crear nueva categoria',
        });
    }
};

const obtenerCategoriaPorId = async (req, res) => {
    try {
        const categoria = await Categoria.findByPk(req.params.id);
        if (!categoria) {
            return res.status(404).json({
                status: 'error',
                message: 'La categoria especificada no existe en la base de datos',
            });
        }

        res.status(200).json({
            status: 'success',
            message: 'Categoria obtenida satisfactoriamente',
            categoria,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 'error',
            message: 'Error al obtener categoria',
        });
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


const editarCategoria = async (req, res) => {
    try {
        const { nombre } = req.body;
        // Hacer un trim al nombre
        const nombreLimpio = validator.trim(nombre);

        // Validar el largo del nombre
        if (!validator.isLength(nombreLimpio, { min: 1, max: 255 })) {
            return res.status(400).json({
                status: 'error',
                message: 'El nombre debe tener entre 1 y 255 caracteres',
            });
        }

        const categoria = await Categoria.findByPk(req.params.id);
        if (!categoria) {
            return res.status(404).json({
                status: 'error',
                message: 'La categoria especificada no existe en la base de datos',
            });
        }

        categoria.nombre = nombreLimpio;
        await categoria.save();

        res.status(200).json({
            status: 'success',
            message: 'Categoria actualizada satisfactoriamente',
            categoria,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 'error',
            message: 'Error al actualizar categoria',
        });
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