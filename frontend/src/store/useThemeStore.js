import { create } from "zustand";

export const useThemeStore = create((set) => ({
  theme: localStorage.getItem("chat-theme") || "coffee", // Default theme
  setTheme: (theme) => {
    localStorage.setItem("chat-theme", theme); // Save theme to local storage
    set({ theme }); // Update the state with the new theme
  }, // Function to update the theme
}));
