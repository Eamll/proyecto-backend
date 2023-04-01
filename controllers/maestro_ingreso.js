const { Sequelize } = require('sequelize');
const { sequelize } = require('../db/connection');
const { Inventario } = require('../db/models/almacen');
const Ingreso = require('../db/models/inventario/ingreso');
const IngresoDetalle = require('../db/models/inventario/ingreso_detalle');
const { Compra } = require('../db/models/otros_modulos');


const createIngresoTransaction = async (req, res) => {
    const {
        form,
        cart
    } = req.body;
    const {
        id_compra,
        id_almacen,
        id_personal,
        ...restForm
    } = form;

    try {
        await sequelize.transaction(async (t) => {

            if (id_compra !== null && id_compra !== '') {
                const compra = await Compra.findByPk(id_compra);

                // Check if Compra is already processed

                if (compra.estado.toLowerCase() === 'procesada') {
                    throw new Error('Compra is already processed.');
                }
                // Update Compra
                await Compra.update({ estado: 'procesada' }, { where: { id: id_compra }, transaction: t });
            }
            // Create Ingreso
            const ingresoData = {
                ...restForm,
                id_compra: (id_compra !== null && id_compra !== '') ? id_compra : null, // Set id_compra to null if it's null or an empty string
                id_almacen: id_almacen,
                id_personal: id_personal,
                fecha: new Date()
            };
            const ingreso = await Ingreso.create(ingresoData, { transaction: t });

            // Create IngresoDetalle and update Inventario for each item in cart
            for (const item of cart) {
                const ingresoDetalleData = {
                    id_ingreso: ingreso.id,
                    id_catalogo: item.id,
                    cantidad: item.cantidad,
                    costo_unitario: item.costo_unitario
                };
                await IngresoDetalle.create(ingresoDetalleData, { transaction: t });

                // Find or create Inventario
                const [inventario, created] = await Inventario.findOrCreate({
                    where: { id_catalogo: item.id, id_almacen: id_almacen },
                    defaults: { cantidad_actual: 0, costo_actual: 0 },
                    transaction: t
                });

                // Update Inventario
                const inventarioData = {
                    cantidad_actual: Sequelize.literal(`cantidad_actual + ${item.cantidad}`),
                    costo_actual: item.costo_unitario
                };
                await inventario.update(inventarioData, { transaction: t });
            }
        });

        return res.status(200).json({ status: 'success', message: 'Transaction completed successfully.' });
    } catch (error) {
        console.error('Error in transaction:', error);
        return res.status(500).json({ status: 'error', message: 'Transaction failed.' });
    }
};

module.exports = {
    createIngresoTransaction
}