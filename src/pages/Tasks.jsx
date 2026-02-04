import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ title: "", details: "" });

  useEffect(() => setTasks(JSON.parse(localStorage.getItem("tasks") || "[]")), []);

  const saveTasks = (updated) => {
    setTasks(updated);
    localStorage.setItem("tasks", JSON.stringify(updated));
  };

  const deleteTask = (id) => saveTasks(tasks.filter(t => t.id !== id));
  const startEdit = (t) => { setEditingId(t.id); setEditForm({ title: t.title, details: t.details }); };
  const saveEdit = (id) => { saveTasks(tasks.map(t => t.id === id ? { ...t, ...editForm } : t)); setEditingId(null); };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="flex items-end justify-between mb-12 border-l-4 border-red-600 pl-6">
        <div>
          <h2 className="text-4xl font-black text-white italic uppercase tracking-tighter">Active Feed</h2>
          <p className="text-slate-500 uppercase tracking-[0.3em] text-[10px] mt-1 font-bold italic">Dashboard</p>
        </div>
        <div className="text-right">
          <span className="text-5xl font-black text-red-600 italic">{tasks.length}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tasks.map(t => (
          <div key={t.id} className={`group bg-[#0a0a0a] border ${editingId === t.id ? 'border-red-600' : 'border-white/5'} p-8 rounded-[32px] transition-all relative overflow-hidden`}>
            
            <div className="absolute top-4 right-4 flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
              <button onClick={() => startEdit(t)} className="text-red-500 p-1 hover:scale-110 transition-transform"><svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg></button>
              <button onClick={() => deleteTask(t.id)} className="text-neutral-600 p-1 hover:text-red-600 transition-colors"><svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg></button>
            </div>

            {editingId === t.id ? (
              <div className="space-y-4">
                <input className="w-full bg-black border border-red-600/30 rounded-xl px-4 py-2 text-white font-bold" value={editForm.title} onChange={e => setEditForm({...editForm, title: e.target.value})} />
                <textarea className="w-full bg-black border border-red-600/30 rounded-xl px-4 py-2 text-slate-400 text-sm h-24 resize-none" value={editForm.details} onChange={e => setEditForm({...editForm, details: e.target.value})} />
                <button onClick={() => saveEdit(t.id)} className="w-full bg-red-600 text-white font-black text-[10px] uppercase py-2 rounded-lg">Save Changes</button>
              </div>
            ) : (
              <>
                <span className="text-[10px] font-black text-red-600 mb-4 block tracking-widest uppercase italic italic">due date:  {t.date || 'TBD'}</span>
                <Link to={`/tasks/${t.id}`} className={`text-xl font-black block mb-4 uppercase italic tracking-tight leading-none ${t.completed ? 'line-through text-white/10' : 'text-white group-hover:text-red-500'}`}>
                  {t.title}
                </Link>
                <p className={`text-sm line-clamp-2 leading-relaxed mb-6 ${t.completed ? 'text-white/5' : 'text-slate-500 font-medium'}`}>
                  {t.details || "No additional intel."}
                </p>
                <Link to={`/tasks/${t.id}`} className={`inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] ${t.completed ? 'text-neutral-800' : 'text-red-600 group-hover:gap-4'} transition-all`}>
                  Inspect Intel <span>→</span>
                </Link>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}