const { DataTypes } = require('sequelize');
const { sequelize } = require('../../connection');
const { Compra, Personal } = require('../otros_modulos');
const { Almacen } = require('../almacen');
const { ConceptoIngreso } = require('../concepto');
const IngresoDetalle = require('./ingreso_detalle');
const { Catalogo } = require('../catalogo');


const Ingreso = sequelize.define('ingreso', {
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
    costo_transporte: {
        type: DataTypes.DECIMAL(12, 2),
        defaultValue: 0.00
    },
    costo_carga: {
        type: DataTypes.DECIMAL(12, 2),
        defaultValue: 0.00
    },
    costo_almacenes: {
        type: DataTypes.DECIMAL(12, 2),
        defaultValue: 0.00
    },
    otros_costos: {
        type: DataTypes.DECIMAL(12, 2),
        defaultValue: 0.00
    },
    observaciones: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    id_compra: {
        type: DataTypes.INTEGER,
        references: {
            model: 'compra',
            key: 'id'
        },
        allowNull: true
    },
    id_concepto_ingreso: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'concepto_ingreso',
            key: 'id'
        }
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
    }
}, {
    timestamps: false,
    underscored: true,
    tableName: 'ingreso'
});

Compra.hasOne(Ingreso, { foreignKey: 'id_compra', as: 'ingreso' });
ConceptoIngreso.hasOne(Ingreso, { foreignKey: 'id_concepto_ingreso', as: 'ingreso' });
Personal.hasOne(Ingreso, { foreignKey: 'id_personal', as: 'ingreso' });
Almacen.hasOne(Ingreso, { foreignKey: 'id_almacen', as: 'ingreso' });

IngresoDetalle.belongsTo(Ingreso, { foreignKey: 'id_ingreso' });
IngresoDetalle.belongsTo(Catalogo, { foreignKey: 'id_catalogo' });

Ingreso.hasMany(IngresoDetalle, { foreignKey: 'id_ingreso' });
Catalogo.hasMany(IngresoDetalle, { foreignKey: 'id_catalogo' })

Ingreso.belongsTo(Compra, { foreignKey: 'id_compra', as: 'compra' });
Ingreso.belongsTo(ConceptoIngreso, { foreignKey: 'id_concepto_ingreso', as: 'concepto_ingreso' });
Ingreso.belongsTo(Personal, { foreignKey: 'id_personal', as: 'personal' });
Ingreso.belongsTo(Almacen, { foreignKey: 'id_almacen', as: 'almacen' });

module.exports = Ingreso;
