import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // CRITICAL: This gives the calendar its default styling
import RevisionList from '../components/RevisionList';

const Revision = () => {
  // State to keep track of the date the user clicks on the calendar
  const [date, setDate] = useState(new Date());

  return (
    <div>
      <h1 style={{ fontSize: '1.8rem', color: '#0f172a', marginBottom: '20px', marginTop: 0 }}>
        Revision Planner
      </h1>
      
      <p style={{ color: '#64748b', marginBottom: '30px' }}>
        Select a date on the calendar to view and manage your scheduled revision topics.
      </p>

      {/* Grid Layout for Desktop, stacks on Mobile */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
        gap: '30px',
        alignItems: 'start'
      }}>
        
        {/* Calendar Section */}
        <div style={{ 
          backgroundColor: 'white', 
          padding: '25px', 
          borderRadius: '12px', 
          boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
          display: 'flex',
          justifyContent: 'center'
        }}>
          {/* We pass 'date' to the calendar so it highlights today, 
            and 'setDate' so it updates when the user clicks a new day 
          */}
          <Calendar 
            onChange={setDate} 
            value={date} 
            className="custom-calendar-style"
          />
        </div>

        {/* Revision List Section */}
        <RevisionList selectedDate={date} />
        
      </div>
    </div>
  );
};

export default Revision;