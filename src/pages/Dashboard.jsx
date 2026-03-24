import { useProgress } from '../hooks/useProgress';
import ProgressChart from '../components/ProgressChart';

const Dashboard = () => {
  const { totalTasks, completedTasks, pendingTasks, overdueTasks, completionPercentage } = useProgress();

  return (
    <div>
      {/* Main Page Title - Forced to White */}
      <h1 style={{ 
        fontSize: '1.8rem', 
        color: '#ffffff', // FORCE WHITE
        marginBottom: '20px', 
        marginTop: 0,
        userSelect: 'text' // Ensures it behaves normally
      }}>
        Study Dashboard
      </h1>

      {/* Top Row: Statistics Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '30px' }}>
        <StatCard title="Total Tasks" value={totalTasks} color="var(--text-muted)" />
        <StatCard title="Completed" value={completedTasks} color="var(--accent-red)" />
        <StatCard title="Pending" value={pendingTasks} color="#f59e0b" />
        <StatCard title="Overdue" value={overdueTasks} color="#7f1d1d" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '20px' }}>
        
        {/* Overall Progress Section */}
        <div style={{ backgroundColor: 'var(--bg-card)', padding: '25px', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
          <h2 style={{ fontSize: '1.2rem', margin: '0 0 20px 0', color: '#ffffff' }}>Overall Progress</h2>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
            <span style={{ color: 'var(--text-muted)', fontWeight: 'bold' }}>Completion Rate</span>
            <span style={{ color: 'var(--accent-red)', fontWeight: 'bold' }}>{completionPercentage}%</span>
          </div>
          
          <div style={{ width: '100%', backgroundColor: 'var(--bg-main)', borderRadius: '10px', height: '12px', overflow: 'hidden', border: '1px solid var(--border-color)' }}>
            <div 
              style={{ 
                width: `${completionPercentage}%`, 
                backgroundColor: 'var(--accent-red)', 
                height: '100%', 
                transition: 'width 0.8s ease-in-out' 
              }} 
            />
          </div>
          
          <p style={{ marginTop: '20px', color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.5' }}>
            Keep up the good work! You have completed {completedTasks} out of {totalTasks} total tasks.
          </p>
        </div>

        {/* Chart Section */}
        <div style={{ backgroundColor: 'var(--bg-card)', padding: '25px', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
          <h2 style={{ fontSize: '1.2rem', margin: '0 0 20px 0', color: '#ffffff' }}>Subject Performance</h2>
          <div style={{ height: '250px' }}>
            <ProgressChart />
          </div>
        </div>

      </div>
    </div>
  );
};

// Updated StatCard with forced white text for the values
const StatCard = ({ title, value, color }) => (
  <div style={{ 
    backgroundColor: 'var(--bg-card)', 
    padding: '20px', 
    borderRadius: '12px', 
    borderBottom: `4px solid ${color}`,
    borderTop: '1px solid var(--border-color)',
    borderLeft: '1px solid var(--border-color)',
    borderRight: '1px solid var(--border-color)'
  }}>
    <h3 style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
      {title}
    </h3>
    <p style={{ margin: '10px 0 0 0', fontSize: '2.5rem', fontWeight: 'bold', color: '#ffffff' }}>
      {value}
    </p>
  </div>
);

export default Dashboard;