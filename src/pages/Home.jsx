import { useState } from "react";

function Home() {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [details, setDetails] = useState("");

  const addTask = () => {
    if (!title || !date || !details) return;

    const newTask = {
      id: Date.now(),
      title,
      date,
      details,
    };

    const saved = JSON.parse(localStorage.getItem("tasks")) || [];
    localStorage.setItem("tasks", JSON.stringify([newTask, ...saved]));

    setTitle("");
    setDate("");
    setDetails("");
  };

  return (
    <div className="max-w-2xl mx-auto p-10">
      <h1 className="text-4xl font-black mb-8 text-[#FA8112]">
        Create Task
      </h1>

      <div className="space-y-6">
        <input
          className="w-full p-4 rounded bg-black border border-white/20"
          placeholder="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          type="date"
          className="w-full p-4 rounded bg-black border border-white/20"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <textarea
          className="w-full p-4 rounded bg-black border border-white/20 h-32"
          placeholder="Task Details"
          value={details}
          onChange={(e) => setDetails(e.target.value)}
        />

        <button
          onClick={addTask}
          className="w-full bg-[#FA8112] text-black font-black py-4 rounded hover:bg-orange-400"
        >
          ADD TASK
        </button>
      </div>
    </div>
  );
}

export default Home;