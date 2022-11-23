const getPost = (type) =>{
    const postSet = {
      notice: 'notices',
      news: 'news'
    }
    return type ? postSet[type] : '' ;
  }

module.exports = { getPost }