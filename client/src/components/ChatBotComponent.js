import React, { useState } from 'react';
import axios from 'axios';

function ChatBotComponent() {
  const [messages, setMessages] = useState([
    { id: 1, message: 'Hi there! How can I help you with our products today?', sender: 'bot' },
  ]);

  // const handleUserMessage = async (message) => {
  //   const userMessage = { id: messages.length + 1, message, sender: 'user' };
  //   setMessages((prev) => [...prev, userMessage]);

  //   try {
  //     const response = await axios.post('http://localhost:5000/chat', { message });
  //     const botResponse = {
  //       id: messages.length + 2,
  //       message: response.data.response,  // General response
  //       sender: 'bot',
  //     };
  //     setMessages((prev) => [...prev, botResponse]);

  //     if (response.data.products) {
  //       const productMessages = response.data.products.map((product, index) => ({
  //         id: messages.length + 3 + index,
  //         message: `${product.name} - ${product.category} - $${product.price}`,
  //         sender: 'bot',
  //       }));
  //       setMessages((prev) => [...prev, ...productMessages]);
  //     }
  //   } catch (error) {
  //     console.error('Error fetching chatbot response:', error);
  //     setMessages((prev) => [
  //       ...prev,
  //       { id: messages.length + 2, message: 'Sorry, something went wrong.', sender: 'bot' },
  //     ]);
  //   }
  // };

  const handleUserMessage = async (message) => {
    const userMessage = { id: messages.length + 1, message, sender: 'user' };
    setMessages((prev) => [...prev, userMessage]);

    try {
        const response = await axios.post('http://127.0.0.1:5000/chat', { message });
        const botResponse = {
            id: messages.length + 2,
            message: response.data.response,
            sender: 'bot',
        };
        setMessages((prev) => [...prev, botResponse]);

        if (response.data.products) {
            const productMessages = response.data.products.map((product, index) => ({
                id: messages.length + 3 + index,
                message: `${product.name} - ${product.category} - $${product.price}`,
                sender: 'bot',
            }));
            setMessages((prev) => [...prev, ...productMessages]);
        }
    } catch (error) {
        console.error('Error fetching chatbot response:', error);
        setMessages((prev) => [
            ...prev,
            { id: messages.length + 2, message: 'Sorry, something went wrong.', sender: 'bot' },
        ]);
    }
};


  const handleSendMessage = (event) => {
    event.preventDefault();
    const input = event.target.elements.message;
    const userMessage = input.value.trim();
    if (userMessage) {
      handleUserMessage(userMessage);
      input.value = '';
    }
  };

  return (
    <div className="flex flex-col w-full max-w-xl mx-auto p-4 space-y-4 bg-white shadow-lg rounded-lg">
      <div className="flex-1 overflow-y-auto space-y-4 p-2">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`p-4 rounded-lg ${msg.sender === 'bot' ? 'bg-gray-200' : 'bg-blue-500 text-white'}`}
          >
            {msg.message}
          </div>
        ))}
      </div>
      <form className="flex space-x-2" onSubmit={handleSendMessage}>
        <input
          name="message"
          placeholder="Type a message..."
          autoComplete="off"
          className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
          Send
        </button>
      </form>
    </div>
  );
}

export default ChatBotComponent;
