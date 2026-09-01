const {listWithOneBlog, listWithManyBlogs} = require('../tests/test_list')
const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

describe('favourite blog', () => {
    test('when list has only one blog it returns it', () => {
        const result = listHelper.favoriteBlog(listWithOneBlog)
        assert.deepStrictEqual(result, listWithOneBlog[0])
      })
      test('empty list gives message', () => {
          const result = listHelper.favoriteBlog([])
          assert.deepStrictEqual(result, "No blogs found")
      })
      test(`from bigger list is found`, () => {
          const result = listHelper.favoriteBlog(listWithManyBlogs)
          assert.deepStrictEqual(result, {
            title: "Canonical string reduction",
            author: "Edsger W. Dijkstra",
            url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
            likes: 12,
            __v: 0
          })
      })
})