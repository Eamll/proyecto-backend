const { DataTypes } = require('sequelize');
const { sequelize } = require('../../connection');

const { Personal } = require('../otros_modulos');
const ConceptoAjuste = require('../concepto/concepto_ajuste');
const { Almacen } = require('../almacen');

const Ajuste = sequelize.define('ajuste', {
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
    id_almacen: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'almacen',
            key: 'id'
        }
    },
    id_concepto_ajuste: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'concepto_ajuste',
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
    tableName: 'ajuste'
});

Almacen.hasOne(Ajuste, { foreignKey: 'id_almacen', as: 'ajuste' });
ConceptoAjuste.hasOne(Ajuste, { foreignKey: 'id_concepto_ajuste', as: 'ajuste' });
Personal.hasOne(Ajuste, { foreignKey: 'id_personal', as: 'ajuste' });

Ajuste.belongsTo(Almacen, { foreignKey: 'id_almacen', as: 'almacen' });
Ajuste.belongsTo(ConceptoAjuste, { foreignKey: 'id_concepto_ajuste', as: 'concepto_ajuste' });
Ajuste.belongsTo(Personal, { foreignKey: 'id_personal', as: 'personal' });

module.exports = Ajuste;
