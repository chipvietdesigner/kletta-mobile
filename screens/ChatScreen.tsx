import React from 'react';
import { 
  IconCellSignalFull, IconWifiHigh, IconBatteryFull, 
  IconPlus, IconUserCircle, IconSparkle, IconMagnifyingGlass
} from '../components/Icons';

const ChatScreen: React.FC = () => {
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

      {/* Header - Cleaner */}
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
         
         {/* AI Chat Pinned - Lighter */}
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
               name="Support Team" 
               message="Your VAT report for June is ready for review. Please check the details." 
               time="2h ago" 
               unread 
            />
             <ChatRow 
               name="Accountant Pekka" 
               message="Can you upload the missing receipt for the lunch meeting on Tuesday?" 
               time="Yesterday" 
            />
             <ChatRow 
               name="System Notification" 
               message="Bank connection refreshed successfully." 
               time="Mon" 
            />
            <ChatRow 
               name="Tax Administration" 
               message="New tax card received for 2026." 
               time="Last Week" 
            />
         </div>

      </div>
    </div>
  );
};

const ChatRow = ({ name, message, time, unread }: { name: string, message: string, time: string, unread?: boolean }) => (
   <button className={`w-full px-6 py-4 flex items-start gap-4 hover:bg-gray-50 active:bg-gray-100 transition-colors border-b border-gray-50 ${unread ? 'bg-white' : 'bg-white'}`}>
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