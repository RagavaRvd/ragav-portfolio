'use client';

import { useState, useRef, useEffect } from 'react';

interface Message {
  id: number;
  text: string;
  isBot: boolean;
  category?: string;
  qrCode?: string;
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

const PortfolioChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const isInitialMount = useRef(true);
  const [displayedText, setDisplayedText] = useState('');
  const [isInitialTyping, setIsInitialTyping] = useState(true);

  const initialMessage = "👋 Hi there! I'm an AI-powered assistant here to help you learn about Ragavendiran's portfolio.\n\n💡 Try asking me:\n• Show me his resume 📄\n• What projects has he worked on?\n• Tell me about his technical skills\n• What awards has he won?\n• Show me his experience\n\nGo ahead, I'm interactive! 🤖✨";

  // Terminal typing effect for initial message
  useEffect(() => {
    let currentIndex = 0;
    const typingSpeed = 20; // milliseconds per character
    
    const typeNextCharacter = () => {
      if (currentIndex < initialMessage.length) {
        setDisplayedText(initialMessage.slice(0, currentIndex + 1));
        currentIndex++;
        setTimeout(typeNextCharacter, typingSpeed);
      } else {
        setIsInitialTyping(false);
        setMessages([{
          id: 1,
          text: initialMessage,
          isBot: true,
        }]);
      }
    };

    // Start typing after a brief delay
    const timer = setTimeout(typeNextCharacter, 300);
    
    return () => clearTimeout(timer);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' });
  };

  useEffect(() => {
    // Skip scroll on initial mount
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    scrollToBottom();
  }, [messages]);

  // Knowledge base with portfolio data
  const knowledgeBase: Record<string, { keywords: string[]; response: { category: string; text: string; qrCode?: boolean } }> = {
    experience: {
      keywords: ['experience', 'years', 'work', 'career', 'background', 'history', 'worked'],
      response: {
        category: 'Experience',
        text: "I have **8.5+ years** of experience as a Full-Stack Engineering Leader. Currently serving as **Associate Manager at Tredence** (May 2022 - Present), where I've architected 5+ production-grade SaaS platforms generating **$3.8M+ revenue**. Previously worked at Aspire Systems, Mobinius, and founded The Casttree marketplace.",
      },
    },
    skills: {
      keywords: ['skill', 'tech', 'technology', 'stack', 'language', 'framework', 'tool'],
      response: {
        category: 'Tech Stack',
        text: "My core expertise includes:\n\n**Frontend**: React.js, Angular, Next.js, TypeScript, Tailwind CSS\n**Backend**: Node.js, Express.js, REST APIs, GraphQL, Microservices\n**Database**: PostgreSQL, MongoDB, Redis\n**Cloud**: AWS, Azure, Docker, CI/CD\n\nI specialize in the **MERN/MEAN stack** and have built enterprise applications serving 500K+ users!",
      },
    },
    projects: {
      keywords: ['project', 'built', 'created', 'developed', 'portfolio', 'work'],
      response: {
        category: 'Featured Projects',
        text: "Here are my key projects:\n\n🏆 **Enterprise SaaS Platforms** - $3.8M impact, serving Fortune 500 clients\n⚡ **Sales Automation Platform** - 500K users, processing 100K+ daily transactions\n🎬 **The Casttree Marketplace** - 10K+ creatives, AI-powered talent marketplace\n📦 **NPM Package** - Published 'not-payouts-razorpayx' used by 100+ companies",
      },
    },
    achievements: {
      keywords: ['achievement', 'award', 'recognition', 'accomplish', 'success', 'won'],
      response: {
        category: 'Achievements',
        text: "My key achievements include:\n\n🏆 **4x Award Winner** for technical innovation and delivery excellence\n💰 **$3.8M+ in contract value** delivered\n👥 **Mentored 15+ developers** and established coding standards\n📦 **Published NPM author** with production package\n⚡ **99.8% uptime** maintained across mission-critical systems\n🚀 **60% faster deployments** through microservices migration",
      },
    },
    current: {
      keywords: ['current', 'now', 'present', 'today', 'currently', 'recent'],
      response: {
        category: 'Current Role',
        text: "I'm currently working as **Associate Manager at Tredence** in Bangalore (May 2022 - Present). I lead full-stack engineering teams, architect enterprise B2B SaaS platforms, and bridge C-suite stakeholders with engineering excellence. I've achieved 95%+ client satisfaction and zero critical defects in 18 months!",
      },
    },
    contact: {
      keywords: ['contact', 'email', 'phone', 'reach', 'hire', 'available', 'linkedin'],
      response: {
        category: 'Contact Info',
        text: "I'm **open to opportunities**! Here's how to reach me:\n\n📧 **Email**: ragavarvd@gmail.com\n📞 **Phone**: +91-96778-22758\n💼 **LinkedIn**: linkedin.com/in/ragav-g\n\nFeel free to reach out for collaborations, opportunities, or just to connect!",
      },
    },
    resume: {
      keywords: ['resume', 'cv', 'curriculum', 'download', 'pdf', 'document'],
      response: {
        category: 'Resume',
        text: "📄 Here's my complete resume! You can **view it online** or **scan the QR code** below with your phone for instant access.\n\n🔗 **Google Drive Link**: Open in browser for full details\n\n📱 **Quick Access**: Scan the QR code to view on any device!",
        qrCode: true,
      },
    },
    education: {
      keywords: ['education', 'degree', 'college', 'university', 'study', 'graduate'],
      response: {
        category: 'Education',
        text: "I hold a **B.Tech in Information Technology** from Sri Ramakrishna Engineering College (2013-2017) with a CGPA of 7.5/10. My technical foundation combined with 8.5+ years of hands-on experience has shaped me into a full-stack engineering leader.",
      },
    },
    companies: {
      keywords: ['company', 'companies', 'employer', 'organization', 'tredence', 'aspire', 'mobinius'],
      response: {
        category: 'Work History',
        text: "I've worked at leading tech companies:\n\n1. **Tredence** (2022-Present) - Associate Manager\n2. **Aspire Systems** (2021-2022) - Senior Software Developer\n3. **Mobinius** (2020) - Senior Software Developer\n4. **NextONTOP** (2017-2019) - Senior Application Developer\n\nEach role contributed to my expertise in enterprise architecture and full-stack development.",
      },
    },
  };

  const suggestedQuestions = [
    { text: "Show me your resume", category: 'resume' },
    { text: "What's your experience level?", category: 'experience' },
    { text: "What tech stack do you use?", category: 'skills' },
    { text: "Tell me about your achievements", category: 'achievements' },
    { text: "How can I contact you?", category: 'contact' },
  ];

  const generateResumeQRCode = () => {
    const resumeUrl = 'https://drive.google.com/file/d/1enfkRnO4uRMXaPGoiTPfS3KrA7bpB2hN/view?usp=sharing';
    // Using QR Server API for instant generation
    return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(resumeUrl)}&ecc=M&color=30-64-175&bgcolor=255-255-255`;
  };

  const getResponse = (query: string): Message => {
    const lowerQuery = query.toLowerCase();
    
    // Check each category for keyword matches
    for (const [key, data] of Object.entries(knowledgeBase)) {
      if (data.keywords.some(keyword => lowerQuery.includes(keyword))) {
        const response: Message = {
          id: Date.now(),
          text: data.response.text,
          isBot: true,
          category: data.response.category,
        };
        
        // Add QR code for resume requests
        if (data.response.qrCode) {
          response.qrCode = generateResumeQRCode();
        }
        
        return response;
      }
    }

    // Default response if no match found
    return {
      id: Date.now(),
      text: "Great question! While I can answer questions about Ragavendiran's **experience, skills, projects, achievements, education, resume, or contact information**, I didn't quite catch that. Try asking about his tech stack, work history, or download his resume! 🤔",
      isBot: true,
    };
  };

  const handleSend = async (messageText?: string) => {
    const textToSend = messageText || inputValue.trim();
    if (!textToSend) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now(),
      text: textToSend,
      isBot: false,
    };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI thinking time
    await new Promise(resolve => setTimeout(resolve, 800));

    // Get AI response
    const botResponse = getResponse(textToSend);
    setMessages(prev => [...prev, botResponse]);
    setIsTyping(false);
  };

  const handleSuggestedQuestion = (question: string) => {
    handleSend(question);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      e.stopPropagation();
      handleSend();
    }
  };

  return (
    <div className="relative">
      {/* Chat window - macOS Terminal style */}
      <div className="bg-[#1e1e1e] rounded-lg shadow-2xl overflow-hidden flex flex-col h-[450px] w-full font-mono">
        {/* Header - Terminal style */}
        <div className="flex items-center justify-between px-3 py-2.5 bg-[#2d2d2d] border-b border-[#3d3d3d]">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#ff5f57] hover:bg-[#ff5f57]/80 transition-colors cursor-pointer"></div>
            <div className="w-3 h-3 rounded-full bg-[#febc2e] hover:bg-[#febc2e]/80 transition-colors cursor-pointer"></div>
            <div className="w-3 h-3 rounded-full bg-[#28c840] hover:bg-[#28c840]/80 transition-colors cursor-pointer"></div>
          </div>
          <div className="flex items-center gap-2">
            <div className="text-[#b4b4b4] text-xs font-medium">portfolio-assistant — bash — 80×24</div>
            <div className="group relative">
              <span className="text-[#4ec9b0] text-xs animate-pulse">● AI</span>
              <div className="absolute hidden group-hover:block bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-[#3d3d3d] text-[#b4b4b4] text-xs rounded whitespace-nowrap z-10 shadow-lg">
                AI-Powered Interactive Chat
                <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-[#3d3d3d]"></div>
              </div>
            </div>
          </div>
          <div className="w-16"></div>
        </div>

        {/* Chat messages */}
        <div className="p-4 space-y-3 flex-1 overflow-y-auto scrollbar-hide">
          {/* Initial typing animation */}
          {isInitialTyping && (
            <div className="flex gap-2 animate-fadeIn">
              <div className="flex-1">
                <div className="text-[#b4b4b4] text-xs leading-relaxed whitespace-pre-line">
                  {displayedText}
                  <span className="inline-block w-2 h-4 bg-[#b4b4b4] ml-1 animate-pulse"></span>
                </div>
              </div>
            </div>
          )}
          
          {messages.map((message, index) => (
            <div
              key={message.id}
              className={`flex gap-2 animate-fadeIn ${index === 0 ? '' : 'animate-slideIn'}`}
            >
              <div className="flex-1">
                {message.isBot ? (
                  <div className="text-[#b4b4b4] text-xs leading-relaxed">
                    {message.category && (
                      <div className="text-[#5cb85c] mb-1.5 font-semibold">
                        # {message.category}
                      </div>
                    )}
                    <div className="whitespace-pre-line">
                      {message.text.split('**').map((part, i) => 
                        i % 2 === 0 ? part : <span key={i} className="text-white font-semibold">{part}</span>
                      )}
                    </div>
                    
                    {/* QR Code Display */}
                    {message.qrCode && (
                      <div className="mt-3 p-3 bg-[#2d2d2d] rounded-lg border border-[#3d3d3d] inline-block">
                        <div className="flex items-start gap-3">
                          <div className="relative group">
                            <img 
                              src={message.qrCode} 
                              alt="Resume QR Code" 
                              className="w-[140px] h-[140px] rounded-lg border-2 border-white shadow-lg hover:scale-105 transition-transform cursor-pointer"
                              onClick={() => window.open('https://drive.google.com/file/d/1enfkRnO4uRMXaPGoiTPfS3KrA7bpB2hN/view?usp=sharing', '_blank')}
                            />
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                          </div>
                          <div className="flex-1 space-y-2">
                            <div className="text-[#808080] text-[10px] leading-relaxed">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-[#5cb85c]">►</span>
                                <span className="text-white font-semibold">Scan with phone</span>
                              </div>
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-[#5cb85c]">►</span>
                                <span className="text-white font-semibold">Click to download</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="text-[#5cb85c]">►</span>
                                <span className="text-white font-semibold">Share instantly</span>
                              </div>
                            </div>
                            <a
                              href="https://drive.google.com/file/d/1enfkRnO4uRMXaPGoiTPfS3KrA7bpB2hN/view?usp=sharing"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-block mt-2 px-3 py-1.5 bg-[#5cb85c] hover:bg-[#4ea84a] text-black text-[10px] font-bold rounded transition-colors"
                            >
                              📄 VIEW RESUME
                            </a>
                          </div>
                        </div>
                        <div className="mt-2 pt-2 border-t border-[#3d3d3d] text-[#808080] text-[9px]">
                          💡 QR Code expires never • Works offline • Mobile-optimized
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="flex items-start gap-2">
                    <span className="text-[#5cb85c] flex-shrink-0">$</span>
                    <span className="text-[#f0f0f0] text-xs">{message.text}</span>
                  </div>
                )}
              </div>
            </div>
          ))}

          {/* Suggested questions - only show after initial message */}
          {messages.length === 1 && (
            <div className="flex flex-col gap-1.5 mt-3 border-l-2 border-[#3d3d3d] pl-3">
              <p className="text-[#808080] text-[10px] mb-1"># Try these commands:</p>
              {suggestedQuestions.map((q, i) => (
                <button
                  key={i}
                  onClick={() => handleSuggestedQuestion(q.text)}
                  className="text-left hover:bg-[#2d2d2d] px-2 py-1.5 text-[10px] text-[#808080] hover:text-[#b4b4b4] transition-colors rounded"
                >
                  <span className="text-[#5cb85c] mr-1">$</span> {q.text}
                </button>
              ))}
            </div>
          )}

          {/* Typing indicator */}
          {isTyping && (
            <div className="flex items-center gap-1.5">
              <span className="text-[#b4b4b4] text-xs">Processing</span>
              <div className="flex gap-0.5">
                <span className="text-[#b4b4b4] animate-pulse">.</span>
                <span className="text-[#b4b4b4] animate-pulse" style={{ animationDelay: '0.2s' }}>.</span>
                <span className="text-[#b4b4b4] animate-pulse" style={{ animationDelay: '0.4s' }}>.</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input area */}
        <div className="px-4 py-3 bg-[#1e1e1e] border-t border-[#3d3d3d] flex-shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-[#5cb85c] text-xs flex-shrink-0">$</span>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="enter command..."
              className="flex-1 bg-transparent text-[#f0f0f0] placeholder-[#666666] text-xs focus:outline-none caret-[#5cb85c]"
            />
          </div>
        </div>
      </div>

      {/* GitHub Copilot mascot watching in corner */}
      <CopilotMascot />
    </div>
  );
};

export default PortfolioChat;
