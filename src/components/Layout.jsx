import { NavLink, Outlet } from 'react-router-dom';
import { FiHome, FiBook, FiCheckSquare, FiCalendar, FiCpu } from 'react-icons/fi';

const Layout = () => {
  const navItems = [
    { path: '/dashboard', name: 'Dashboard', icon: <FiHome /> },
    { path: '/subjects', name: 'Subjects', icon: <FiBook /> },
    { path: '/tasks', name: 'Tasks', icon: <FiCheckSquare /> },
    { path: '/revision', name: 'Revision Planner', icon: <FiCalendar /> },
    { path: '/ai-tools', name: 'AI Assistant', icon: <FiCpu /> },
  ];

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--bg-main)' }}>
      {/* Sidebar - Pure Black */}
      <aside style={{ width: '250px', backgroundColor: 'var(--sidebar-bg)', color: 'white', padding: '20px', display: 'flex', flexDirection: 'column', borderRight: '1px solid var(--border-color)' }}>
        
        {/* App Title - Bright Red */}
        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '30px', color: 'var(--accent-red)' }}>
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
                // Bright red text and dark red background when active!
                color: isActive ? 'var(--accent-red)' : 'var(--text-muted)',
                backgroundColor: isActive ? 'var(--sidebar-hover)' : 'transparent',
                transition: 'all 0.2s',
              })}
            >
              {item.icon}
              {item.name}
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Main Content Area */}
      <main style={{ flex: 1, padding: '30px', overflowY: 'auto' }}>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;