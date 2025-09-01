# Intellichat - React + Express AI Chatbot

A modern AI-powered chatbot built with React frontend and Express backend, using Google's Gemini API.

## 🚀 Features

- **Modern UI**: Beautiful React interface with Bootstrap styling
- **Real-time Chat**: Instant messaging with AI responses
- **Responsive Design**: Works on desktop and mobile devices
- **Typing Indicators**: Visual feedback during AI processing
- **Error Handling**: Graceful error handling and user feedback

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern UI library
- **React Bootstrap** - UI components
- **Axios** - HTTP client for API calls
- **CSS3** - Custom styling with animations

### Backend
- **Express.js** - Node.js web framework
- **CORS** - Cross-origin resource sharing
- **Axios** - HTTP client for Gemini API calls
- **dotenv** - Environment variable management

### AI
- **Google Gemini 2.0 Flash** - AI model for responses

## 📦 Installation

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Setup

1. **Clone or download the project**

2. **Install dependencies**
   ```bash
   # Install server dependencies
   npm install
   
   # Install client dependencies
   cd client
   npm install
   cd ..
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   PORT=5000
   ```

4. **Get a Gemini API Key**
   - Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Create a new API key
   - Add it to your `.env` file

## 🚀 Running the Application

### Development Mode (Recommended)
```bash
# Run both frontend and backend simultaneously
npm run dev
```

### Production Mode
```bash
# Build the React app
npm run build

# Start the server
npm start
```

### Individual Commands
```bash
# Run only the backend server
npm run server

# Run only the React frontend
npm run client
```

## 📱 Usage

1. Open your browser and go to `http://localhost:3000`
2. Start chatting with the AI!
3. Type your messages and press Enter or click the send button
4. The AI will respond using Google's Gemini model

## 🏗️ Project Structure

```
├── server.js              # Express backend server
├── package.json           # Backend dependencies
├── .env                   # Environment variables
├── client/                # React frontend
│   ├── public/
│   │   └── index.html     # Main HTML file
│   ├── src/
│   │   ├── App.js         # Main React component
│   │   ├── App.css        # Styling
│   │   └── index.js       # React entry point
│   └── package.json       # Frontend dependencies
└── README.md              # This file
```

## 🔧 API Endpoints

- `POST /api/chat` - Send a message to the AI
- `GET /api/health` - Health check endpoint

## 🎨 Customization

### Styling
- Modify `client/src/App.css` to change the appearance
- Update colors, fonts, and layout as needed

### AI Model
- Change the Gemini model in `server.js` line 15
- Available models: `gemini-2.0-flash`, `gemini-pro`, etc.

### Features
- Add conversation history persistence
- Implement user authentication
- Add file upload capabilities
- Integrate with other AI models

## 🐛 Troubleshooting

### Common Issues

1. **Port already in use**
   - Change the PORT in `.env` file
   - Kill processes using the port

2. **API key errors**
   - Verify your Gemini API key is correct
   - Check if the key has proper permissions

3. **CORS errors**
   - Ensure the backend is running on port 5000
   - Check that the proxy is set correctly in client/package.json

## 📄 License

This project is open source and available under the [ISC License](LICENSE).

## 🤝 Contributing

Feel free to submit issues and enhancement requests!
