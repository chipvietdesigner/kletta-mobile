import React, { useState, useRef, useEffect } from 'react';
import { 
  IconCellSignalFull, IconWifiHigh, IconBatteryFull, 
  IconPlus, IconUserCircle, IconSparkle, IconMagnifyingGlass,
  IconBack, IconPaperclip, IconSend, IconCheck
} from '../components/Icons';

// --- Types ---
interface Message {
  id: string;
  text: string;
  sender: 'user' | 'support';
  time: string;
  isLink?: boolean;
  showTranslate?: boolean;
}

// --- Mock Conversation Data ---
const MOCK_CONVERSATION: Message[] = [
  { id: '1', text: "Hello! 👋", sender: 'support', time: '10:00' },
  { id: '2', text: "Welcome to Kletta support. How can I assist you today?", sender: 'support', time: '10:00', showTranslate: true },
  { id: '3', text: "Hi, I have a question about my VAT return for Q1.", sender: 'user', time: '10:05' },
  { id: '4', text: "It says 'Not Ready' but I've uploaded all receipts.", sender: 'user', time: '10:05' },
  { id: '5', text: "I can help with that. Let me check your account details.", sender: 'support', time: '10:08', showTranslate: true },
  { id: '6', text: "It looks like one receipt from March 15th is missing a category.", sender: 'support', time: '10:09' },
  { id: '7', text: "Please categorize it and the report will update automatically.", sender: 'support', time: '10:09', showTranslate: true },
  { id: '8', text: "Ah, I see it now. Thanks!", sender: 'user', time: '10:12' },
];

const ChatScreen: React.FC = () => {
  const [activeChat, setActiveChat] = useState<string | null>(null);

  if (activeChat) {
    return <ChatConversation onBack={() => setActiveChat(null)} />;
  }

  return (
    <div className="h-full w-full bg-white flex flex-col font-aktifo animate-fade-in relative overflow-hidden">
      
      {/* Status Bar */}
      <div className="w-full h-[50px] flex justify-between items-end px-6 pb-2 text-kletta-dark pointer-events-none z-20">
          <span className="text-[15px] font-medium tracking-normal leading-none ml-2">9:41</span>
          <div className="flex gap-1.5 items-center mr-1">
             <IconCellSignalFull size={16} weight="fill" />
             <IconWifiHigh size={16} weight="bold" />
             <IconBatteryFull size={24} weight="fill" className="rotate-0" />
          </div>
      </div>

      {/* Header */}
      <div className="px-6 pt-4 pb-4 flex items-center justify-between z-10 border-b border-gray-50">
         <h1 className="text-[26px] font-medium text-kletta-dark tracking-tight">Messages</h1>
         <div className="flex gap-2">
            <button className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors">
                <IconMagnifyingGlass size={24} weight="bold" className="text-kletta-dark" />
            </button>
            <button className="w-10 h-10 -mr-2 rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors">
                <IconPlus size={24} weight="regular" className="text-kletta-dark" />
            </button>
         </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto no-scrollbar pb-32">
         
         {/* AI Chat Pinned */}
         <button className="w-full px-6 py-5 flex items-start gap-4 hover:bg-gray-50 transition-colors border-b border-gray-50 bg-[#F0FDFB]">
            <div className="w-10 h-10 rounded-full bg-kletta-teal flex items-center justify-center text-kletta-yellow shrink-0 shadow-sm">
               <IconSparkle size={20} weight="fill" />
            </div>
            <div className="flex-1 text-left pt-0.5">
               <div className="flex justify-between items-center mb-1">
                  <p className="text-[15px] font-bold text-kletta-dark">Kletta AI</p>
                  <p className="text-[11px] font-medium text-kletta-teal">Now</p>
               </div>
               <p className="text-[13px] font-light text-kletta-dark leading-relaxed opacity-90">I noticed a recurring payment. Do you want to set it as a subscription rule?</p>
            </div>
         </button>

         {/* Chat List */}
         <div>
             <ChatRow 
               name="Kletta Tuki Support" 
               message="Please categorize it and the report..." 
               time="2m ago" 
               unread 
               onClick={() => setActiveChat('support')}
            />
             <ChatRow 
               name="Accountant Pekka" 
               message="Can you upload the missing receipt for the lunch meeting on Tuesday?" 
               time="Yesterday" 
               onClick={() => setActiveChat('pekka')}
            />
             <ChatRow 
               name="System Notification" 
               message="Bank connection refreshed successfully." 
               time="Mon" 
               onClick={() => setActiveChat('system')}
            />
            <ChatRow 
               name="Tax Administration" 
               message="New tax card received for 2026." 
               time="Last Week" 
               onClick={() => setActiveChat('tax')}
            />
         </div>

      </div>
    </div>
  );
};

// --- Sub-Screen: Conversation View ---
const ChatConversation = ({ onBack }: { onBack: () => void }) => {
    const [messages, setMessages] = useState<Message[]>(MOCK_CONVERSATION);
    const [inputValue, setInputValue] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = () => {
        if (!inputValue.trim()) return;
        const newMsg: Message = {
            id: Date.now().toString(),
            text: inputValue,
            sender: 'user',
            time: 'Now'
        };
        setMessages([...messages, newMsg]);
        setInputValue('');
    };

    return (
        <div className="h-full w-full bg-white flex flex-col font-aktifo animate-slide-in relative overflow-hidden z-30">
             
             {/* Header */}
             <div className="w-full bg-white z-20 shrink-0 border-b border-gray-100 shadow-sm">
                <div className="w-full h-[50px] flex justify-between items-end px-6 pb-2 text-kletta-dark pointer-events-none">
                    <span className="text-[15px] font-medium tracking-normal leading-none ml-2">9:41</span>
                    <div className="flex gap-1.5 items-center mr-1">
                        <IconCellSignalFull size={16} weight="fill" />
                        <IconWifiHigh size={16} weight="bold" />
                        <IconBatteryFull size={24} weight="fill" className="rotate-0" />
                    </div>
                </div>

                <div className="px-4 py-3 flex items-center gap-3">
                    <button 
                        onClick={onBack} 
                        className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-50 active:bg-gray-100 transition-colors text-kletta-dark shrink-0"
                    >
                        <IconBack size={26} weight="bold" />
                    </button>
                    
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5">
                            <h1 className="text-[17px] font-bold text-kletta-dark truncate">Kletta Tuki Support</h1>
                            {/* Verified badge mock */}
                            <div className="w-3.5 h-3.5 bg-kletta-teal rounded-full flex items-center justify-center">
                                <IconCheck size={10} color="white" weight="bold" />
                            </div>
                        </div>
                        <p className="text-[12px] text-gray-400 font-light truncate">Typically replies in two business days</p>
                    </div>

                    <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-50 text-gray-400 shrink-0">
                        <IconUserCircle size={24} weight="fill" />
                    </div>
                </div>
             </div>

             {/* Message List */}
             <div className="flex-1 overflow-y-auto no-scrollbar bg-white p-4 space-y-1 pb-4">
                 <div className="flex justify-center my-6">
                     <span className="text-[11px] font-medium text-gray-300 uppercase tracking-widest bg-gray-50 px-3 py-1 rounded-full">Today</span>
                 </div>
                 
                 {messages.map((msg, index) => {
                     const isLast = index === messages.length - 1;
                     const isNextSame = messages[index + 1]?.sender === msg.sender;
                     const isPrevSame = messages[index - 1]?.sender === msg.sender;
                     
                     return (
                         <MessageBubble 
                            key={msg.id}
                            message={msg}
                            isNextSame={isNextSame}
                            isPrevSame={isPrevSame}
                         />
                     );
                 })}
                 <div ref={messagesEndRef} />
             </div>

             {/* Input Area */}
             <div className="shrink-0 bg-white border-t border-gray-100 p-4 pb-10">
                 <div className="flex items-end gap-3">
                     <button className="w-10 h-12 flex items-center justify-center text-gray-400 hover:text-kletta-teal transition-colors rounded-xl hover:bg-gray-50 shrink-0">
                         <IconPaperclip size={24} weight="bold" />
                     </button>
                     
                     <div className="flex-1 bg-gray-50 rounded-[20px] border border-gray-200 focus-within:border-kletta-teal focus-within:ring-2 focus-within:ring-kletta-teal/5 transition-all flex items-center min-h-[48px]">
                         <input 
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                            placeholder="Send a message..."
                            className="w-full h-full bg-transparent px-4 py-3 text-[15px] text-kletta-dark outline-none placeholder:text-gray-400"
                         />
                     </div>

                     <button 
                        onClick={handleSend}
                        disabled={!inputValue.trim()}
                        className={`w-12 h-12 rounded-full flex items-center justify-center shadow-sm transition-all shrink-0 ${inputValue.trim() ? 'bg-kletta-teal text-white hover:shadow-md active:scale-95' : 'bg-gray-100 text-gray-300'}`}
                     >
                         <IconSend size={20} weight="fill" className={inputValue.trim() ? 'translate-x-0.5' : ''} />
                     </button>
                 </div>
             </div>
        </div>
    );
};

// --- Message Bubble Component ---
const MessageBubble = ({ message, isNextSame, isPrevSame }: { message: Message, isNextSame: boolean, isPrevSame: boolean }) => {
    const isUser = message.sender === 'user';
    
    // Bubble Radius Logic
    // User: Default round, Top-Right sharp if prev same, Bottom-Right sharp if next same
    // Support: Default round, Top-Left sharp if prev same, Bottom-Left sharp if next same
    
    let borderRadius = 'rounded-[18px]';
    if (isUser) {
        if (isNextSame && isPrevSame) borderRadius = 'rounded-[18px] rounded-r-[4px]';
        else if (isNextSame) borderRadius = 'rounded-[18px] rounded-br-[4px]';
        else if (isPrevSame) borderRadius = 'rounded-[18px] rounded-tr-[4px]';
        else borderRadius = 'rounded-[18px] rounded-tr-[4px]'; // First msg usually sharp corner for visual anchor
    } else {
        if (isNextSame && isPrevSame) borderRadius = 'rounded-[18px] rounded-l-[4px]';
        else if (isNextSame) borderRadius = 'rounded-[18px] rounded-bl-[4px]';
        else if (isPrevSame) borderRadius = 'rounded-[18px] rounded-tl-[4px]';
        else borderRadius = 'rounded-[18px] rounded-tl-[4px]';
    }

    return (
        <div className={`flex w-full ${isUser ? 'justify-end' : 'justify-start'} ${isNextSame ? 'mb-1' : 'mb-4'}`}>
            <div className={`max-w-[80%] flex flex-col ${isUser ? 'items-end' : 'items-start'}`}>
                <div 
                    className={`px-4 py-3 text-[15px] leading-relaxed shadow-sm ${borderRadius} ${isUser ? 'bg-kletta-teal text-white' : 'bg-[#F2F4F5] text-kletta-dark'}`}
                >
                    {message.text}
                </div>
                
                {/* Translate Action (Support only) */}
                {!isUser && message.showTranslate && !isNextSame && (
                    <button className="text-[11px] font-medium text-kletta-teal mt-1.5 ml-1 hover:underline flex items-center gap-1">
                        <IconSparkle size={10} weight="fill" /> Translate to English
                    </button>
                )}

                {/* Timestamp (Only show at end of group) */}
                {!isNextSame && (
                    <span className={`text-[10px] text-gray-300 mt-1.5 font-medium ${isUser ? 'mr-1' : 'ml-1'}`}>
                        {message.time}
                    </span>
                )}
            </div>
        </div>
    );
};

// --- List Row Component ---
const ChatRow = ({ name, message, time, unread, onClick }: { name: string, message: string, time: string, unread?: boolean, onClick: () => void }) => (
   <button 
      onClick={onClick}
      className={`w-full px-6 py-4 flex items-start gap-4 hover:bg-gray-50 active:bg-gray-100 transition-colors border-b border-gray-50 ${unread ? 'bg-white' : 'bg-white'}`}
   >
      <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 shrink-0">
         <IconUserCircle size={24} weight="fill" />
      </div>
      <div className="flex-1 text-left pt-0.5 overflow-hidden">
         <div className="flex justify-between items-center mb-0.5">
            <p className={`text-[15px] ${unread ? 'font-bold text-kletta-dark' : 'font-medium text-kletta-dark'}`}>{name}</p>
            <p className={`text-[11px] ${unread ? 'text-kletta-teal font-bold' : 'text-gray-400 font-light'}`}>{time}</p>
         </div>
         <p className={`text-[13px] truncate leading-relaxed ${unread ? 'font-medium text-kletta-dark' : 'font-light text-gray-500'}`}>{message}</p>
      </div>
      {unread && (
         <div className="w-2 h-2 rounded-full bg-kletta-teal shrink-0 mt-2"></div>
      )}
   </button>
);

export default ChatScreen;