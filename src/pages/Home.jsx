import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [task, setTask] = useState({ title: "", details: "", date: "" });
  const navigate = useNavigate();

  const handleCreate = (e) => {
    e.preventDefault();
    if (!task.title) return;
    const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    const newTask = { ...task, id: Date.now(), completed: false };
    localStorage.setItem("tasks", JSON.stringify([newTask, ...tasks]));
    navigate("/tasks");
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <div className="flex items-center gap-4 mb-10 border-l-8 border-red-600 pl-6">
        <h1 className="text-6xl font-black tracking-tighter text-white italic uppercase">
          New <span className="text-red-600">Entry</span>
        </h1>
      </div>

      <form onSubmit={handleCreate} className="bg-[#111] border border-white/5 p-10 rounded-[32px] shadow-2xl">
        <div className="grid gap-8">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-red-600 uppercase tracking-widest">Objective</label>
            <input 
              type="text" 
              placeholder="What is the mission?" 
              className="w-full bg-black border border-white/10 p-4 rounded-lg text-white font-bold focus:border-red-600 outline-none transition-all"
              onChange={(e) => setTask({...task, title: e.target.value})}
              required
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-[10px] font-black text-red-600 uppercase tracking-widest">Detailed Intel</label>
            <textarea 
              placeholder="Provide context..." 
              className="w-full bg-black border border-white/10 p-4 h-32 rounded-lg text-sm text-slate-400 resize-none focus:border-red-600 outline-none transition-all"
              onChange={(e) => setTask({...task, details: e.target.value})}
            />
          </div>

          <div className="flex flex-col md:flex-row gap-4 items-end">
            <div className="flex-1 w-full space-y-2">
              <input 
                type="date" 
                className="w-full bg-black border border-white/10 p-4 rounded-lg text-white text-sm focus:border-red-600 outline-none"
                onChange={(e) => setTask({...task, date: e.target.value})}
              />
            </div>
            <button className="w-full md:w-auto px-12 py-4 bg-red-600 text-white text-sm font-black rounded-xl hover:bg-red-700 transition-all shadow-lg shadow-red-600/20 uppercase tracking-widest">
              Deploy Task
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}