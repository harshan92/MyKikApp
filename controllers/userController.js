'use strict';

module.exports=function(_, passport, UserValidation){
    return {
        SetRouting:function(router){
            router.get('/', this.indexPage);
            router.get('/signup', this.getSignUp);
            router.get('/home', this.homePage);

            // router.post('/', UserValidation.signinValidation, this.postSignIn);
            router.post('/',UserValidation.signinValidation, this.postSignin)
            router.post('/signup',UserValidation.signupValidation, this.postSignUp);
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
        }
    }
}