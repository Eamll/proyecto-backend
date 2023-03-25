const { DataTypes } = require('sequelize');
const { sequelize } = require('../../connection');
const Contacto = require('./contacto');


const Personal = sequelize.define('personal', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        references: {
            model: 'contacto',
            key: 'id'
        }
    },
    estado: {
        type: DataTypes.CHAR(1),
        allowNull: true
    },
    fecha_contrato: {
        type: DataTypes.DATEONLY,
        allowNull: true
    },
    fecha_retiro: {
        type: DataTypes.DATEONLY,
        allowNull: true
    }
}, {
    timestamps: false,
    underscored: true,
    tableName: 'personal'
});

Contacto.hasOne(Personal, { foreignKey: 'id', as: 'personal' });

Personal.belongsTo(Contacto, { foreignKey: 'id', as: 'contacto' });

module.exports = Personal;
