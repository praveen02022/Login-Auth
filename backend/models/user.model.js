const { ObjectId } = require("bson");
const mongoose = require("mongoose");


const userschema = new mongoose.Schema({


    username:{
        type:String,
        required: true,
    },
    password: { type: String, required: true }

    // img:
    // {
    //     data: Buffer,
    //     contentType: String
    // }

});

const usermodel = mongoose.model('user', userschema);

module.exports = usermodel;