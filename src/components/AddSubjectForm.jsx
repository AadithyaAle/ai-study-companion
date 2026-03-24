import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useContext } from 'react';
import { StudyContext } from '../context/StudyContext';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'react-toastify';

const schema = yup.object().shape({
  name: yup.string().required('Subject name is required'),
  description: yup.string().max(100, 'Description too long'),
  color: yup.string().required()
});

const AddSubjectForm = ({ onClose }) => {
  const { setSubjects } = useContext(StudyContext);
  
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { color: '#e11d48' } // Default to our accent red
  });

  const onSubmit = (data) => {
    const newSubject = {
      ...data,
      id: `sub-${uuidv4()}`
    };
    
    setSubjects(prev => [...prev, newSubject]);
    toast.success(`${data.name} added!`);
    onClose();
  };

  return (
    <div style={{ backgroundColor: 'var(--bg-card)', padding: '20px', borderRadius: '12px', border: '1px solid var(--border-color)', marginBottom: '30px' }}>
      <h3 style={{ color: 'var(--text-main)', marginTop: 0 }}>Add New Subject</h3>
      <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <input {...register('name')} placeholder="Subject Name (e.g. Physics)" style={inputStyle} />
        <p style={errorStyle}>{errors.name?.message}</p>

        <input {...register('description')} placeholder="Short Description" style={inputStyle} />
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <label style={{ color: 'var(--text-muted)' }}>Theme Color:</label>
          <input type="color" {...register('color')} style={{ border: 'none', background: 'none', width: '50px', height: '40px', cursor: 'pointer' }} />
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button type="submit" style={btnPrimary}>Save Subject</button>
          <button type="button" onClick={onClose} style={btnSecondary}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

const inputStyle = { width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-input)', color: 'white' };
const errorStyle = { color: 'var(--accent-red)', fontSize: '0.8rem', margin: 0 };
const btnPrimary = { flex: 1, padding: '12px', backgroundColor: 'var(--accent-red)', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' };
const btnSecondary = { padding: '12px', backgroundColor: 'transparent', color: 'var(--text-muted)', border: '1px solid var(--border-color)', borderRadius: '8px', cursor: 'pointer' };

export default AddSubjectForm;