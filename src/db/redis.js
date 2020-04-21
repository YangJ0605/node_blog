const redis = require('redis')
const {
  REDIS_CONF
} = require('../config/db')

const redisClient = redis.createClient(REDIS_CONF.port, REDIS_CONF.host)

redisClient.on('error', err => {
  console.log(err)
})


function setRedis(key, val) {
  if (typeof val === 'object') {
    val = JSON.stringify(key)
  }
  redisClient.set(key, val, redis.print)
}

function getRedis(key) {
  return new Promise((resolve, reject) => {
    redisClient.get('myname', (err, val) => {
      if (err) {
        return reject(err)
      }
      if (val == null) {
        return resolve(null)
      }
      try {
        resolve(JSON.parse(val))
      } catch (ex) {
        resolve(val)
      }
    })
  })
}

module.exports = {
  setRedis,
  getRedis
}