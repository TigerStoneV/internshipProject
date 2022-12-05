const getPost = (type) =>{
    const postSet = {
      notice: 'notices',
      news: 'news',
      question: 'questions'
    }
    return type ? postSet[type] : '' ;
  }

module.exports = { getPost }