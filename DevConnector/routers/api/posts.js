const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

const Post = require('../../models/Post');
const Profile = require('../../models/Profile');
// Validation
const validatePostInput = require('../../validation/post');

//@route GET api/posts/test
//@desc Tests posts route
//@access Public

router.get('/test', (req,res) => res.json({msg: 'posts Works'}));

//@route GET api/posts
//@desc get posts
//@access Public
router.get('/', (req,res) => {
    Post.find().sort({date: -1}).then(posts => res.json(posts))
    .catch(err => res.status(404));
});

//@route POST api/posts
//@desc Create post
//@access Public
router.post('/', passport.authenticate('jwt', {session: false}), (req, res) =>{
    const {errors, isValid} = validatePostInput(req.body);

    //check Validation 
    if (!isValid){
        return res.status(404).json(errors);
    }
    const newPost = new Post({
        text : req.body.text,
        name : req.body.name,
        avatar : req.body.avatar,
        user : req.user.id
    });
    newPost.save().then(post => res.json(post));
});

//@route get api/posts/:id
//@desc get post by id
//@access Public
router.get('/:id',(req, res) => {
    Post.findById (req.params.id).then(post => res.json(post))
    .catch(err => res.status(404).json ({nopostfound : 'No post found with that id'}) );
});


//@route DELETE api/posts/:id
//@desc  Delete post
//@access Private
router.delete('/:id', passport.authenticate('jwt', {session: false}), (req, res) =>{
    Profile.findOne({user : req.user.id})
    .then(profile => {
        Post.findById(req.params.id).then(post => {
            //check for post owner
            if(post.user.toString() !== req.user.id){
                
                return res.status(401).json({notauthorized : 'User not authorized'});
            }
            //delete
            post.remove().then(() => res.json({success: true}));

        }).catch(err => res.status(404).json({postnotfound: 'No post found'}));
    })
});

//@route Post api/posts/like/:id
//@desc   like post
//@access Private
router.post('like/:id', passport.authenticate('jwt', {session: false}), (req, res) =>{
    Profile.findOne({user : req.user.id})
    .then(profile => {
        Post.findById(req.params.id).then(post => {
            if (post.likes.filter(like => like.user.toString() =npm == req.user.id).length > 0){
                return res.status(400).json({alreadyliked : 'already liked'});
            }
            //add user id to likes array
            post.likes.unshift({user: req.user.id});
            
            post.save().then(post => req.json(post));
        }).catch(err => res.status(404).json({postnotfound: 'No post found'}));
    })
});
//TODO unlike 
//@route Post api/posts/like/:id
//@desc   like post
//@access Private
// router.post('like/:id', passport.authenticate('jwt', {session: false}), (req, res) =>{
//     Profile.findOne({user : req.user.id})
//     .then(profile => {
//         Post.findById(req.params.id).then(post => {
//             if (post.likes.filter(like => like.user.toString() === req.user.id).length > 0){
//                 return res.status(400).json({alreadyliked : 'already liked'});
//             }
//             //add user id to likes array
//             post.likes.unshift({user: req.user.id});
            
//             post.save().then(post => req.json(post));
//         }).catch(err => res.status(404).json({postnotfound: 'No post found'}));
//     })
// });
module.exports = router;