import { useState } from 'react';
import { generateStudyMaterial } from '../services/aiService';
import { FiCpu, FiLoader } from 'react-icons/fi';

const AITools = () => {
  const [topic, setTopic] = useState('');
  const [activeTool, setActiveTool] = useState('Summary');
  const [result, setResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const tools = ['Summary', 'Practice Questions', 'Flashcards'];

  const handleGenerate = async () => {
    if (!topic.trim()) {
      setError('Please enter a topic first.');
      return;
    }

    setIsLoading(true);
    setError('');
    setResult('');

    // Craft the prompt based on what the user selected
    let prompt = '';
    if (activeTool === 'Summary') {
      prompt = `Act as an expert tutor. Provide a clear, structured, and easy-to-understand summary of the following topic: ${topic}. Use bullet points for key concepts.`;
    } else if (activeTool === 'Practice Questions') {
      prompt = `Generate 5 multiple-choice practice questions with answers at the bottom for the following topic: ${topic}.`;
    } else if (activeTool === 'Flashcards') {
      prompt = `Create 5 study flashcards for the topic: ${topic}. Format them clearly as "Front: [Question/Term]" and "Back: [Answer/Definition]".`;
    }

    try {
      const aiResponse = await generateStudyMaterial(prompt);
      setResult(aiResponse);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '30px' }}>
        <FiCpu size={32} color="#3b82f6" />
        <h1 style={{ fontSize: '2rem', color: '#0f172a', margin: 0 }}>AI Study Assistant</h1>
      </div>

      <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
        
        {/* Input Section */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#1e293b' }}>
            What topic do you want to study?
          </label>
          <input 
            type="text" 
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="e.g., Binary Search Trees, The French Revolution, Mitochondria..."
            style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '1rem', boxSizing: 'border-box' }}
          />
        </div>

        {/* Tool Selection */}
        <div style={{ display: 'flex', gap: '10px', marginBottom: '25px', flexWrap: 'wrap' }}>
          {tools.map((tool) => (
            <button
              key={tool}
              onClick={() => setActiveTool(tool)}
              style={{
                padding: '10px 20px',
                borderRadius: '20px',
                border: 'none',
                backgroundColor: activeTool === tool ? '#3b82f6' : '#f1f5f9',
                color: activeTool === tool ? 'white' : '#64748b',
                cursor: 'pointer',
                fontWeight: 'bold',
                transition: 'all 0.2s'
              }}
            >
              {tool}
            </button>
          ))}
        </div>

        {/* Generate Button */}
        <button 
          onClick={handleGenerate}
          disabled={isLoading}
          style={{ 
            width: '100%', 
            padding: '14px', 
            backgroundColor: isLoading ? '#94a3b8' : '#10b981', 
            color: 'white', 
            border: 'none', 
            borderRadius: '8px', 
            fontSize: '1.1rem',
            fontWeight: 'bold',
            cursor: isLoading ? 'not-allowed' : 'pointer',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '10px'
          }}
        >
          {isLoading ? <><FiLoader className="spin" /> Generating...</> : `Generate ${activeTool}`}
        </button>

        {/* Error Message */}
        {error && <p style={{ color: '#ef4444', marginTop: '15px', fontWeight: 'bold' }}>{error}</p>}

      </div>

      {/* Result Section */}
      {result && (
        <div style={{ 
          marginTop: '30px', 
          backgroundColor: '#f8fafc', 
          padding: '25px', 
          borderRadius: '12px', 
          border: '1px solid #e2e8f0',
          whiteSpace: 'pre-wrap', // This ensures line breaks from the AI are respected
          lineHeight: '1.6',
          color: '#334155'
        }}>
          <h2 style={{ margin: '0 0 15px 0', color: '#0f172a' }}>AI Response</h2>
          {result}
        </div>
      )}

    </div>
  );
};

export default AITools;