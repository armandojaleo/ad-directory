const jwt = require('jsonwebtoken');
const config = require('../config/secret');

function verifyToken(req, res, next) {
    const token = req.headers['auth-token'];
    if (!token) {
        return res.status(401).send({ auth: false, message: 'No token provided' });
    }
    jwt.verify(token, config.secret, function (err, decoded) {
        if (decoded) {
            req.userid = decoded.id;
        }
    });
    next();
}

module.exports = verifyToken;