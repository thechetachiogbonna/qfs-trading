import { create } from "zustand";

type UnReadNotification = {
  unreadCount: null | number
  setUnreadCount: (count: number) => void
}

const useUnReadNotification = create<UnReadNotification>((set) => ({
  unreadCount: null,
  setUnreadCount: (count) => set({ unreadCount: count })
}))

export default useUnReadNotification;