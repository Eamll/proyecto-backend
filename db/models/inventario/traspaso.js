const { DataTypes } = require('sequelize');
const { sequelize } = require('../../connection');

const { Personal } = require('../otros_modulos');
const { Almacen } = require('../almacen');
const { ConceptoTraspaso } = require('../concepto');

const Traspaso = sequelize.define('traspaso', {
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
    id_almacen_origen: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'almacen',
            key: 'id'
        }
    },
    id_almacen_destino: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'almacen',
            key: 'id'
        }
    },
    id_concepto_traspaso: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'concepto_traspaso',
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
    }
}, {
    timestamps: false,
    underscored: true,
    tableName: 'traspaso'
});

ConceptoTraspaso.hasOne(Traspaso, { foreignKey: 'id_concepto_traspaso', as: 'traspaso' });
Personal.hasOne(Traspaso, { foreignKey: 'id_personal', as: 'traspaso' });
Almacen.hasOne(Traspaso, { foreignKey: 'id_almacen_origen', as: 'traspaso_origen' });
Almacen.hasOne(Traspaso, { foreignKey: 'id_almacen_destino', as: 'traspaso_destino' });

Traspaso.belongsTo(ConceptoTraspaso, { foreignKey: 'id_concepto_traspaso', as: 'concepto_traspaso' });
Traspaso.belongsTo(Personal, { foreignKey: 'id_personal', as: 'personal' });
Traspaso.belongsTo(Almacen, { foreignKey: 'id_almacen_origen', as: 'almacen_origen' });
Traspaso.belongsTo(Almacen, { foreignKey: 'id_almacen_destino', as: 'almacen_destino' });

module.exports = Traspaso;
