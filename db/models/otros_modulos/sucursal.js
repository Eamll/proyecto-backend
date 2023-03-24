const { DataTypes } = require('sequelize');
const { sequelize } = require('../../connection');

const Sucursal = sequelize.define('sucursal', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    direccion: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    nombre: {
        type: DataTypes.STRING(255),
        allowNull: false
    }
}, {
    timestamps: false,
    underscored: true,
    tableName: 'sucursal'
});

module.exports = Sucursal;
