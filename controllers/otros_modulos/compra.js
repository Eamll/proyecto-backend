// const { validationResult } = require("express-validator");
const { Op } = require("sequelize");
const { Almacen } = require("../../db/models/almacen");
const { Compra, Personal, Contacto, Sucursal } = require("../../db/models/otros_modulos");
const Proveedor = require("../../db/models/otros_modulos/proveedor");


const mostrarCompras = async (req, res, next) => {
    try {
        const compras = await Compra.findAll({
            where: {
                estado: {
                    [Op.notILike]: "%procesada%"
                }
            },
            include: [
                {
                    model: Personal,
                    as: 'personal',
                    attributes: ['id'],
                    include: [
                        {
                            model: Contacto,
                            as: 'contacto',
                            attributes: ['id', 'nombre', 'apellido_paterno', 'apellido_materno']
                        }
                    ]
                },
                {
                    model: Almacen,
                    as: 'almacen',
                    attributes: ['id', 'nombre'],
                    include: [
                        {
                            model: Sucursal,
                            as: 'sucursal',
                            attributes: ['id', 'nombre']
                        }
                    ]
                },
                {
                    model: Proveedor,
                    as: 'proveedor',
                    attributes: ['id', 'razon_social']
                }
            ]
        });
        return res.status(200).json({ status: "success", message: "Compras obtenidos satisfactoriamente", compras });
    } catch (error) {
        next(error)
    }
};


module.exports = {
    mostrarCompras
}
