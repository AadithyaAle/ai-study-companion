import { useContext } from 'react';
import { StudyContext } from '../context/StudyContext';

export const useProgress = () => {
  const { tasks } = useContext(StudyContext);

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.status === 'Completed').length;
  const pendingTasks = tasks.filter((task) => task.status === 'Pending').length;
  const overdueTasks = tasks.filter((task) => task.status === 'Overdue').length;

  // Calculate percentage (avoiding division by zero)
  const completionPercentage = totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

  return {
    totalTasks,
    completedTasks,
    pendingTasks,
    overdueTasks,
    completionPercentage,
  };
};