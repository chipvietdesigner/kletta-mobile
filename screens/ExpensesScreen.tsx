import React, { useState } from 'react';
import { 
  IconCellSignalFull, IconWifiHigh, IconBatteryFull, 
  IconPlus, IconChevronDown, IconReceipt
} from '../components/Icons';

// --- Helper: List Image ---
const ExpenseListImage = ({ src, alt }: { src?: string, alt?: string }) => {
  const [error, setError] = useState(false);
  
  if (!src || error) {
    return (
      <div className="w-11 h-11 rounded-[12px] bg-gray-50 flex items-center justify-center border border-gray-100 shrink-0">
         <IconReceipt size={20} className="text-gray-300" weight="fill" />
      </div>
    );
  }

  return (
    <div className="w-11 h-11 rounded-[12px] bg-gray-50 overflow-hidden border border-gray-100 shrink-0 relative">
      <img 
        src={src} 
        alt={alt} 
        onError={() => setError(true)}
        className="w-full h-full object-cover"
      />
    </div>
  );
};

const ExpensesScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'receipts' | 'trips'>('receipts');

  return (
    <div className="h-full w-full bg-white flex flex-col font-aktifo animate-fade-in relative overflow-hidden">
      
      {/* Header Section - Dark Theme (Kletta Teal) */}
      <div className="w-full bg-kletta-teal flex flex-col z-20 pb-6 pt-0 shadow-sm">

          {/* Status Bar - White Text */}
          <div className="w-full h-[50px] flex justify-between items-end px-6 pb-2 text-white pointer-events-none">
              <span className="text-[15px] font-medium tracking-normal leading-none ml-2">9:41</span>
              <div className="flex gap-1.5 items-center mr-1">
                 <IconCellSignalFull size={16} weight="fill" />
                 <IconWifiHigh size={16} weight="bold" />
                 <IconBatteryFull size={24} weight="fill" className="rotate-0" />
              </div>
          </div>

          {/* Header Content */}
          <div className="px-6 pt-2 flex flex-col">
              {/* Title Row */}
              <div className="flex justify-between items-center mb-6">
                 <div className="flex flex-col">
                     <h1 className="text-[26px] font-medium text-white tracking-tight mb-0.5">Expenses</h1>
                     <div className="flex items-center gap-1 opacity-70 text-white transition-opacity hover:opacity-100 cursor-pointer">
                         <span className="text-[13px] font-medium">All time</span>
                         <IconChevronDown size={12} weight="bold" />
                     </div>
                 </div>
                 <button className="w-10 h-10 -mr-2 flex items-center justify-center rounded-full text-white hover:bg-white/10 transition-colors">
                    <IconPlus size={24} weight="regular" />
                 </button>
              </div>

              {/* Segmented Control - Dark Transparent Track */}
              <div className="w-full h-[38px] bg-white/10 p-0.5 rounded-full flex relative backdrop-blur-sm">
                  <button 
                    onClick={() => setActiveTab('receipts')}
                    className={`flex-1 rounded-full text-[13px] font-medium transition-all z-10 duration-200 ${activeTab === 'receipts' ? 'bg-white text-kletta-dark shadow-sm' : 'text-white/70 hover:bg-white/5 hover:text-white'}`}
                  >
                    Receipts
                  </button>
                  <button 
                    onClick={() => setActiveTab('trips')}
                    className={`flex-1 rounded-full text-[13px] font-medium transition-all z-10 duration-200 ${activeTab === 'trips' ? 'bg-white text-kletta-dark shadow-sm' : 'text-white/70 hover:bg-white/5 hover:text-white'}`}
                  >
                    Trips
                  </button>
              </div>
          </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto no-scrollbar pb-32 pt-0 bg-white">
         
         {/* Date Header */}
         <div className="px-6 pt-5 pb-3 bg-white/95 sticky top-0 backdrop-blur-sm z-10 border-b border-gray-50">
             <p className="text-[12px] font-medium text-[#6F7683] uppercase tracking-wider">Today</p>
         </div>

         <ExpenseRow 
            merchant="A-T Lastenturva"
            date="14:30"
            amount="€149.00"
            category="Other deductible"
            imageUrl="https://images.unsplash.com/photo-1542838132-92c53300491e?w=100&h=100&fit=crop"
         />
         <ExpenseRow 
            merchant="TSUKI"
            date="12:15"
            amount="€31.00"
            category="Representation"
            imageUrl="https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?w=100&h=100&fit=crop"
         />
         <ExpenseRow 
            merchant="HELSINGIN KAUPUNKI"
            date="09:45"
            amount="€60.00"
            category="Non-allowable"
            imageUrl="https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=100&h=100&fit=crop"
         />

         {/* Date Header */}
         <div className="px-6 pt-6 pb-3 bg-white/95 sticky top-0 backdrop-blur-sm z-10 border-b border-gray-50 mt-2">
             <p className="text-[12px] font-medium text-[#6F7683] uppercase tracking-wider">Yesterday</p>
         </div>

         <ExpenseRow 
            merchant="Clas Ohlson"
            date="18:20"
            amount="€8.99"
            category="Purchases"
            imageUrl="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=100&h=100&fit=crop"
         />
         <ExpenseRow 
            merchant="JYSK OY"
            date="16:00"
            amount="€7.97"
            category="Other deductible"
            imageUrl="https://images.unsplash.com/photo-1616627561839-074385245cf6?w=100&h=100&fit=crop"
         />
         <ExpenseRow 
            merchant="Prisma Kamppi"
            date="08:30"
            amount="€12.50"
            category="Refreshments"
            imageUrl="https://images.unsplash.com/photo-1534073828943-f801091a7174?w=100&h=100&fit=crop"
         />

      </div>
    </div>
  );
};

const ExpenseRow = ({ merchant, date, amount, category, imageUrl }: any) => {
   // Format meta string
   const metaString = `${date} • ${category}`;

   return (
      <button className="w-full px-6 py-3 flex items-center gap-4 transition-colors border-b border-gray-50 bg-white hover:bg-gray-50 group text-left min-h-[72px]">
         
         {/* Image */}
         <ExpenseListImage src={imageUrl} alt={merchant} />

         {/* Middle Content */}
         <div className="flex-1 min-w-0">
             <p className="text-[13px] font-light text-[#111111] leading-snug mb-1 whitespace-normal text-left truncate">
                 {merchant}
             </p>
             <p className="text-[12px] font-light text-[#8A8F9A] leading-tight text-left truncate">
                 {metaString}
             </p>
         </div>

         {/* Right Content - Amount */}
         <div className="shrink-0 pl-2 text-right">
             <span className="text-[15px] font-medium text-kletta-dark">{amount}</span>
         </div>
      </button>
   );
};

export default ExpensesScreen;