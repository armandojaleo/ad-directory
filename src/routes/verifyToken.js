const jwt = require('jsonwebtoken');
const config = require('../config/secret');

async function verifyToken(req, res, next) {
    const token = req.headers['auth-token'];
    if (!token) {
        return res.status(401).send({ auth: false, message: 'No token provided' });
    }
    // Decode the Tokenreq.userId = decoded.id;
    const decoded = await jwt.verify(token, config.secret);
    req.userid = decoded.id;
    next();
}

module.exports = verifyToken;