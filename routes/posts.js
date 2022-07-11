const router = require('express').Router();
const Post = require('../models/Posts');
const User = require('../models/User')
const { body, validationResult } = require('express-validator');
const authMW = require('../middleware/auth');

// Router description:
// All endpoint fall under: /api/posts
// post - delete - update endpoints: user must be authenticated

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


// @des: create a new post
router.post('/', 
    authMW, body('title').escape().trim().isLength({min: 1}), 
    body('body').escape().trim().isLength({min: 1}), 
    async (req, res) => {

        const errors = validationResult(req);
        if(!errors.isEmpty()) return res.status(400).json({status: 'error', data: errors.array()})

        // fetch author
        const email = req.user.email && req.user.email;
        if(!email) return res.status(500).json({status: 'error', data: 'something went wrong'});
        const author = await User.findOne({email});

        const idGene = () => Date.now() + Math.ceil(Math.random() * 1000000);
        let newId = idGene();
        try{
        // create new post
        const newPost = await Post.create({
            publicID: newId,
            title: req.body.title,
            body: req.body.body,
            authorId: author._id,
        });

        newPost.save();
    
        res.json({status: 'success', data: newPost})

        }catch(err){
            res.status(500).json({status: 'error', data: err})
        }
});


// @des: update a specific post
router.patch('/:id', 
    authMW, 
    body('title').escape().trim().isLength({min: 1}), 
    body('body').escape().trim().isLength({min: 1}), 
    async (req, res) => {
    
        try{
            // Fetch post if it exists
            const post = await Post.findOne({publicID: req.params.id});
            
            if(!post) return res.status(400).json({status: 'error', data: 'invalid id'});

            // Validate inputs
            const errors = validationResult(req);
            if(!errors.isEmpty()) return res.status(400).json({status: 'error', data: errors.array()});

            const {title, body} = req.body;
            post.title = title || post.title;
            post.body = body || post.body;

            const updated = await post.save();

            res.json({status: 'success', data: updated})

        }catch(err){
            res.status(500).json({status: 'error', json: err})
        }
});

// @des: create a new post
router.post('/', 
    authMW, body('title').escape().trim().isLength({min: 1}), 
    body('body').escape().trim().isLength({min: 1}), 
    async (req, res) => {

        const errors = validationResult(req);
        if(!errors.isEmpty()) return res.status(400).json({status: 'error', data: errors.array()})

        // fetch author
        const email = req.user.email && req.user.email;
        if(!email) return res.status(500).json({status: 'error', data: 'something went wrong'});
        const author = await User.findOne({email});

        const idGene = () => Date.now() + Math.ceil(Math.random() * 1000000);
        let newId = idGene();
        try{
        // create new post
        const newPost = await Post.create({
            publicID: newId,
            title: req.body.title,
            body: req.body.body,
            authorId: author._id,
        });

        newPost.save();
    
        res.json({status: 'success', data: newPost})

        }catch(err){
            res.status(500).json({status: 'error', data: err})
        }
});


// @des: delete a specific post
router.delete('/:id', authMW, async (req, res) => {
    
    try{
        // Fetch post if it exists
        const post = await Post.findOne({publicID: req.params.id});
        if(!post) return res.status(400).json({status: 'error', data: 'invalid id'});

        // Delete post
        const deleted = await Post.deleteOne({publicID: req.params.id})

        res.json({status: 'success', data: deleted})

    }catch(err){
        res.status(500).json({status: 'error', json: err})
    }
});






module.exports = router;