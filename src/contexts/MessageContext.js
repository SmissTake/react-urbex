import React, { createContext, useState } from 'react';
import PopMessage from '../components/PopMessage';

export const MessageContext = createContext();

export function MessageProvider({ children }) {
  const [message, setMessage] = useState(null);

  const showMessage = (message, type) => {
    setMessage({ message, type });
  };

  const handleClose = () => {
    setMessage(null);
  };

  return (
    <MessageContext.Provider value={{ showMessage }}>
      {children}
      {message && (
        <PopMessage
          message={message.message}
          type={message.type}
          onClose={handleClose}
        />
      )}
    </MessageContext.Provider>
  );
}