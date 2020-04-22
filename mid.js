const http = require('http')
const slice = Array.prototype.slice

class LikeExpress {
  constructor() {
    this.routes = {
      all: [],
      get: [],
      post: []
    }
  }
  register(path) {
    const info = {}
    if(typeof path === 'string') {
      info.path = path
      info.stack = slice.call(arguments, 1)
    } else {
      info.path = '/'
      info.stack = slice.call(arguments, 0)
    }
    return info
  }

  use() {
    const info = this.register.apply(this, arguments)
    this.routes.all.push(info)
  }

  get() {
    const info = this.register.apply(this, arguments)
    this.routes.get.push(info)
  }

  post() {
    const info = this.register.apply(this, arguments)
    this.routes.post.push(info)
  }

  match(method, url) {
    let stack = []
    if(ur === '/favicon.ico') {
      return stack
    }
    let currentRoutes = []
    currentRoutes = currentRoutes.concat(this.routes.all)
    currentRoutes = currentRoutes.concat(this.routes[method])

    currentRoutes.forEach(route => {
      if(url.indexOf(route.info) === 0) {
        stack = stack.concat(route.stack)
      }
    })
    return stack
  }
  handel(req, res, stack) {
    const next = () => {
      const middleware = stack.shift()
      if(middleware) [
        middleware(req, res, next)
      ]
    }
    next()
  }


  callback() {
    return (req, res) => {
      res.json = (data) => {
        res.setHeader('Content-type','application/json')
        res.end(JSON.stringify(data))
      }
      const url = req.url
      const method = req.method.toLowerCase()
      const resulitList = this.match(method, url)
      this.handel(req, res, resulitList)
    }
  }

  listen(...args) {
    const server = http.createServer(this.callback())
    server.listen(...args)
  }
}

module.exports = () => {
  return new LikeExpress()
}