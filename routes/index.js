var express = require('express');
const userModel = require('./users')
const passport = require('passport');
var router = express.Router();
var localstrategy = require('passport-local')
passport.use(new localstrategy(userModel.authenticate()))
router.get('/', function(req, res) {
  res.render('index');
});
router.get("/profile",IsloggedIn,async function(req,res){
  const user = await userModel.findOne({
    username : req.session.passport.user
  })
  res.render('profile',{user})
})
router.get('/registeruser',function(req,res){
  res.render('register')
})
router.get('/loginuser',function(req,res){
  res.render('login',{error : req.flash('error')})
})
router.post('/register',function(req,res){
  var userdata = new userModel({
    firstname:req.body.firstname,
    lastname:req.body.lastname,
    username:req.body.username,
  })
  userModel.register(userdata,req.body.password)
    .then(function(registereduser){
      passport.authenticate("local")(req,res,function(){
        res.redirect('/profile')
      })
    })
})
router.post("/login",passport.authenticate("local",{
  successRedirect:"/profile",
  failureRedirect:"/loginuser",
  failureFlash:true,
}),function(req,res){})
router.get("/logout",function(req,res,next){
  req.logout(function(err){
    if(err){return next(err)}
    res.redirect('/')
  })
  
})
function IsloggedIn(req,res,next){
  if(req.isAuthenticated()){
    return next()
  }
  res.redirect('/')
}
module.exports = router;
