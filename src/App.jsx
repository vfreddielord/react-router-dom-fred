import { Link, Outlet } from "react-router-dom";

function App() {
  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white">
      <nav className="flex gap-8 p-6 bg-[#141414] border-b border-white/10">
        <Link to="/" className="font-black text-xl text-[#FA8112]">
          Task App
        </Link>
        <Link to="/tasks" className="hover:text-[#FA8112]">
          All Tasks
        </Link>
      </nav>

      <Outlet />
    </div>
  );
}

export default App;