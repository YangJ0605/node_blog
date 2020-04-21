const { login } = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/resModel')

const getCookieExpires = () => {
  const d = new Date()
  d.setTime(d.getTime() + (24 * 60 * 60 * 1000))
  return d.toUTCString()
}

const handleUserRouter = (req, res) => {
  const method = req.method
  const url = req.url
  const path = url.split('?')[0]

  //登录
  if (method === 'GET' && path === '/api/user/login') {
    // const {username, password} = req.body
    // const {username, password} = req.query
    
    return login(req.query).then(userData => {
      if (userData.username) {
        userData.msg = '登录成功'
        // const a = 1
        // res.setHeader('Set-Cookie', `username=${a};key1=value1;httpOnly;`)
        res.setHeader('Set-Cookie', `username=${userData.username}; path=/; HttpOnly; Expires=${getCookieExpires()}`) //不能含有中文
        return new SuccessModel(userData)
      }
      return new ErrorModel({ msg: '账号或密码错误' })
    })
  }

  //登录cookie校验
  if(method=== 'GET' && path === '/api/user/login_check') {
    if(req.cookie.username) {
      return Promise.resolve(new SuccessModel({msg:'已经登录',username: req.cookie.username}))
    }
    return Promise.resolve(new ErrorModel({msg:'尚未登录'}))
  }
}

module.exports = handleUserRouter