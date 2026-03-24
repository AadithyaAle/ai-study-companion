import { useState } from 'react';
import { useTasks } from '../hooks/useTasks';
import TaskCard from '../components/TaskCard';
import AddTaskForm from '../components/AddTaskForm';

const Tasks = () => {
  const { tasks, updateTaskStatus, deleteTask } = useTasks();
  const [activeTab, setActiveTab] = useState('All');
  
  // This state controls whether the form is visible or hidden
  const [showForm, setShowForm] = useState(false);

  const tabs = ['All', 'Pending', 'Completed', 'Overdue'];

  const priorityOrder = { 'High': 1, 'Medium': 2, 'Low': 3 };

  const filteredTasks = tasks
  .filter((task) => {
    if (activeTab === 'All') return true;
    return task.status === activeTab;
  })
  // Sort them so High is always at the top
  .sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);

  

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h1 style={{ fontSize: '1.8rem', color: '#0f172a', margin: 0 }}>Study Tasks</h1>
        
        {/* The button that toggles the form */}
        <button 
          onClick={() => setShowForm(!showForm)}
          style={{ padding: '10px 15px', backgroundColor: '#3b82f6', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}
        >
          {showForm ? 'Close Form' : '+ Create Task'}
        </button>
      </div>

      {/* The form will render right here when showForm is true */}
      {showForm && <AddTaskForm onClose={() => setShowForm(false)} />}

      {/* Tabs Navigation */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', borderBottom: '2px solid #e2e8f0', paddingBottom: '10px' }}>
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              padding: '8px 16px',
              border: 'none',
              backgroundColor: activeTab === tab ? '#e0f2fe' : 'transparent',
              color: activeTab === tab ? '#0369a1' : '#64748b',
              fontWeight: activeTab === tab ? 'bold' : 'normal',
              borderRadius: '20px',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Task List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task) => (
            <TaskCard 
              key={task.id} 
              task={task} 
              updateTaskStatus={updateTaskStatus} 
              deleteTask={deleteTask} 
            />
          ))
        ) : (
          <p style={{ color: '#64748b', textAlign: 'center', marginTop: '40px' }}>
            No tasks found for "{activeTab}".
          </p>
        )}
      </div>
    </div>
  );
};

export default Tasks;