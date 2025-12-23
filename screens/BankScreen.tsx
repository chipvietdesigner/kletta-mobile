import React from 'react';
import { 
  IconCellSignalFull, IconWifiHigh, IconBatteryFull, 
  IconPlus, IconChevronDown
} from '../components/Icons';

const BankScreen: React.FC = () => {
  return (
    <div className="h-full w-full bg-white flex flex-col font-aktifo animate-fade-in relative overflow-hidden">
      
      {/* Header Section - Flat Fill Only */}
      <div className="w-full bg-[#F2F7F8] flex flex-col z-20 pb-5 pt-0">
          
          {/* Status Bar */}
          <div className="w-full h-[50px] flex justify-between items-end px-6 pb-2 text-kletta-dark pointer-events-none">
              <span className="text-[15px] font-medium tracking-normal leading-none ml-2">9:41</span>
              <div className="flex gap-1.5 items-center mr-1">
                 <IconCellSignalFull size={16} weight="fill" />
                 <IconWifiHigh size={16} weight="bold" />
                 <IconBatteryFull size={24} weight="fill" className="rotate-0" />
              </div>
          </div>

          {/* Header & Account Info */}
          <div className="px-6 pt-4 flex flex-col">
             <div className="flex justify-between items-center mb-6">
                <div className="flex flex-col">
                    <h1 className="text-[26px] font-medium text-kletta-dark tracking-tight mb-1">Bank</h1>
                    <div className="flex items-center gap-1 opacity-60 transition-opacity hover:opacity-100 cursor-pointer">
                         <span className="text-[13px] font-medium text-kletta-secondary">All accounts</span>
                         <IconChevronDown size={12} weight="bold" className="text-kletta-secondary" />
                    </div>
                </div>
                <button className="w-10 h-10 -mr-2 flex items-center justify-center hover:bg-black/5 rounded-full transition-colors text-kletta-dark">
                   <IconPlus size={24} weight="regular" />
                </button>
             </div>

             <div className="flex flex-col gap-1">
                <p className="text-[12px] font-medium text-kletta-secondary uppercase tracking-widest">Total Balance</p>
                <p className="text-[34px] font-light text-kletta-dark tracking-tight leading-none">€14,250.00</p>
                <div className="flex items-center gap-2 mt-2">
                   <div className="px-2 py-0.5 bg-[#E1E9EA] rounded text-[11px] font-medium text-kletta-secondary tracking-wide">Business</div>
                   <p className="text-[13px] font-light text-kletta-secondary font-mono tracking-wide">FI89 1234 5678 90</p>
                </div>
             </div>
          </div>
      </div>

      {/* Transactions List */}
      <div className="flex-1 overflow-y-auto no-scrollbar pb-32 pt-0 bg-white">
        
         {/* Date Header */}
         <div className="px-6 py-3 bg-white/95 sticky top-0 backdrop-blur-sm z-10 border-b border-gray-50">
             <p className="text-[11px] font-bold text-kletta-secondary uppercase tracking-widest">Today</p>
         </div>
         
         <TransactionRow 
             title="K-Market Kamppi" 
             subtitle="Groceries" 
             amount="-€12.50" 
             type="expense"
             time="14:30"
         />
         <TransactionRow 
             title="Consulting Payment" 
             subtitle="Invoiced #1024" 
             amount="+€1,250.00" 
             type="income"
             time="10:15"
         />

         {/* Date Header */}
         <div className="px-6 py-3 bg-white/95 sticky top-0 backdrop-blur-sm z-10 border-b border-gray-50 mt-2">
             <p className="text-[11px] font-bold text-kletta-secondary uppercase tracking-widest">Yesterday</p>
         </div>

         <TransactionRow 
             title="Shell St1" 
             subtitle="Fuel & Oil" 
             amount="-€65.00" 
             type="expense"
             time="18:45"
         />
         <TransactionRow 
             title="Adobe Creative Cloud" 
             subtitle="Software Subscription" 
             amount="-€35.99" 
             type="expense"
             time="09:00"
         />
         <TransactionRow 
             title="Uber Trip" 
             subtitle="Travel" 
             amount="-€18.40" 
             type="expense"
             time="08:30"
         />

         {/* Date Header */}
         <div className="px-6 py-3 bg-white/95 sticky top-0 backdrop-blur-sm z-10 border-b border-gray-50 mt-2">
             <p className="text-[11px] font-bold text-kletta-secondary uppercase tracking-widest">12 Oct 2025</p>
         </div>

         <TransactionRow 
             title="Prisma" 
             subtitle="Office Supplies" 
             amount="-€124.90" 
             type="expense"
             time="16:20"
         />
         <TransactionRow 
             title="Apple Store" 
             subtitle="Equipment" 
             amount="-€2,499.00" 
             type="expense"
             time="12:00"
         />
      </div>
    </div>
  );
};

const TransactionRow = ({ title, subtitle, amount, type, time }: { title: string, subtitle: string, amount: string, type: 'income' | 'expense', time: string }) => (
  <button className="w-full px-6 py-4 flex items-start justify-between hover:bg-gray-50 active:bg-gray-100 transition-colors border-b border-gray-50 group">
     <div className="flex-1 text-left pr-4">
        <div className="flex justify-between items-center mb-0.5">
            <p className="text-[15px] font-medium text-kletta-dark">{title}</p>
        </div>
        <div className="flex items-center gap-2">
            <p className="text-[13px] font-light text-kletta-secondary">{time}</p>
            <div className="w-0.5 h-0.5 rounded-full bg-gray-300"></div>
            <p className="text-[13px] font-light text-kletta-secondary">{subtitle}</p>
        </div>
     </div>
     <div className="text-right whitespace-nowrap">
        <p className={`text-[15px] font-medium tracking-normal ${type === 'income' ? 'text-green-600' : 'text-kletta-dark'}`}>{amount}</p>
     </div>
  </button>
);

export default BankScreen;