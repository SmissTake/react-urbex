import React, { createContext, useEffect, useState } from 'react';
import PopMessage from '../components/PopMessage';

export const MessageContext = createContext();

export function MessageProvider({ children }) {
  const [message, setMessage] = useState("");
  const [type, setType] = useState("");

  const showMessage = (message, type) => {
    if (message == "") {
      return;
    }
    setMessage(message);
    setType(type);
  };

  const hideMessage = () => {
    setMessage("");
    setType("");
  };

  return (
    <MessageContext.Provider value={{ showMessage, hideMessage }}>
      {children}
      {message && (
        <PopMessage message={message} type={type} onClose={hideMessage} />
      )}
    </MessageContext.Provider>
  );
}