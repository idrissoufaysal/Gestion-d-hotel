import axios, { AxiosError } from "axios"
import { AuthResponse, User } from "../utils/types"
import { create } from 'zustand'


export type Inputs = {
    username?:string,
    email: string,
    password: string
}

interface AuthStore {
    currentUser: AuthResponse | null,
    loading: boolean,
    status:boolean,
    error: string | null | Error;
    login: (inputs: Inputs) => Promise<void>,
    logout: (user: User | null) => Promise<void>
    register: (inputs: Inputs) => Promise<void>

}
const storedUser = localStorage.getItem("currentUser");
  const initialUser:AuthResponse = storedUser ? JSON.parse(storedUser) : null;

export const useAuth = create<AuthStore>((set) => ({
    currentUser:  initialUser,
    loading: false,
    error: null,
    status:false,

    login: async (inputs) => {
        set({ loading: true, error: null,status:false })
        try {
            const res = await axios.post("http://localhost:9000/auth/login", inputs)
            set({ currentUser: res.data })
            if(res.status==200){
                set({status:true})
            }
            console.log(res.status);
            localStorage.setItem('currentUser', JSON.stringify(res.data))
            set({ loading: false })
        } catch (e) {
            if (e instanceof AxiosError) {
                set({ error: e.response?.data })
            }

        }
    },

    register: async (inputs) => {
        set({ loading: true, error: null })
        try {
            const res = await axios.post("http://localhost:9000/auth/register", inputs)
            res.status==200 && set({status:true})
            console.log(res.data);
        } catch (e) {
            if (e instanceof AxiosError) {
                set({ error: e.response?.data })
            }
        }
    },

    logout: async (userLogout) => {
        set({ loading: true, error: null })
        try {
            await axios.post("http://localhost:9000/auth/logout", userLogout)
            set({ currentUser: null, loading: false })
            localStorage.removeItem('currentUser')
        } catch (e) {
            console.log(e);
            if (e instanceof AxiosError) {
                set({ error: e.response?.data })
            }
        }
    }
}))