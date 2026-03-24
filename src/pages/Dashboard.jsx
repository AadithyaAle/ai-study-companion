import { useProgress } from '../hooks/useProgress';
import ProgressChart from '../components/ProgressChart';

const Dashboard = () => {
  // Grab our pre-calculated stats from our custom hook
  const { totalTasks, completedTasks, pendingTasks, overdueTasks, completionPercentage } = useProgress();

  return (
    <div>
      <h1 style={{ fontSize: '1.8rem', color: '#0f172a', marginBottom: '20px', marginTop: 0 }}>Study Dashboard</h1>

      {/* Top Row: Statistics Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '30px' }}>
        <StatCard title="Total Tasks" value={totalTasks} color="#64748b" />
        <StatCard title="Completed" value={completedTasks} color="#10b981" />
        <StatCard title="Pending" value={pendingTasks} color="#f59e0b" />
        <StatCard title="Overdue" value={overdueTasks} color="#ef4444" />
      </div>

      {/* Main Content Area */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '20px' }}>
        
        {/* Overall Progress Section */}
        <div style={{ backgroundColor: 'white', padding: '25px', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
          <h2 style={{ fontSize: '1.2rem', margin: '0 0 20px 0', color: '#1e293b' }}>Overall Progress</h2>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
            <span style={{ color: '#64748b', fontWeight: 'bold' }}>Completion Rate</span>
            <span style={{ color: '#10b981', fontWeight: 'bold' }}>{completionPercentage}%</span>
          </div>
          
          {/* Custom Progress Bar */}
          <div style={{ width: '100%', backgroundColor: '#e2e8f0', borderRadius: '10px', height: '12px', overflow: 'hidden' }}>
            <div 
              style={{ 
                width: `${completionPercentage}%`, 
                backgroundColor: '#10b981', 
                height: '100%', 
                transition: 'width 0.8s ease-in-out' 
              }} 
            />
          </div>
          
          <p style={{ marginTop: '20px', color: '#64748b', fontSize: '0.9rem', lineHeight: '1.5' }}>
            Keep up the good work! You have completed {completedTasks} out of {totalTasks} total tasks on your study schedule.
          </p>
        </div>

        {/* Chart Section */}
        <div style={{ backgroundColor: 'white', padding: '25px', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
          <h2 style={{ fontSize: '1.2rem', margin: '0 0 20px 0', color: '#1e293b' }}>Subject Performance</h2>
          <div style={{ height: '250px' }}>
            <ProgressChart />
          </div>
        </div>

      </div>
    </div>
  );
};

// A simple, reusable UI component for our numbers
const StatCard = ({ title, value, color }) => (
  <div style={{ 
    backgroundColor: 'white', 
    padding: '20px', 
    borderRadius: '12px', 
    borderBottom: `4px solid ${color}`, 
    boxShadow: '0 4px 6px rgba(0,0,0,0.05)' 
  }}>
    <h3 style={{ margin: 0, fontSize: '0.9rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{title}</h3>
    <p style={{ margin: '10px 0 0 0', fontSize: '2.5rem', fontWeight: 'bold', color: '#0f172a' }}>{value}</p>
  </div>
);

export default Dashboard;