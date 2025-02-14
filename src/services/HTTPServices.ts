import axios from "axios";

export const dogApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL as string,
});
