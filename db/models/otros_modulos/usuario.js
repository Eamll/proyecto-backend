const { DataTypes } = require('sequelize');
const { sequelize } = require('../../connection');
const Contacto = require('./contacto');
const TipoUsuario = require('./tipo_usuario');
// const bcrypt = require('bcrypt');
// class Usuario extends sequelize.Model {
//     async checkPassword(password) {
//         // return bcrypt.compare(password, this.password);
//         return password, this.password;
//     }
// }

const Usuario = sequelize.define('usuario', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        references: {
            model: Contacto,
            key: 'id'
        }
    },
    estado: {
        type: DataTypes.CHAR(1),
        allowNull: false
    },
    login: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    password: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    id_tipo_usuario: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: TipoUsuario,
            key: 'id'
        }
    }
}, {
    timestamps: false,
    underscored: true,
    tableName: 'usuario'
});
Usuario.prototype.checkPassword = function (password) {
    return password === this.password;
};

Contacto.hasMany(Usuario, { foreignKey: 'id', as: 'usuario' });
TipoUsuario.hasMany(Usuario, { foreignKey: 'id_tipo_usuario' });

Usuario.belongsTo(Contacto, { foreignKey: 'id' });
Usuario.belongsTo(TipoUsuario, { foreignKey: 'id_tipo_usuario' });

module.exports = Usuario;
