var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/jsonp', function (req, res, next) {
  res.jsonp({ errno: 0, errmsg: "", data: {} })
});

router.get('/json', function (req, res, next) {
  res.header({ "Access-Control-Allow-Origin": "*" })
  res.json({ errno: 0, errmsg: "", data: {} })
});

router.delete('/json', function (req, res, next) {
  res.header({ "Access-Control-Allow-Method": "*" })
  res.header({ "Access-Control-Allow-Origin": "*" })
  res.json({ method: "delete" })
});

router.post('/test1', function (req, res, next) {
  res.header({ 'Access-Control-Allow-Origin': '*' })
  if (req.body.usname == 'mafengshe') {
    res.send({ errno: 1, errmsg: '用户名已存在', data: {} })
  } else {
    res.send({ errno: 0, errmsg: "", data: {} })
  }
});
module.exports = router;
