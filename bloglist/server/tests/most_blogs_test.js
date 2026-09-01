const {listWithOneBlog, listWithManyBlogs} = require('../tests/test_list')
const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

describe('most written blogs', () => {
    test('when list has only one blog it returns author and 1', () => {
        const result = listHelper.mostBlogs(listWithOneBlog)
        assert.deepStrictEqual(result, {name: listWithOneBlog[0].author, blogs: 1})
      })
      test('empty list gives message', () => {
          const result = listHelper.mostBlogs([])
          assert.deepStrictEqual(result, "No blogs found")
      })
      test(`from bigger list is found`, () => {
          const result = listHelper.mostBlogs(listWithManyBlogs)
          assert.deepStrictEqual(result, {
            name: 'Robert C. Martin',
            blogs: 3
          })
      })
})