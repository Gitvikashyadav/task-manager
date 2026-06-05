import { useState, useEffect } from "react";
import { X, Plus, Save, Tag, AlignLeft, Flag, Calendar } from "lucide-react";

const INITIAL = {
  title: "",
  description: "",
  status: "pending",
  priority: "medium",
  dueDate: "",
};

export default function TaskModal({
  isOpen,
  onClose,
  onSubmit,
  task = null,
  loading = false,
}) {
  const [form, setForm] = useState(INITIAL);
  const [errors, setErrors] = useState({});
  const isEdit = !!task;

  useEffect(() => {
    if (task) {
      setForm({
        title: task.title || "",
        description: task.description || "",
        status: task.status || "pending",
        priority: task.priority || "medium",
        dueDate: task.dueDate
          ? new Date(task.dueDate).toISOString().split("T")[0]
          : "",
      });
    } else {
      setForm(INITIAL);
    }
    setErrors({});
  }, [task, isOpen]);

  if (!isOpen) return null;

  const set = (k) => (e) => setForm((p) => ({ ...p, [k]: e.target.value }));

  const validate = () => {
    const e = {};
    if (!form.title.trim()) e.title = "Title is required";
    else if (form.title.length > 100) e.title = "Max 100 characters";
    setErrors(e);
    return !Object.keys(e).length;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    await onSubmit({ ...form, dueDate: form.dueDate || null });
    onClose();
  };

  const labelCls =
    "block text-xs font-semibold text-slate-400 mb-2 tracking-wide uppercase";
  const selectCls = "input w-full appearance-none cursor-pointer";

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center px-4 pb-4 sm:pb-0">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative w-full max-w-lg bg-[#111827] border border-white/[0.07] rounded-2xl shadow-2xl animate-scaleIn max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/[0.06] sticky top-0 bg-[#111827] rounded-t-2xl">
          <div>
            <h2 className="font-display font-bold text-lg text-slate-100">
              {isEdit ? "Edit Task" : "New Task"}
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              {isEdit
                ? "Update your task details"
                : "Add a new task to your board"}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-slate-500 hover:text-slate-300 hover:bg-white/[0.06] transition-all"
          >
            <X size={16} />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Title */}
          <div>
            <label className={labelCls}>
              <Tag size={10} className="inline mr-1.5" />
              Task Title *
            </label>
            <input
              type="text"
              value={form.title}
              onChange={set("title")}
              placeholder="e.g. Design landing page"
              className={`input ${errors.title ? "border-rose-500/50 focus:border-rose-400/50" : ""}`}
              autoFocus
            />
            {errors.title && (
              <p className="text-xs text-rose-400 mt-1.5">{errors.title}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className={labelCls}>
              <AlignLeft size={10} className="inline mr-1.5" />
              Description
            </label>
            <textarea
              value={form.description}
              onChange={set("description")}
              placeholder="Describe the task..."
              rows={3}
              className="input resize-none"
            />
          </div>

          {/* Status + Priority */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Status</label>
              <select
                value={form.status}
                onChange={set("status")}
                className={selectCls}
              >
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>
            <div>
              <label className={labelCls}>
                <Flag size={10} className="inline mr-1.5" />
                Priority
              </label>
              <select
                value={form.priority}
                onChange={set("priority")}
                className={selectCls}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>

          {/* Due Date */}
          <div>
            <label className={labelCls}>
              <Calendar size={10} className="inline mr-1.5" />
              Due Date (optional)
            </label>
            <input
              type="date"
              value={form.dueDate}
              onChange={set("dueDate")}
              min={new Date().toISOString().split("T")[0]}
              className="input"
              style={{ colorScheme: "dark" }}
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 px-4 rounded-xl border border-white/[0.07] text-slate-400 hover:text-slate-200 hover:bg-white/[0.04] text-sm transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="btn-primary flex-1"
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 rounded-full border-2 border-sky-900/30 border-t-[#080c14] spinner inline-block" />
                  Saving...
                </>
              ) : isEdit ? (
                <>
                  <Save size={14} />
                  Update Task
                </>
              ) : (
                <>
                  <Plus size={14} />
                  Create Task
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
