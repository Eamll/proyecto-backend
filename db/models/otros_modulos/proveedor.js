const { DataTypes } = require('sequelize');
const { sequelize } = require('../../connection');
const Contacto = require('./contacto');


const Proveedor = sequelize.define('proveedor', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false
    },
    razon_social: {
        type: DataTypes.STRING(50),
        allowNull: true
    },
    estado: {
        type: DataTypes.STRING(20),
        allowNull: true
    }
}, {
    timestamps: false,
    underscored: true,
    tableName: 'proveedor'
});

Proveedor.belongsTo(Contacto, { foreignKey: 'id' });

module.exports = Proveedor;
