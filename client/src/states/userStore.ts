import axios, { AxiosError } from "axios";
import { ApiUrl, AuthResponse, User } from "../utils/types";
import { create } from "zustand";

export type Inputs = {
  username?: string;
  email: string;
  password: string;
};

interface AuthStore {
  currentUser: AuthResponse | null;
  loading: boolean;
  status: boolean;
  error: string | null | Error;
  login: (inputs: Inputs) => Promise<void>;
  logout: (user: User | null) => Promise<void>;
  register: (inputs: Inputs) => Promise<void>;
}
const storedUser = localStorage.getItem("currentUser");
const initialUser: AuthResponse = storedUser ? JSON.parse(storedUser) : null;

export const useAuth = create<AuthStore>((set) => ({
  currentUser: initialUser,
  loading: false,
  error: null,
  status: false,

  login: async (inputs) => {
    set({ loading: true, error: null, status: false });
    try {
      const res = await axios.post(ApiUrl + "/auth/login", inputs);
      set({ currentUser: res.data });
      if (res.status == 200) {
        set({ status: true });
      }
      console.log(res.status);
      localStorage.setItem("currentUser", JSON.stringify(res.data));
      set({ loading: false });
    } catch (e) {
      if (e instanceof AxiosError) {
        set({ error: e.response?.data });
      }
    }
  },

  register: async (inputs) => {
    set({ loading: true, error: null, status: false });
    try {
      const res = await axios.post(ApiUrl + "/auth/register", inputs);
      res.status == 200 && set({ status: true });

      console.log(res.data);
    } catch (e) {
      if (e instanceof AxiosError) {
        set({ error: e.response?.data });
      }
    }
  },

  logout: async (userLogout) => {
    set({ loading: true, error: null, status: false });
    try {
      const res = await axios.post(ApiUrl + "/auth/logout", userLogout);
      if (res.status == 200) {
        set({ currentUser: null, loading: false, status: true });
        localStorage.removeItem("currentUser");
        console.log('ok logout');
      }else{
        console.log(res.data);
      }
    } catch (e) {
      console.log(e);
      if (e instanceof AxiosError) {
        set({ error: e.response?.data });
      }
    }
  },
}));
