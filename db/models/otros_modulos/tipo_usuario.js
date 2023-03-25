const { DataTypes } = require('sequelize');
const { sequelize } = require('../../connection');

const TipoUsuario = sequelize.define('tipo_usuario', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false
    },
    nombre: {
        type: DataTypes.STRING(50),
        allowNull: false
    }
}, {
    timestamps: false,
    underscored: true,
    tableName: 'tipo_usuario'
});

module.exports = TipoUsuario;
