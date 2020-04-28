'use strict';

const passport=require('passport');
const User=require('../models/user');
const FacebookStrategy=require('passport-facebook').Strategy;

passport.serializeUser((user, done)=>{
    done(null, user.id);
});

passport.deserializeUser((id, done)=>{
    User.findById(id,(err, user)=>{
        done(err,user);
    });
});

passport.use(new FacebookStrategy({
    clientID:secret.facebook.clientID,
    clientSecret:secret.facebook.clientSecret,
    profileFields:secret.facebook.profileFields,
    callbackURL:secret.facebook.callbackURL,
    passReqToCallback:secret.facebook.passReqToCallback

}, (req, token, refreshToken, profile, done)=>{
    User.findOne({facebook:profile.id}, (err, user)=>{
        if(err){
            return done(err);
        }
        if(user){
            return done(null,user);
        } else{
            const newUser=new User();
            newUser.facebook=profile.id;
            newUser.first_name=profile.displayName;
            newUser.email=profile._json.email;
            newUser.userImage="https://graph.facebook.com/"+profile.id+"/picture?type=large";
            newUser.facebookTokens.push({token:token});
            newUser.save((err)=>{
                done(null, newUser);
            })
        }
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