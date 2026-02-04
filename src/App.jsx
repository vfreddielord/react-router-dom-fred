import { Link, Outlet, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export default function App() {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <div className="min-h-screen bg-black text-slate-200 font-sans selection:bg-red-500/30 overflow-x-hidden" data-theme="black">
      {/* Glamorous Red/Gold Glows */}
      <div className="fixed top-[-10%] left-[-10%] w-[50%] h-[50%] bg-red-600/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-amber-900/10 blur-[120px] rounded-full pointer-events-none" />

      <header className="sticky top-0 z-[100] w-full border-b border-white/5 bg-black/60 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <motion.div 
              whileHover={{ rotate: 180 }}
              className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center shadow-[0_0_20px_rgba(220,38,38,0.4)]"
            >
              <span className="text-white font-black text-xl italic">T</span>
            </motion.div>
            <span className="text-2xl font-black tracking-tighter text-white uppercase italic">Task<span className="text-red-600">Flow</span></span>
          </Link>

          <nav className="hidden md:flex items-center gap-1 bg-neutral-900 p-1 rounded-2xl border border-white/10">
            <Link to="/" className={`px-6 py-2 rounded-xl text-xs font-black uppercase transition-all ${isActive("/") ? "bg-red-600 text-white shadow-lg" : "text-neutral-500 hover:text-white"}`}>Home</Link>
            <Link to="/tasks" className={`px-6 py-2 rounded-xl text-xs font-black uppercase transition-all ${isActive("/tasks") ? "bg-red-600 text-white shadow-lg" : "text-neutral-500 hover:text-white"}`}>Dashboard</Link>
          </nav>

          <div className="badge border-red-600/50 text-red-500 font-black text-[10px] p-3 gap-2 bg-transparent">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600"></span>
            </span>
            SYSTEM ONLINE
          </div>
        </div>
      </header>

      <main className="relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}