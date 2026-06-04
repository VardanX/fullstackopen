const blogsRouter = require("express").Router();
const Blog = require("../models/blog.js")


blogsRouter.get("/", async (request, response) => {

  let blogs = await Blog.find({})
  response.json(blogs)
});

blogsRouter.post("/", async (request, response) => {

  if("title" in request.body === false || "url" in request.body === false){
    response.status(400).json({ error: 'title or url is missing' })
  }else{
    const blog = new Blog({
      ...request.body,
      likes: request.body.likes || false,
    });

    let result = await blog.save();
    response.status(201).json(result);
  }

});


module.exports = blogsRouter;
