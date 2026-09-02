import { create } from 'zustand'

const useNotificationStore = create((set) =>({
    notification: null,
    success: true,
    actions:{
        setNotification: value => set(() => ({ notification: value })),
        setSuccessStatus: value => set(() => ({success: value}))
    }
}))
  

export const useNotifications = () => useNotificationStore((state) => state.notification)
export const useSuccessStatus = () => useNotificationStore((state) =>  state.success)
export const useNotificationActions = () => useNotificationStore((state) => state.actions)