import { useContext } from 'react';
import { StudyContext } from '../context/StudyContext';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'react-toastify';

export const useTasks = () => {
  const { tasks, setTasks } = useContext(StudyContext);

  // Add a new task
  const addTask = (taskData) => {
    const newTask = {
      ...taskData,
      id: uuidv4(), // Generate a random unique ID
      status: taskData.status || 'Pending'
    };
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  // Update a task's status (e.g., Pending -> Completed)
  const updateTaskStatus = (taskId, newStatus) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );
  };

  // Delete a task
  const deleteTask = (taskId) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    toast.error("Task deleted!"); // This triggers the red pop-up
  };

  return { tasks, addTask, updateTaskStatus, deleteTask };
};