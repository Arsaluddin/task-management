import React, { useEffect, useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import Task from './components/Task';
import TaskForm from './components/TaskForm';
import EditTaskModal from './components/EditTaskModel';
import Modal from 'react-modal';
import axios from 'axios';



function App() {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  // const [editingTask, setEditingTask] = useState({ title: '', description: '' });

  useEffect(async() => {
     
   const res = await axios.get('http://localhost:5000/tasks');
  //  console.log(res.data)
   setTasks(res.data)

  },[]);

  const addTask = async(newTask) => {
    
 
     await axios.post('http://localhost:5000/tasks',newTask);
     const res = await axios.get('http://localhost:5000/tasks');
    const newTaskWithId = {
      ...newTask,
       id: res.data[Array.length-1]._id,
      // id: new Date().getTime().toString(), // Replace with your unique ID generation logic
    };
     console.log(tasks)
    setTasks([...tasks, newTaskWithId]);
  };
  
  const todoTasks = tasks.filter((task) => task.status === 'todo');
  const doingTasks = tasks.filter((task) => task.status === 'doing');
  const doneTasks = tasks.filter((task) => task.status === 'done');

    // Function to handle task deletion
    const handleDeleteTask = async(taskId) => {
      // Filter out the task with the given taskId
      const updatedTasks = tasks.filter((task) => task._id !== taskId);
        await axios.delete(`http://localhost:5000/tasks/${taskId}`);
      setTasks(updatedTasks);
    };
  
    // Function to handle task editing (you can implement this functionality)
    const handleEditTask = (taskId) => {
      // Find the task to edit based on the taskId
      const taskToEdit = tasks.find((task) => task._id === taskId);
      
      // Set the editingTask state to the task to be edited
      setEditingTask(taskToEdit);
    };
    
      // Function to save the edited task
  const handleSaveEditedTask = async(editedTask) => {
    const updatedTasks = tasks.map(async(task) =>
      task._id === editedTask._id ? await axios.put(`http://localhost:5000/tasks/${task._id}`,editedTask) : task
    );
    setTasks(updatedTasks);
  };


  const onDragEnd = (result) => {
    if (!result.destination) return;
  
    const updatedTasks = [...tasks];
    const movedTask = updatedTasks.find((task) => task._id === result.draggableId);
  
    // Update the status of the moved task based on the destination droppable
    if (result.destination.droppableId === 'todo') {
      movedTask.status = 'todo';
    } else if (result.destination.droppableId === 'doing') {
      movedTask.status = 'doing';
    } else if (result.destination.droppableId === 'done') {
      movedTask.status = 'done';
    }
  
    // Update the tasks array
    setTasks(updatedTasks);
  };
  

  return (
    <div className="container mx-auto mt-8">
      <TaskForm onAddTask={addTask} />
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex flex-wrap -mx-4">
          {/* To Do Section */}
          <Droppable droppableId="todo">
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="w-full md:w-1/3 px-4"
              >
                <div className="bg-white rounded-lg p-4 mb-4 shadow-md">
                  <h2 className="text-xl font-semibold mb-2">To Do</h2>
                  {todoTasks.map((task, index) => (
                    <Draggable key={task.id} draggableId={task._id} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <Task
                            task={task}
                            onDeleteTask={handleDeleteTask}
                            onEditTask={handleEditTask}
                          />
                        </div>
                      )}
                    </Draggable>
                  ))}
                </div>
                {provided.placeholder}
              </div>
            )}
          </Droppable>

          {/* Doing Section */}
          <Droppable droppableId="doing">
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="w-full md:w-1/3 px-4"
              >
                <div className="bg-white rounded-lg p-4 mb-4 shadow-md">
                  <h2 className="text-xl font-semibold mb-2">Doing</h2>
                  {doingTasks.map((task, index) => (
                    <Draggable key={task.id} draggableId={task._id} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <Task
                            task={task}
                            onDeleteTask={handleDeleteTask}
                            onEditTask={handleEditTask}
                          />
                        </div>
                      )}
                    </Draggable>
                  ))}
                </div>
                {provided.placeholder}
              </div>
            )}
          </Droppable>

          {/* Done Section */}
          <Droppable droppableId="done">
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="w-full md:w-1/3 px-4"
              >
                <div className="bg-white rounded-lg p-4 mb-4 shadow-md">
                  <h2 className="text-xl font-semibold mb-2">Done</h2>
                  {doneTasks.map((task, index) => (
                    <Draggable key={task.id} draggableId={task._id} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <Task
                            task={task}
                            onDeleteTask={handleDeleteTask}
                            onEditTask={handleEditTask}
                          />
                        </div>
                      )}
                    </Draggable>
                  ))}
                </div>
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      </DragDropContext>

      <Modal
        isOpen={!!editingTask}
        onRequestClose={() => setEditingTask(null)}
        ariaHideApp={false}
      >
        <EditTaskModal
          isOpen={editingTask !== null}
          onRequestClose={() => setEditingTask(null)}
          task={editingTask}
          onSave={handleSaveEditedTask}
        />
      </Modal>
    </div>
  );
}

export default App;
