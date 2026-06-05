import api from '../utils/axiosInstance';

export const getTasksApi = (params) => api.get('/tasks', { params });
export const getTaskApi = (id) => api.get(`/tasks/${id}`);
export const createTaskApi = (data) => api.post('/tasks', data);
export const updateTaskApi = (id, data) => api.put(`/tasks/${id}`, data);
export const toggleTaskApi = (id) => api.patch(`/tasks/${id}/toggle`);
export const deleteTaskApi = (id) => api.delete(`/tasks/${id}`);
export const clearCompletedApi = () => api.delete('/tasks/completed/clear');