import { useState } from 'react';
import { useSubjects } from '../hooks/useSubjects';
import SubjectCard from '../components/SubjectCard';
import AddSubjectForm from '../components/AddSubjectForm';

const Subjects = () => {
  const { subjects } = useSubjects();
  const [showForm, setShowForm] = useState(false);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h1 style={{ fontSize: '1.8rem', color: 'var(--text-main)', margin: 0 }}>My Subjects</h1>
        <button 
          onClick={() => setShowForm(!showForm)}
          style={{ padding: '10px 20px', backgroundColor: 'var(--accent-red)', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}
        >
          {showForm ? 'Close' : '+ New Subject'}
        </button>
      </div>

      {showForm && <AddSubjectForm onClose={() => setShowForm(false)} />}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
        {subjects.map((subject) => (
          <SubjectCard key={subject.id} subject={subject} />
        ))}
      </div>
    </div>
  );
};

export default Subjects;