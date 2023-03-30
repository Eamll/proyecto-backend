const { DataTypes } = require('sequelize');
const { sequelize } = require('../../connection');


const IngresoDetalle = sequelize.define('ingreso_detalle', {
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
    id_ingreso: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'ingreso',
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
    tableName: 'ingreso_detalle'
});

module.exports = IngresoDetalle;
