const qs = require('querystring')

const blogRouter = require('./src/router/blog')
const userRouter = require('./src/router/user')

//存储session
const SESSION_DATA = {}

const getPostData = (req) => {
  return new Promise((resolve, reject) => {
    if (req.method !== 'POST') {
      resolve({})
      return
    }
    if (req.headers['content-type'] !== 'application/json') {
      resolve({})
      return
    }
    let postData = ''
    req.on('data', chunk => {
      postData += chunk.toString()
    })
    req.on('end', () => {
      if (!postData) {
        resolve({})
        return
      }
      resolve(JSON.parse(postData))
    })
  })
}

const serverHandle = (req, res) => {

  res.setHeader('Content-type', 'application/json')

  const url = req.url
  req.path = url.split('?')[0]
  req.query = qs.parse(url.split('?')[1])

  //解析cookie
  req.cookie = {}
  const cookie = req.headers.cookie

  //解析sessin 
  let userID = req.cookie.userid
  let needSetCookie = false
  if(userID) {
    if(!SESSION_DATA[userID]) {
      SESSION_DATA[userID] = {}
    } 
  }else {
    needSetCookie = true
    userID = `${Date.now()}_${parseInt(Math.random() * 1000)}`
    SESSION_DATA[userID] = {}
  }
  req.session = SESSION_DATA[userID]


  cookie && cookie.split(';').forEach(item => {
    if(!item) return
    const tempArr = item.split('=')
    const key = tempArr[0].trim()
    const value = tempArr[1].trim()
    console.log(key, value)
    req.cookie[key] = value
  })
  // console.log(req.cookie)

  getPostData(req).then(postData => {
    req.body = postData
    const blogRes = blogRouter(req, res)
    if(blogRes) {
      return blogRes.then(blogData => {
          res.end(JSON.stringify(blogData))
      })
    }
    
    const userRes = userRouter(req, res)
    if (userRes) {
      return userRes.then(userData => {
        res.end(JSON.stringify(userData))
      })
    }

    res.writeHead(404, { 'Content-type': 'text/html;charset=utf-8' })
    res.write(`<h4 style='color:red;text-align:center;margin-top:20px'>404 error 您访问的页面不存在</h4>`)
    res.end()
  })
}


module.exports = serverHandle

