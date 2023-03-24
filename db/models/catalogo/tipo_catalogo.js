const { DataTypes } = require('sequelize');
const { sequelize } = require('../../connection');

const TipoCatalogo = sequelize.define('tipo_catalogo', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: false,
    },
    nombre: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
}, {
    timestamps: false,
    underscored: true,
    tableName: 'tipo_catalogo'
});

module.exports = TipoCatalogo;