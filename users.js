var express = require('express');
var router = express.Router();
var app = express()
// var User = app.use(express.static('public'))
// var users = User()
/* GET users listing. */
const users = [
  {
    id: 1,
    name: "test1",
    passward: "111",
    email: "233@qq.com"
  },
  {
    id: 2,
    name: "test2",
    passward: "111",
    email: "233@qq.com"
  },
  {
    id: 3,
    name: "test3",
    passward: "111",
    email: "233@qq.com"
  },
  {
    id: 4,
    name: "test4",
    passward: "111",
    email: "233@qq.com"
  }
]

router.get('/', function (req, res, next) {
  console.log(req.query)
  res.render('index', { title: '测试' });

});

router.get('/user/:id', function (req, res, next) {
  let user = users.find(i => i.id === parseInt(req.params.id))
  if (!user) return res.status(404).json({ msg: 'Not Found' })

  res.send(user)
  res.end()
});

router.post('/login', function (req, res, next) {
  let user = req.body

  let user2 = users.find(i => i.name === user.name && i.password === user.password)
  if (!user2) return res.status(404).json({ msg: 'Not Found' })

  res.send({ name: user2.name, msg: '登录成功' })
  res.end()
});

router.put('/update', function (req, res, next) {
  let user = req.body
  let user2 = users.find(i => i.id === user.id)
  if (!user2) return res.status(404).json({ msg: 'Not Found' })

  user2.name = 'test5'
  users[user.id - 1] = user2

  res.send({ user: user2, mas: '修改成功' })
  res.end()
});

router.patch('/', function (req, res, next) {
  let user = req.body
  let user2 = users.find(i => i.id === user.id)
  if (!user2) return res.status(404).json({ msg: 'Not Found' })

  user2.name = 'new Name'
  users[user.id - 1] = user2

  res.send({ user: user2, mas: '修改成功' })
  res.end()
});

router.delete('/user', function (req, res, next) {
  let user = req.body
  let user2 = users.find(i => i.id === user.id)
  if (!user2) return res.status(404).json({ msg: 'Not Found' })

  users.splice(user2.id - 1, 1)

  res.send({ msg: '删除成功' })
  res.end()
});
module.exports = router;
