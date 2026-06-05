import { useState } from 'react';
import { Plus, ChevronLeft, ChevronRight, ClipboardList } from 'lucide-react';
import Navbar from '../../components/layout/Navbar';
import Sidebar from '../../components/layout/Sidebar';
import TaskCard from '../../components/tasks/TaskCard';
import TaskModal from '../../components/tasks/TaskModal';
import TaskFilters from '../../components/tasks/TaskFilters';
import ConfirmDialog from '../../components/ui/ConfirmDialog';
import Loader from '../../components/ui/Loader';
import { useTasks } from '../../hooks/useTasks';
import { useAuth } from '../../context/AuthContext';

function StatCard({ label, value, color }) {
  return (
    <div className="card px-5 py-4 flex items-center gap-4">
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${color}`}>
        <span className="font-display font-bold text-lg text-white">{value}</span>
      </div>
      <p className="text-sm text-slate-400">{label}</p>
    </div>
  );
}

export default function DashboardPage() {
  const { user } = useAuth();
  const {
    tasks, pagination, stats, filters, loading, actionLoading,
    updateSearch, updateFilter, setPage,
    createTask, updateTask, toggleTask, deleteTask, clearCompleted,
  } = useTasks();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [modal, setModal] = useState({ open: false, task: null });
  const [confirm, setConfirm] = useState({ open: false, id: null });

  const openCreate = () => setModal({ open: true, task: null });
  const openEdit = (task) => setModal({ open: true, task });
  const closeModal = () => setModal({ open: false, task: null });

  const handleSubmit = async (data) => {
    if (modal.task) {
      await updateTask(modal.task._id, data);
    } else {
      await createTask(data);
    }
  };

  const handleDelete = (id) => setConfirm({ open: true, id });
  const confirmDelete = async () => {
    await deleteTask(confirm.id);
    setConfirm({ open: false, id: null });
  };

  const greeting = () => {
    const h = new Date().getHours();
    if (h < 12) return 'Good morning';
    if (h < 18) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <div className="min-h-screen bg-[#080c14] flex flex-col">
      <Navbar onMenuToggle={() => setSidebarOpen((p) => !p)} menuOpen={sidebarOpen} />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          stats={stats}
          activeStatus={filters.status}
          onStatusChange={(v) => updateFilter('status', v)}
          onClearCompleted={clearCompleted}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        {/* Main content */}
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-6xl mx-auto px-4 md:px-6 py-6 space-y-6">

            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="font-display font-bold text-2xl text-slate-100">
                  {greeting()}, <span className="text-sky-400">{user?.name?.split(' ')[0]}</span> 👋
                </h1>
                <p className="text-sm text-slate-500 mt-1">
                  {stats.total === 0
                    ? 'No tasks yet. Create your first one!'
                    : `${stats.pending + stats['in-progress']} tasks remaining`}
                </p>
              </div>
              <button onClick={openCreate} className="btn-primary self-start sm:self-auto">
                <Plus size={16} /> New Task
              </button>
            </div>

            {/* Stat cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              <StatCard label="Total" value={stats.total} color="bg-slate-600/40" />
              <StatCard label="Pending" value={stats.pending} color="bg-amber-500/20" />
              <StatCard label="In Progress" value={stats['in-progress']} color="bg-sky-500/20" />
              <StatCard label="Completed" value={stats.completed} color="bg-emerald-500/20" />
            </div>

            {/* Filters */}
            <TaskFilters filters={filters} onSearch={updateSearch} onFilter={updateFilter} />

            {/* Tasks grid */}
            {loading ? (
              <div className="flex items-center justify-center py-24">
                <Loader size="lg" />
              </div>
            ) : tasks.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 gap-4">
                <div className="w-16 h-16 rounded-2xl bg-white/[0.04] flex items-center justify-center">
                  <ClipboardList size={28} className="text-slate-600" />
                </div>
                <div className="text-center">
                  <p className="font-display font-semibold text-slate-300 mb-1">No tasks found</p>
                  <p className="text-sm text-slate-500">
                    {filters.search ? 'Try a different search term' : 'Create your first task to get started'}
                  </p>
                </div>
                {!filters.search && (
                  <button onClick={openCreate} className="btn-primary mt-2">
                    <Plus size={15} /> Create Task
                  </button>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {tasks.map((task) => (
                  <TaskCard
                    key={task._id}
                    task={task}
                    onEdit={openEdit}
                    onDelete={handleDelete}
                    onToggle={toggleTask}
                  />
                ))}
              </div>
            )}

            {/* Pagination */}
            {pagination && pagination.totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 pt-4">
                <button
                  onClick={() => setPage(pagination.page - 1)}
                  disabled={!pagination.hasPrev}
                  className="btn-ghost disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <ChevronLeft size={16} />
                </button>

                <div className="flex gap-1">
                  {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((p) => (
                    <button
                      key={p}
                      onClick={() => setPage(p)}
                      className={`w-9 h-9 rounded-xl text-sm font-medium transition-all ${
                        p === pagination.page
                          ? 'bg-sky-400 text-[#080c14] shadow-[0_0_16px_rgba(56,189,248,0.3)]'
                          : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.06]'
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => setPage(pagination.page + 1)}
                  disabled={!pagination.hasNext}
                  className="btn-ghost disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            )}

            {pagination && (
              <p className="text-center text-xs text-slate-600 pb-2">
                Showing {tasks.length} of {pagination.total} tasks
              </p>
            )}
          </div>
        </main>
      </div>

      {/* Task Modal */}
      <TaskModal
        isOpen={modal.open}
        onClose={closeModal}
        onSubmit={handleSubmit}
        task={modal.task}
        loading={actionLoading}
      />

      {/* Confirm Delete */}
      <ConfirmDialog
        isOpen={confirm.open}
        onClose={() => setConfirm({ open: false, id: null })}
        onConfirm={confirmDelete}
        title="Delete Task"
        message="This action cannot be undone. The task will be permanently deleted."
        loading={actionLoading}
      />
    </div>
  );
}