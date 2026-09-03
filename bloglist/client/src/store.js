import { create } from "zustand";
import { devtools } from "zustand/middleware";
import blogService from "./services/blogs";
import loginService from "./services/login";
import persistentUser from "./services/persistentUser";

const useNotificationStore = create((set) => ({
  notification: null,
  success: true,
  actions: {
    setNotification: (value) => set(() => ({ notification: value })),
    setSuccessStatus: (value) => set(() => ({ success: value })),
  },
}));

const useCurrentUserStore = create(
  devtools((set, get) => ({
    user: null,
    actions: {
      initializeUser: async () => {
        const user = persistentUser.getUser();
        if (user !== null) {
          blogService.setToken(user.token);
          set(() => ({ user }));
        }
      },
      logIn: async (username, password) => {
        const newLogin = await loginService.login({ username, password });
        persistentUser.saveUser(newLogin);
        blogService.setToken(newLogin.token);
        set(() => ({ user: newLogin }));
        return newLogin;
      },
      logOut: () => {
        persistentUser.removeUser();
        set(() => ({ user: null }));
      },
    },
  })),
);

const useBlogStore = create(
  devtools((set, get) => ({
    blogs: [],
    actions: {
      initialize: async () => {
        const blogs = await blogService.getAll();
        set(() => ({ blogs }));
      },
      add: async (blog) => {
        const newBlog = await blogService.create(blog);
        set((state) => ({ blogs: [...state.blogs, newBlog] }));
      },
      deleteBlog: async (id) => {
        const response = await blogService.deleteBlog(id);
        set((state) => ({
          blogs: state.blogs.filter((blog) => blog.id !== id),
        }));
        return response;
      },
      like: async (id) => {
        const blog = get().blogs.find((blog) => blog.id === id);
        const updated = await blogService.update(id, {
          ...blog,
          likes: blog.likes + 1,
        });
        set((state) => ({
          blogs: state.blogs.map((blog) => (blog.id === id ? updated : blog)),
        }));
        console.log(updated);
      },
    },
  })),
);

export const useNotifications = () =>
  useNotificationStore((state) => state.notification);
export const useSuccessStatus = () =>
  useNotificationStore((state) => state.success);
export const useNotificationActions = () =>
  useNotificationStore((state) => state.actions);
export const useBlogs = () => useBlogStore((state) => state.blogs);
export const useBlogActions = () => useBlogStore((state) => state.actions);
export const useCurrentUser = () => useCurrentUserStore((state) => state.user);
export const useUserActions = () =>
  useCurrentUserStore((state) => state.actions);
