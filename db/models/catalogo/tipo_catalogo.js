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
    tableName: 'tipo_catalogo',
    hooks: {
        async beforeDestroy(tipo_catalogo, options) {
            const count = await tipo_catalogo.countCatalogo();
            if (count > 0) {
                throw new Error('No se puede eliminar un tipo de catalogo que tiene catalogos asociados');
            }
        }
    }
});

module.exports = TipoCatalogo;