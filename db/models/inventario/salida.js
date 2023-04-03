const { DataTypes } = require('sequelize');
const { sequelize } = require('../../connection');
const { Personal } = require('../otros_modulos');

const SalidaDetalle = require('./salida_detalle');
const { Almacen } = require('../almacen');
const ConceptoSalida = require('../concepto/concepto_salida');

const Salida = sequelize.define('salida', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    fecha: {
        type: DataTypes.DATE,
        allowNull: false
    },
    observaciones: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    id_personal: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'personal',
            key: 'id'
        }
    },
    id_concepto_salida: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'concepto_salida',
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
    }
}, {
    timestamps: false,
    underscored: true,
    tableName: 'salida'
});

ConceptoSalida.hasOne(Salida, { foreignKey: 'id_concepto_salida', as: 'salida' });
Personal.hasOne(Salida, { foreignKey: 'id_personal', as: 'salida' });
Almacen.hasOne(Salida, { foreignKey: 'id_almacen', as: 'salida' });
SalidaDetalle.belongsTo(Salida, { foreignKey: 'id_salida' });
Salida.hasMany(SalidaDetalle, { foreignKey: 'id_salida' });

Salida.belongsTo(ConceptoSalida, { foreignKey: 'id_concepto_salida', as: 'concepto_salida' });
Salida.belongsTo(Personal, { foreignKey: 'id_personal', as: 'personal' });
Salida.belongsTo(Almacen, { foreignKey: 'id_almacen', as: 'almacen' });

module.exports = Salida;
