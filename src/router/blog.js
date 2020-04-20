const { getList, getDetail, addNewBlog, updateBlog, deleteBlog } = require('../controller/blog')
const { ErrorModel, SuccessModel } = require('../model/resModel')

const handleBlogRouter = (req, res) => {
  const method = req.method
  const id = req.query.id

  //获取博客列表
  if (method === 'GET' && req.path === '/api/blog/list') {
    const { author, keyword } = req.query
    const listData = getList(author, keyword)
    return new SuccessModel(listData)
  }

  //获取博客详情
  if (method === 'GET' && req.path === '/api/blog/detail') {
    const detailData = getDetail(id)
    return new SuccessModel(detailData)
  }

  //新建博客
  if (method === 'POST' && req.path === '/api/blog/new') {
    const blogData = addNewBlog(req.body)
    return new SuccessModel(blogData)
  }

  //更新博客
  if (method === 'POST' && req.path === '/api/blog/upadte') {
    const blogData = updateBlog(id, req.body)
    return new SuccessModel(blogData)
  }

  //删除博客
  if (method === 'POST' && req.path === '/api/blog/delete') {
    const blogData = deleteBlog(id)
    return new SuccessModel(blogData)
  }
}

module.exports = handleBlogRouter

