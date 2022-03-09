const jwt = require('jsonwebtoken')
const RANDOM_TOKEN_SECRET = '4564564646rezrzerzJJHJH45'
module.exports = {
    generateTokenForUser: function (userData) {
        return jwt.sign({
            userId: userData.id,
            isAdmin: userData.isAdmin
        },
        RANDOM_TOKEN_SECRET,
            {
                expiresIn: '1h'
        })
    },
    parseAuthorization: function (authorization) {
        return (authorization != null) ? authorization.replace('Bearer ', '') : null;
    },
    getUserId: function (authorization) {
        //const userId = -1;
        const token = module.exports.parseAuthorization(authorization);
        if (token != null) {
            try {
                let jwtToken = jwt.verify(token, RANDOM_TOKEN_SECRET);
                //verifie le token s'il est valide 
                if (jwtToken != null) // si non nul
                    userId = jwtToken.userId; // on récupére userId
            } catch (err) { }
        }
        return userId;
    }
}