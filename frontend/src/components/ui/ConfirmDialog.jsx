import { AlertTriangle, X } from 'lucide-react';

export default function ConfirmDialog({ isOpen, onClose, onConfirm, title, message, confirmText = 'Delete', loading = false }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-[#111827] border border-white/[0.07] rounded-2xl p-6 w-full max-w-sm shadow-2xl animate-scaleIn">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-rose-500/10 flex items-center justify-center flex-shrink-0">
            <AlertTriangle size={18} className="text-rose-400" />
          </div>
          <div className="flex-1">
            <h3 className="font-display font-bold text-slate-100 mb-1">{title}</h3>
            <p className="text-sm text-slate-400">{message}</p>
          </div>
          <button onClick={onClose} className="text-slate-600 hover:text-slate-400 transition-colors">
            <X size={16} />
          </button>
        </div>
        <div className="flex gap-3 mt-6">
          <button onClick={onClose} className="flex-1 py-2.5 px-4 rounded-xl border border-white/[0.07] text-slate-400 hover:text-slate-200 hover:bg-white/[0.04] text-sm transition-all">
            Cancel
          </button>
          <button onClick={onConfirm} disabled={loading} className="flex-1 py-2.5 px-4 rounded-xl bg-rose-500 hover:bg-rose-400 text-white font-semibold text-sm transition-all disabled:opacity-50">
            {loading ? 'Deleting...' : confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}