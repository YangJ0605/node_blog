const {exec} = require('../db/mysql')

const login = ({ username, password }) => {
  // if (username === 'zs' && password === '123456') {
  //   return { username, msg: '登录成功' }
  // }
  // return false

  const sql = `select username,realname from users where username='${username}' and password=${password};`
  return exec(sql).then(rows => {
    return rows[0] || {}
  })
}

module.exports = {
  login
}