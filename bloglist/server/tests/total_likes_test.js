const {listWithOneBlog, listWithManyBlogs} = require('../tests/test_list')
const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')


describe('total likes', () => {
  
    test('when list has only one blog equals the likes of that', () => {
      const result = listHelper.totalLikes(listWithOneBlog)
      assert.strictEqual(result, 5)
    })
    test('of empty list is zero', () => {
        const result = listHelper.totalLikes([])
        assert.strictEqual(result, 0)
    })
    test(`of a bigger list is calculated right`, () => {
        const result = listHelper.totalLikes(listWithManyBlogs)
        assert.strictEqual(result, 36)
    })
  })