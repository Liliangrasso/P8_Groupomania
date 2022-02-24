const bcrypt = require('bcrypt');
const jwtUtils = require('../utils/jwt.utils');
const models = require('../models')
const asyncLib = require('async')

// Regexp Pour le format du mail & du mot de passe
const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const passwordRegex = /(?!^[0 - 9]*$)(?!^[a-zA-Z]*$)^([a-zA-Z0-9]{6,15})$/;
const regexInject = /[\=\'\'\{\}]/; // ne doit pas contenir les caractères suivants : =, ", ", {, }


exports.signup = (req, res, next) => {

    // Params
    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;
    const bio = req.body.bio;
   // Todo Verif value
    asyncLib.waterfall([
        function (done) {
            models.User.findOne({
                attributes: ['email'],
                where: { email: email }
            })
                .then(function (userFound) {
                    done(null, userFound);
                })
                .catch(function (err) {
                    return res.status(500).json({ 'error': 'unable to verify user' });
                });
        },
        function (userFound, done) {
            if (!userFound) {
                bcrypt.hash(password, 5, function (err, bcryptedPassword) {
                    done(null, userFound, bcryptedPassword);
                });
            } else {
                return res.status(409).json({ 'error': 'user already exist' });
            }
        },
        function (userFound, bcryptedPassword, done) {
            var newUser = models.User.create({
                email: email,
                username: username,
                password: bcryptedPassword,
                bio: bio,
                isAdmin: 0
            })
                .then(function (newUser) {
                    done(newUser);
                })
                .catch(function (err) {
                    return res.status(500).json({ 'error': 'cannot add user' });
                });
        }
    ], function (newUser) {
        if (newUser) {
            return res.status(201).json({
                'userId': newUser.id
            });
        } else {
            return res.status(500).json({ 'error': 'cannot add user' });
        }
    });
}
exports.login = (req, res, next) => {
    // Params
    var email = req.body.email;
    var password = req.body.password;

    asyncLib.waterfall([
        function (done) {
            models.User.findOne({
                where: { email: email }
            })
                .then(function (userFound) {
                    done(null, userFound);
                })
                .catch(function (err) {
                    return res.status(500).json({ 'error': 'unable to verify user' });
                });
        },
        function (userFound, done) {
            if (userFound) {
                bcrypt.compare(password, userFound.password, function (errBycrypt, resBycrypt) {
                    done(null, userFound, resBycrypt);
                });
            } else {
                return res.status(404).json({ 'error': 'user not exist in DB' });
            }
        },
        function (userFound, resBycrypt, done) {
            if (resBycrypt) {
                done(userFound);
            } else {
                return res.status(403).json({ 'error': 'invalid password' });
            }
        }
    ], function (userFound) {
        if (userFound) {
            return res.status(201).json({
                'userId': userFound.id,
                'token': jwtUtils.generateTokenForUser(userFound)
            });
        } else {
            return res.status(500).json({ 'error': 'cannot log on user' });
        }
    });
}
