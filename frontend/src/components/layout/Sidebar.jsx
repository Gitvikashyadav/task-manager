import { LayoutDashboard, CheckCircle2, Clock, CircleDot, Trash2 } from 'lucide-react';

const NAV = [
  { label: 'All Tasks', value: '', icon: LayoutDashboard },
  { label: 'Pending', value: 'pending', icon: Clock },
  { label: 'In Progress', value: 'in-progress', icon: CircleDot },
  { label: 'Completed', value: 'completed', icon: CheckCircle2 },
];

export default function Sidebar({ stats, activeStatus, onStatusChange, onClearCompleted, isOpen, onClose }) {
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-20 bg-black/50 lg:hidden" onClick={onClose} />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed top-16 left-0 bottom-0 z-20 w-64 bg-[#0d1421] border-r border-white/[0.06] 
        flex flex-col transition-transform duration-300
        lg:translate-x-0 lg:static lg:top-auto
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex-1 overflow-y-auto py-4 px-3">
          <p className="text-[10px] font-semibold text-slate-600 uppercase tracking-widest mb-2 px-3">Navigation</p>
          <nav className="space-y-0.5">
            {NAV.map(({ label, value, icon: Icon }) => {
              const count = value === '' ? stats.total : (stats[value] ?? 0);
              const isActive = activeStatus === value;
              return (
                <button
                  key={value}
                  onClick={() => { onStatusChange(value); onClose(); }}
                  className={`w-full flex items-center justify-between gap-3 px-3 py-2.5 rounded-xl text-sm transition-all ${
                    isActive
                      ? 'bg-sky-400/10 text-sky-400 font-medium'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon size={16} />
                    {label}
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                    isActive ? 'bg-sky-400/20 text-sky-400' : 'bg-white/[0.06] text-slate-500'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </nav>

          {stats.completed > 0 && (
            <div className="mt-6 px-3">
              <div className="h-px bg-white/[0.06] mb-4" />
              <button
                onClick={() => { onClearCompleted(); onClose(); }}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-rose-400/80 hover:text-rose-400 hover:bg-rose-500/10 transition-all"
              >
                <Trash2 size={15} />
                Clear completed ({stats.completed})
              </button>
            </div>
          )}
        </div>

        {/* Stats summary */}
        <div className="p-4 border-t border-white/[0.06]">
          <div className="bg-[#111827] rounded-xl p-4 border border-white/[0.06]">
            <p className="text-xs text-slate-500 mb-3 font-medium">Progress</p>
            <div className="flex items-center gap-2 mb-2">
              <div className="flex-1 h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-sky-400 to-blue-500 rounded-full transition-all duration-500"
                  style={{ width: stats.total > 0 ? `${(stats.completed / stats.total) * 100}%` : '0%' }}
                />
              </div>
              <span className="text-xs text-slate-400 font-medium">
                {stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0}%
              </span>
            </div>
            <p className="text-xs text-slate-600">
              {stats.completed} of {stats.total} completed
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}