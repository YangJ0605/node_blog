const mysql = require('mysql')

const {MYSQL_CONF} = require('../config/db')
// console.log(MYSQL_CONF)
const connection = mysql.createConnection(MYSQL_CONF)


connection.connect()

function exec(sql) {
  return new Promise((resolve, reject) => {
    connection.query(sql, (err, res) => {
      if(err) {
        reject(err)
        return
      }
      resolve(res)
    })
  })
}


module.exports = {
  exec,
  escape: mysql.escape
}