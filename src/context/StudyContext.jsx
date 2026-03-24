import { createContext, useState, useEffect } from 'react';

// 1. Create the Context
// eslint-disable-next-line react-refresh/only-export-components
export const StudyContext = createContext();

// --- Default Dummy Data ---
// We moved this outside the component to keep things clean
const defaultSubjects = [
  { id: 'sub-1', name: 'Computer Science', description: 'Core CS concepts and programming', color: '#3b82f6' },
  { id: 'sub-2', name: 'Mathematics', description: 'Calculus and Linear Algebra', color: '#10b981' }
];

const defaultTopics = [
  { id: 'top-1', subjectId: 'sub-1', name: 'Binary Trees', difficulty: 'Hard', status: 'In Progress', notes: 'Focus on tree traversal algorithms.' },
  { id: 'top-2', subjectId: 'sub-1', name: 'Graph Algorithms', difficulty: 'Medium', status: 'Not Started', notes: 'Need to review Dijkstra’s algorithm.' },
  { id: 'top-3', subjectId: 'sub-2', name: 'Integration', difficulty: 'Hard', status: 'Needs Revision', notes: 'Practice substitution method.' }
];

const defaultTasks = [
  { id: 'task-1', title: 'Solve 10 binary tree problems', subject: 'Computer Science', topic: 'Binary Trees', deadline: new Date(Date.now() + 86400000 * 2).toISOString(), priority: 'High', status: 'Pending' },
  { id: 'task-2', title: 'Revise Integration notes', subject: 'Mathematics', topic: 'Integration', deadline: new Date(Date.now() - 86400000).toISOString(), priority: 'Medium', status: 'Overdue' },
  { id: 'task-3', title: 'Read about Graphs', subject: 'Computer Science', topic: 'Graph Algorithms', deadline: new Date(Date.now() + 86400000 * 5).toISOString(), priority: 'Low', status: 'Completed' }
];

// --- Helper Function for Local Storage ---
const loadFromStorage = (key, defaultValue) => {
  const savedData = localStorage.getItem(key);
  return savedData ? JSON.parse(savedData) : defaultValue;
};

// 2. Create the Provider Component
export const StudyProvider = ({ children }) => {
  
  // --- Initialize Theme State ---
  const [theme, setTheme] = useState(() => loadFromStorage('study_theme', 'light'));

  // --- Apply Theme to the HTML Document ---
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('study_theme', JSON.stringify(theme));
  }, [theme]);

  // --- Initialize Data State ---
  const [subjects, setSubjects] = useState(() => loadFromStorage('study_subjects', defaultSubjects));
  const [topics, setTopics] = useState(() => loadFromStorage('study_topics', defaultTopics));
  const [tasks, setTasks] = useState(() => loadFromStorage('study_tasks', defaultTasks));

  // --- Auto-Save with useEffect ---
  // Whenever 'subjects' changes, this runs and saves the new array to the browser
  useEffect(() => {
    localStorage.setItem('study_subjects', JSON.stringify(subjects));
  }, [subjects]);

  useEffect(() => {
    localStorage.setItem('study_topics', JSON.stringify(topics));
  }, [topics]);

  useEffect(() => {
    localStorage.setItem('study_tasks', JSON.stringify(tasks));
  }, [tasks]);

  // The 'value' prop contains everything we want to share across the app
  const contextValue = {
    theme,
    setTheme,
    subjects,
    setSubjects,
    topics,
    setTopics,
    tasks,
    setTasks
  };

  return (
    <StudyContext.Provider value={contextValue}>
      {children}
    </StudyContext.Provider>
  );
};