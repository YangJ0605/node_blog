const mysql = require('mysql')

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root1111',
  port: '3306',
  database: 'myblog'
})

connection.connect()


const sql = 'select id, username from users;'

connection.query(sql, (err, res) => {
  if(err) {
    console.log(err)
  } else {
    res.forEach(item => {
      console.log(item)
    })
  }
})

connection.end()