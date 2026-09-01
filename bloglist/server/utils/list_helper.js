const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    let likes = 0
    blogs.map((blog) => {likes += blog.likes})
    return likes
}

const favoriteBlog = (blogs) => {
    if (blogs === null|| blogs.length === 0 ){
        return "No blogs found"
    }
    let mostLiked = blogs[0]
    for (let i = 1; i < blogs.length; i++){
        if (blogs[i].likes > mostLiked.likes){
            mostLiked = blogs[i]
        }
    }
    return mostLiked
}


const mostBlogs = (blogs) => {
    if (blogs === null|| blogs.length === 0 ){
        return "No blogs found"
    }

    let authors = [{
        "name": blogs[0].author, "blogs": 1}]
    let found = false

    for (let i = 1; i < blogs.length; i++){
        found = false
        for (let j = 0; j < authors.length; j++){
            if (blogs[i].author === authors[j].name){
                authors[j].blogs += 1
                found = true
            }
        }
        
        if (!found){
            authors.push({name: blogs[i].author, blogs: 1})
        }
    }
    
    return(authors.reduce((prev, current) => (prev && prev.blogs > current.blogs) ? prev : current))

}

const mostLikes = (blogs) => {
    if (blogs === null|| blogs.length === 0 ){
        return "No blogs found"
    }

    let authors = [{
        "name": blogs[0].author, "likes": blogs[0].likes}]
    let found = false

    for (let i = 1; i < blogs.length; i++){
        found = false
        for (let j = 0; j < authors.length; j++){
            if (blogs[i].author === authors[j].name){
                authors[j].likes += blogs[i].likes
                found = true
            }
        }
        
        if (!found){
            authors.push({name: blogs[i].author, likes: blogs[i].likes})
        }
    }
    
    return(authors.reduce((prev, current) => (prev && prev.likes > current.likes) ? prev : current))

}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}

/* Asked chatgpt to edit my method to use reduce
saving as comment to look on later when i could use reduce again

const mostBlogs = (blogs) => {
    if (blogs === null || blogs.length === 0) {
      return "No blogs found"
    }
  
    const authors = blogs.reduce((acc, blog) => {
      const author = acc.find(a => a.name === blog.author)
  
      if (author) {
        author.blogs += 1
      } else {
        acc.push({ name: blog.author, blogs: 1 })
      }
  
      return acc
    }, [])
  
    return authors.reduce((prev, current) =>
      prev.blogs > current.blogs ? prev : current
    )
  }
  */