import { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDate, setEditDate] = useState("");
  const [editDetails, setEditDetails] = useState("");

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(saved);
  }, []);

  const deleteTask = (id) => {
    const updated = tasks.filter((t) => t.id !== id);
    setTasks(updated);
    localStorage.setItem("tasks", JSON.stringify(updated));
  };

  const startEdit = (task) => {
    setEditId(task.id);
    setEditTitle(task.title);
    setEditDate(task.date);
    setEditDetails(task.details);
  };

  const saveEdit = () => {
    const updated = tasks.map((t) =>
      t.id === editId
        ? {
            ...t,
            title: editTitle,
            date: editDate,
            details: editDetails,
          }
        : t
    );

    setTasks(updated);
    localStorage.setItem("tasks", JSON.stringify(updated));
    setEditId(null);
  };

  return (
    <div className="max-w-2xl mx-auto p-10">
      <h2 className="text-3xl font-black mb-6 text-[#FA8112]">
        All Tasks
      </h2>

      {tasks.map((task) => (
        <div
          key={task.id}
          className="bg-black p-5 rounded mb-5 border border-white/10"
        >
          {editId === task.id ? (
            <>
              <input
                className="w-full p-2 mb-2 rounded bg-[#111] border border-white/20"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
              />

              <input
                type="date"
                className="w-full p-2 mb-2 rounded bg-[#111] border border-white/20"
                value={editDate}
                onChange={(e) => setEditDate(e.target.value)}
              />

              <textarea
                className="w-full p-2 mb-3 rounded bg-[#111] border border-white/20"
                value={editDetails}
                onChange={(e) => setEditDetails(e.target.value)}
              />

              <button
                onClick={saveEdit}
                className="bg-green-500 text-black px-4 py-2 font-bold rounded mr-3"
              >
                Save
              </button>

              <button
                onClick={() => setEditId(null)}
                className="text-white/60"
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              {/* CLICKING THIS = DIFFERENT PORTAL */}
              <Link
                to={`${task.id}`}
                className="text-xl font-bold hover:underline"
              >
                {task.title}
              </Link>

              <p className="text-sm text-white/60">
                Due: {task.date}
              </p>

              <div className="flex gap-6 mt-4 text-sm">
                <button
                  onClick={() => startEdit(task)}
                  className="text-yellow-400"
                >
                  Edit
                </button>

                <button
                  onClick={() => deleteTask(task.id)}
                  className="text-red-400"
                >
                  Delete
                </button>
              </div>
            </>
          )}
        </div>
      ))}

      {/* TASK DETAILS PAGE RENDERS HERE */}
      <Outlet context={{ tasks }} />
    </div>
  );
}

export default Tasks;