const { Op } = require('sequelize');
const { Catalogo } = require('../../db/models/catalogo');
const validator = require('validator');


const crearCatalogo = async (req, res) => {
    try {
        const { nombre, codigo_interno, codigo_de_barras, codigo_proveedor, descripcion, activo, id_unidad_medida, id_tipo_catalogo, id_subcategoria } = req.body;


        const nombreLimpio = validator.trim(nombre);


        // Validatar el largo del nombre
        if (!validator.isLength(nombreLimpio, { min: 1, max: 100 })) {
            return res.status(400).json({
                status: 'error',
                message: 'El nombre debe tener entre 1 y 100 caracteres',
            });
        }


        // verificar la existencia de un catalogo antes de crear uno
        const { duplicado, message } = await verificarAtributosUnicosCatalogo(codigo_interno, codigo_de_barras, codigo_proveedor);
        if (duplicado) {
            return res.status(400).send({ status: "error", message });
        }

        const nuevoCatalogo = await Catalogo.create({
            nombre: nombreLimpio,
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
    } catch (error) {
        console.error(error);
        res.status(500).send({
            status: "error",
            message: "Error al crear nuevo catalogo",
        });
    }
};

const obtCatalogoPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const catalogo = await Catalogo.findByPk(id);
        if (!catalogo) {
            return res.status(404).json({ status: "error", message: 'No se ha encontrado el catalogo' });
        }
        res.status(200).json({ status: "success", catalogo });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: "error", message: 'Error interno del servidor' });
    }
};

const mostrarCatalogos = async (req, res) => {
    try {
        const products = await Catalogo.findAll();
        return res.status(200).json({ status: "success", products });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: "error", message: "Error interno del servidor" });
    }
};

const editarCatalogo = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, codigo_interno, codigo_de_barras, codigo_proveedor, descripcion, activo, id_unidad_medida, id_tipo_catalogo, id_subcategoria } = req.body;

        const nombreLimpio = validator.trim(nombre);

        // Validatar el largo del nombre
        if (!validator.isLength(nombreLimpio, { min: 1, max: 100 })) {
            return res.status(400).json({
                status: 'error',
                message: 'El nombre debe tener entre 1 y 100 caracteres',
            });
        }

        const catalogo = await Catalogo.findByPk(id);
        if (!catalogo) {
            return res.status(404).send({ status: "error", message: 'Catalogo no encontrado' });
        }
        // verificar la existencia de un catalogo antes de crear uno
        const { duplicado, message } = await verificarAtributosUnicosCatalogo(codigo_interno, codigo_de_barras, codigo_proveedor);
        if (duplicado && duplicado.id !== catalogo.id) {
            return res.status(400).send({ status: "error", message });
        }

        const catalogoActualizado = await catalogo.update({
            nombre: nombreLimpio,
            codigo_interno,
            codigo_de_barras,
            codigo_proveedor,
            descripcion,
            activo,
            id_unidad_medida,
            id_tipo_catalogo,
            id_subcategoria
        });

        return res.status(200).send({ status: "success", catalogo: catalogoActualizado });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ status: "error", message: 'Error interno del servidor' });
    }
};

const borrarCatalogo = async (req, res) => {
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
        console.error(error);
        return res.status(500).json({
            status: "error",
            message: "Error inesperado, intente más tarde."
        });
    }
};

const verificarAtributosUnicosCatalogo = async (codigo_interno, codigo_de_barras, codigo_proveedor) => {
    const duplicado = await Catalogo.findOne({
        where: {
            [Op.or]: [{ codigo_interno }, { codigo_de_barras }, { codigo_proveedor }]
        }
    });

    if (duplicado) {
        const atributoRepetido = duplicado.codigo_interno === codigo_interno ? 'codigo_interno' :
            duplicado.codigo_de_barras === codigo_de_barras ? 'codigo_de_barras' :
                'codigo_proveedor';
        return { duplicado, message: `El atributo ${atributoRepetido} ya está en uso` };
    }

    return { duplicado };
};

module.exports = {
    crearCatalogo,
    obtCatalogoPorId,
    mostrarCatalogos,
    editarCatalogo,
    borrarCatalogo
}
