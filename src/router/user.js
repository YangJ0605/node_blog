const { login } = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/resModel')


const handleUserRouter = (req, res) => {
  const method = req.method
  const url = req.url
  const path = url.split('?')[0]

  //登录
  if (method === 'POST' && path === '/api/user/login') {
    const result = login(req.body)
    if (result) {
      return new SuccessModel(result)
    }
    return new ErrorModel('账号或者密码有误')
  }
}

module.exports = handleUserRouter