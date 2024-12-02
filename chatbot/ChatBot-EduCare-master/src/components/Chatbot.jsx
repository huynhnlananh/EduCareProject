// src/components/Chatbot.jsx
import React, { useState, useEffect, useRef } from 'react';
import './Chatbot.css';

const BOT_IMG = "/static/img/mhcicon.png";
const PERSON_IMG = "/static/img/person.png";
const LOGO_EDUCARE = "/static/img/logoeducare.png";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      name: 'EduCare Bot',
      img: BOT_IMG,
      side: 'left',
      text: 'Welcome to EduCare, a safe and supportive space where you can share your thoughts and feelings without fear of judgement.',
      time: getCurrentTime(),
    },
  ]);
  const [userInput, setUserInput] = useState('');
  const chatEndRef = useRef(null);

  useEffect(() => {
    const timer = setInterval(() => {
      updateMessageTimes();
    }, 60000);

    return () => clearInterval(timer);
  }, [messages]);

  useEffect(() => {
    if (isOpen) {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  function getCurrentTime() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    return `${hours}:${minutes.toString().padStart(2, '0')}`;
  }

  function updateMessageTimes() {
    setMessages((prevMessages) =>
      prevMessages.map((msg) => ({ ...msg, time: getCurrentTime() }))
    );
  }

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setTimeout(() => addBotMessage("Hi"), 1000);
    }
  };

  const sendMessage = async () => {
    if (userInput.trim() === '') return;

    const newMessage = {
      name: 'You',
      img: PERSON_IMG,
      side: 'right',
      text: userInput,
      time: getCurrentTime(),
    };

    setMessages([...messages, newMessage]);
    setUserInput('');

    try {
      const response = await fetch('/api/chat/', {  // Đảm bảo URL đúng
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // 'X-CSRFToken': getCookie('csrftoken'), // Nếu cần thiết
        },
        body: JSON.stringify({ text: userInput }),  // Sử dụng key 'text' phù hợp với backend
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();

      const botMessage = {
        name: 'EduCare Bot',
        img: BOT_IMG,
        side: 'left',
        text: data.response || 'Xin lỗi, đã xảy ra lỗi khi lấy phản hồi.',
        time: getCurrentTime(),
      };

      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error('Error:', error);
      const errorMessage = {
        name: 'EduCare Bot',
        img: BOT_IMG,
        side: 'left',
        text: 'Đã xảy ra lỗi.',
        time: getCurrentTime(),
      };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    }
  };

  const addBotMessage = (text) => {
    const botMessage = {
      name: 'EduCare Bot',
      img: BOT_IMG,
      side: 'left',
      text: text,
      time: getCurrentTime(),
    };
    setMessages((prevMessages) => [...prevMessages, botMessage]);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="chatbot-container">
      {isOpen && (
        <div className="chatbox">
          <div className="chatbox-header">
            <div className="main-title">
              <img src={LOGO_EDUCARE} alt="EduCare Logo" className="logo-educare" />
              EduCare Bot
            </div>
            <button className="chatbox-close-btn" onClick={toggleChat}>
              &#10005; {/* Biểu tượng X */}
            </button>
          </div>
          <div className="chatbox-body">
            {messages.map((msg, index) => (
              <div key={index} className={`msg ${msg.side}-msg`}>
                {msg.side === 'left' && (
                  <div
                    className="msg-img"
                    style={{
                      backgroundImage: `url(${msg.img})`,
                    }}
                  ></div>
                )}
                <div className="msg-bubble">
                  <div className="msg-info">
                    <div className="msg-info-name">{msg.name}</div>
                    <div className="msg-info-time">{msg.time}</div>
                  </div>
                  <div className="msg-text">{msg.text}</div>
                </div>
                {msg.side === 'right' && (
                  <div
                    className="msg-img"
                    style={{
                      backgroundImage: `url(${msg.img})`,
                    }}
                  ></div>
                )}
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>
          <form className="msger-inputarea" onSubmit={(e) => { e.preventDefault(); sendMessage(); }}>
            <input
              type="text"
              className="msger-input"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Enter your message..."
              onKeyPress={handleKeyPress}
            />
            <button type="submit" className="msger-send-btn">
              Send
            </button>
          </form>
        </div>
      )}
      <button className="chatbot-toggle-btn" onClick={toggleChat}>
        {isOpen ? '✖' : '💬'}
      </button>
    </div>
  );
};

export default Chatbot;
