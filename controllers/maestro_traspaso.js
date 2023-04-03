const { sequelize } = require('../db/connection');
const { Inventario } = require('../db/models/almacen');

const moment = require('moment-timezone');
const Traspaso = require('../db/models/inventario/traspaso');
const TraspasoDetalle = require('../db/models/inventario/traspaso_detalle');

const createTraspasoTransaction = async (req, res) => {
    const {
        form,
        cart
    } = req.body;
    const {
        id_almacen_origen,
        id_almacen_destino,
        id_personal,
        ...restForm
    } = form;

    if (id_almacen_origen === id_almacen_destino) {
        console.error('Error: id_almacen_origen y id_almacen_destino no pueden ser el mismo.');
        return res.status(400).json({ status: 'error', message: 'id_almacen_origen y id_almacen_destino no pueden ser el mismo' });
    }
    try {
        await sequelize.transaction(async (t) => {
            // Create Traspaso
            const traspasoData = {
                ...restForm,
                id_personal: id_personal,
                id_almacen_origen: id_almacen_origen,
                id_almacen_destino: id_almacen_destino,
                fecha: moment().tz('America/La_Paz').format('YYYY-MM-DD HH:mm:ss.SS')
            };
            const traspaso = await Traspaso.create(traspasoData, { transaction: t });

            // Create TraspasoDetalle and update Inventario for each item in the cart
            for (const item of cart) {
                // Find Inventario
                const inventario = await Inventario.findOne({
                    where: { id_catalogo: item.id, id_almacen: id_almacen_origen },
                    transaction: t
                });

                if (!inventario) {
                    throw new Error(`Inventario not found for catalogo ID ${item.id} and almacen ID ${id_almacen_origen}`);
                }

                // Check if there is enough stock
                if (inventario.cantidad_actual < item.cantidad) {
                    throw new Error(`Not enough stock for catalogo ID ${item.id} in almacen ID ${id_almacen_origen}`);
                }

                // Create TraspasoDetalle
                const traspasoDetalleData = {
                    id_traspaso: traspaso.id,
                    id_catalogo: item.id,
                    cantidad: item.cantidad,
                    costo_unitario: inventario.costo_actual
                };
                // Replace SalidaDetalle with the TraspasoDetalle model (you need to create and import it)
                await TraspasoDetalle.create(traspasoDetalleData, { transaction: t });

                // Update Inventario with the new cantidad_actual
                const cantidadActualizada = parseInt(inventario.cantidad_actual, 10) - parseInt(item.cantidad, 10);
                const inventarioData = {
                    cantidad_actual: cantidadActualizada
                };

                await inventario.update(inventarioData, { transaction: t });


                let suma_costos = parseFloat(form.costo_transporte) + parseFloat(form.costo_carga) + parseFloat(form.costo_almacenes) + parseFloat(form.otros_costos);

                // Find o create Inventario para almacen_destino
                const [inventarioDestino, created] = await Inventario.findOrCreate({
                    where: { id_catalogo: item.id, id_almacen: id_almacen_destino },
                    defaults: {
                        id_catalogo: item.id,
                        id_almacen: id_almacen_destino,
                        cantidad_actual: 0,
                        costo_actual: inventario.costo_actual
                    },
                    transaction: t
                });

                let suma_cant_precio_total = 0;
                for (const item of cart) {
                    suma_cant_precio_total += parseFloat(item.cantidad) * parseFloat(item.costo_unitario);
                }

                // Calcular porcentaje, costo_unitario_promediado, y costoPromedioPonderado
                const porcentaje = ((parseFloat(item.cantidad) * parseFloat(item.costo_unitario)) * 100) / suma_cant_precio_total;
                const costo_unitario_promediado = (suma_costos * porcentaje / 100) / parseFloat(item.cantidad);
                const cantidadActualizadaDestino = parseInt(inventarioDestino.cantidad_actual, 10) + parseInt(item.cantidad, 10);
                const costoPromedioPonderado = ((parseFloat(inventarioDestino.costo_actual) * parseFloat(inventarioDestino.cantidad_actual)) + (parseFloat(costo_unitario_promediado) * parseFloat(item.cantidad))) / cantidadActualizadaDestino;
                console.log(costoPromedioPonderado)


                // Actualizar Inventario con la cantidad_actual y costo_actual para almacen_destino
                const inventarioDataDestino = {
                    cantidad_actual: cantidadActualizadaDestino,
                    costo_actual: costoPromedioPonderado
                };


                await inventarioDestino.update(inventarioDataDestino, { transaction: t });
            }
        });

        return res.status(200).json({ status: 'success', message: 'Transaction completed successfully.' });
    } catch (error) {
        console.error('Error in transaction:', error);
        return res.status(500).json({ status: 'error', message: 'Transaction failed.' });
    }
};

module.exports = {
    createTraspasoTransaction
}
