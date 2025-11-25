'use client';

import { useState, useRef, useEffect } from 'react';

interface Message {
  id: number;
  text: string;
  isBot: boolean;
}

// Interactive AI companion with personality
const CopilotMascot = () => {
  const [eyePosition, setEyePosition] = useState({ x: 0, y: 0 });
  const [isBlinking, setIsBlinking] = useState(false);
  const [animation, setAnimation] = useState<'idle' | 'flip' | 'spin' | 'shy' | 'runaway' | 'wave'>('idle');
  const [isSmiling, setIsSmiling] = useState(false);
  const mascotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!mascotRef.current || animation !== 'idle') return;
      
      const rect = mascotRef.current.getBoundingClientRect();
      const eyeCenterX = rect.left + rect.width / 2;
      const eyeCenterY = rect.top + rect.height / 2 - 8;
      
      const angle = Math.atan2(e.clientY - eyeCenterY, e.clientX - eyeCenterX);
      const distance = Math.min(2.5, Math.hypot(e.clientX - eyeCenterX, e.clientY - eyeCenterY) / 150);
      
      const x = Math.cos(angle) * distance;
      const y = Math.sin(angle) * distance;
      
      setEyePosition({ x, y });
    };

    const blinkInterval = setInterval(() => {
      if (animation === 'idle') {
        setIsBlinking(true);
        setTimeout(() => setIsBlinking(false), 150);
      }
    }, 3000 + Math.random() * 2000);

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearInterval(blinkInterval);
    };
  }, [animation]);

  const handleClick = () => {
    const animations: Array<'flip' | 'spin' | 'shy' | 'runaway' | 'wave'> = ['flip', 'spin', 'shy', 'runaway', 'wave'];
    const randomAnim = animations[Math.floor(Math.random() * animations.length)];
    
    setAnimation(randomAnim);
    setIsSmiling(true);
    
    if (randomAnim === 'runaway') {
      setTimeout(() => {
        setAnimation('idle');
        setIsSmiling(false);
      }, 1500);
    } else {
      setTimeout(() => {
        setAnimation('idle');
        setIsSmiling(false);
      }, 800);
    }
  };

  const getAnimationClass = () => {
    switch (animation) {
      case 'flip': return 'animate-[flip_0.8s_ease-in-out]';
      case 'spin': return 'animate-[spin_0.8s_ease-in-out]';
      case 'shy': return 'animate-[shy_0.8s_ease-in-out]';
      case 'runaway': return 'animate-[runaway_1.5s_ease-in-out]';
      case 'wave': return 'animate-[wave_0.8s_ease-in-out]';
      default: return '';
    }
  };

  return (
    <>
      <style jsx>{`
        @keyframes flip {
          0%, 100% { transform: rotateY(0deg) scale(1); }
          50% { transform: rotateY(180deg) scale(1.1); }
        }
        @keyframes shy {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(-15deg) translateY(-5px); }
          50% { transform: rotate(15deg) translateY(-8px); opacity: 0.7; }
          75% { transform: rotate(-10deg) translateY(-5px); }
        }
        @keyframes runaway {
          0% { transform: translateX(0) scale(1); }
          30% { transform: translateX(-200px) scale(0.8) rotate(-20deg); opacity: 0; }
          31% { transform: translateX(200px) scale(0.8) rotate(20deg); opacity: 0; }
          100% { transform: translateX(0) scale(1) rotate(0deg); opacity: 1; }
        }
        @keyframes wave {
          0%, 100% { transform: rotate(0deg); }
          10% { transform: rotate(14deg); }
          20% { transform: rotate(-8deg); }
          30% { transform: rotate(14deg); }
          40% { transform: rotate(-4deg); }
          50% { transform: rotate(10deg); }
          60% { transform: rotate(0deg); }
        }
      `}</style>
      
      <div className="absolute -top-6 -right-6 group" ref={mascotRef}>
        <div 
          className={`relative hover:scale-110 transition-all duration-300 cursor-pointer ${getAnimationClass()}`}
          onClick={handleClick}
        >
          <div className="relative w-16 h-20">
            {/* Head */}
            <div className="absolute inset-x-0 top-0 h-14 bg-gradient-to-br from-blue-400 via-blue-500 to-indigo-600 rounded-2xl shadow-xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-white/10 to-transparent"></div>
              
              {/* Antenna */}
              <div className="absolute -top-2 left-1/2 -translate-x-1/2">
                <div className="w-0.5 h-2 bg-indigo-400 mx-auto"></div>
                <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full animate-pulse"></div>
              </div>
              
              {/* Eyes */}
              <div className="absolute top-4 left-1/2 -translate-x-1/2 flex gap-2">
                <div className="w-5 h-5 bg-white rounded-full shadow-inner flex items-center justify-center">
                  {!isBlinking ? (
                    <div 
                      className="w-2.5 h-2.5 bg-gray-900 rounded-full transition-all duration-100 relative"
                      style={{
                        transform: `translate(${eyePosition.x}px, ${eyePosition.y}px)`
                      }}
                    >
                      <div className="absolute top-0.5 left-0.5 w-1 h-1 bg-white rounded-full"></div>
                    </div>
                  ) : (
                    <div className="w-3 h-0.5 bg-gray-900 rounded-full"></div>
                  )}
                </div>
                
                <div className="w-5 h-5 bg-white rounded-full shadow-inner flex items-center justify-center">
                  {!isBlinking ? (
                    <div 
                      className="w-2.5 h-2.5 bg-gray-900 rounded-full transition-all duration-100 relative"
                      style={{
                        transform: `translate(${eyePosition.x}px, ${eyePosition.y}px)`
                      }}
                    >
                      <div className="absolute top-0.5 left-0.5 w-1 h-1 bg-white rounded-full"></div>
                    </div>
                  ) : (
                    <div className="w-3 h-0.5 bg-gray-900 rounded-full"></div>
                  )}
                </div>
              </div>
              
              {/* Mouth */}
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2">
                {isSmiling ? (
                  <svg width="12" height="6" viewBox="0 0 12 6">
                    <path d="M2,1 Q6,5 10,1" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
                  </svg>
                ) : (
                  <svg width="12" height="6" viewBox="0 0 12 6">
                    <path d="M2,1 Q6,3 10,1" stroke="white" strokeWidth="1" fill="none" strokeLinecap="round" opacity="0.5"/>
                  </svg>
                )}
              </div>
              
              {/* Blush */}
              {animation === 'shy' && (
                <>
                  <div className="absolute bottom-3 left-0.5 w-2 h-1.5 bg-pink-400/60 rounded-full blur-sm"></div>
                  <div className="absolute bottom-3 right-0.5 w-2 h-1.5 bg-pink-400/60 rounded-full blur-sm"></div>
                </>
              )}
            </div>
            
            {/* Body */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-10 h-7 bg-gradient-to-br from-indigo-500 via-blue-600 to-purple-700 rounded-lg shadow-lg">
              <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent rounded-lg"></div>
            </div>
            
            {/* Sparkles */}
            <div className="absolute -top-1 -right-2 w-1 h-1">
              <div className="absolute inset-0 bg-cyan-400 rounded-full animate-ping"></div>
            </div>
          </div>
          
          <div className="absolute inset-0 bg-blue-500/30 blur-xl -z-10"></div>
        </div>
        
        {/* Tooltip */}
        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 hidden group-hover:block z-50">
          <div className="bg-blue-600 text-white text-xs px-3 py-1 rounded-lg whitespace-nowrap shadow-lg">
            Click me! 👋
          </div>
        </div>
      </div>
    </>
  );
};

export const AIChat = () => {
  const [messages, setMessages] = useState<Message[]>([
    { 
      id: 1, 
      text: "Hi! I'm your AI assistant. Ask me anything about this portfolio or chat with me!", 
      isBot: true 
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const isInitialMount = useRef(true);

  const scrollToBottom = () => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: input,
      isBot: false
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: input,
          history: messages.slice(-10) // Send last 10 messages for context
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const data = await response.json();

      const botMessage: Message = {
        id: messages.length + 2,
        text: data.response,
        isBot: true
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error: any) {
      console.error('Chat error:', error);
      const errorMessage: Message = {
        id: messages.length + 2,
        text: error?.message || "Sorry, I'm having trouble connecting. Please check the console for details.",
        isBot: true
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative w-full h-[450px] bg-[#1e1e1e] rounded-lg shadow-2xl border border-gray-700 overflow-hidden flex flex-col">
      {/* Mac-style traffic lights */}
      <div className="flex items-center gap-2 px-4 py-3 bg-[#2d2d2d] border-b border-gray-700">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
          <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
          <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
        </div>
        <span className="ml-2 text-[#b4b4b4] text-sm font-mono">AI Chat</span>
      </div>

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-hide">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
          >
            <div
              className={`max-w-[80%] p-3 rounded-lg font-mono text-sm ${
                message.isBot
                  ? 'bg-[#2d2d2d] text-[#f0f0f0] border border-gray-700'
                  : 'bg-[#5cb85c] text-white'
              }`}
            >
              {message.isBot && (
                <span className="text-[#5cb85c] font-bold">AI: </span>
              )}
              {message.text}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="max-w-[80%] p-3 rounded-lg bg-[#2d2d2d] text-[#f0f0f0] border border-gray-700 font-mono text-sm">
              <span className="text-[#5cb85c] font-bold">AI: </span>
              <span className="inline-flex gap-1">
                <span className="animate-pulse">●</span>
                <span className="animate-pulse" style={{ animationDelay: '0.2s' }}>●</span>
                <span className="animate-pulse" style={{ animationDelay: '0.4s' }}>●</span>
              </span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input area */}
      <div className="flex-shrink-0 p-4 bg-[#2d2d2d] border-t border-gray-700">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <div className="flex-1 relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#5cb85c] font-mono">$</span>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything..."
              disabled={isLoading}
              className="w-full bg-[#1e1e1e] text-[#f0f0f0] border border-gray-700 rounded px-8 py-2 font-mono text-sm focus:outline-none focus:border-[#5cb85c] disabled:opacity-50"
              style={{
                caretColor: '#5cb85c'
              }}
            />
          </div>
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="px-4 py-2 bg-[#5cb85c] text-white rounded font-mono text-sm hover:bg-[#4ca64c] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Send
          </button>
        </form>
      </div>

      {/* AI Mascot */}
      <CopilotMascot />
    </div>
  );
};
