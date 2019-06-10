const express = require("express");
const fb = require("./credentials/fb")
// console.log(fb);
// const mongoose = require('mongoose');
// let User = require('./db/User');

const app = express();
const port = process.env.PORT || 8000;

// mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/TodoApp');

app.use(express.json());


let passport = require('passport')
  , FacebookStrategy = require('passport-facebook').Strategy;
passport.use(new FacebookStrategy(fb,
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

app.route('/auth/facebook').get(passport.authenticate('facebook'),(req, res)=>{
  console.log("success");
});

app.route('/auth/facebook/callback').get(
  passport.authenticate('facebook', { successRedirect: '/',
                                      failureRedirect: '/login' }));

app.listen(port, function() {
  console.log(`Server listening on port ${port}`);
});
