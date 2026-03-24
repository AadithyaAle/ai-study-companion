import { NavLink, Outlet } from 'react-router-dom';
import { FiHome, FiBook, FiCheckSquare, FiCalendar, FiCpu, FiSun, FiMoon } from 'react-icons/fi';
import { useContext } from 'react';
import { StudyContext } from '../context/StudyContext';

const Layout = () => {
  // Pull the theme state from our Context
  const { theme, setTheme } = useContext(StudyContext);

  const navItems = [
    { path: '/dashboard', name: 'Dashboard', icon: <FiHome /> },
    { path: '/subjects', name: 'Subjects', icon: <FiBook /> },
    { path: '/tasks', name: 'Tasks', icon: <FiCheckSquare /> },
    { path: '/revision', name: 'Revision Planner', icon: <FiCalendar /> },
    { path: '/ai-tools', name: 'AI Assistant', icon: <FiCpu /> },
  ];

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: 'sans-serif', backgroundColor: 'var(--bg-main)' }}>
      {/* Sidebar */}
      <aside style={{ width: '250px', backgroundColor: 'var(--sidebar-bg)', color: 'white', padding: '20px', display: 'flex', flexDirection: 'column', transition: 'background-color 0.3s' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '30px', color: '#38bdf8' }}>
          Study AI
        </h2>
        
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '10px', flex: 1 }}>
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              style={({ isActive }) => ({
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '10px',
                borderRadius: '8px',
                textDecoration: 'none',
                color: isActive ? '#38bdf8' : '#cbd5e1',
                backgroundColor: isActive ? 'var(--sidebar-hover)' : 'transparent',
                transition: 'background 0.2s',
              })}
            >
              {item.icon}
              {item.name}
            </NavLink>
          ))}
        </nav>

        {/* Theme Toggle Button */}
        <button 
          onClick={toggleTheme}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            padding: '12px',
            backgroundColor: 'var(--sidebar-hover)',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: 'bold',
            marginTop: 'auto', // Pushes it to the bottom
            transition: 'background 0.3s'
          }}
        >
          {theme === 'light' ? <><FiMoon /> Dark Mode</> : <><FiSun /> Light Mode</>}
        </button>
      </aside>

      {/* Main Content Area */}
      <main style={{ flex: 1, padding: '30px', overflowY: 'auto' }}>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;