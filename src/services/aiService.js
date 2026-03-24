import axios from 'axios';

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

// A quick check to make sure Vite is actually finding your .env file
console.log("API Key Status:", API_KEY ? "Loaded Successfully! ✅" : "Missing! ❌");

// We are strictly using the stable 1.5-flash endpoint
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

export const generateStudyMaterial = async (prompt) => {
  if (!API_KEY) {
    throw new Error("API Key is missing. Check your .env file and restart the server.");
  }

  try {
    const response = await axios.post(
      API_URL, 
      {
        contents: [{
          parts: [{ text: prompt }]
        }]
      },
      {
        // Explicitly telling Google we are sending JSON data
        headers: { 'Content-Type': 'application/json' }
      }
    );
    
    return response.data.candidates[0].content.parts[0].text;
  } catch (error) {
    // This will print the EXACT reason Google rejected the request to your console
    console.error("Detailed API Error:", error.response?.data || error.message);
    throw new Error("Failed to generate content. Please try again.");
  }
};