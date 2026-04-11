const {blogs, listWithOneBlog} = require("../testData.js")

const dummy = (blogs) => {
    if(Array.isArray(blogs) && blogs.length === 0){
        return 1;
    }
}

const totalLikes = (blogs) => {
    return blogs.reduce((accum, blog) => {
        return accum + blog.likes;
    }, 0)
}

const favoriteBlog = (blogs) => {

    let favorite = blogs[0];
    if(blogs.length === 0){
        return {};
    }

    blogs.forEach((blog) => {
        if(blog.likes > favorite.likes){
            favorite = blog
        }else if (blog.likes === favorite.likes){
            favorite = blog
        }
    })
    return favorite;

}

const mostBlogs = (blogs) => {
    let blogCounter = [];
    let mostBlogs = {};
    if (Array.isArray(blogs) && blogs.length === 0) {
      return 0;
    }

    if (Array.isArray(blogs) && blogs.length === 1) {
      return {"author" : blogs[0].author,
        "blogs" : 1
      };
    }

    blogs.forEach(blog => {
        if(blogCounter.length === 0){
            blogCounter.push({
                "author" : blog.author,
                "blogs" : 1
            })
        };
        blogCounter.forEach(blogsCount => {
            if(blog.author === blogsCount.author){
                blogsCount.blogs += 1
            }else{
                blogCounter.push({
                  "author": blog.author,
                  "blogs": 1,
                });
            }
        })
    })
    blogCounter.forEach((blogger) => {
        if(mostBlogs.blogs === undefined){
            mostBlogs = blogger;
        }
        if (blogger.blogs > mostBlogs.blogs || blogger.blogs === mostBlogs.blog) {
          mostBlogs = blogger;
        }
    });

    return mostBlogs;

}

module.exports = {
    dummy, totalLikes, favoriteBlog, mostBlogs,
}
