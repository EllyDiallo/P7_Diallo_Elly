const jwt = require('jsonwebtoken');

const JWT_SIGN_TOKEN = 'bienheureuxestceluiquinesaitpasquilestriste';

module.exports = {
    generateTokenForUser: function (userData) {
        return jwt.sign({
            userId: userData.id,
            isAdmin: userData.isAdmin

        },
            JWT_SIGN_TOKEN,
            {
                expiresIn: '5h'
            })
    },
    killTokenForUser: function (userData) {
        return jwt.sign({
            userId: userData.id,
            isAdmin: userData.isAdmin

        },
            JWT_SIGN_TOKEN,
            {
                expiresIn: 31
            })
    },
    parseAuthorization: function (authorization) {
        return (authorization != null) ? authorization.replace('Bearer ', '') : null;
    },
    getUserId: function (authorization) {
        var userId = -1;
        var token = module.exports.parseAuthorization(authorization);
        if (token != null) {
            try {
                var jwtToken = jwt.verify(token, JWT_SIGN_TOKEN);
                if (jwtToken != null)
                    userId = jwtToken.userId;
            } catch (err) { }
        }
        return userId;
    },
    getUserUuid: function (req) {

        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, JWT_SIGN_TOKEN);
        const userUuid = decodedToken.uuid;
        return userUuid;
    }
}