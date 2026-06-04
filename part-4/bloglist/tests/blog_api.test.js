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


test('if like property is missing from the request, it will default to the value 0', async() => {
    const noLikesBlog = {
      title: "No Like",
      author: "Boa",
      url: "www.onePiece.com/noLike",
    };

    await api
      .post("/api/blogs")
      .send(noLikesBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const response = await api.get('/api/blogs')
    assert.strictEqual(response.body[2].likes, 0)


});

test(
"if the title or url properties are missing from the request data, the backend responds to the request with the status code 400 Bad Request.",
  async() => {
    const noTitle = {
      author: "Nami",
      url: "www.onePiece.com/nami",
      likes: 69,
    };

    const noUrl = {
      title: "No url",
      author: "Ussop",
      likes: 109,
    };

    await api.post('/api/blogs').send(noTitle).expect(400);
    await api.post("/api/blogs").send(noUrl).expect(400);

    const response = await api.get("/api/blogs");
    assert.strictEqual(response.body.length, initialBlogs.length);
  }
);

after(async() => {
    await mongoose.connection.close();
})
