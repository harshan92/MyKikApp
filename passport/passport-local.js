'use strict';

const passport=require('passport');
const User=require('../models/user');
const LocalStrategy=require('passport-local').Strategy;

passport.serializeUser((user, done)=>{
    done(null, user.id);
});

passport.deserializeUser((id, done)=>{
    User.findById(id,(err, user)=>{
        done(err,user);
    });
});

passport.use('local.signup',new LocalStrategy({
    usernameField:'email',
    passwordField:'password',
    passReqToCallback:true
}, (req, email, password, done)=>{
    User.findOne({email:email}, (err, user)=>{
        if(err){
            return done(err);
        }
        if(user){
            return done(null, false, req.flash('error','User with email already exist.'));
        }
        const newUser=new User();
        newUser.username=req.body.username;
        newUser.password=newUser.encryptPassword(req.body.password);
        newUser.email=req.body.email;
        newUser.first_name=req.body.fname;
        newUser.last_name=req.body.lname;
        newUser.full_name=req.body.fname+" "+req.body.lname;
        newUser.save((err)=>{
            done(null, newUser);
        })
    })
}));

// signin
passport.use('local.signin', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, (req, email, password, done) => {
    try {
        User.findOne({'email': email}, (err, user) => {
            if (err) { return done(err); }
            const messages = [];
            if (!user) {
                messages.push('Incorrect username.');
                return done(null, false, req.flash('error', messages));
            }
            if (!user.validUserPassword(password)) {
                messages.push('Incorrect password.');
                return done(null, false, req.flash('error', messages));
            }
            return done(null, user);
            
        });
    } catch (error) {
        console.log(error)
    }
    
}));