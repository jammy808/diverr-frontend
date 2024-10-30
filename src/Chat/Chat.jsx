import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import axios from 'axios';

const socket = io('http://localhost:8000'); // Replace with your backend's URL

const Chat = () => {
  const location = useLocation(); // Access the state passed by navigate()
  const { gigId, senderId, senderModel } = location.state || {}; // Destructure state safely

  const [messages, setMessages] = useState(["hi"]);
  const [newMessage, setNewMessage] = useState('');

  const fetchMessages = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/messages/${gigId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch messages');
      }
      const data = await response.json();
      setMessages(data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  useEffect(() => {
    if (gigId) {
      socket.emit('joinGig', gigId);

      fetchMessages();

      // Listen for new messages
      socket.on('receiveMessage', (message) => {
        setMessages((prevMessages) => [...prevMessages, message]);
      });
    }

    // Cleanup on component unmount
    return () => {
      socket.off('receiveMessage');
    };
  }, [gigId]);

  const handleSendMessage = () => {
    if (newMessage.trim() === '') return;

    const messageData = {
      senderId,
      senderModel,
      gigId,
      content: newMessage,
    };

    socket.emit('sendMessage', messageData); // Emit message to the server
    setNewMessage(''); // Clear input field
  };

  return (
    <div>
      <div className="messages">
        {Array.isArray(messages) && messages.length > 0 ? (
          messages.map((msg, index) => (
            <div key={index} className="message">
              <p>{msg.content}</p>
            </div>
          ))
        ) : (
          <p>No messages yet</p>
        )}
      </div>


      <input
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        placeholder="Type a message..."
      />
      <button onClick={handleSendMessage}>Send</button>
    </div>
  );
};

export default Chat;
