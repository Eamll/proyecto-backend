const { DataTypes } = require('sequelize');
const { sequelize } = require('../../connection');
const { Catalogo } = require('../catalogo');
const Compra = require('./compra');

const DetalleCompra = sequelize.define('detalle_compra', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
    },
    id_catalogo: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Catalogo,
            key: 'id'
        }
    },
    id_compra: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Compra,
            key: 'id'
        }
    },
    precio: {
        type: DataTypes.DECIMAL(12, 2)
    },
    cantidad: {
        type: DataTypes.INTEGER
    }
}, {
    timestamps: false,
    underscored: true,
    tableName: 'detalle_compra'
});

Catalogo.hasMany(DetalleCompra, { foreignKey: 'id_catalogo', as: 'detalle_compra' });
Compra.hasMany(DetalleCompra, { foreignKey: 'id_compra', as: 'detalle_compra' });

DetalleCompra.belongsTo(Catalogo, { foreignKey: 'id_catalogo' });
DetalleCompra.belongsTo(Compra, { foreignKey: 'id_compra' });

module.exports = DetalleCompra;
