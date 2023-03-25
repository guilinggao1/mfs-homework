const router = require('koa-router')()
var getDtata = require('../public/javascripts/data')
const data = getDtata()
var d = data;
// console.log(d)

var users = [{
  id: 1,
  username: "test11",
  passward: '111111'
},
{
  id: 2,
  username: "test12",
  passward: '111111'
}]
// 注册
router.get('/user', async ctx => {
  let username = ctx.request.query.username
  let passward = ctx.request.query.passward
  console.log(username, passward)
  users.push({ "id": users.length + 1, "username": username, "passward": passward })
  console.log("注册成功")
  ctx.body = {
    err: 0,
    info: null,
    data: "注册成功"
  }
})
// 用户名检测
router.get('/validName', async ctx => {
  let username = ctx.request.query.username
  console.log(username)
  let test = false
  for (let i = 0; i < users.length; i++) {
    if (username === users[i].username) {
      test = true
    }
  }
  if (test) {
    ctx.body = {
      err: 10001,
      info: "用户名重复",
      data: true
    }
  } else {
    ctx.body = {
      err: 0,
      info: null,
      data: false
    }
  }


})

router.get('/getRegions', async ctx => {
  var region = []
  for (let i = 0; i < d.length; i++) {
    region.push({ name: d[i].region.name, code: d[i].region.code })
  }
  ctx.body = {
    err: 0,
    info: null,
    data: region
  }
})

router.get('/getCity', async ctx => {
  let index = ctx.request.query.regionIndex
  console.log(index)
  regionInfo = d[index].region.state
  var cities = []
  for (let i = 0; i < regionInfo.length; i++) {
    cities.push({ name: regionInfo[i].name, code: regionInfo[i].code })
  }
  ctx.body = {
    err: 0,
    info: null,
    data: cities
  }
})
router.get('/getCounty', async ctx => {

  var index = ctx.request.query.cityIndex
  console.log(index)
  var cityInfo = regionInfo[index].city
  var counties = []
  for (let i = 0; i < cityInfo.length; i++) {
    counties.push({ name: cityInfo[i].name, code: cityInfo[i].code })
  }
  console.log("已选择")
  ctx.body = {
    err: 0,
    info: null,
    data: counties
  }
})


module.exports = router
