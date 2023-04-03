const { DataTypes } = require('sequelize');
const { sequelize } = require('../../connection');
const { Catalogo } = require('../catalogo');
const Salida = require('./salida');

const SalidaDetalle = sequelize.define('salida_detalle', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    cantidad: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    costo_unitario: {
        type: DataTypes.DECIMAL(12, 2),
        allowNull: false,
        defaultValue: 0.00
    },
    id_salida: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'salida',
            key: 'id'
        }
    },
    id_catalogo: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'catalogo',
            key: 'id'
        }
    }
}, {
    timestamps: false,
    underscored: true,
    tableName: 'salida_detalle'
});

// Salida.hasMany(SalidaDetalle, { foreignKey: 'id_salida' });

Catalogo.hasMany(SalidaDetalle, { foreignKey: 'id_catalogo' });

// SalidaDetalle.belongsTo(Salida, { foreignKey: 'id_salida' });
SalidaDetalle.belongsTo(Catalogo, { foreignKey: 'id_catalogo' });

module.exports = SalidaDetalle;
