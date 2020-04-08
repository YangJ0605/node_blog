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

module.exports = {
  getList
}