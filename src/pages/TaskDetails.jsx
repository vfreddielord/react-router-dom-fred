import { useParams, Link } from "react-router-dom";
import { useState } from "react";

export default function TaskDetails() {
  const { id } = useParams();
  const [tasks, setTasks] = useState(JSON.parse(localStorage.getItem("tasks")) || []);
  const taskIndex = tasks.findIndex((t) => t.id === Number(id));
  const task = tasks[taskIndex];

  if (!task) return <div className="p-20 text-center text-red-600 font-black">INTEL_NOT_FOUND</div>;

  const toggleComplete = () => {
    const updatedTasks = [...tasks];
    updatedTasks[taskIndex].completed = !updatedTasks[taskIndex].completed;
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  return (
    <div className="max-w-2xl mx-auto px-6 py-20">
      <Link to="/tasks" className="text-red-600 text-[10px] font-black tracking-[0.3em] mb-12 inline-block hover:underline italic">
        ← BACK TO DASHBOARD
      </Link>

      <div className="bg-[#0a0a0a] border border-white/10 rounded-[40px] p-12 shadow-2xl relative overflow-hidden">
        <div className={`absolute top-0 left-0 w-full h-2 transition-all duration-500 ${task.completed ? 'bg-red-900/20' : 'bg-red-600 shadow-[0_0_15px_rgba(220,38,38,0.5)]'}`}></div>
        
        <div className="space-y-8">
          <div className="flex justify-between items-center">
            <span className="text-[10px] font-black tracking-[0.3em] text-red-600 uppercase italic">Objective Details</span>
            <button 
              onClick={toggleComplete}
              className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all 
                ${task.completed ? 'bg-red-600 text-white' : 'bg-white/5 text-red-600 border border-red-600/20 hover:bg-red-600/10'}`}
            >
              {task.completed ? '✓ SEALED' : '○ SEAL LOG'}
            </button>
          </div>

          <h1 className={`text-2xl font-bold italic transition-all duration-700 
            ${task.completed ? 'line-through text-white/10' : 'text-white'}`}>
            {task.title}
          </h1>

          <div className="h-px bg-white/5 w-full"></div>

          <div className="space-y-2">
            <span className="text-[10px] font-black text-red-600/30 uppercase tracking-[0.3em]">Decoded Intel</span>
            <p className={`text-lg leading-relaxed transition-colors duration-700 ${task.completed ? 'text-white/5' : 'text-slate-400 font-medium'}`}>
              {task.details || "No metadata recorded."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}