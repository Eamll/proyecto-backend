const { DataTypes } = require('sequelize');
const { sequelize } = require('../../connection');

const ConceptoTraspaso = sequelize.define('concepto_traspaso', {
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
    descripcion: {
        type: DataTypes.STRING(255),
        allowNull: true
    }
}, {
    timestamps: false,
    underscored: true,
    tableName: 'concepto_traspaso'
});

module.exports = ConceptoTraspaso;
