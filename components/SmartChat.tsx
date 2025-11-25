'use client';

import { useState, useEffect } from 'react';
import { AIChat } from './AIChat';
import PortfolioChat from './PortfolioChat';

export const SmartChat = () => {
  const [useAIChat, setUseAIChat] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    // Delay API check to prevent initial scroll issues
    const timer = setTimeout(() => {
      const checkAPI = async () => {
        try {
          // Test if Gemini API is working with a simple ping
          const response = await fetch('/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
              message: 'ping',
              history: []
            }),
          });

          if (response.ok) {
            const data = await response.json();
            // If response is in Gemini mode, use AIChat
            setUseAIChat(data.mode === 'gemini');
          } else {
            // API failed, use PortfolioChat
            setUseAIChat(false);
          }
        } catch (error) {
          // Connection failed, use PortfolioChat
          setUseAIChat(false);
        } finally {
          setIsChecking(false);
        }
      };

      checkAPI();
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  // Show loading state briefly
  if (isChecking) {
    return (
      <div className="bg-[#1e1e1e] rounded-lg shadow-2xl overflow-hidden flex items-center justify-center h-[450px] w-full">
        <div className="text-[#b4b4b4] text-sm animate-pulse">Initializing chat...</div>
      </div>
    );
  }

  // Render appropriate chat component
  return useAIChat ? <AIChat /> : <PortfolioChat />;
};
