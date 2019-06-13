const mongoose = require('mongoose');
// mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/FoodBnB', {useNewUrlParser: true});

let User = new mongoose.model('User', {
    name:{
    type:String
    },
    id:{
      type:String
    },
    email:{
      type:String
    },
    provider:{
      type:String
    },
    role:{
      type:String,
      default:"Buyer"
    }
  });

module.exports = User;
