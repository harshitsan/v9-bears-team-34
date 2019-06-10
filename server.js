const express = require("express");
// const mongoose = require('mongoose');
// let User = require('./db/User');

const app = express();
const port = process.env.PORT || 8080;

// mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/TodoApp');

app.use(express.json());


let passport = require('passport')
  , FacebookStrategy = require('passport-facebook').Strategy;

passport.use(new FacebookStrategy({
    clientID: "345559736161569",
    clientSecret: "6705f1f44f869b409c5c1d8551f3e8e7",
    callbackURL: "http://www.localhost:3001/auth/facebook/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    console.log(accessToken, refreshToken, profile);
  }
));

app.route('/').get(function(req,  res){
  res.send("heelo");
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
