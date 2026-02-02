import { useParams, useOutletContext, Link } from "react-router-dom";

function TaskDetails() {
  const { id } = useParams();
  const { tasks } = useOutletContext();

  const task = tasks.find((t) => t.id === Number(id));

  if (!task) {
    return <p className="text-red-400 mt-6">Task not found</p>;
  }

  return (
    <div className="mt-12 p-8 bg-[#141414] rounded border border-white/10">
      <Link to="/tasks" className="text-sm text-[#FA8112]">
        ← Back to All Tasks
      </Link>

      <h3 className="text-3xl font-black text-[#FA8112] mt-4">
        {task.title}
      </h3>

      <p className="text-sm text-white/60 mt-2">
        Due Date: {task.date}
      </p>

      <p className="mt-6 text-white leading-relaxed">
        {task.details}
      </p>
    </div>
  );
}

export default TaskDetails;