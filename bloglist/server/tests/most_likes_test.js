const {listWithOneBlog, listWithManyBlogs} = require('../tests/test_list')
const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

describe('most total likes', () => {
    test('when list has only one blog it returns the author and likes', () => {
        const result = listHelper.mostLikes(listWithOneBlog)
        assert.deepStrictEqual(result, {name: listWithOneBlog[0].author, likes: listWithOneBlog[0].likes})
      })
      test('empty list gives message', () => {
          const result = listHelper.mostLikes([])
          assert.deepStrictEqual(result, "No blogs found")
      })
      test(`from bigger list is found`, () => {
          const result = listHelper.mostLikes(listWithManyBlogs)
          assert.deepStrictEqual(result, {
            name: 'Edsger W. Dijkstra',
            likes: 17
          })
      })
})