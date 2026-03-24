import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom' // <-- Added Router here
import App from './App.jsx'
import './index.css'
import { StudyProvider } from './context/StudyContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter> {/* <-- Router wraps the entire app at the highest level */}
      <StudyProvider>
        <App />
      </StudyProvider>
    </BrowserRouter>
  </React.StrictMode>,
)