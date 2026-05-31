const Read = ({ todos, settodos }) => {
  const DeleteHandler = (id) => {
    const filteredtodo = todos.filter(todo => todo.id !== id);
    settodos(filteredtodo);
  };

  const rendertodos = todos.map(todo => (
    <li
      key={todo.id}
      className="mb-3 flex justify-between items-center px-4 py-3 bg-gray-900 border border-gray-700 rounded-xl hover:bg-gray-800 transition-all group shadow-sm"
    >
      <span className="text-base md:text-lg font-medium text-white tracking-wide">
        {todo.title}
      </span>
      <button
        className="text-red-400 text-sm font-semibold opacity-70 group-hover:opacity-100 hover:underline transition"
        onClick={() => DeleteHandler(todo.id)}
      >
        🗑 Delete
      </button>
    </li>
  ));

  return (
    <div className="w-full md:w-1/2 p-6 bg-gray-800 rounded-2xl shadow-xl border border-gray-700 overflow-auto">
      <h1 className="mb-6 text-3xl md:text-4xl font-bold tracking-tight">
        <span className="text-pink-400">Pending</span> Todos
      </h1>
      {todos.length === 0 ? (
        <p className="text-gray-400 italic text-sm">No tasks yet. Start by adding one!</p>
      ) : (
        <ol>{rendertodos}</ol>
      )}
    </div>
  );
};

export default Read;