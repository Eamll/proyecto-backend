const { DataTypes } = require('sequelize');
const { sequelize } = require('../../connection');
const Categoria = require('./categoria');


const Subcategoria = sequelize.define('subcategoria', {
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
    id_categoria: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'categoria',
            key: 'id',
        },
    },
}, {
    timestamps: false, // columnas createdAt and updatedAt
    underscored: true, // para usar snake_case en los nombres de los modelos
    tableName: 'subcategoria', // setea el nombre de la tabla manualmente para que no sea plural
    hooks: {
        async beforeDestroy(subcategoria, options) {
            const count = await subcategoria.countCatalogo();
            if (count > 0) {
                throw new Error('No se puede eliminar una subcategoria que tiene catalogos asociados');
            }
        }
    }
},);

Categoria.hasMany(Subcategoria, { foreignKey: 'id_categoria', as: 'subcategoria' });
Subcategoria.belongsTo(Categoria, { foreignKey: 'id_categoria', as: 'categoria' });
module.exports = Subcategoria;