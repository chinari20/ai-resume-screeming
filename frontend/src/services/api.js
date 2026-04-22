import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export const api = axios.create({
  baseURL: API_BASE_URL,
});

export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common.Authorization;
  }
};

export const authApi = {
  register: (payload) => api.post("/auth/register", payload),
  login: (payload) => api.post("/auth/login", payload),
  me: () => api.get("/auth/me"),
};

export const jobsApi = {
  getAll: (params) => api.get("/jobs", { params }),
  getOne: (id) => api.get(`/jobs/${id}`),
  apply: (id, payload) => api.post(`/jobs/${id}/apply`, payload),
};

export const candidateApi = {
  getProfile: () => api.get("/candidate/profile"),
  updateProfile: (payload) => api.put("/candidate/profile", payload),
  uploadResume: (formData) =>
    api.post("/candidate/resume", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
  getApplications: () => api.get("/candidate/applications"),
  getRecommendedJobs: () => api.get("/candidate/recommended-jobs"),
};

export const recruiterApi = {
  getProfile: () => api.get("/recruiter/profile"),
  updateProfile: (payload) => api.put("/recruiter/profile", payload),
  getJobs: () => api.get("/recruiter/jobs"),
  createJob: (payload) => api.post("/recruiter/jobs", payload),
  updateJob: (id, payload) => api.put(`/recruiter/jobs/${id}`, payload),
  deleteJob: (id) => api.delete(`/recruiter/jobs/${id}`),
  getApplicants: (id) => api.get(`/recruiter/jobs/${id}/applicants`),
  screenJob: (id) => api.post(`/recruiter/jobs/${id}/screen`),
  updateApplicationStatus: (id, payload) => api.patch(`/recruiter/applications/${id}/status`, payload),
};

export const adminApi = {
  getDashboard: () => api.get("/admin/dashboard"),
  getUsers: () => api.get("/admin/users"),
  getJobs: () => api.get("/admin/jobs"),
  getApplications: () => api.get("/admin/applications"),
};
