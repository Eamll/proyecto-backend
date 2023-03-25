const { DataTypes } = require('sequelize');
const { sequelize } = require('../../connection');

const Contacto = sequelize.define('contacto', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    nombre: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    apellido_paterno: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    apellido_materno: {
        type: DataTypes.STRING(50),
        allowNull: true
    },
    telefono: {
        type: DataTypes.STRING(15),
        allowNull: true
    },
    direccion: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    ci: {
        type: DataTypes.STRING(15),
        allowNull: true
    },
    nit: {
        type: DataTypes.STRING(15),
        allowNull: true
    },
    email: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    genero: {
        type: DataTypes.CHAR(1),
        allowNull: true
    }
}, {
    timestamps: false,
    underscored: true,
    tableName: 'contacto'
});

module.exports = Contacto;