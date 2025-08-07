import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { useAuthStore } from "./useAuthStore";
import { User, Message } from "../types";

interface ChatStore {
  selectedUser: User | null;
  messages: Message[];
  users: User[];
  isUsersLoading: boolean;
  isMessagesLoading: boolean;
  isSendingMessage: boolean;
  setSelectedUser: (user: User | null) => void;
  getUsers: () => Promise<void>;
  getMessages: (userId: string) => Promise<void>;
  sendMessage: (messageData: { text?: string; image?: string }) => Promise<Message>;
  subscribeToMessages: () => void;
  unsubscribeFromMessages: () => void;
}

export const useChatStore = create<ChatStore>((set, get) => ({
  selectedUser: null,
  messages: [],
  users: [],
  isUsersLoading: false,
  isMessagesLoading: false,
  isSendingMessage: false,

  setSelectedUser: (user: User | null) => {
    set({ selectedUser: user });
  },

  getUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get("/messages/users");
      set({ users: res.data });
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Error fetching users");
    } finally {
      set({ isUsersLoading: false });
    }
  },

  getMessages: async (userId: string) => {
    if (!userId) return;
    
    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstance.get(`/messages/${userId}`);
      set({ messages: res.data });
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Error fetching messages");
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  sendMessage: async ({ text, image }: { text?: string; image?: string }) => {
    if (!get().selectedUser) {
      throw new Error("No user selected");
    }
    
    set({ isSendingMessage: true });
    try {
      const res = await axiosInstance.post(
        `/messages/send/${get().selectedUser!._id}`,
        { text, image }
      );

      // Update messages locally
      set((state) => ({
        messages: [...state.messages, res.data],
      }));

      return res.data;
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Error sending message");
      throw error;
    } finally {
      set({ isSendingMessage: false });
    }
  },

  subscribeToMessages: () => {
    const { socket } = useAuthStore.getState();
    if (!socket) return;

    socket.on("newMessage", (message: Message) => {
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