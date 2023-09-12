import React, { useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import Task from './components/Task';
import TaskForm from './components/TaskForm';

function App() {
  const [tasks, setTasks] = useState([]);

  const addTask = (newTask) => {
    const newTaskWithId = {
      ...newTask,
      id: new Date().getTime().toString(), // Replace with your unique ID generation logic
    };
    setTasks([...tasks, newTaskWithId]);
  };

  const todoTasks = tasks.filter((task) => task.status === 'todo');
  const doingTasks = tasks.filter((task) => task.status === 'doing');
  const doneTasks = tasks.filter((task) => task.status === 'done');

  // const onDragEnd = (result) => {
  //   if (!result.destination) return;

  //   const updatedTasks = [...tasks];
  //   const [movedTask] = updatedTasks.splice(result.source.index, 1);
  //   updatedTasks.splice(result.destination.index, 0, movedTask);

  //   setTasks(updatedTasks);
  // };

  const onDragEnd = (result) => {
    if (!result.destination) return;
  
    const updatedTasks = [...tasks];
    const movedTask = updatedTasks.find((task) => task.id === result.draggableId);
  
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
                    <Draggable key={task.id} draggableId={task.id} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <Task task={task} />
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
                    <Draggable key={task.id} draggableId={task.id} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <Task task={task} />
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
                    <Draggable key={task.id} draggableId={task.id} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <Task task={task} />
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
    </div>
  );
}

export default App;
