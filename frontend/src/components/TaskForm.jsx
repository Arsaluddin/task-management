// client/src/components/TaskForm.js

import React, { useState } from 'react';

const TaskForm = ({ onAddTask }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleAddTask = () => {
    // Create a new task object
    const newTask = {
      title,
      description,
      status: 'todo', // Set the initial status to 'todo'
    };

    // Call the onAddTask callback to add the task
    onAddTask(newTask);

    // Clear the input fields
    setTitle('');
    setDescription('');
  };

  return (
    <div className="bg-white rounded-lg p-4 m-4 shadow-md">
      <h2 className="text-xl font-semibold mb-2">Add Task</h2>
      <input
        type="text"
        placeholder="Task title"
        className="border rounded px-2 py-1 mb-2 w-full"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Task description"
        className="border rounded px-2 py-1 mb-2 w-full"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button
        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
        onClick={handleAddTask}
      >
        Add Task
      </button>
    </div>
  );
};

export default TaskForm;
