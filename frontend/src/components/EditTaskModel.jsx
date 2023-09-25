import React, { useState } from 'react';
import Modal from 'react-modal';

const modalStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    maxWidth: '400px',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    backgroundColor: '#fff',
  },
};

const EditTaskModal = ({ isOpen, onRequestClose, task, onSave }) => {
  const [editedTitle, setEditedTitle] = useState(task ? task.title : ''); // Null check
  const [editedDescription, setEditedDescription] = useState(task ? task.description : ''); // Null check

  const handleSave = () => {
    if (!task) {
      // Task is null, handle accordingly
      return;
    }

    const editedTask = {
      ...task,
      
      title: editedTitle,
      description: editedDescription,
      
    };

    onSave(editedTask);
    onRequestClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={modalStyles}
      contentLabel="Edit Task Modal"
    >
      <h2 className="text-xl font-semibold mb-4">Edit Task</h2>
      <input
        type="text"
        value={editedTitle}
        onChange={(e) => setEditedTitle(e.target.value)}
        placeholder="Task Title"
        className="w-full border rounded py-2 px-3 mb-3"
      />
      <textarea
        value={editedDescription}
        onChange={(e) => setEditedDescription(e.target.value)}
        placeholder="Task Description"
        className="w-full border rounded py-2 px-3 mb-4"
        rows="4"
      />
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
        >
          Save
        </button>
        <button
          onClick={onRequestClose}
          className="bg-gray-400 text-white px-4 py-2 rounded ml-3 hover:bg-gray-500 transition duration-300"
        >
          Cancel
        </button>
      </div>
    </Modal>
  );
};

export default EditTaskModal;
