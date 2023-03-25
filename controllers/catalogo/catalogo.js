const { validationResult } = require('express-validator');

const { Catalogo } = require('../../db/models/catalogo');

// const Catalogo = auto.models.catalogo;

const crearCatalogo = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const errorMessages = errors.array().map(err => err.msg);
            return res.status(400).json({ status: 'error', message: errorMessages.join(', ') });
        }
        const sanitizedData = req.body;

        const { nombre, codigo_interno, codigo_de_barras, codigo_proveedor, descripcion, activo, id_unidad_medida, id_tipo_catalogo, id_subcategoria } = sanitizedData;

        const nuevoCatalogo = await Catalogo.create({
            nombre,
            codigo_interno,
            codigo_de_barras,
            codigo_proveedor,
            descripcion,
            activo,
            id_unidad_medida,
            id_tipo_catalogo,
            id_subcategoria
        });
        res.status(201).send({
            status: "success",
            message: "Nuevo catalogo creado satisfactoriamente",
            catalogo: nuevoCatalogo
        });
    }
    catch (error) {
        next(error)
    }
};

const obtCatalogoPorId = async (req, res, next) => {
    try {
        const { id } = req.params;
        const catalogo = await Catalogo.findByPk(id);
        if (!catalogo) {
            return res.status(404).json({ status: "error", message: 'No se ha encontrado el catalogo' });
        }
        res.status(200).json({ status: "success", catalogo });
    } catch (error) {
        next(error)
    }
};

const mostrarCatalogos = async (req, res, next) => {
    try {
        const catalogos = await Catalogo.findAll();
        return res.status(200).json({ status: "success", message: "Catalogos obtenidos satisfactoriamente", catalogos });
    } catch (error) {
        next(error)
    }
};

const editarCatalogo = async (req, res, next) => {
    try {
        const { id } = req.params;

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const errorMessages = errors.array().map(err => err.msg);
            return res.status(400).json({ status: 'error', message: errorMessages.join(', ') });
        }
        const sanitizedData = req.body;

        const { nombre, codigo_interno, codigo_de_barras, codigo_proveedor, descripcion, activo, id_unidad_medida, id_tipo_catalogo, id_subcategoria } = sanitizedData;


        const catalogo = await Catalogo.findByPk(id);
        if (!catalogo) {
            return res.status(404).send({ status: "error", message: 'Catalogo no encontrado' });
        }

        const catalogoActualizado = await catalogo.update({
            nombre,
            codigo_interno,
            codigo_de_barras,
            codigo_proveedor,
            descripcion,
            activo,
            id_unidad_medida,
            id_tipo_catalogo,
            id_subcategoria
        });

        return res.status(200).send({ status: "success", message: "Catalogo actualizado satisfactoriamente", catalogo: catalogoActualizado });
    } catch (error) {
        next(error)
    }
};

const borrarCatalogo = async (req, res, next) => {
    let { id } = req.params;
    try {
        const catalogo = await Catalogo.findByPk(id);
        if (!catalogo) {
            return res.status(400).json({
                status: "error",
                message: "Catalogo no encontrado"
            });
        }
        await catalogo.destroy();
        return res.status(200).json({
            status: "success",
            message: "Catalogo eliminado"
        });
    } catch (error) {
        next(error);
    }
};


module.exports = {
    crearCatalogo,
    obtCatalogoPorId,
    mostrarCatalogos,
    editarCatalogo,
    borrarCatalogo
}
