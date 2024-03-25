jwtSecret= 'secret';
const jwt = require('jsonwebtoken');
const createError = require('http-errors');

const signAccessToken = async (user) => {
    return jwt.sign({ id: user.id }, jwtSecret, { expiresIn: 24 * 60 * 60 });
};

const verifyAccessToken = async (token) => {
    try {
        return jwt.verify(token, jwtSecret);
    } catch (err) {
        let message = err.name == 'JsonWebTokenError' ? 'Unauthorized' : err.message
        if (err.name == 'JsonWebTokenError') {
            message = 'Unauthorized';
        } else if (err.name == 'TokenExpiredError') {
            message = 'Session ended. Access token expired'
        }

        throw createError.Unauthorized(message);
    }
};

module.exports = {
    signAccessToken,
    verifyAccessToken,
};