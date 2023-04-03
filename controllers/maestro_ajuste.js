const { sequelize } = require('../db/connection');
const moment = require('moment-timezone');
const Ajuste = require('../db/models/inventario/ajuste');
const AjusteDetalle = require('../db/models/inventario/ajuste_detalle');
const { Inventario } = require('../db/models/almacen');

const createAjusteTransaction = async (req, res) => {
    const {
        form,
        cart
    } = req.body;
    const {
        id_almacen,
        id_concepto_ajuste,
        id_personal,
        tipo_ajuste,
        ...restForm
    } = form;

    try {
        await sequelize.transaction(async (t) => {
            // Create Ajuste
            const ajusteData = {
                ...restForm,
                id_almacen: id_almacen,
                id_concepto_ajuste: id_concepto_ajuste,
                id_personal: id_personal,
                fecha: moment().tz('America/La_Paz').format('YYYY-MM-DD HH:mm:ss.SS')
            };
            const ajuste = await Ajuste.create(ajusteData, { transaction: t });

            // Create AjusteDetalle and update Inventario for each item in cart
            for (const item of cart) {
                // Find or create inventory
                const [inventario, created] = await Inventario.findOrCreate({
                    where: { id_catalogo: item.id, id_almacen: id_almacen },
                    defaults: { cantidad_actual: 0, costo_actual: 0 },
                    transaction: t
                });

                // Update inventory based on the type of adjustment
                const cantidadActualizada = (tipo_ajuste === 'S') ?
                    parseInt(inventario.cantidad_actual, 10) + parseInt(item.cantidad, 10) :
                    parseInt(inventario.cantidad_actual, 10) - parseInt(item.cantidad, 10);

                // Create AjusteDetalle
                const ajusteDetalleData = {
                    id_ajuste: ajuste.id,
                    id_catalogo: item.id,
                    cantidad: item.cantidad,
                    tipo_ajuste: tipo_ajuste
                };
                await AjusteDetalle.create(ajusteDetalleData, { transaction: t });

                // Update Inventario with the new quantity
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
    createAjusteTransaction
}
