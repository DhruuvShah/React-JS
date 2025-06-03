import { Fragment, useState } from "react";
import Create from "./components/Create";
import Read from "./components/Read";
import { nanoid } from "nanoid";

const App = () => {
  const [todos, settodos] = useState([
    { id: nanoid(), title: "Go to Gym", isCompleted: false }
  ]);

  return (
    <div className="flex flex-col md:flex-row w-full min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6 md:p-10 gap-6 text-white font-sans">
      <Create todos={todos} settodos={settodos} />
      <Read todos={todos} settodos={settodos} />
    </div>
  );
};

export default App;