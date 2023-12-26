const express = require('express');
const router = express.Router();
const Post = require('../models/post');
const passport = require("passport");


router.post('/', async (req, res) => {
    const newPost = {
        category: req.body.category,
        title: req.body.title,
        image: req.body.image,
        text: req.body.text,
        author: req.body.author,
        date: req.body.date,
    }

    const post = await Post.create(newPost)

    res.status(201);
    res.send(post);
    res.end()

});



module.exports = router;