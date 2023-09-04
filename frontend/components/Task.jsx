import React from 'react';

const Task = ({ task }) => {
  return (
    <div className="bg-white rounded-lg p-4 m-2 shadow-lg border border-gray-200">
      <h3 className="text-xl font-semibold text-gray-800 mb-2">{task.title}</h3>
      <p className="text-gray-600">{task.description}</p>
      <div className="mt-4 flex justify-between items-center">
        <button className="text-sm px-4 py-2 rounded-full border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white transition duration-300 ease-in-out">
          Edit
        </button>
        <button className="text-sm px-4 py-2 rounded-full border border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition duration-300 ease-in-out">
          Delete
        </button>
      </div>
    </div>
  );
};

export default Task;
