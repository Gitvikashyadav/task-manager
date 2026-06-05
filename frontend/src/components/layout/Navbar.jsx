import { useState } from 'react';
import { LogOut, User, ChevronDown, Menu, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';

export default function Navbar({ onMenuToggle, menuOpen }) {
  const { user, logout } = useAuth();
  const [dropOpen, setDropOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    toast.success('Signed out successfully');
  };

  const initials = user?.name
    ?.split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <header className="sticky top-0 z-30 bg-[#080c14]/80 backdrop-blur-xl border-b border-white/[0.06]">
      <div className="flex items-center justify-between px-4 md:px-6 h-16">
        {/* Left: Logo + mobile menu */}
        <div className="flex items-center gap-3">
          <button
            onClick={onMenuToggle}
            className="lg:hidden p-2 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-white/[0.06] transition-all"
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-sky-400 to-blue-600 flex items-center justify-center shadow-[0_0_16px_rgba(56,189,248,0.3)]">
              <span className="font-display font-black text-xs text-[#080c14]">TF</span>
            </div>
            <span className="font-display font-bold text-base text-slate-100 hidden sm:block">
              Task<span className="text-sky-400">Flow</span>
            </span>
          </div>
        </div>

        {/* Right: User menu */}
        <div className="relative">
          <button
            onClick={() => setDropOpen((p) => !p)}
            className="flex items-center gap-2.5 py-1.5 px-3 rounded-xl hover:bg-white/[0.06] transition-all"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-sky-400/20 to-blue-600/20 border border-sky-400/20 flex items-center justify-center">
              <span className="font-display font-bold text-xs text-sky-400">{initials}</span>
            </div>
            <div className="hidden sm:block text-left">
              <p className="text-sm font-medium text-slate-200 leading-tight">{user?.name}</p>
              <p className="text-xs text-slate-500 leading-tight">{user?.email}</p>
            </div>
            <ChevronDown size={14} className={`text-slate-500 transition-transform ${dropOpen ? 'rotate-180' : ''}`} />
          </button>

          {dropOpen && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setDropOpen(false)} />
              <div className="absolute right-0 top-full mt-2 w-52 bg-[#111827] border border-white/[0.07] rounded-xl shadow-2xl py-1.5 z-50 animate-scaleIn">
                <div className="px-4 py-2.5 border-b border-white/[0.06]">
                  <p className="text-xs font-semibold text-slate-300">{user?.name}</p>
                  <p className="text-xs text-slate-500 truncate">{user?.email}</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-rose-400 hover:bg-rose-500/10 transition-colors"
                >
                  <LogOut size={14} />
                  Sign out
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}