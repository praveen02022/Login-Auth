const mongoose = require("mongoose");



const userschema = new mongoose.Schema({


    username:{
        type:String,
        required: true,
    },
    email: { 
        type:String,   
        required: true,
     },
     mobileNo: { 
        type: Number,
        required: true,
     },
     dob:{
      type:Date,
      required: true,
     },
     age: { 
      type: Number,
      required: true,
   },
    password: { 
        type: String, 
        required: true
     },
     


},
   {timestamps:true}
);

const usermodel = mongoose.model('user', userschema);

module.exports = usermodel;