const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Gemini API configuration
const GEMINI_API_KEY = process.env.GEMINI_API_KEY || "AIzaSyCceDw0T6uqHuSYykE1j7oaLvG7QX4_f3k";
const GEMINI_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

// Chat endpoint
app.post('/api/chat', async (req, res) => {
    try {
        const { message } = req.body;
        
        if (!message) {
            return res.status(400).json({ error: 'Message is required' });
        }

        const response = await axios.post(GEMINI_URL, {
            contents: [
                {
                    parts: [
                        {
                            text: message
                        }
                    ]
                }
            ]
        }, {
            headers: {
                'Content-Type': 'application/json',
                'X-goog-api-key': GEMINI_API_KEY
            }
        });

        // Extract the response text from Gemini API
        const result = response.data;
        let botResponse = "Sorry, I couldn't generate a response.";

        if (result.candidates && result.candidates.length > 0) {
            if (result.candidates[0].content && result.candidates[0].content.parts) {
                botResponse = result.candidates[0].content.parts[0].text;
            }
        }

        res.json({ response: botResponse });

    } catch (error) {
        console.error('API Error:', error.response?.data || error.message);
        res.status(500).json({ 
            error: 'Failed to get response from AI',
            details: error.response?.data || error.message
        });
    }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', message: 'Server is running' });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Health check: http://localhost:${PORT}/api/health`);
});
