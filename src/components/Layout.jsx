import { NavLink, Outlet } from 'react-router-dom';
import { FiHome, FiBook, FiCheckSquare, FiCalendar, FiCpu } from 'react-icons/fi';

const Layout = () => {
  // Navigation links array for cleaner mapping
  const navItems = [
    { path: '/dashboard', name: 'Dashboard', icon: <FiHome /> },
    { path: '/subjects', name: 'Subjects', icon: <FiBook /> },
    { path: '/tasks', name: 'Tasks', icon: <FiCheckSquare /> },
    { path: '/revision', name: 'Revision Planner', icon: <FiCalendar /> },
    { path: '/ai-tools', name: 'AI Assistant', icon: <FiCpu /> },
  ];

  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: 'sans-serif' }}>
      {/* Sidebar */}
      <aside style={{ width: '250px', backgroundColor: '#1e293b', color: 'white', padding: '20px' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '30px', color: '#38bdf8' }}>
          Study AI
        </h2>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
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
                backgroundColor: isActive ? '#334155' : 'transparent',
                transition: 'background 0.2s',
              })}
            >
              {item.icon}
              {item.name}
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Main Content Area */}
      <main style={{ flex: 1, padding: '30px', backgroundColor: '#f8fafc', overflowY: 'auto' }}>
        {/* The current routed page will render here */}
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;