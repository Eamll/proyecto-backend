const { DataTypes } = require('sequelize');
const { sequelize } = require('../../connection');
const Sucursal = require('../otros_modulos/sucursal');

const Almacen = sequelize.define('almacen', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    nombre: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    ubicacion: {
        type: DataTypes.STRING(255)
    },
    descripcion: {
        type: DataTypes.STRING(255)
    },
    activo: {
        type: DataTypes.CHAR(1),
        defaultValue: 'A'
    },
    id_sucursal: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'sucursal',
            key: 'id'
        },
        validate: {
            isInt: true,
            notNull: true
        }
    }
}, {
    timestamps: false,
    underscored: true,
    tableName: 'almacen'
});

Sucursal.hasMany(Almacen, { foreignKey: 'id_sucursal', as: 'almacen' });

Almacen.belongsTo(Sucursal, { foreignKey: 'id_sucursal', as: 'sucursal' });

module.exports = Almacen;
