const { DataTypes } = require('sequelize');
const { sequelize } = require('../../connection');

const Categoria = sequelize.define('categoria', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    nombre: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
}, {
    timestamps: false,
    underscored: true,
    tableName: 'categoria'
});

module.exports = Categoria;
