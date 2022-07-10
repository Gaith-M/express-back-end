const router = require('express').Router();
const Post = require('../models/Posts');
const { body, validationResult } = require('express-validator');
const authMW = require('../middleware/auth');

// @endpoint: /api/posts
// @desc: Get all posts
router.get('/', async (req, res) => {
    try{
        const posts = await Post.find({});

        if(posts.length <= 0) return res.json({status: 'success', data: null});

        res.json({status: 'success', data: posts});
    }catch(err){
        res.json({status: 'error', data: err});
    }
});


// @endpoint: /api/posts
// @desc: Get single post by its id (publicID)
router.get('/:id', async (req, res) => {
    try{
        const post = await Post.find({publicID: req.params.id});

        if(post.length <= 0) return res.json({status: 'success', data: null});

        res.json({status: 'success', data: post});
    }catch(err){
        res.json({status: 'error', data: err});
    }
});

// @endpoint: /api/posts
// @des: create a new post
// @rules: User must be authenticated
router.post('/', authMW, (req, res) => {
    res.send('placeholder')
})

module.exports = router;