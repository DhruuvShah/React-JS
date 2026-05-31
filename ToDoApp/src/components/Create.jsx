import { nanoid } from "nanoid";
import { useState } from "react";

const Create = ({ todos, settodos }) => {
  const [title, settitle] = useState("");

  const SubmitHandler = (e) => {
    e.preventDefault();
    const newtodo = {
      id: nanoid(),
      title,
      isCompleted: false
    };
    settodos([...todos, newtodo]);
    settitle("");
  };

  return (
    <div className="w-full md:w-1/2 p-6 bg-gray-800 rounded-2xl shadow-xl border border-gray-700">
      <h1 className="mb-6 text-3xl md:text-4xl font-bold tracking-tight">
        Set <span className="text-red-400">Reminders</span> for tasks
      </h1>
      <form onSubmit={SubmitHandler} className="space-y-5">
        <div>
          <label className="block text-sm mb-1 font-medium text-gray-300">Task Title</label>
          <input
            className="w-full px-4 py-3 rounded-lg bg-gray-100 text-gray-900 text-base focus:outline-none focus:ring-2 focus:ring-red-400 shadow-sm"
            onChange={(e) => settitle(e.target.value)}
            value={title}
            type="text"
            placeholder="e.g. Buy groceries"
          />
        </div>
        <button
          type="submit"
          className="w-full py-3 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white rounded-lg font-semibold transition-all shadow-lg"
        >
          ➕ Add Task
        </button>
      </form>
    </div>
  );
};

export default Create;