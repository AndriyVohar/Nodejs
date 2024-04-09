let jwtSecret= 'secret';
const jwt = require('jsonwebtoken');
const createError = require('http-errors');

const signAccessToken = async (user) => {
    return jwt.sign({ id: user.id }, jwtSecret, { expiresIn: 24 * 60 * 60 });
};

const verifyAccessToken = (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, jwtSecret, (err, decoded) => {
            if (err) {
                console.error("Помилка розшифрування токена:", err);
                reject(err);
            } else {
                console.log("Декодовані дані з токена:", decoded);
                resolve(decoded.id);
            }
        });
    });
};

module.exports = {
    signAccessToken,
    verifyAccessToken,
};