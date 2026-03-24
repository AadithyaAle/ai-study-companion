import { FiTrash2 } from 'react-icons/fi';
import { useContext } from 'react';
import { StudyContext } from '../context/StudyContext';
import { toast } from 'react-toastify';

const SubjectCard = ({ subject }) => {
  const { deleteSubject } = useContext(StudyContext);

  const handleDelete = () => {
    if (window.confirm(`Delete ${subject.name}? This will also remove related tasks.`)) {
      deleteSubject(subject.id);
      toast.error(`${subject.name} removed.`);
    }
  };

  return (
    <div style={{ 
      borderLeft: `4px solid ${subject.color}`, 
      padding: '25px', 
      backgroundColor: 'var(--bg-card)', 
      borderRadius: '12px', 
      border: '1px solid var(--border-color)',
      position: 'relative' // Added for positioning the trash icon
    }}>
      <button 
        onClick={handleDelete}
        style={{ position: 'absolute', top: '15px', right: '15px', background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
      >
        <FiTrash2 size={18} />
      </button>

      <h3 style={{ margin: '0 0 10px 0', fontSize: '1.2rem', color: 'var(--text-main)' }}>{subject.name}</h3>
      <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.9rem' }}>{subject.description}</p>
    </div>
  );
};

export default SubjectCard;