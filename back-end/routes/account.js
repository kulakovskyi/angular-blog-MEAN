const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Post = require('../models/post');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/db');
const bcrypt = require("bcrypt");

router.post('/reg',async (req, res) => {

    const existed = await User.findOne({$or: [
            {login: req.body.login},
            {email: req.body.email}
        ]
    }).lean()

    if(existed){
        res.status(403);
        res.send({error: 'Error user is register'});
        res.end()
        return
    }

    const newUser = {
        name: req.body.name,
        email: req.body.email,
        login: req.body.login,
        password: await bcrypt.hash(req.body.password, 10),
    };


    const user = await User.create(newUser)

    res.status(201);
    res.send({success: user});
    res.end()

});

router.post('/auth', async (req, res) => {
    const login = req.body.login
    const password = req.body.password


    const existed = await User.findOne({$or: [
            {login: req.body.login}
        ]
    }).lean()

    if(!existed){
        res.status(403);
        res.send({error: 'Wrong login'});
        res.end()
        return
    }

    const compare = await bcrypt.compare(req.body.password, existed.password)
    if(!compare){
        res.status(403);
        res.send({error: 'Wrong password'});
        res.end()
        return
    } else {
        const token = jwt.sign(existed, config.secret, {
            expiresIn: 3600 * 24
        });
        res.json({
            success: true,
            token: token,
            user: {
                id: existed._id,
                name: existed.name,
                login: existed.login,
                email: existed.email,
            }
        })

    }


});

router.get('/', function (req, res){
    res.send('Account page')
    }
);

module.exports = router;