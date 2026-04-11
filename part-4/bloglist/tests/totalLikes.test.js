const { test, describe } = require("node:test");
const assert = require("node:assert");
const  totalLikes  = require("../utils/list_helper.js").totalLikes
const {blogs, listWithOneBlog} = require("../testData.js")


describe("total likes", () => {

    test("of one blog", () => {
        assert.strictEqual(totalLikes(listWithOneBlog), listWithOneBlog[0].likes)
    });

    test("total likes of many blogs", () => {

        assert.strictEqual(totalLikes(blogs), 36)
    });

    test("total likes of empty blog", () => {
        assert.strictEqual(totalLikes([]), 0)
    })

});
