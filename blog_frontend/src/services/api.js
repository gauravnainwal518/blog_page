import axios from "axios";

const BASE_URL = "http://localhost:5000/api";

const api = axios.create({
  baseURL: BASE_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Export blog-related endpoints
export const saveDraft = (data) => api.post("/blogs/save-draft", data);
export const publishBlog = (data) => api.post("/blogs/publish", data);
export const getAllBlogs = () => api.get("/blogs");
export const getBlogById = (id) => api.get(`/blogs/${id}`);

export default api;
