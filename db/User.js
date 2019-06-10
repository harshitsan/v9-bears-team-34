const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/TodoApp');

let User = new mongoose.model('User', {
  username:{
    type:String,
    required:true,
    trim:true,
    minlength:1,
    unique:true,
 },
  password:{
    type:String,
    required:true,
  }
});

module.exports = {User};
