'use strict';

module.exports=function(){
    return {
        signupValidation:(req, res, next)=>{
            req.checkBody('username', 'Username is required.').notEmpty();
            req.checkBody('username', 'Username must not be  less than 5.').isLength({min:5});
            req.checkBody('email', 'Email is required.').notEmpty();
            req.checkBody('email', 'Email is invalid.').isEmail();
            req.checkBody('password', 'Password is required.').notEmpty();
            req.checkBody('password', 'Pasword must not be  less than 6.').isLength({min:6});
            req.checkBody('password2', 'Confirm Password is required.').notEmpty();
            req.checkBody('password2', 'Confirm password doesn\'t match with password.').matches('password');

            req.getValidationResult()
            .then((result)=>{
                const errors=result.array();
                const  messages=[];
                errors.forEach(error => {
                    messages.push(error.msg);
                });
                req.flash('error', messages);
                res.redirect('/signup');
            })
            .catch((err)=>{
                return next();
            })
        },
        signinValidation:(req, res, next)=>{
            req.checkBody('email', 'Email is required.').notEmpty();
            req.checkBody('email', 'Email is invalid.').isEmail();
            req.checkBody('password', 'Password is required.').notEmpty();

            req.getValidationResult()
            .then((result)=>{
                const errors=result.array();
                const  messages=[];
                errors.forEach(error => {
                    messages.push(error.msg);
                });
                req.flash('error', messages);
                res.redirect('/');
            })
            .catch((err)=>{
                return next();
            })
        }

    }
}