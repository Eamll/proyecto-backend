
const DetalleCompra = require("../../db/models/otros_modulos/detalle_compra");
const { Catalogo } = require("../../db/models/catalogo");
const { Compra } = require("../../db/models/otros_modulos");

const obtDetalleCompraPorId = async (req, res, next) => {
    try {
        const compraId = req.params.id;
        const detallesCompra = await DetalleCompra.findAll({
            where: { id_compra: compraId },
            include: [
                {
                    model: Catalogo,
                    as: 'catalogo',
                    attributes: ['id', 'nombre', 'codigo_interno'],
                }
            ]
        });

        if (detallesCompra.length === 0) {
            return res.status(404).json({ status: "error", message: "Detalle de compra no encontrado para la compra especificada" });
        }

        return res.status(200).json({ status: "success", message: "Detalle de compras obtenidos satisfactoriamente", detallesCompra });
    } catch (error) {
        next(error);
    }
};



const mostrarDetalleCompras = async (req, res, next) => {
    try {
        const detalleCompras = await DetalleCompra.findAll({
            include: [
                {
                    model: Catalogo,
                    as: 'catalogo',
                    attributes: ['id', 'nombre', 'codigo_interno'], // Add the relevant attributes from the Catalogo model
                },
                {
                    model: Compra,
                    as: 'compra',

                }
            ]
        });
        return res.status(200).json({ status: "success", message: "Detalle de compras obtenidos satisfactoriamente", detalleCompras });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    mostrarDetalleCompras,
    obtDetalleCompraPorId
};
