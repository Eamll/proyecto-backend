const { sequelize } = require('../db/connection');
const { Inventario } = require('../db/models/almacen');
const { Ingreso, IngresoDetalle } = require('../db/models/inventario');
const { Compra } = require('../db/models/otros_modulos');
const moment = require('moment-timezone');

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

            if (id_compra !== null && id_compra !== '' && id_compra !== undefined) {
                const compra = await Compra.findByPk(id_compra);

                if (compra) {
                    // Check if Compra is already processed
                    if (compra.estado.toLowerCase() === 'procesada') {
                        throw new Error('Compra is already processed.');
                    }
                    // Update Compra
                    await Compra.update({ estado: 'procesada' }, { where: { id: id_compra }, transaction: t });
                }
            }
            console.log(moment().tz('America/La_Paz').format('YYYY-MM-DD HH:mm:ss.SS'));
            // Create Ingreso
            const ingresoData = {
                ...restForm,
                id_compra: (id_compra !== null && id_compra !== '') ? id_compra : null, // Set id_compra to null if it's null or an empty string
                id_almacen: id_almacen,
                id_personal: id_personal,
                fecha: moment().tz('America/La_Paz').format('YYYY-MM-DD HH:mm:ss.SS')
            };
            const ingreso = await Ingreso.create(ingresoData, { transaction: t });


            let suma_cant_precio_total = 0;
            for (const item of cart) {
                suma_cant_precio_total += parseFloat(item.cantidad) * parseFloat(item.costo_unitario);
            }

            let suma_costos = parseFloat(form.costo_transporte) + parseFloat(form.costo_carga) + parseFloat(form.costo_almacenes) + parseFloat(form.otros_costos);

            // Crear IngresoDetalle y actualizar Inventario por cada item del carrito
            for (const item of cart) {
                // Buscar o crear inventario
                const [inventario, created] = await Inventario.findOrCreate({
                    where: { id_catalogo: item.id, id_almacen: id_almacen },
                    defaults: { cantidad_actual: 0, costo_actual: 0 },
                    transaction: t
                });

                // Realizar cálculos adicionales
                const cantidadActualizada = parseInt(inventario.cantidad_actual, 10) + parseInt(item.cantidad, 10);
                const porcentaje = ((parseFloat(item.cantidad) * parseFloat(item.costo_unitario)) * 100) / suma_cant_precio_total;
                const costo_unitario_promediado = (suma_costos * porcentaje / 100) / parseFloat(item.cantidad);

                // Crear IngresoDetalle con el costo_unitario_promediado
                const ingresoDetalleData = {
                    id_ingreso: ingreso.id,
                    id_catalogo: item.id,
                    cantidad: item.cantidad,
                    costo_unitario: costo_unitario_promediado
                };
                await IngresoDetalle.create(ingresoDetalleData, { transaction: t });

                const costoPromedioPonderado = ((parseFloat(inventario.costo_actual) * parseFloat(inventario.cantidad_actual)) + (parseFloat(costo_unitario_promediado) * parseFloat(item.cantidad))) / cantidadActualizada;

                // Actualizar Inventario con el nuevo costo_actual
                const inventarioData = {
                    cantidad_actual: cantidadActualizada,
                    costo_actual: costoPromedioPonderado
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