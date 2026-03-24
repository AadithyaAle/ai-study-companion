import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useTasks } from '../hooks/useTasks';
import { useSubjects } from '../hooks/useSubjects';
import { toast } from 'react-toastify';

// 1. Define the Validation Schema (The "Bouncer")
const schema = yup.object().shape({
  title: yup.string().required('Task title is required'),
  subject: yup.string().required('Please select a subject'),
  topic: yup.string().required('Please select a topic'),
  deadline: yup.date().required('Deadline is required').typeError('Please enter a valid date'),
  priority: yup.string().oneOf(['Low', 'Medium', 'High']).required('Priority is required'),
});

const AddTaskForm = ({ onClose }) => {
  const { addTask } = useTasks();
  const { subjects, topics } = useSubjects();

  // 2. Setup React Hook Form
  const { register, handleSubmit, formState: { errors }, watch } = useForm({
    resolver: yupResolver(schema),
  });

  // Watch the selected subject so we can filter the topics dropdown
  const selectedSubjectName = watch('subject');
  const selectedSubjectId = subjects.find(s => s.name === selectedSubjectName)?.id;
  const filteredTopics = topics.filter(t => t.subjectId === selectedSubjectId);

  // 3. Handle Form Submission
  const onSubmit = (data) => {
    try {
      console.log("Validation passed! Here is the data:", data);

      const formattedData = {
        ...data,
        // Safely wrap the date to guarantee it doesn't crash
        deadline: new Date(data.deadline).toISOString(),
        status: 'Pending'
      };
      
      addTask(formattedData);
      toast.success('Task created successfully!');
      onClose(); // Close the form
      
    } catch (error) {
      console.error("Crash inside onSubmit:", error);
      toast.error("Something went wrong saving the date.");
    }
  };

  return (
    <div style={{ backgroundColor: '#f8fafc', padding: '20px', borderRadius: '8px', marginBottom: '20px', border: '1px solid #e2e8f0' }}>
      <h3 style={{ marginTop: 0, color: '#0f172a' }}>Create New Task</h3>
      
      <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        
        {/* Title Input */}
        <div>
          <input 
            {...register('title')} 
            placeholder="e.g., Read Chapter 4" 
            style={inputStyle} 
          />
          <p style={errorStyle}>{errors.title?.message}</p>
        </div>

        {/* Layout Grid for Dropdowns */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
          
          {/* Subject Dropdown */}
          <div>
            <select {...register('subject')} style={inputStyle}>
              <option value="">Select Subject...</option>
              {subjects.map(sub => (
                <option key={sub.id} value={sub.name}>{sub.name}</option>
              ))}
            </select>
            <p style={errorStyle}>{errors.subject?.message}</p>
          </div>

          {/* Topic Dropdown (Filters based on Subject) */}
          <div>
            <select {...register('topic')} style={inputStyle} disabled={!selectedSubjectName}>
              <option value="">Select Topic...</option>
              {filteredTopics.map(top => (
                <option key={top.id} value={top.name}>{top.name}</option>
              ))}
            </select>
            <p style={errorStyle}>{errors.topic?.message}</p>
          </div>
        </div>

        {/* Layout Grid for Date & Priority */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
          
          {/* Deadline Input */}
          <div>
            <input type="date" {...register('deadline')} style={inputStyle} />
            <p style={errorStyle}>{errors.deadline?.message}</p>
          </div>

          {/* Priority Dropdown */}
          <div>
            <select {...register('priority')} style={inputStyle}>
              <option value="">Select Priority...</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
            <p style={errorStyle}>{errors.priority?.message}</p>
          </div>
        </div>

        {/* Form Actions */}
        <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
          <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#3b82f6', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>
            Save Task
          </button>
          <button type="button" onClick={onClose} style={{ padding: '10px 20px', backgroundColor: '#e2e8f0', color: '#64748b', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

// Simple reusable styles to keep the JSX clean
const inputStyle = { width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1', boxSizing: 'border-box' };
const errorStyle = { color: '#ef4444', fontSize: '0.8rem', margin: '5px 0 0 0' };

export default AddTaskForm;