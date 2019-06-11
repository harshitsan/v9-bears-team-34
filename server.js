const express = require("express");
const passport = require('passport')

const oAuth = require("./credentials/oAuth")
// const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 8000;

// mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/TodoApp');

app.use(express.json());

var GitHubStrategy = require('passport-github').Strategy;
passport.use(new GitHubStrategy(oAuth.github,
  function(accessToken, refreshToken, profile, cb) {
    console.log(accessToken, refreshToken, profile);
  }
));

  var FacebookStrategy = require('passport-facebook').Strategy;
passport.use(new FacebookStrategy(oAuth.facebook,
  function(accessToken, refreshToken, profile, done) {
    console.log(accessToken, refreshToken, profile);
  }
));

app.route('/').get(function(req,  res){
  res.send("hello homepage");
})

app.route('/login').get(function(req,  res){
  res.send("try again");
})
app.route('/auth/github').get(passport.authenticate('github'),(req, res)=>{
  console.log("success");
});

app.route('/auth/github/callback').get(
  passport.authenticate('github',{ failureRedirect: '/login' }),(req, res)=>{
    console.log(req,"logged in");
    res.redirect('/');
  });

app.route('/auth/facebook').get(passport.authenticate('facebook'),(req, res)=>{
  console.log("success");
});

app.route('/auth/facebook/callback').get(
  passport.authenticate('facebook', {
            successRedirect : '/login',
            failureRedirect : '/'
        }));

app.listen(port, function() {
  console.log(`Server listening on port ${port}`);
});
