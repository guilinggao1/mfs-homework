var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post("/usernameExist", function (req, res, next) {
  res.json({
    exist: "marktest" == req.body.username
  })
})
module.exports = router;
