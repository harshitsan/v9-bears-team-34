const oAuth = {
  "facebook":{
    "clientID": "345559736161569",
    "clientSecret": "6705f1f44f869b409c5c1d8551f3e8e7",
    "callbackURL": "https://localhost:8000/auth/facebook/callback",
    "profileFields": ['id', 'displayName', 'email']
  },
  "github":{
    "clientID": "f32040e426a8f00e50e7",
    "clientSecret": "cc6d66852b7bcabeba2bdf3da17cbb62bb17393d",
    "callbackURL": "https://localhost:8000/auth/github/callback"
  }
}

module.exports = oAuth;
