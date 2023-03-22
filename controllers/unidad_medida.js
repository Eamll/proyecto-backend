const UnidadMedida = require('../db/models/unidad_medida');
const validator = require('validator');


const crearUnidadMedida = async (req, res) => {
    try {
        const { nombre, abreviatura } = req.body;
        const nombreLimpio = validator.trim(nombre);
        const abreviaturaLimpia = validator.trim(abreviatura);

        if (!validator.isLength(nombreLimpio, { min: 1, max: 100 })) {
            return res.status(400).json({
                status: 'error',
                message: 'El nombre debe tener entre 1 y 100 caracteres',
            });
        }

        if (!validator.isLength(abreviaturaLimpia, { min: 1, max: 10 })) {
            return res.status(400).json({
                status: 'error',
                message: 'La abreviatura debe tener entre 1 y 10 caracteres',
            });
        }

        const unidadMedida = await UnidadMedida.create({
            nombre: nombreLimpio,
            abreviatura: abreviaturaLimpia,
        });

        res.status(201).json({
            status: 'success',
            message: 'Unidad de medida creada satisfactoriamente',
            unidadMedida,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 'error',
            message: 'Error al crear nueva unidad de medida',
        });
    }
};

const obtenerUnidadMedidaPorId = async (req, res) => {
    try {
        const unidad_medidad = await UnidadMedida.findByPk(req.params.id);
        if (!unidad_medidad) {
            return res.status(404).json({
                status: 'error',
                message: 'La unidad de medida especificada no existe en la base de datos',
            });
        }

        res.status(200).json({
            status: 'success',
            message: 'Unidad de medida obtenida satisfactoriamente',
            unidad_medidad,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 'error',
            message: 'Error al obtener unidad de medida',
        });
    }
};

const mostrarUnidadesMedida = async (req, res) => {
    try {
        const unidadesMedida = await UnidadMedida.findAll();

        res.status(200).json({
            status: 'success',
            message: 'Unidades de medida obtenidas satisfactoriamente',
            unidadesMedida,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 'error',
            message: 'Error al obtener unidades de medida',
        });
    }
};


const editarUnidadMedida = async (req, res) => {
    try {
        const { nombre, abreviatura } = req.body;
        const nombreLimpio = validator.trim(nombre);
        const abreviaturaLimpia = validator.trim(abreviatura);



        if (!validator.isLength(nombreLimpio, { min: 1, max: 100 })) {
            return res.status(400).json({
                status: 'error',
                message: 'El nombre debe tener entre 1 y 100 caracteres',
            });
        }

        if (!validator.isLength(abreviaturaLimpia, { min: 1, max: 10 })) {
            return res.status(400).json({
                status: 'error',
                message: 'La abreviatura debe tener entre 1 y 10 caracteres',
            });
        }

        const unidad_medida = await UnidadMedida.findByPk(req.params.id);
        if (!unidad_medida) {
            return res.status(404).json({
                status: 'error',
                message: 'La unidad de medida especificada no existe en la base de datos',
            });
        }



        const unidad_medida_actualizada = await unidad_medida.update({
            nombre: nombreLimpio,
            abreviatura: abreviaturaLimpia
        });

        res.status(200).json({
            status: 'success',
            message: 'Unidad de medida actualizada satisfactoriamente',
            unidad_medida: unidad_medida_actualizada,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 'error',
            message: 'Error al actualizar unidad de medida',
        });
    }
};


const borrarUnidadMedida = async (req, res) => {
    try {
        const { id } = req.params;

        // Verificar si la unidad de medida existe en la bd
        const unidad_medida = await UnidadMedida.findOne({ where: { id } });
        if (!unidad_medida) {
            return res.status(404).json({
                status: 'error',
                message: 'La unidad de medida especificada no existe en la base de datos',
            });
        }

        // Eliminar la unidad de medida
        try {
            await unidad_medida.destroy();
        } catch (error) {
            if (error.message === 'No se puede eliminar una unidad de medida que tiene catalogos asociados') {
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
            message: 'Unidad de medida eliminada satisfactoriamente',
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 'error',
            message: 'Error al eliminar la unidad de medida',
        });
    }
};


module.exports = {
    crearUnidadMedida,
    obtenerUnidadMedidaPorId,
    mostrarUnidadesMedida,
    editarUnidadMedida,
    borrarUnidadMedida
}