import { FiCheckCircle, FiTrash2, FiClock } from 'react-icons/fi';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

const TaskCard = ({ task, updateTaskStatus, deleteTask }) => {
  const isCompleted = task.status === 'Completed';

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      style={{
        padding: '15px 20px',
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        opacity: isCompleted ? 0.6 : 1,
        marginBottom: '10px'
      }}
    >
      <div>
        <h4 style={{ margin: '0 0 5px 0', fontSize: '1.1rem', textDecoration: isCompleted ? 'line-through' : 'none' }}>
          {task.title}
        </h4>
        <div style={{ display: 'flex', gap: '15px', fontSize: '0.85rem', color: '#64748b' }}>
          <span><strong>Subject:</strong> {task.subject}</span>
          <span><strong>Priority:</strong> {task.priority}</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <FiClock /> {new Date(task.deadline).toLocaleDateString()}
          </span>
        </div>
      </div>
      
      {/* Action Buttons */}
      <div style={{ display: 'flex', gap: '10px' }}>
        <button 
          onClick={() => updateTaskStatus(task.id, isCompleted ? 'Pending' : 'Completed')}
          style={{ padding: '8px', cursor: 'pointer', backgroundColor: isCompleted ? '#f1f5f9' : '#dcfce7', color: isCompleted ? '#64748b' : '#166534', border: 'none', borderRadius: '5px' }}
        >
          <FiCheckCircle size={18} />
        </button>
        <button 
          onClick={() => deleteTask(task.id)}
          style={{ padding: '8px', cursor: 'pointer', backgroundColor: '#fee2e2', color: '#991b1b', border: 'none', borderRadius: '5px' }}
        >
          <FiTrash2 size={18} />
        </button>
      </div>
    </motion.div>
  );
};

export default TaskCard;