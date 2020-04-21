const { getList, getDetail, addNewBlog, updateBlog, deleteBlog } = require('../controller/blog')
const { ErrorModel, SuccessModel } = require('../model/resModel')

//统一验证是否登录

const loginCheck = (req) => {
  if(!req.session.username) {
    return Promise.resolve(new ErrorModel({msg:'尚未登录'}))
  }
  
}

const handleBlogRouter = (req, res) => {
  const method = req.method
  const id = req.query.id

  //获取博客列表
  if (method === 'GET' && req.path === '/api/blog/list') {
    const { author, keyword } = req.query
    return getList(author, keyword).then(res => {
      // console.log('res', res)
      // console.log(new SuccessModel(res))
      return new SuccessModel(res)
    }).catch(err => {
      return new ErrorModel(err)
    })
  }

  //获取博客详情
  if (method === 'GET' && req.path === '/api/blog/detail') {
    return getDetail(id).then(res => {
      return new SuccessModel(res)
    }).catch(err => {
      return new ErrorModel(err)
    })
    
  }

  //新建博客
  if (method === 'POST' && req.path === '/api/blog/new') {
    const loginCheckRes = loginCheck(req)
    //尚未登录
    if(loginCheckRes) {
      return loginCheckRes
    }
    req.body.author = req.session.username
    return addNewBlog(req.body).then(res => {
      return new SuccessModel(res)
    })
  }

  //更新博客
  if (method === 'POST' && req.path === '/api/blog/upadte') {
    const loginCheckRes = loginCheck(req)
    //尚未登录
    if(loginCheckRes) {
      return loginCheckRes
    }
    return updateBlog(id, req.body).then(res =>{
      if(res.upadated) {
        return new SuccessModel(res)
      }else {
        return new ErrorModel(res)
      }
    })
  }

  //删除博客
  if (method === 'POST' && req.path === '/api/blog/delete') {
    const loginCheckRes = loginCheck(req)
    //尚未登录
    if(loginCheckRes) {
      return loginCheckRes
    }
    const author = req.session.username
    return deleteBlog(id, author).then(res => {
      if(res.deleted) {
        return new SuccessModel(res)
      }else {
        return new ErrorModel(res)
      }
    })
  }
}

module.exports = handleBlogRouter

