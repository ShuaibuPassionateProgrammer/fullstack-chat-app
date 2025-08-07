import { create } from "zustand";
import { ThemeState } from "../types";

export const useThemeStore = create<ThemeState>((set) => ({
  theme: (localStorage.getItem("chat-theme") as 'light' | 'dark') || "coffee",

  setTheme: (theme: 'light' | 'dark') => {
    localStorage.setItem("chat-theme", theme);
    set({ theme });
  },
}));