import React from 'react';

const Task = ({ task }) => {
  return (
    <div className="bg-white rounded-lg p-4 m-2 shadow-lg border border-gray-300 hover:shadow-xl transition duration-300">
      <h3 className="text-xl font-semibold text-gray-800 mb-2">{task.title}</h3>
      <p className="text-gray-600">{task.description}</p>
      <div className="mt-4 flex justify-end items-center">
        <button className="text-sm rounded-full bg-blue-500 text-white px-4 py-2 mr-2 hover:bg-blue-600 transition duration-300">
          Edit
        </button>
        <button className="text-sm rounded-full bg-red-500 text-white px-4 py-2 hover:bg-red-600 transition duration-300">
          Delete
        </button>
      </div>
    </div>
  );
};

export default Task;
