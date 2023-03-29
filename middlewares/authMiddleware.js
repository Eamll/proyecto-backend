const { expressjwt: jwt } = require('express-jwt');

const authMiddleware = jwt({
    secret: process.env.JWT_SECRET,
    algorithms: ['HS256'],
    userProperty: 'auth',
});

module.exports = authMiddleware;
