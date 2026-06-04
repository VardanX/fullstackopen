const assert = require('node:assert')
const { test, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog.js')

const api = supertest(app)

const initialBlogs = [
    {
        "title": "Fifth Blog",
        "author": "Luffy",
        "url": "www.onePiece.com/fifthBlog",
        "likes": 5,
        "id": "69d4af93ba93bdc578052843"
    },
    {
        "title": "Seventh Blog",
        "author": "Nami",
        "url": "www.tangerine.com/fifthBlog",
        "likes": 1000,
        "id": "69d4afbeba93bdc578052844"
    }
]

beforeEach(async () => {
    await Blog.deleteMany({});
    let blogObject = new Blog(initialBlogs[0]);
    await blogObject.save();
    blogObject = new Blog(initialBlogs[1]);
    await blogObject.save();
})


test('correct amount of blog posts are returned in json', async () => {

    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs');
    assert.strictEqual(response.body.length, initialBlogs.length)

})

test('unique identifier property of the blog post in named id', async () => {

    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const response = await api.get('/api/blogs');
    response.body.forEach(r => {
        assert.strictEqual("id" in r, true)
    })

});

test('HTTP POST request to the /api/blogs URL successfully creates a new blog post', async () => {
    const newBlog = {
      title: "New Blog",
      author: "Buffy",
      url: "www.onePiece.com/newBlog",
      likes: 69
    };

    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const response = await api.get('/api/blogs');
    let titles = response.body.map(b => b.title)
    assert(titles.includes('New Blog'))
    assert.strictEqual(response.body.length, initialBlogs.length + 1)

})

after(async() => {
    await mongoose.connection.close();
})
