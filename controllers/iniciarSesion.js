const jwt = require('jsonwebtoken');
const Usuario = require('../db/models/otros_modulos/usuario');


const iniciarSesion = async (req, res, next) => {
    try {
        const { login, password } = req.body;
        // Verify user credentials (assuming a 'checkPassword' method is defined in the Usuario model)
        const usuario = await Usuario.findOne({ where: { login, id_tipo_usuario: 2 } });
        if (!usuario || !(await usuario.checkPassword(password))) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }


        // Generate JWT token
        const token = jwt.sign({ usuario_id: usuario.id }, process.env.JWT_SECRET, {
            expiresIn: '1h', // Token expiration time
        });


        res.status(200).json({ status: "success", token });
    } catch (error) {
        next(error)
    }
}



module.exports = iniciarSesion;