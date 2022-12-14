const bcrypt = require('bcrypt')
const User = require('../models/User')
const jwt = require('jsonwebtoken');

// create new user 
exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
        const user = new User({
            username: req.body.username, 
            role: req.body.role,
            password: hash
        })
        user.save()
            .then(() => res.status(201).json({message: 'Utilisateur créé !'}))
            .catch(error => res.status(400).json({error}))
    })
    .catch(error => res.status(500).json({error}))
}
// log user into app 
exports.login = (req, res, next) => {
    User.findOne({username: req.body.username})
        .then(user => {
            if (user === null) {
                res.status(401).json({message: "L'utilisateur n'existe pas"})
            } else {
                bcrypt.compare(req.body.password, user.password)
                    .then(valid => {
                        if (!valid) {
                            res.status(401).json({message: "Mot de pass incorrect"})
                        } else {
                            res.status(200).json({
                                userId: user._id,
                                role: user.role,
                                status : 200,
                                token : jwt.sign(
                                    {userId: user._id},
                                    'SECURE_TOKEN', 
                                    { expiresIn: '24h'}
                                )
                            })
                        }
                    })
                    .catch(error => {
                        res.status(500).json({error})
                    })
            }
        })
        .catch(error => {
            res.status(500).json({error})
        })
}
// list all users and their roles 
exports.usersList = (req, res, next) => {
    User.find()
      .then(users => res.status(200).json(users))
      .catch(error => res.status(400).json({ error }));
}
// delete a user