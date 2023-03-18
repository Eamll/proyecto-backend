const { sequelize } = require("../../db/connection")
const { DataTypes } = require('sequelize');

const Catalogo = sequelize.define('catalogo', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
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
    timestamps: false, // adds createdAt and updatedAt columns
    underscored: true, // uses snake_case instead of camelCase for column names
    tableName: 'catalogo' // sets the table name explicitly (optional)
});

module.exports = Catalogo;