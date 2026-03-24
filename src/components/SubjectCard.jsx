const SubjectCard = ({ subject }) => {
  return (
    <div style={{ 
      borderLeft: `6px solid ${subject.color}`, 
      padding: '20px', 
      backgroundColor: 'white', 
      borderRadius: '8px', 
      boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
      display: 'flex',
      flexDirection: 'column',
      gap: '8px'
    }}>
      <h3 style={{ margin: 0, fontSize: '1.25rem', color: '#1e293b' }}>{subject.name}</h3>
      <p style={{ margin: 0, color: '#64748b', fontSize: '0.9rem' }}>{subject.description}</p>
    </div>
  );
};

export default SubjectCard;