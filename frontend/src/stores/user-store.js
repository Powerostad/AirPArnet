import { create } from "zustand";

const useUserStore = create((set) => ({
  id: undefined,

  login: (id) => {
    localStorage.setItem("id", id);
    set(() => ({ id }));
  },
  logout: () => {
    localStorage.removeItem("id");

    set(() => ({ id: undefined }));
  },
  initializeAuth: () => {
    const id = localStorage.getItem("id");
    if (id) set(() => ({ id }));
  },
}));

export default useUserStore;
