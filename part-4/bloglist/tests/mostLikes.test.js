const { test, describe } = require("node:test");
const assert = require("node:assert");
const mostLikes = require("../utils/list_helper.js").mostLikes;
const { blogs, listWithOneBlog } = require("../testData.js");

describe("most liked blogger", () => {

    test("of all blogs", () => {
        assert.deepStrictEqual(mostLikes(blogs), {
          author: "Edsger W. Dijkstra",
          likes: 17,
        });
    })
    test("only one blog", () => {
      assert.deepStrictEqual(mostLikes(listWithOneBlog), {
        "author" : listWithOneBlog[0].author,
        "likes" : listWithOneBlog[0].likes
      })
    });
    test("empty blog list", () => {
      assert.deepStrictEqual(mostLikes([]), 0);
    });

});
