//Imports

const models = require('../models');
const jwtUtils = require('../utils/jwt.utils');
const fs = require('fs');
const asyncLib = require('async');

exports.getProfile = (req, res, next) => {
    //Récupération de l'entete authorisation de la requète
    const headerAuth = req.headers['authorization'];
    const userId = jwtUtils.getUserId(headerAuth);

    if (userId < 0) {
        res.status(400).json({ 'error': 'mauvais token' });
    } else {

        models.User.findOne({
            attributes: { exclude: ['password', 'createdAt', 'updatedAt'] },
            where: { id: userId }
        })
            .then(user => { res.status(201).json(user) })
            .catch(error => res.status(404).json({ error }))       
    }
}
exports.updateProfile = async (req, res) => {
    //Récupération de l'entete authorisation de la requète
    const headerAuth = req.headers['authorization'];
    const userId = jwtUtils.getUserId(headerAuth);
    
    if (userId < 0) {
        res.status(400).json({ 'error': 'Token incorrect' });
    } else {
        // Params
        const firstname = req.body.firstname;
        const lastname = req.body.lastname;
        const username = req.body.username;
        const bio = req.body.bio;


        await models.User.findOne({     //'firstname', 'lastname','profilePhoto'  Recrée table avec sequelize en ajoutant les strings
            attributes: ['id', 'bio','firstname', 'lastname', 'profilePhoto'],
            where: { id: userId }
        }).then(async function (userFound) {
            if (userFound) {
                await userFound.update({
                    firstname: (firstname ? firstname : userFound.firstname),//
                    lastname: (lastname ? lastname : userFound.lastname),//
                    username: (username ? username : userFound.username),
                    bio: (bio ? bio : userFound.bio),
                    profilePhoto: (req.file ? `${req.protocol}://${req.get("host")}/images/${req.file.filename}` : userFound.profilePhoto),
                }).then(function () {
                    res.status(200).json({ message: 'Utilisateur mis à jour !' })
                }).catch(error => {
                    res.status(500).json({ error });
                });
            } else {
                res.status(404).json({ 'error': 'Utilisateur introuvable !' });
            }
        })
        .catch(error => {
            res.status(500).json({ error });
        });
    }
}