'use strict';

module.exports=function(_,passport,User){

  return{
    SetRouting:function(router){
      router.get('/',this.indexPage);
      router.get('/signup',this.getSignUp);
      //router.get('/home',this.homePage); remove this to home

      router.post('/',User.LoginValidation, this.postLogin);
      router.post('/signup', User.signupValidation, this.postSignUp);

    },
    indexPage:function(req,res){
      const errors =  req.flash('error')
      return res.render('index',{title:'bellamichaela | Login',messages:errors,hasErrors:errors.length>0});
    },
    postLogin: passport.authenticate('local.login',{
      successRedirect:'/home',
      failureRedirect:'/',
      failureFlash:true
    }),

    getSignUp:function(req,res){
      const errors =  req.flash('error')
      return res.render('signup',{title:'bellamichaela | SignUp',messages:errors,hasErrors:errors.length>0});
    },
    postSignUp: passport.authenticate('local.signup',{
      successRedirect:'/home',
      failureRedirect:'/signup',
      failureFlash:true
    })


  // homePage:function(req,res){
  //   return res.render('home');
  // } cut this to home model


  }
}
