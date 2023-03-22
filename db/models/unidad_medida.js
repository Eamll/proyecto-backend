const { DataTypes } = require('sequelize');
const { sequelize } = require('../connection');

const UnidadMedida = sequelize.define('unidad_medida', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    abreviatura: {
        type: DataTypes.STRING(10),
        allowNull: false
    }
}, {
    timestamps: false,
    underscored: true,
    tableName: 'unidad_medida',
    hooks: {
        async beforeDestroy(unidad_medida, options) {
            const count = await unidad_medida.countCatalogo();
            if (count > 0) {
                throw new Error('No se puede eliminar una unidad de medida que tiene catalogos asociados');
            }
        }
    }
});

module.exports = UnidadMedida;