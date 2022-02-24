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
        
    },

}