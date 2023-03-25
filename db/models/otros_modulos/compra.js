const { DataTypes } = require('sequelize');
const { sequelize } = require('../../connection');
const { Almacen } = require('../almacen');
const Personal = require('./personal');
const Proveedor = require('./proveedor');



const Compra = sequelize.define('compra', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    id_personal: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'personal',
            key: 'id'
        }
    },
    id_almacen: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'almacen',
            key: 'id'
        }
    },
    estado: {
        type: DataTypes.STRING(50),
        allowNull: true
    },
    fecha: {
        type: DataTypes.DATEONLY,
        allowNull: true
    },
    tipo_pago: {
        type: DataTypes.CHAR(1),
        allowNull: true
    },
    id_proveedor: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'proveedor',
            key: 'id'
        }
    }
}, {
    timestamps: false,
    underscored: true,
    tableName: 'compra'
});

Personal.hasMany(Compra, { foreignKey: 'id_personal', as: 'compras' });
Almacen.hasMany(Compra, { foreignKey: 'id_almacen', as: 'compras' });
Proveedor.hasMany(Compra, { foreignKey: 'id_proveedor', as: 'compras' });

Compra.belongsTo(Personal, { foreignKey: 'id_personal', as: 'personal' });
Compra.belongsTo(Almacen, { foreignKey: 'id_almacen', as: 'almacen' });
Compra.belongsTo(Proveedor, { foreignKey: 'id_proveedor', as: 'proveedor' });

module.exports = Compra;
