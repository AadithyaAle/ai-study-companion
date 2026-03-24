import { useSubjects } from '../hooks/useSubjects';
import { FiCheckCircle } from 'react-icons/fi';

const RevisionList = ({ selectedDate }) => {
  const { topics, updateTopicStatus } = useSubjects();

  // Filter topics to only show those that currently need revision
  const revisionTopics = topics.filter(topic => topic.status === 'Needs Revision');

  return (
    <div style={{ 
      backgroundColor: 'white', 
      padding: '25px', 
      borderRadius: '12px', 
      boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
      flex: 1
    }}>
      <h2 style={{ fontSize: '1.2rem', margin: '0 0 20px 0', color: '#1e293b' }}>
        Revision Topics for {selectedDate.toLocaleDateString()}
      </h2>
      
      {revisionTopics.length === 0 ? (
        <p style={{ color: '#64748b' }}>No topics need revision right now. Great job!</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          {revisionTopics.map((topic) => (
            <div key={topic.id} style={{ 
              padding: '15px', 
              border: '1px solid #e2e8f0', 
              borderRadius: '8px', 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center' 
            }}>
              <div>
                <h4 style={{ margin: '0 0 5px 0', color: '#0f172a' }}>{topic.name}</h4>
                <p style={{ margin: 0, fontSize: '0.85rem', color: '#64748b' }}>{topic.notes}</p>
              </div>
              
              <button
                onClick={() => updateTopicStatus(topic.id, 'Completed')}
                style={{ 
                  padding: '8px 12px', 
                  backgroundColor: '#dcfce7', 
                  color: '#166534', 
                  border: 'none', 
                  borderRadius: '6px', 
                  cursor: 'pointer', 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '5px',
                  fontWeight: 'bold'
                }}
              >
                <FiCheckCircle size={18} /> Done
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RevisionList;