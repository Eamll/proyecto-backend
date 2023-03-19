
const { TipoCatalogo } = require('../../db/models/catalogo');
const validator = require('validator');

const crearTipoCatalogo = async (req, res) => {
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

        const tipo_catalogo = await TipoCatalogo.create({ nombre: nombreLimpio });

        res.status(201).json({
            status: 'success',
            message: 'Tipo de catalogo creado satisfactoriamente',
            tipo_catalogo,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 'error',
            message: 'Error al crear nuevo tipo de catalogo',
        });
    }
};

const obtenerTipoCatalogoPorId = async (req, res) => {
    try {
        const tipo_catalogo = await TipoCatalogo.findByPk(req.params.id);
        if (!tipo_catalogo) {
            return res.status(404).json({
                status: 'error',
                message: 'El tipo de catalogo especificado no existe en la base de datos',
            });
        }

        res.status(200).json({
            status: 'success',
            message: 'Tipo de catalogo obtenido satisfactoriamente',
            tipo_catalogo,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 'error',
            message: 'Error al obtener tipo de catalogo',
        });
    }
};


const mostrarTiposCatalogo = async (req, res) => {
    try {
        const tipo_catalogos = await TipoCatalogo.findAll();

        res.status(200).json({
            status: 'success',
            message: 'Tipos de catalogo obtenidos satisfactoriamente',
            tipo_catalogos,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 'error',
            message: 'Error al obtener tipos de catalogo',
        });
    }
};

const editarTipoCatalogo = async (req, res) => {
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

        const tipo_catalogo = await TipoCatalogo.findByPk(req.params.id);
        if (!tipo_catalogo) {
            return res.status(404).json({
                status: 'error',
                message: 'El tipo de catalogo especificado no existe en la base de datos',
            });
        }

        tipo_catalogo.nombre = nombreLimpio;
        await tipo_catalogo.save();

        res.status(200).json({
            status: 'success',
            message: 'Tipo de catalogo actualizado satisfactoriamente',
            tipo_catalogo,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 'error',
            message: 'Error al actualizar tipo de catalogo',
        });
    }
};

const borrarTipoCatalogo = async (req, res) => {
    try {
        const { id } = req.params;

        // Verificar si la categoria existe en la bd
        const tipo_catalogo = await TipoCatalogo.findOne({ where: { id } });
        if (!tipo_catalogo) {
            return res.status(404).json({
                status: 'error',
                message: 'El tipo de catalogo especificado no existe en la base de datos',
            });
        }

        // Eliminar la categoria
        try {
            await tipo_catalogo.destroy();
        } catch (error) {
            if (error.message === 'No se puede eliminar un tipo de catalogo que tiene catalogos asociados') {
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
            message: 'Tipo de catalogo eliminado satisfactoriamente',
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 'error',
            message: 'Error al eliminar el tipo de catalogo',
        });
    }
};

module.exports = {
    crearTipoCatalogo,
    obtenerTipoCatalogoPorId,
    mostrarTiposCatalogo,
    editarTipoCatalogo,
    borrarTipoCatalogo
}