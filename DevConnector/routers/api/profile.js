const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

//load validation
const validateProfileInput = require('../../validation/profile');

//load profile model
const Profile = require('../../models/Profile');
const User = require('../../models/User');

//@route GET api/profile/test
//@desc Tests profile route
//@access Public

router.get('/test', (req,res) => res.json({msg: 'Profile Works'}));

//@route GET api/profile
//@desc Get current users profile
//@access private
router.get('/', passport.authenticate('jwt' , {session : false}), (req, res) => {
    const errors = {};
    Profile.findOne({user: req.user.id})
    .then(profile => {
        if(!profile){
            errors.nonprofile= 'There is no profile';
            return res.status(404).json(errors);
         }
         res.json(profile);
    }).catch(err => res.status(404).json (err));
});

//@route GET api/profile/handle/:handle
//@desc Get profile by handle
//@access Private

router.get('/handle/:handle',(req, res) =>{
    Profile.findOne({handle : req.params.handle})
    .populate('user', ['name', 'avatar'])
    .then(profile => {
        if (!profile){
            errors.nonprofile = 'There is no profile for this user';
            res.status(404).json(errros);
        }
        res.json(profile);
    }).catch(err => res.status(404).json(err));
});


//@route GET api/profile/user/:userid
//@desc Get profile by user
//@access public

router.get('/user/:user_id',(req, res) =>{
    Profile.findOne({user : req.params.user_id})
    .populate('user', ['name', 'avatar'])
    .then(profile => {
        if (!profile){
            errors.nonprofile = 'There is no profile for this user';
            res.status(404).json(errros);
        }
        res.json(profile);
    }).catch(err => res.status(404).json({profile : 'There is no profile for this user'}));
});


//@route GET api/profile/all
//@desc Get all profiles
//@access public
router.get('/all', (req, res) => {
    Profile.find ().populate('user', ['name', 'avatar'])
    .then(profiles => {
        if (!profiles) {
            errors.nonprofile = 'There are no profiles';
            return res.status(404).json(errors);
        }
        res.json(profiles);
    }).catch(err => res.status(404).json({profile : 'There is no profile'}));
});


//@route POST api/profile
//@desc Create user profile
//@access private
router.post('/',
    passport.authenticate('jwt', {session : false}),
        (req, res) => {
            const profileFields = {};
            profileFields.user = req.user.id; 
            if(req.body.handle)  profileFields.handle = req.body.handle;
            if(req.body.company)  profileFields.company = req.body.company;
            if(req.body.jobTitle)  profileFields.jobTitle = req.body.jobTitle;
            if(req.body.location)  profileFields.location = req.body.location;
            //TODO
            if (req.body.Date) profileFields.Date = req.body.Date;
            if (req.body.details) profileFields.details = req.body.details;
            if (req.body.youxiaoqi) profileFields.youxiaoqi = req.body.youxiaoqi;

            Profile.findOne({ user : req.user.id}).then(profile => {
                if (profile){
                    //update
                    Profile.findOneAndUpdate({user : req.user.id}, 
                        {$set },
                        {new : true}
                    ).then ( profile => res.json(profile));
                }else {
                    //Create
                    

                    //check if handle exists
                    Profile.findOne({handle: profileFields.handle}).then(profile => {
                        if (profile){
                            errors.handle= 'That handle exists';
                            res.status(400).json(errors);
                        }
                        //save Profile
                        new Profile(profileFields).save().then(profile => res.json(profile));
                    })
                }
            });
        } 
    );

module.exports = router;