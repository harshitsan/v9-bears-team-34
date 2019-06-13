const express = require("express");
const passport = require('passport');
const GitHubStrategy = require('passport-github').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const mongoose = require('mongoose');

var https = require('https')
var fs = require('fs')

const oAuth = require("./credentials/oAuth");

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/FoodBnB', {useNewUrlParser: true});

let User = require('./db/User.js');

const app = express();

const port = process.env.PORT || 8000;

app.use(express.json());

passport.use(new GitHubStrategy(oAuth.github,
  function(accessToken, refreshToken, profile, done) {
    // console.log(profile._json);
    let newUser = profile._json;
    newUser.provider = "Github";
    User.findOne(newUser).then((user)=>{
        if (!user) {
            user = new User(newUser);
            user.save().then((doc)=>{
                if (doc) console.log(doc);
                return done(doc);
            },(e)=>{
              return done(e);
            });
        } else {
            return done(user);
        }
    },(e)=>{
          return done(e);
    });
  }
));

passport.use(new FacebookStrategy(oAuth.facebook,
  function(accessToken, refreshToken, profile, done) {
      let newUser = profile._json;
      newUser.provider = "Facebook";
      User.findOne(newUser).then((user)=>{
        if (!user) {
              user = new User(newUser);
              user.save().then((doc)=>{
                  if (doc) console.log(doc);
                  return done(doc);
              },(e)=>{
                return done(e, user);
              });
          } else {
              return done(user);
          }
      },(e)=>{
            return done(e);
      });
  }
));

app.route('/').get(function(req,  res){
  res.send("hello homepage");
})

app.route('/login').get(function(req,  res){
  res.send("try again");
})

//github routes

app.get('/auth/github',
  passport.authenticate('github'));

app.get('/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  });

  //facebook routes

app.route('/auth/facebook').get(passport.authenticate('facebook',{
  authType: 'rerequest',
  scope: ['email']
}),(req, res)=>{
  console.log("success");
});

app.route('/auth/facebook/callback').get(
  passport.authenticate('facebook', {
            successRedirect : '/',
            failureRedirect : '/login'
        }));
//To generate server.cert and server.key
//use command :$ openssl req -nodes -new -x509 -keyout server.key -out server.cert
https.createServer({  //must be served on https server for authentication
  key: fs.readFileSync('server.key'),
  cert: fs.readFileSync('server.cert')
}, app)
.listen(port, function () {
  console.log(`Example app listening on port ${port}! Go to https://localhost:${port}/`)
})
