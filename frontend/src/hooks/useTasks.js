import { useState, useEffect, useCallback, useRef } from 'react';
import { getTasksApi, createTaskApi, updateTaskApi, toggleTaskApi, deleteTaskApi, clearCompletedApi } from '../api/taskApi';
import toast from 'react-hot-toast';

const INITIAL_FILTERS = {
  search: '',
  status: '',
  priority: '',
  sortBy: 'createdAt',
  sortOrder: 'desc',
  page: 1,
  limit: 9,
};

export function useTasks() {
  const [tasks, setTasks] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [stats, setStats] = useState({ pending: 0, 'in-progress': 0, completed: 0, total: 0 });
  const [filters, setFilters] = useState(INITIAL_FILTERS);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const searchTimer = useRef(null);

  const fetchTasks = useCallback(async (f = filters) => {
    setLoading(true);
    try {
      const { data } = await getTasksApi(f);
      setTasks(data.data.tasks);
      setPagination(data.data.pagination);
      setStats(data.data.stats);
    } catch {
      toast.error('Failed to load tasks');
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => { fetchTasks(filters); }, [filters]);

  // Debounced search
  const updateSearch = useCallback((val) => {
    clearTimeout(searchTimer.current);
    searchTimer.current = setTimeout(() => {
      setFilters((f) => ({ ...f, search: val, page: 1 }));
    }, 400);
  }, []);

  const updateFilter = useCallback((key, val) => {
    setFilters((f) => ({ ...f, [key]: val, page: 1 }));
  }, []);

  const setPage = useCallback((p) => {
    setFilters((f) => ({ ...f, page: p }));
  }, []);

  const createTask = useCallback(async (payload) => {
    setActionLoading(true);
    try {
      const { data } = await createTaskApi(payload);
      toast.success('Task created!');
      fetchTasks(filters);
      return data.data.task;
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to create task');
      throw err;
    } finally {
      setActionLoading(false);
    }
  }, [filters, fetchTasks]);

  const updateTask = useCallback(async (id, payload) => {
    setActionLoading(true);
    try {
      const { data } = await updateTaskApi(id, payload);
      toast.success('Task updated!');
      fetchTasks(filters);
      return data.data.task;
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update task');
      throw err;
    } finally {
      setActionLoading(false);
    }
  }, [filters, fetchTasks]);

  const toggleTask = useCallback(async (id) => {
    try {
      // Optimistic update
      setTasks((prev) =>
        prev.map((t) =>
          t._id === id
            ? { ...t, status: { pending: 'in-progress', 'in-progress': 'completed', completed: 'pending' }[t.status] }
            : t
        )
      );
      const { data } = await toggleTaskApi(id);
      fetchTasks(filters);
    } catch (err) {
      toast.error('Failed to update task');
      fetchTasks(filters);
    }
  }, [filters, fetchTasks]);

  const deleteTask = useCallback(async (id) => {
    setActionLoading(true);
    try {
      await deleteTaskApi(id);
      toast.success('Task deleted');
      fetchTasks(filters);
    } catch {
      toast.error('Failed to delete task');
    } finally {
      setActionLoading(false);
    }
  }, [filters, fetchTasks]);

  const clearCompleted = useCallback(async () => {
    setActionLoading(true);
    try {
      const { data } = await clearCompletedApi();
      toast.success(data.message);
      fetchTasks(filters);
    } catch {
      toast.error('Failed to clear tasks');
    } finally {
      setActionLoading(false);
    }
  }, [filters, fetchTasks]);

  return {
    tasks, pagination, stats, filters, loading, actionLoading,
    updateSearch, updateFilter, setPage,
    createTask, updateTask, toggleTask, deleteTask, clearCompleted,
    refetch: () => fetchTasks(filters),
  };
}