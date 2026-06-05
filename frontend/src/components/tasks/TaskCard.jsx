import { Clock, Calendar, MoreVertical, Pencil, Trash2, CheckCircle2, CircleDot, Circle } from 'lucide-react';
import { useState } from 'react';

const STATUS_CONFIG = {
  pending: {
    label: 'Pending',
    icon: Circle,
    bg: 'bg-amber-500/10',
    text: 'text-amber-400',
    border: 'border-amber-500/20',
    dot: 'bg-amber-400',
  },
  'in-progress': {
    label: 'In Progress',
    icon: CircleDot,
    bg: 'bg-sky-500/10',
    text: 'text-sky-400',
    border: 'border-sky-500/20',
    dot: 'bg-sky-400',
  },
  completed: {
    label: 'Completed',
    icon: CheckCircle2,
    bg: 'bg-emerald-500/10',
    text: 'text-emerald-400',
    border: 'border-emerald-500/20',
    dot: 'bg-emerald-400',
  },
};

const PRIORITY_CONFIG = {
  high: { label: 'High', bg: 'bg-rose-500/10', text: 'text-rose-400', bar: 'bg-rose-400' },
  medium: { label: 'Medium', bg: 'bg-amber-500/10', text: 'text-amber-400', bar: 'bg-amber-400' },
  low: { label: 'Low', bg: 'bg-emerald-500/10', text: 'text-emerald-400', bar: 'bg-emerald-400' },
};

export default function TaskCard({ task, onEdit, onDelete, onToggle }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const status = STATUS_CONFIG[task.status];
  const priority = PRIORITY_CONFIG[task.priority];
  const StatusIcon = status.icon;

  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && task.status !== 'completed';

  const formatDate = (d) =>
    new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

  return (
    <div className={`card p-5 flex flex-col gap-3 hover:border-white/[0.12] transition-all group animate-fadeIn relative ${task.status === 'completed' ? 'opacity-75' : ''}`}>
      {/* Priority indicator bar */}
      <div className={`absolute top-0 left-0 w-1 h-full ${priority.bar} rounded-l-2xl opacity-60`} />

      {/* Header */}
      <div className="flex items-start justify-between gap-3 pl-2">
        <div className="flex-1 min-w-0">
          <h3 className={`font-display font-semibold text-sm text-slate-100 leading-snug mb-1 ${task.status === 'completed' ? 'line-through text-slate-400' : ''}`}>
            {task.title}
          </h3>
          {task.description && (
            <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">{task.description}</p>
          )}
        </div>

        {/* Menu */}
        <div className="relative flex-shrink-0">
          <button
            onClick={() => setMenuOpen((p) => !p)}
            className="p-1.5 rounded-lg text-slate-600 hover:text-slate-300 hover:bg-white/[0.06] transition-all opacity-0 group-hover:opacity-100"
          >
            <MoreVertical size={14} />
          </button>
          {menuOpen && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setMenuOpen(false)} />
              <div className="absolute right-0 top-full mt-1 w-36 bg-[#1e293b] border border-white/[0.07] rounded-xl shadow-xl z-20 py-1 animate-scaleIn">
                <button
                  onClick={() => { onEdit(task); setMenuOpen(false); }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-slate-300 hover:bg-white/[0.06] hover:text-slate-100 transition-colors"
                >
                  <Pencil size={12} /> Edit task
                </button>
                <button
                  onClick={() => { onDelete(task._id); setMenuOpen(false); }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-rose-400 hover:bg-rose-500/10 transition-colors"
                >
                  <Trash2 size={12} /> Delete
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Badges */}
      <div className="flex items-center gap-2 pl-2 flex-wrap">
        <span className={`inline-flex items-center gap-1.5 text-[11px] font-medium px-2.5 py-1 rounded-full ${status.bg} ${status.text} border ${status.border}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
          {status.label}
        </span>
        <span className={`inline-flex items-center gap-1 text-[11px] font-medium px-2.5 py-1 rounded-full ${priority.bg} ${priority.text}`}>
          {priority.label}
        </span>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pl-2 pt-1 border-t border-white/[0.04]">
        <div className="flex items-center gap-1 text-[11px] text-slate-600">
          <Clock size={11} />
          {formatDate(task.createdAt)}
        </div>
        {task.dueDate && (
          <div className={`flex items-center gap-1 text-[11px] ${isOverdue ? 'text-rose-400' : 'text-slate-500'}`}>
            <Calendar size={11} />
            Due {formatDate(task.dueDate)}
          </div>
        )}
      </div>

      {/* Toggle status button */}
      <button
        onClick={() => onToggle(task._id)}
        className={`w-full flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-medium transition-all ${
          task.status === 'completed'
            ? 'bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20'
            : task.status === 'in-progress'
            ? 'bg-sky-500/10 text-sky-400 hover:bg-sky-500/20'
            : 'bg-white/[0.04] text-slate-400 hover:bg-white/[0.08] hover:text-slate-200'
        }`}
      >
        <StatusIcon size={12} />
        {task.status === 'pending' ? 'Start task' : task.status === 'in-progress' ? 'Mark complete' : 'Mark pending'}
      </button>
    </div>
  );
}