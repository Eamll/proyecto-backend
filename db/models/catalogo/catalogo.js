const { DataTypes } = require('sequelize');
const { sequelize } = require('../../connection');
const Subcategoria = require('./subcategoria');


const Catalogo = sequelize.define('catalogo', {
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
    codigo_interno: {
        type: DataTypes.STRING(20),
        allowNull: false,
        unique: true
    },
    codigo_de_barras: {
        type: DataTypes.STRING(20),
        unique: true
    },
    codigo_proveedor: {
        type: DataTypes.STRING(20),
        unique: true
    },
    descripcion: {
        type: DataTypes.STRING(255)
    },
    activo: {
        type: DataTypes.CHAR(1),
        defaultValue: 'A'
    },
    id_unidad_medida: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'unidad_medida',
            key: 'id'
        }
    },
    id_tipo_catalogo: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'tipo_catalogo',
            key: 'id'
        }
    },
    id_subcategoria: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'subcategoria',
            key: 'id'
        }
    },
}, {
    timestamps: false, // columnas createdAt and updatedAt
    underscored: true, // para usar snake_case en los nombres de los modelos
    tableName: 'catalogo' // setea el nombre de la tabla manualmente para que no sea plural
});

Subcategoria.hasMany(Catalogo, { foreignKey: 'id_subcategoria', as: 'catalogo' });
Catalogo.belongsTo(Subcategoria, { foreignKey: 'id_subcategoria', as: 'subcategoria' });
module.exports = Catalogo;