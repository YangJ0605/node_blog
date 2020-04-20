const qs = require('querystring')

const blogRouter = require('./src/router/blog')
const userRouter = require('./src/router/user')


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

  getPostData(req).then(postData => {
    req.body = postData
    const blogData = blogRouter(req, res)
    if (blogData) {
      res.end(JSON.stringify(blogData))
      return
    }

    const userData = userRouter(req, res)
    if (userData) {
      res.end(JSON.stringify(userData))
      return
    }

    res.writeHead(404, { 'Content-type': 'text/plain' })
    res.write('404\n')
    res.end()
  })
}


module.exports = serverHandle

