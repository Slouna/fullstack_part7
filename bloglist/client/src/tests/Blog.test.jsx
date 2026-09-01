import { render, screen } from '@testing-library/react'
import Blog from '../components/Blog'
import userEvent from '@testing-library/user-event'
import Togglable from '../components/Togglable'
import NewBlogForm from '../components/NewBlogForm'
import { MemoryRouter } from 'react-router-dom'


describe('Blog component tests', () => {
  let blog
  const mockHandler = vi.fn()
  beforeEach(() => {
    blog = {
      title: 'Toggling works',
      author: 'Pasi Bloggaaja',
      url: 'example.com',
      likes: 0,
      user: {
        name: 'Timo testaaja',
        id: '1234'
      }
    }

  })

  const renderBlog = (userId = null) => {
    render(
      <MemoryRouter>
        <Blog
          blog={blog}
          updateBlog={mockHandler}
          removeBlog={mockHandler}
          userId={userId} />
      </MemoryRouter>
    )
    console.log(userId)
  }



  test('renders its children', () => {

    renderBlog()
    const element = screen.getByText('Toggling works')
    expect(element).toBeDefined()
  })

  test('blogs info is shown without buttons', () => {
    renderBlog()

    expect(screen.getByText('example.com')).toBeVisible()
    expect(screen.getByText(/Likes: 0/)).toBeVisible()
    expect(screen.queryByText('Like')).not.toBeInTheDocument()
    expect(screen.queryByText('Remove')).not.toBeInTheDocument()

  })

  test('like is shown to logged user', async () => {
    renderBlog('4321')


    expect(screen.getByText('Toggling works')).toBeVisible()
    expect(screen.getByText('Timo testaaja')).toBeVisible()
    expect(screen.getByText('example.com')).toBeVisible()
    expect(screen.getByText(/Likes: 0/)).toBeVisible()
    expect(screen.getByText('Like')).toBeVisible()
    expect(screen.queryByText('Remove')).not.toBeInTheDocument()
  })

  test('creator sees remove button', async () => {
    renderBlog('1234')

    expect(screen.getByText('Toggling works')).toBeVisible()
    expect(screen.getByText('Timo testaaja')).toBeVisible()
    expect(screen.getByText('example.com')).toBeVisible()
    expect(screen.getByText(/Likes: 0/)).toBeVisible()
    expect(screen.getByText('Like')).toBeVisible()
    expect(screen.getByText('Remove')).toBeVisible()
  })
})

