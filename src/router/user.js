const { login } = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/resModel')


const handleUserRouter = (req, res) => {
  const method = req.method
  const url = req.url
  const path = url.split('?')[0]

  //登录
  if (method === 'POST' && path === '/api/user/login') {
    // const {username, password} = req.body
    return login(req.body).then(res => {
      if(res.username) {
        res.msg = '登录成功'
        return new SuccessModel(res)
      }
      return new ErrorModel({msg: '账号或密码错误'})
    })
}
}

module.exports = handleUserRouter