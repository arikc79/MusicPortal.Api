import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5106/api",
});

// 🔹 request: додаємо token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// 🔹 response: ловимо 401
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const currentPath = window.location.pathname;

    // ❗ ВАЖЛИВО: не чіпаємо login
    if (status === 401 && currentPath !== "/login") {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default api;
