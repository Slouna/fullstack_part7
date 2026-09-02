import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import blogService from './services/blogs'

const useNotificationStore = create((set) =>({
    notification: null,
    success: true,
    actions:{
        setNotification: value => set(() => ({ notification: value })),
        setSuccessStatus: value => set(() => ({success: value}))
    }
}))

const useBlogStore = create(devtools((set, get) => ({
    blogs: [],
    actions: {
        initialize: async () => {
            const blogs = await blogService.getAll()
            set(() => ({blogs}))
        },
        add: async ( blog ) => {
            const newBlog = await blogService.create(blog)
            set(state => ({blogs: [...state.blogs, newBlog]}))
        },
        deleteBlog: async (id) => {
            await blogService.deleteBlog(id)
            set(state => ({
                blogs: state.blogs.filter(blog => blog.id !== id)
            }))
        },
        like: async (id) => {
            const blog = get().blogs.find(blog => blog.id === id)
            const updated = await blogService.update(id, { ...blog, likes: blog.likes + 1 })
            set(state => ({
                blogs: state.blogs.map(blog => blog.id === id ? updated : blog)
            }))
            console.log(updated)
        }
    }
})))

export const useNotifications = () => useNotificationStore((state) => state.notification)
export const useSuccessStatus = () => useNotificationStore((state) =>  state.success)
export const useNotificationActions = () => useNotificationStore((state) => state.actions)
export const useBlogs = () => useBlogStore((state) => state.blogs)
export const useBlogActions = () => useBlogStore((state) => state.actions)