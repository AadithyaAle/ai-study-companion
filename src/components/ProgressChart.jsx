import { useContext } from 'react';
import { StudyContext } from '../context/StudyContext';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const ProgressChart = () => {
  const { subjects, tasks } = useContext(StudyContext);

  // Prepare the data array for the Recharts library
  const chartData = subjects.map((subject) => {
    const subjectTasks = tasks.filter((task) => task.subject === subject.name);
    const completedCount = subjectTasks.filter((task) => task.status === 'Completed').length;
    
    return {
      name: subject.name,          // X-Axis label
      Total: subjectTasks.length,  // First bar
      Completed: completedCount    // Second bar
    };
  });

  // If there are no subjects yet, show a friendly message
  if (chartData.length === 0) {
    return <p style={{ color: '#64748b', textAlign: 'center', marginTop: '40px' }}>No data to display yet. Add some subjects and tasks!</p>;
  }

  return (
    // ResponsiveContainer makes the chart scale nicely on mobile
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="name" axisLine={false} tickLine={false} />
        <YAxis axisLine={false} tickLine={false} />
        <Tooltip cursor={{ fill: '#f1f5f9' }} />
        <Legend wrapperStyle={{ paddingTop: '20px' }} />
        <Bar dataKey="Total" fill="#cbd5e1" radius={[4, 4, 0, 0]} />
        <Bar dataKey="Completed" fill="#3b82f6" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default ProgressChart;