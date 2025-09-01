import React, { useState, useRef, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Badge } from 'react-bootstrap';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async (e) => {
    e.preventDefault();
    
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await axios.post('/api/chat', {
        message: inputMessage
      });

      const botMessage = {
        id: Date.now() + 1,
        text: response.data.response,
        sender: 'bot',
        timestamp: new Date().toLocaleTimeString()
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage = {
        id: Date.now() + 1,
        text: 'Sorry, I encountered an error. Please try again.',
        sender: 'bot',
        timestamp: new Date().toLocaleTimeString(),
        isError: true
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="app">
      <Container fluid className="h-100">
        <Row className="justify-content-center h-100">
          <Col md={8} lg={6} className="chat-container">
            <Card className="chat-card">
              <Card.Header className="chat-header">
                <div className="d-flex align-items-center">
                                     <div className="bot-avatar">
                                           <div className="robot-logo">
                        <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <rect x="8" y="12" width="34" height="26" rx="4" fill="white"/>
                          <circle cx="18" cy="22" r="3" fill="#000000"/>
                          <circle cx="32" cy="22" r="3" fill="#000000"/>
                          <rect x="20" y="28" width="10" height="2" rx="1" fill="#000000"/>
                          <rect x="12" y="16" width="4" height="4" rx="1" fill="#000000"/>
                          <rect x="34" y="16" width="4" height="4" rx="1" fill="#000000"/>
                          <rect x="22" y="8" width="6" height="6" rx="1" fill="#000000"/>
                          <circle cx="25" cy="11" r="1" fill="white"/>
                        </svg>
                      </div>
                     <span className="online-indicator"></span>
                   </div>
                                     <div className="bot-info">
                     <h5 className="mb-0">Coral</h5>
                     <small className="text-muted">Ask me anything!</small>
                   </div>
                </div>
              </Card.Header>

              <Card.Body className="messages-container">
                                 {messages.length === 0 && (
                   <div className="welcome-message">
                     <h6>Welcome to Coral! 👋</h6>
                     <p>Start a conversation by typing a message below.</p>
                   </div>
                 )}
                
                {messages.map((message) => (
                  <div 
                    key={message.id} 
                    className={`message ${message.sender === 'user' ? 'user-message' : 'bot-message'}`}
                  >
                    <div className="message-content">
                      <div className="message-text">
                        {message.text}
                      </div>
                      <div className="message-time">
                        {message.timestamp}
                      </div>
                    </div>
                    {message.sender === 'user' && (
                      <div className="user-avatar">
                        <img 
                          src="https://i.ibb.co/d5b84Xw/Untitled-design.png" 
                          alt="User" 
                          className="rounded-circle"
                        />
                      </div>
                    )}
                  </div>
                ))}
                
                {isLoading && (
                  <div className="message bot-message">
                    <div className="message-content">
                      <div className="typing-indicator">
                        <span></span>
                        <span></span>
                        <span></span>
                      </div>
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </Card.Body>

              <Card.Footer className="chat-footer">
                <Form onSubmit={sendMessage}>
                  <div className="input-group">
                    <Form.Control
                      type="text"
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      placeholder="Enter your message..."
                      disabled={isLoading}
                      className="message-input"
                    />
                    <Button 
                      type="submit" 
                      disabled={isLoading || !inputMessage.trim()}
                      className="send-button"
                    >
                      <i className="fas fa-paper-plane"></i>
                    </Button>
                  </div>
                </Form>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
