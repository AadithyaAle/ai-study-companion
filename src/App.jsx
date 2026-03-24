import { Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // CRITICAL: The CSS for the pop-ups

import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Subjects from './pages/Subjects';
import Tasks from './pages/Tasks';
import Revision from './pages/Revision';
import AITools from './pages/AITools';

function App() {
  return (
    <>
      {/* ToastContainer sits at the top level so it can trigger from any page */}
      <ToastContainer position="bottom-right" autoClose={3000} theme="colored" />
      
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="subjects" element={<Subjects />} />
          <Route path="tasks" element={<Tasks />} />
          <Route path="revision" element={<Revision />} />
          <Route path="ai-tools" element={<AITools />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;