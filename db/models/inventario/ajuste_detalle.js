const { DataTypes } = require('sequelize');
const { sequelize } = require('../../connection');
const { Catalogo } = require('../catalogo');
const Ajuste = require('./ajuste');

const AjusteDetalle = sequelize.define('ajuste_detalle', {
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
    tipo_ajuste: {
        type: DataTypes.CHAR(1),
        allowNull: false,
        validate: {
            isIn: [['S', 'R']]
        }
    },
    id_catalogo: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'catalogo',
            key: 'id'
        }
    },
    id_ajuste: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'ajuste',
            key: 'id'
        }
    }
}, {
    timestamps: false,
    underscored: true,
    tableName: 'ajuste_detalle'
});

Ajuste.hasMany(AjusteDetalle, { foreignKey: 'id_ajuste' });
Catalogo.hasMany(AjusteDetalle, { foreignKey: 'id_catalogo' });

AjusteDetalle.belongsTo(Ajuste, { foreignKey: 'id_ajuste' });
AjusteDetalle.belongsTo(Catalogo, { foreignKey: 'id_catalogo' });

module.exports = AjusteDetalle;
