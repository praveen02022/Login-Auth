const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
require('dotenv').config();
let User = require('./models/user.model');
const jwt = require('jsonwebtoken')
const app = express();
const path = require('path')
const session = require("express-session")
const verifyAccessToken = require("./middleware/auth.middleware")
let redis = require('redis');
const connectRedis = require('connect-redis');
// let client = redis.createClient();
let redisClient = redis.createClient();
redisClient.connect()
// client.on('error', (err) => {
//   console.log(err,'redis');
// });

///api
//react route config express
//react suproute not working
///midleware


app.use(bodyParser.json())
const port = process.env.PORT || 5000;

// const RedisStore = connectRedis(session)


app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

// app.use(session({
//   store: new RedisStore({ client: redisClient }),
//   secret: 'secret$%^134',
//   resave: false,
//   saveUninitialized: false,
//   cookie: {
//       secure: false, // if true only transmit cookie over https
//       httpOnly: false, // if true prevent client side JS from reading the cookie 
//       maxAge: 1000 * 60 * 10 // session max age in miliseconds
//   }
// }))
// const usersRouter = require('./routes/users');

// app.use('/users', usersRouter);

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
      "secretkeyappearshere"
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
    token = jwt.sign(
      { userId: existingUser.id, email: existingUser.email },
      "secretkeyappearshere",
    );
     const  setemail =  existingUser.email;
     redisClient.setEx("user",3000,setemail)
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
    console.log(err);
  }

});
app.get('/users', verifyAccessToken, async function (req, res, next) {

  User.find()
  .then(users => res.json(users))
  .catch(err => res.status(400).json('Error: ' + err));
  // await redisClient.get('test', (error, data) => {
  //   if (error) console.log(error);
  //   if (data != null) {
  //     console.log(data, 'data');
  //     return res.json(JSON.parse(data))
  //   } else {
  //     User.find(async (err, userlist) => {
  //       console.log(userlist, 'userlist');
  //       if (!err) {
  //         res.status(200).json({
  //           responsecode: 200,
  //           data: userlist
  //         })
  //         redisClient.setEx("test", 3000, JSON.stringify(userlist))
  //         console.log("sss");
  //       }
  //     }
  //     )
  //   }
  //    res.json(userlist)
  // })
  // .catch(err => res.status(400).json('Error: ' + err));
})


app.get('/users/:id', verifyAccessToken, function (req, res, next) {
  try {
    const userId = req.params.id;
    User.findById(userId, function (err, eqcomlist) {
      console.log(err);
      if (!err) {
        res.status(200).json({
          responsecode: 200,
          result: eqcomlist
        })
      } else {
        throw err;
      }
    });
  }
  catch (err) {
    res.status(500).json({
      responsecode: 500,
      msg: err.message
    })
    console.log(err, 's');
  }
})


app.put('/update/:id', verifyAccessToken, function (req, res) {
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
      if (!err) {
        res.status(200).json({
          success: true,
          responsecode: 200,
          msg: 'user updated succesfully'
        })
      } else {
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



app.use(express.static(path.join(__dirname + "/public")))

app.get('*', function(req, res) {
  res.sendFile(path.resolve(__dirname) + '/public/index.html');
});
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

