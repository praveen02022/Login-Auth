const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const bcrypt = require('bcryptjs')
require('dotenv').config();
let User = require('./models/user.model');
const jwt = require('jsonwebtoken')

const JWT_SECRET = 'sdjkfh8923yhjdksbfma@#*(&@*!^#&@bhjb2qiuhesdbhjdsfg839ujkdhfjk'

const app = express();
app.use(bodyParser.json())
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})


const usersRouter = require('./routes/users');

app.use('/users', usersRouter);





app.put('/update/:id', function (req, res) {
  try {
    const updateobj = {
      username: req.body.username,
      email: req.body.email,
      mobileNo: req.body.mobileNo,
      dob: req.body.dob,
      age: req.body.age,
      password: req.body.password,
    }
    const userId = req.params.id;
    User.findByIdAndUpdate(userId, { $set: updateobj }, function (err, userList) {
      console.log(userList);
      if(!err){
      res.status(200).json({
        success: true,
        responsecode: 200,
        msg: 'user updated succesfully'
      })
    }else{
      throw err
    }
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      responsecode: 500,
      msg: err.message
    })
    console.log(err.message);
  }

});

app.post("/signup", async (req, res, next) => {

  try {
    const { username, password, email, mobileNo, age, dob } = req.body;
    const newUser = User({
      username,
      email,
      mobileNo,
      age,
      dob,
      password
    });
    await newUser.save();
    let token;
    token = jwt.sign(
      { userId: newUser.id, email: newUser.email },
      "secretkeyappearshere",
      { expiresIn: "1h" }
    );
    res
      .status(201)
      .json({
        success: true,
        data: {
          userId: newUser.id,
          token: token,
          msg: "signup successfully"
        },
      });
  } catch (err) {
    res.status(500).json({
      success: false,
      responsecode: 500,
      msg: err.message
    })
    console.log(err.message);
  }
});

app.post("/signin", async (req, res) => {

  try {
    let { email, password } = req.body;
    let existingUser;
    existingUser = await User.findOne({ email: email });
    if (!existingUser || existingUser.password != password) {
      const error = Error("invalid user or invalid passoword");
      throw error;
    }
    let token;
    //   //Creating jwt token
    token = jwt.sign(
      { userId: existingUser.id, email: existingUser.email },
      "secretkeyappearshere",
      { expiresIn: "1h" }
    );
    res
      .status(200)
      .json({
        success: true,
        message: "login sucessfully",
        data: {
          userId: existingUser.id,
          name: existingUser.username,
          token: token,
        },
      });
  } catch (err) {

    res.status(500).json({
      responsecode: 500,
      success: false,
      msg: err.message
    })
    console.log(err.message);
  }

});
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

