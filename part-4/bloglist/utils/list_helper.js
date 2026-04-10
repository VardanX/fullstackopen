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

module.exports = {
    dummy, totalLikes, favoriteBlog
}
