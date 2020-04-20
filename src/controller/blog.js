const getList = (author = '', keyword = '') => {
  return [
    {
      id: 1,
      title: '标题a',
      createTime: 1586340225711,
      author
    },
    {
      id: 2,
      title: '标题b',
      createTime: 1586340625711,
      author
    }
  ]
}

const getDetail = (id) => {
  return {
    id,
    title: '标题a',
    createTime: 1586340225711,
    author: 'zs'
  }
}

const addNewBlog = ((blogData = {}) => {
  return {
    id: 3,
    data: blogData
  }
})

const updateBlog = (id, blogData = {}) => {
  return {
    id,
    data: blogData
  }
}

const deleteBlog = (id) => {
  return {
    id,
    msg: '删除成功'
  }
}

module.exports = {
  getList,
  getDetail,
  addNewBlog,
  updateBlog,
  deleteBlog
}