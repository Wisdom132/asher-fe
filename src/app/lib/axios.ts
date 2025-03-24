import axios from "axios";

const api = axios.create({
  baseURL: "https://asher-backend-cc008cd2ac25.herokuapp.com/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

// Add an interceptor for handling auth tokens if needed
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // Adjust if using cookies or another auth method
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
