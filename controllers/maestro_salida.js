
const { sequelize } = require('../db/connection');
const { Inventario } = require('../db/models/almacen');
const { Salida, SalidaDetalle } = require('../db/models/inventario');
// const { Personal } = require('../db/models/otros_modulos');
const moment = require('moment-timezone');

const createSalidaTransaction = async (req, res) => {
    const {
        form,
        cart
    } = req.body;
    const {
        id_almacen,
        id_personal,
        ...restForm
    } = form;

    try {
        await sequelize.transaction(async (t) => {
            // Create Salida
            const salidaData = {
                ...restForm,
                id_personal: id_personal,
                id_almacen: id_almacen,
                fecha: moment().tz('America/La_Paz').format('YYYY-MM-DD HH:mm:ss.SS')
            };
            const salida = await Salida.create(salidaData, { transaction: t });

            // Create SalidaDetalle and update Inventario for each item in the cart
            for (const item of cart) {
                // Find Inventario
                const inventario = await Inventario.findOne({
                    where: { id_catalogo: item.id, id_almacen: id_almacen },
                    transaction: t
                });

                if (!inventario) {
                    throw new Error(`Inventario not found for catalogo ID ${item.id} and almacen ID ${id_almacen}`);
                }

                // Check if there is enough stock
                if (inventario.cantidad_actual < item.cantidad) {
                    throw new Error(`Not enough stock for catalogo ID ${item.id} in almacen ID ${id_almacen}`);
                }

                // Create SalidaDetalle
                const salidaDetalleData = {
                    id_salida: salida.id,
                    id_catalogo: item.id,
                    cantidad: item.cantidad,
                    costo_unitario: inventario.costo_actual
                };
                await SalidaDetalle.create(salidaDetalleData, { transaction: t });

                // Update Inventario with the new cantidad_actual
                const cantidadActualizada = inventario.cantidad_actual - item.cantidad;
                const inventarioData = {
                    cantidad_actual: cantidadActualizada
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
    createSalidaTransaction
}
