import { useState, useRef, useEffect } from 'react';
import { generateStudyMaterial } from '../services/aiService';
import { FiSend, FiUser, FiCpu, FiLoader } from 'react-icons/fi';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

const AITools = () => {
  // 1. Chat State
  const [messages, setMessages] = useState([
    { 
      role: 'model', 
      text: 'Hello! I am your AI Study Companion powered by Gemini. What would you like to study today? Try asking me to "Summarize Binary Trees" or "Give me 3 flashcards on the French Revolution".' 
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // 2. Auto-scroll Reference
  const messagesEndRef = useRef(null);

  // Auto-scroll to the bottom whenever a new message is added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // 3. Handle Sending a Message
  const handleSendMessage = async (e) => {
    e?.preventDefault();
    if (!input.trim() || isLoading) return;

    const userText = input.trim();
    setInput(''); // Clear input box immediately

    // Add user message to screen
    setMessages((prev) => [...prev, { role: 'user', text: userText }]);
    setIsLoading(true);

    try {
      // Send the prompt to our Gemini service
      const aiResponse = await generateStudyMaterial(userText);
      
      // Add AI response to screen
      setMessages((prev) => [...prev, { role: 'model', text: aiResponse }]);
      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      setMessages((prev) => [...prev, { role: 'model', text: '⚠️ Sorry, I encountered an error connecting to the server. Please try again.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  // 4. Quick Actions (Suggestion Chips)
  const handleQuickAction = (prompt) => {
    setInput(prompt);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 100px)', maxWidth: '900px', margin: '0 auto' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '15px', paddingBottom: '20px', borderBottom: '1px solid #e2e8f0' }}>
        <FiCpu size={28} color="#3b82f6" />
        <h1 style={{ fontSize: '1.5rem', color: '#0f172a', margin: 0 }}>Gemini Study Chat</h1>
        {/* Header */}
<div style={{ 
  display: 'flex', 
  alignItems: 'center', 
  justifyContent: 'space-between', 
  width: '100%', 
  paddingBottom: '20px', 
  borderBottom: '1px solid var(--border-color)',
  marginBottom: '20px' 
}}>
  <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
    <FiCpu size={28} color="var(--accent-red)" />
    {/* Explicitly setting this h1 to pure white */}
    <h1 style={{ fontSize: '1.5rem', color: '#ffffff', margin: 0 }}>
      Gemini Study Chat
    </h1>
  </div>
  
  <button 
    onClick={() => setMessages([{ role: 'model', text: 'Chat cleared. How can I help you now?' }])}
    style={{ 
      background: 'transparent', 
      border: '1px solid var(--border-color)', 
      color: 'var(--text-muted)', 
      padding: '5px 12px', 
      borderRadius: '6px', 
      cursor: 'pointer', 
      fontSize: '0.8rem' 
    }}
  >
    Clear Chat
  </button>
</div>
      </div>

      {/* Chat Messages Area */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '20px 0', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {messages.map((msg, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ 
              display: 'flex', 
              gap: '15px', 
              alignItems: 'flex-start',
              flexDirection: msg.role === 'user' ? 'row-reverse' : 'row'
            }}
          >
            {/* Avatar */}
            <div style={{ 
              width: '40px', height: '40px', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexShrink: 0,
              backgroundColor: msg.role === 'user' ? '#3b82f6' : '#10b981', color: 'white'
            }}>
              {msg.role === 'user' ? <FiUser size={20} /> : <FiCpu size={20} />}
            </div>

            {/* Message Bubble */}
            <div style={{ 
              backgroundColor: msg.role === 'user' ? '#3b82f6' : '#f1f5f9',
              color: msg.role === 'user' ? 'white' : '#1e293b',
              padding: '15px 20px',
              borderRadius: '16px',
              borderTopRightRadius: msg.role === 'user' ? '4px' : '16px',
              borderTopLeftRadius: msg.role === 'model' ? '4px' : '16px',
              maxWidth: '75%',
              lineHeight: '1.6',
              whiteSpace: 'pre-wrap', // Respects line breaks from AI
              boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
            }}>
              {msg.text}
            </div>
          </motion.div>
        ))}
        
        {/* Loading Indicator */}
        {isLoading && (
          <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#10b981', color: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <FiCpu size={20} />
            </div>
            <div style={{ backgroundColor: '#f1f5f9', padding: '15px 20px', borderRadius: '16px', borderTopLeftRadius: '4px', color: '#64748b', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <FiLoader className="spin" /> Gemini is thinking...
            </div>
          </div>
        )}
        
        {/* Invisible div to scroll to */}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggestion Chips */}
      <div style={{ display: 'flex', gap: '10px', paddingBottom: '15px', overflowX: 'auto' }}>
        {['Summarize a topic...', 'Give me practice questions on...', 'Explain this concept like I am 5...'].map((chip, idx) => (
          <button 
            key={idx}
            onClick={() => handleQuickAction(chip)}
            style={{ padding: '8px 16px', backgroundColor: '#e0f2fe', color: '#0369a1', border: 'none', borderRadius: '20px', cursor: 'pointer', whiteSpace: 'nowrap', fontSize: '0.9rem' }}
          >
            {chip}
          </button>
        ))}
      </div>

      {/* Input Area */}
      <form 
        onSubmit={handleSendMessage} 
        style={{ 
          display: 'flex', 
          gap: '10px', 
          backgroundColor: 'white', 
          padding: '10px', 
          borderRadius: '30px', 
          border: '1px solid #cbd5e1',
          boxShadow: '0 4px 6px rgba(0,0,0,0.05)'
        }}
      >
        <input 
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Message Gemini Study Chat..."
          disabled={isLoading}
          style={{ flex: 1, border: 'none', outline: 'none', padding: '10px 15px', fontSize: '1rem', backgroundColor: 'transparent' }}
        />
        <button 
          type="submit" 
          disabled={isLoading || !input.trim()}
          style={{ 
            width: '45px', height: '45px', borderRadius: '50%', backgroundColor: input.trim() && !isLoading ? '#3b82f6' : '#cbd5e1', color: 'white', border: 'none', cursor: input.trim() && !isLoading ? 'pointer' : 'not-allowed', display: 'flex', justifyContent: 'center', alignItems: 'center', transition: 'background 0.3s' 
          }}
        >
          <FiSend size={18} style={{ transform: 'translateX(-1px)' }} />
        </button>
      </form>

    </div>
  );
};

export default AITools;