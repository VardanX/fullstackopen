const { test, describe } = require("node:test");
const assert = require("node:assert");
const mostBlogs = require("../utils/list_helper.js").mostBlogs;
const { blogs, listWithOneBlog } = require("../testData.js");


describe("most amount of blogs", () => {

    test("of all blogs", () => {
        assert.deepStrictEqual(mostBlogs(blogs), {
          author: "Robert C. Martin",
          blogs: 3,
        });
    })
    test("only one blog", () => {
      assert.deepStrictEqual(mostBlogs(listWithOneBlog), {
        "author" : listWithOneBlog[0].author,
        "blogs" : 1
      })
    });
    test("empty blog list", () => {
      assert.deepStrictEqual(mostBlogs([]), 0);
    });

});
