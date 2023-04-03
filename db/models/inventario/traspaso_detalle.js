const { DataTypes } = require('sequelize');
const { sequelize } = require('../../connection');

const Traspaso = require('./traspaso');
const { Catalogo } = require('../catalogo');

const TraspasoDetalle = sequelize.define('traspaso_detalle', {
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
        type: DataTypes.NUMERIC(12, 2),
        allowNull: false,
        defaultValue: 0.00
    },
    id_catalogo: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'catalogo',
            key: 'id'
        }
    },
    id_traspaso: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'traspaso',
            key: 'id'
        }
    }
}, {
    timestamps: false,
    underscored: true,
    tableName: 'traspaso_detalle'
});

Catalogo.hasOne(TraspasoDetalle, { foreignKey: 'id_catalogo', as: 'traspaso_detalle' });
Traspaso.hasOne(TraspasoDetalle, { foreignKey: 'id_traspaso', as: 'traspaso_detalle' });
TraspasoDetalle.belongsTo(Catalogo, { foreignKey: 'id_catalogo', as: 'catalogo' });
TraspasoDetalle.belongsTo(Traspaso, { foreignKey: 'id_traspaso', as: 'traspaso' });

module.exports = TraspasoDetalle;
