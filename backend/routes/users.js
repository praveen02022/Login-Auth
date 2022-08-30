
const router = require('express').Router();
let User = require('../models/user.model');

router.route('/').get((req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});
router.route("/:id").get((req,res)=>{
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
    console.log(err,'s');
  }
});

module.exports = router;