const { DataTypes } = require('sequelize');
const { sequelize } = require('../../connection');
const Almacen = require('./almacen');
const Catalogo = require('./catalogo');

const Inventario = sequelize.define('inventario', {
    id_almacen: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'almacen',
            key: 'id'
        },
        validate: {
            isInt: true,
            notNull: true
        }
    },
    id_catalogo: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'catalogo',
            key: 'id'
        },
        validate: {
            isInt: true,
            notNull: true
        }
    },
    costo_actual: {
        type: DataTypes.NUMERIC(12, 5),
        allowNull: false,
        defaultValue: 0.00
    },
    cantidad_actual: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    }
}, {
    timestamps: false,
    underscored: true,
    tableName: 'inventario'
});

Almacen.hasMany(Inventario, { foreignKey: 'id_almacen', as: 'inventario' });
Catalogo.hasMany(Inventario, { foreignKey: 'id_catalogo', as: 'inventario' });

Inventario.belongsTo(Almacen, { foreignKey: 'id_almacen', as: 'almacen' });
Inventario.belongsTo(Catalogo, { foreignKey: 'id_catalogo', as: 'catalogo' });

module.exports = Inventario;
