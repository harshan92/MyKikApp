'use strict';

module.exports=function(_, passport, UserValidation, validator){
    return {
        SetRouting:function(router){
            router.get('/', this.indexPage);
            router.get('/signup', this.getSignUp);
            router.get('/home', this.homePage);

            // router.post('/', UserValidation.signinValidation, this.postSignIn);
            router.post('/',UserValidation.signinValidation, this.postSignin)
            // router.post('/signup',UserValidation.signupValidation, this.postSignUp);
            router.post('/signup',[
                validator.check('username').not().isEmpty().isLength({min:5}).withMessage('Username is required and must be at least 5 charactors.'),
                validator.check('password').not().isEmpty().isLength({min:5}).withMessage('Password is required and must be at least 5 charactors.'),
                validator.check('email').not().isEmpty().isEmail().withMessage('Email is required and must be an email.'),
            ], this.postValidation, this.postSignUp);
        },
        indexPage:function(req, res){
            const errors=req.flash('error');
            return res.render('index',  {title:'MyKik | LogIn', messages:errors, hasErrors:errors.length>0});
        },
        getSignUp:function(req, res){
            const errors=req.flash('error')
            return res.render('signup', {title:'MyKik | SignUp', messages:errors, hasErrors:errors.length>0});
        },
        postSignin:passport.authenticate('local.signin',{
            successRedirect:'/home',
            failRedirect:'/',
            failureFlash:true
        }),
        postSignUp:passport.authenticate('local.signup',{
            successRedirect:'/home',
            failRedirect:'/signup',
            failureFlash:true
        }),
        
        homePage:function(req, res){
            return res.render('home');
        },
        postValidation:function(req, res, next){
            const err=validator.validationResult(req);
            const errors=err.array();
            const  messages=[];
            errors.forEach(error => {
                messages.push(error.msg);
            });
            if(messages.length>0){
                req.flash('error', messages);
                if(req.url==='/signup'){
                    res.redirect('/signup');
                }else if(req.url==='/'){
                    res.redirect('/signup');
                }
            }
            
            return next();
        }
    }
}