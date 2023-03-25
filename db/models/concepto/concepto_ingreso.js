const { DataTypes } = require('sequelize');
const { sequelize } = require('../../connection');
// const Ingreso = require('../inventario/ingreso');




const ConceptoIngreso = sequelize.define('concepto_ingreso', {
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
    tableName: 'concepto_ingreso'
});

// ConceptoIngreso.hasOne(Ingreso, { foreignKey: 'id_concepto_ingreso', as: 'ingreso' });
// Ingreso.belongsTo(ConceptoIngreso, { foreignKey: 'id_concepto_ingreso', as: 'concepto_ingreso' });


module.exports = ConceptoIngreso;
