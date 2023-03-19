const { DataTypes } = require('sequelize');
const { sequelize } = require('../../connection');

const Categoria = sequelize.define('categoria', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    nombre: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
}, {
    timestamps: false,
    underscored: true,
    tableName: 'categoria',
    hooks: {
        async beforeDestroy(categoria, options) {
            const count = await categoria.countSubcategoria();
            if (count > 0) {
                throw new Error('No se puede eliminar una categoria que tiene subcategorias asociadas');
            }
        }
    }
});



module.exports = Categoria;
