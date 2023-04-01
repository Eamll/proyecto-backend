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
                    include: [
                        {
                            model: Contacto,
                            as: 'contacto'
                        }
                    ]
                },
                {
                    model: Almacen,
                    as: 'almacen',
                    include: [
                        {
                            model: Sucursal,
                            as: 'sucursal'
                        }
                    ]
                },
                {
                    model: Proveedor,
                    as: 'proveedor'
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
