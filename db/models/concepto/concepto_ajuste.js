const { DataTypes } = require('sequelize');
const { sequelize } = require('../../connection');

const ConceptoAjuste = sequelize.define('concepto_ajuste', {
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
    tableName: 'concepto_ajuste'
});

module.exports = ConceptoAjuste;
