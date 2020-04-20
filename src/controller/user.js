const login = ({ username, password }) => {
  if (username === 'zs' && password === '123456') {
    return { username, msg: '登录成功' }
  }
  return false
}

module.exports = {
  login
}