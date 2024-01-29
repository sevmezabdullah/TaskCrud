import './App.css';
import TaskCreate from './components/TaskCreate';
import TaskList from './components/TaskList';
import React, { useContext, useEffect } from 'react';
import { TaskContext, } from './context/TaskContext';
import TaskService from './service/TaskService';

function App() {
  const { tasks, setTasks } = useContext(TaskContext)

  const createTask = async (title, taskDesc) => {
    const response = await TaskService.addTask({
      title,
      taskDesc,
      id: Date.now().toString(),
    });

    const createdTasks = [...tasks, response];
    setTasks(createdTasks);
  };
  const fetchTasks = async () => {
    const response = await TaskService.getTasks();
    setTasks(response.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const deleteTaskById = async (id) => {
    await TaskService.removeTask(id);
    const afterDeletingTasks = tasks.filter((task) => {
      return task.id !== id;
    });
    setTasks(afterDeletingTasks);
  };
  const editTaskById = async (id, updatedTitle, updatedTaskDesc) => {

    await TaskService.updateTask(id, {
      title: updatedTitle,
      taskDesc: updatedTaskDesc,
    })
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        return { id, title: updatedTitle, taskDesc: updatedTaskDesc };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  return (
    <div className="App">
      <TaskCreate onCreate={createTask} />
      <h1>Görevler</h1>
      <TaskList
        tasks={tasks}
        onDelete={deleteTaskById}
        onUpdate={editTaskById}
      />
    </div>
  );
}

export default App;
