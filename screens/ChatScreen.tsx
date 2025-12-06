import React, { useState, useRef, useEffect } from 'react';
import { 
  IconSend, IconPaperclip, IconSearch, IconMore
} from '../components/Icons';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
}

const ChatScreen: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
       id: '1',
       text: "Hi! I'm David, Kletta's AI assistant. How can I help with your accounting today?",
       sender: 'assistant',
       timestamp: new Date()
    }
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!inputText.trim()) return;

    const newMsg: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newMsg]);
    setInputText('');

    // Simulate AI response
    setTimeout(() => {
       const responseMsg: Message = {
         id: (Date.now() + 1).toString(),
         text: "That's a great question about deductions. Generally, you can deduct expenses that are directly related to your business operations. Would you like me to analyze your recent 'Office' expenses?",
         sender: 'assistant',
         timestamp: new Date()
       };
       setMessages(prev => [...prev, responseMsg]);
    }, 1500);
  };

  return (
    <div className="flex-1 flex flex-col bg-white h-full overflow-hidden font-aktifo animate-fade-in relative">
      
      {/* Top Bar */}
      <div className="bg-white px-6 pt-16 pb-4 flex justify-between items-center shadow-sm z-20 border-b border-gray-100">
        <div>
           <h1 className="text-2xl font-bold text-kletta-dark">Chat</h1>
           <p className="text-xs text-green-600 font-bold flex items-center gap-1">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span> Online
           </p>
        </div>
        <div className="flex gap-4 items-center">
            <button className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center font-bold text-kletta-teal border border-gray-200">
               DK
            </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="px-6 py-3 bg-white border-b border-gray-50 flex gap-2 overflow-x-auto no-scrollbar z-10">
         <TabPill label="All" active />
         <TabPill label="AI Assistant" />
         <TabPill label="Bookkeeper" />
         <TabPill label="Support" />
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto no-scrollbar p-6 space-y-6 bg-gray-50 pb-36">
         {messages.map((msg) => (
            <ChatBubble key={msg.id} message={msg} />
         ))}
         <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="absolute bottom-[90px] left-0 right-0 bg-white p-4 border-t border-gray-100 flex items-center gap-3">
         <button className="p-3 text-gray-400 hover:text-kletta-teal transition-colors">
            <IconPaperclip size={24} />
         </button>
         <div className="flex-1 bg-gray-100 rounded-2xl flex items-center px-4 py-1">
            <input 
               type="text" 
               className="bg-transparent w-full py-3 outline-none text-kletta-dark font-medium placeholder:text-gray-400"
               placeholder="Ask anything about finances..."
               value={inputText}
               onChange={(e) => setInputText(e.target.value)}
               onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            />
         </div>
         <button 
            onClick={handleSend}
            className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${inputText.trim() ? 'bg-kletta-teal text-white shadow-md transform scale-100' : 'bg-gray-200 text-gray-400 transform scale-95'}`}
         >
            <IconSend size={20} className={inputText.trim() ? 'translate-x-0.5' : ''} />
         </button>
      </div>
    </div>
  );
};

const TabPill = ({ label, active }: { label: string, active?: boolean }) => (
   <button className={`px-3 py-1.5 rounded-full text-[11px] font-bold whitespace-nowrap transition-colors ${active ? 'bg-kletta-dark text-white' : 'bg-white border border-gray-200 text-gray-500'}`}>
      {label}
   </button>
);

const ChatBubble: React.FC<{ message: Message }> = ({ message }) => {
   const isAssistant = message.sender === 'assistant';
   return (
      <div className={`flex w-full ${isAssistant ? 'justify-start' : 'justify-end'} animate-slide-up`}>
         <div className={`max-w-[80%] p-4 rounded-2xl text-[15px] leading-relaxed shadow-sm ${
            isAssistant 
               ? 'bg-white text-kletta-dark rounded-tl-none border border-gray-100' 
               : 'bg-kletta-yellow text-kletta-dark rounded-tr-none'
         }`}>
            {isAssistant && (
               <p className="text-[10px] font-bold text-kletta-teal mb-1 uppercase tracking-wider">David AI</p>
            )}
            <p className="font-medium">{message.text}</p>
         </div>
      </div>
   );
};

export default ChatScreen;