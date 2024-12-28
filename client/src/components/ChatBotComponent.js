import React, { useState } from 'react';
import axios from 'axios';
import { Chatbot } from 'react-chatbot-kit';
import 'react-chatbot-kit/build/main.css';

// Configuration for the chatbot
const config = {
  botName: 'ProductBot',
  initialMessages: [{ id: 1, message: 'Hi there! How can I help you with our products today?', type: 'bot' }],
};

// MessageParser to handle user messages
class MessageParser {
  constructor(actionProvider) {
    this.actionProvider = actionProvider;
  }

  parse(message) {
    this.actionProvider.handleUserMessage(message);
  }
}

// ActionProvider to create bot messages
class ActionProvider {
  constructor(createChatBotMessage, setStateFunc) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setStateFunc;
  }

  handleUserMessage = async (message) => {
    const userMessage = this.createChatBotMessage(message, { type: 'user' });

    // Avoid duplicates: Check if the latest message is the same as the incoming message
    this.setState((prevState) => {
      const lastMessage = prevState.messages[prevState.messages.length - 1];
      if (lastMessage && lastMessage.message === userMessage.message) {
        return prevState;
      }
      return {
        ...prevState,
        messages: [...prevState.messages, userMessage],
      };
    });

    try {
      const response = await axios.post('http://localhost:5000/api/query', { question: message });

      const botMessageText = response.data.bot_response;
      const botMessage = this.createChatBotMessage(botMessageText, { type: 'bot' });

      this.setState((prevState) => ({
        ...prevState,
        messages: [...prevState.messages, botMessage],
      }));
    } catch (error) {
      console.error('Error fetching chatbot response:', error);
    }
  };
}

function ChatBotComponent() {
  return (
    <div className="chatbot" style={{ width: '100%', height: '100vh' }}>
      <Chatbot
        config={config}
        messageParser={MessageParser}
        actionProvider={ActionProvider}
      />
    </div>
  );
}

export default ChatBotComponent;
