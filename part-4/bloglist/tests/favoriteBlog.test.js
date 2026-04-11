const { test, describe} = require("node:test")
const assert  = require("node:assert")
const favoriteBlog = require("../utils/list_helper.js").favoriteBlog
const {blogs, listWithOneBlog} = require("../testData.js")


describe("favorite Blog", () => {
  test("for many blogs", () => {
    assert.deepStrictEqual(favoriteBlog(blogs), blogs[2]);
  });

  test("for one blog", () => {
    assert.deepStrictEqual(favoriteBlog(listWithOneBlog), listWithOneBlog[0]);
  });

  test("for empty blogs", () => {
    assert.deepStrictEqual(favoriteBlog([]), {});
  });
});
