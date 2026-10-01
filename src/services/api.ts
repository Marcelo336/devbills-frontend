import axios, { type AxiosInstance, type InternalAxiosRequestConfig } from "axios";
import { firebaseAuth } from "../config/firebase";

const BACKEND_BASE_URL = 'https://devbills-backend-bxzr.onrender.com/api';

export const api: AxiosInstance = axios.create({
  baseURL: BACKEND_BASE_URL,
  timeout: 10000,
});

api.interceptors.request.use(
  async (config: InternalAxiosRequestConfig): Promise<InternalAxiosRequestConfig> => {
    const user = firebaseAuth.currentUser;
    
      if (user) {
        try {
          const token = await user.getIdToken();
          config.headers.set("Authorization", `Bearer ${token}`);
        } catch(err) {
          console.error("Erro ao obter token no Firebase", err)
        }
      }
    
    return config;
  },
);
