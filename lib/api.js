import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api",
});

api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ── Projects ──────────────────────────────────────────
export const getProjects      = (category) =>
  api.get("/projects", { params: category ? { category } : {} });

export const getProject       = (slug)     => api.get(`/projects/${slug}`);
export const getAdminProjects = ()         => api.get("/projects/admin/all");
export const createProject    = (data)     => api.post("/projects", data);
export const updateProject    = (id, data) => api.put(`/projects/${id}`, data);
export const deleteProject    = (id)       => api.delete(`/projects/${id}`);
export const toggleFeatured   = (id)       => api.patch(`/projects/${id}/featured`);

// ── Auth ──────────────────────────────────────────────
export const login = (email, password) => api.post("/auth/login", { email, password });

// ── Contact ───────────────────────────────────────────
export const sendContact = (payload) => api.post("/contact", payload);

export default api;
