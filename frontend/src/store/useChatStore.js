import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";
import { useAuthStore } from "./useAuthStore.js";

export const useChatStore = create((set, get) => ({
  selectedUser: null,
  messages: [],
  users: [],
  isUsersLoading: false,
  isMessagesLoading: false,
  isSendingMessage: false,

  setSelectedUser: (user) => {
    set({ selectedUser: user });
  },

  getUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get("/messages/users");
      set({ users: res.data });
    } catch (error) {
      toast.error(error?.response?.data?.message || "Error fetching users");
    } finally {
      set({ isUsersLoading: false });
    }
  },

  getMessages: async (userId) => {
    if (!userId) return;
    
    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstance.get(`/messages/${userId}`);
      set({ messages: res.data });
    } catch (error) {
      toast.error(error?.response?.data?.message || "Error fetching messages");
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  sendMessage: async ({ text, image }) => {
    if (!get().selectedUser) return;
    
    set({ isSendingMessage: true });
    try {
      const res = await axiosInstance.post(
        `/messages/send/${get().selectedUser._id}`,
        { text, image }
      );

      // Update messages locally
      set((state) => ({
        messages: [...state.messages, res.data],
      }));

      return res.data;
    } catch (error) {
      toast.error(error?.response?.data?.message || "Error sending message");
      throw error;
    } finally {
      set({ isSendingMessage: false });
    }
  },

  subscribeToMessages: () => {
    const { socket } = useAuthStore.getState();
    if (!socket) return;

    socket.on("newMessage", (message) => {
      // Only add the message if it's from the currently selected user
      const { selectedUser } = get();
      if (selectedUser && message.senderId === selectedUser._id) {
        set((state) => ({
          messages: [...state.messages, message],
        }));
      }
    });
  },

  unsubscribeFromMessages: () => {
    const { socket } = useAuthStore.getState();
    if (!socket) return;

    socket.off("newMessage");
  },
}));