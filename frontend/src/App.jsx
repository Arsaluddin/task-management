// client/src/App.js

import React, { useState } from 'react';
import Task from '../components/Task';
import TaskForm from '../components/TaskForm';

function App() {
  const [tasks, setTasks] = useState([]);

  const addTask = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  // Filter tasks based on their status
  const todoTasks = tasks.filter((task) => task.status === 'todo');
  const doingTasks = tasks.filter((task) => task.status === 'doing');
  const doneTasks = tasks.filter((task) => task.status === 'done');

  return (
    <div className="container mx-auto mt-8">
      <TaskForm onAddTask={addTask} />
      <div className="flex flex-wrap -mx-4">
        {/* To Do Section */}
        <div className="w-full md:w-1/3 px-4">
          <div className="bg-white rounded-lg p-4 mb-4 shadow-md">
            <h2 className="text-xl font-semibold mb-2">To Do</h2>
            {/* Task cards in the 'To Do' section */}
            {todoTasks.map((task, index) => (
              <Task key={index} task={task} />
            ))}
          </div>
        </div>

        {/* Doing Section */}
        <div className="w-full md:w-1/3 px-4">
          <div className="bg-white rounded-lg p-4 mb-4 shadow-md">
            <h2 className="text-xl font-semibold mb-2">Doing</h2>
            {/* Task cards in the 'Doing' section */}
            {doingTasks.map((task, index) => (
              <Task key={index} task={task} />
            ))}
          </div>
        </div>

        {/* Done Section */}
        <div className="w-full md:w-1/3 px-4">
          <div className="bg-white rounded-lg p-4 mb-4 shadow-md">
            <h2 className="text-xl font-semibold mb-2">Done</h2>
            {/* Task cards in the 'Done' section */}
            {doneTasks.map((task, index) => (
              <Task key={index} task={task} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
