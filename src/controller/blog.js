const {exec} = require('../db/mysql')


const getList = (author = '', keyword = '') => {
  // let sql = `select id, title, content, author, createtime from blogs where 1=1`
  let sql = `select * from blogs where 1=1 `
  if(author) {
    sql += `and author='${author}'`
  }
  if(keyword) {
    sql += `and title like '%${keyword}%'`
  }

  sql += `order by createtime desc`
  // console.log(sql)
   return exec(sql)
}

const getDetail = (id) => {
  // return {
  //   id,
  //   title: '标题a',
  //   createTime: 1586340225711,
  //   author: 'zs'
  // }
  const sql = `select * from blogs where id='${id}'`
  return exec(sql).then(rows => {
    return rows[0] || {msg:'该blogID不存在'}
  }) 
}

const addNewBlog = ((blogData = {}) => {
  // console.log(blogData)
  const {title='', content='', createtime = Date.now(), author=''} = blogData

  const sql = `INSERT INTO blogs (title, content, createtime, author) VALUES ('${title}', '${content}', ${createtime}, '${author}');`
  // console.log(sql)
  return exec(sql).then(res => {
    return {id:res.insertId}
  })
  // return {
  //   id: 3,
  //   data: blogData
  // }
})

const updateBlog = (id, blogData = {}) => {
  // return {
  //   id,
  //   data: blogData
  // }

  const {title, content} = blogData
  const sql = `UPDATE blogs SET title='${title}', content='${content}' WHERE id=${id}`
  return exec(sql).then(res => {
    if(res.affectedRows > 0) {
      return {msg:'更新成功',upadated:true}
    }
    return {msg:'更新失败',upadated:false}
  })
}

const deleteBlog = (id, author) => {
  // return {
  //   id,
  //   msg: '删除成功'
  // }
  const sql = `DELETE FROM blogs WHERE id=${id} and author='${author}'`

  return exec(sql).then(res => {
    if(res.affectedRows > 0) {
      return {msg:'删除成功',deleted:true}
    }
    return {msg:'删除失败',deleted:false}
  })
}

module.exports = {
  getList,
  getDetail,
  addNewBlog,
  updateBlog,
  deleteBlog
}