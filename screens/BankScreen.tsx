import React, { useState } from 'react';
import { 
  IconPlus, IconChevronRight, IconCheck, IconRefresh, IconSearch, IconFilter, IconArrowRight, IconBack
} from '../components/Icons';

type ViewState = 'list' | 'detail';

const BankScreen: React.FC = () => {
  const [view, setView] = useState<ViewState>('list');
  const [selectedAccount, setSelectedAccount] = useState<string | null>(null);

  const handleAccountClick = (name: string) => {
    setSelectedAccount(name);
    setView('detail');
  };

  const handleBack = () => {
    setView('list');
    setSelectedAccount(null);
  };

  if (view === 'detail') {
    return <BankAccountDetailsScreen accountName={selectedAccount || 'Account'} onBack={handleBack} />;
  }

  return (
    <div className="flex-1 flex flex-col bg-gray-50 h-full overflow-hidden font-aktifo animate-fade-in">
      {/* Top App Bar */}
      <div className="bg-white px-6 pt-16 pb-4 flex justify-between items-center shadow-sm z-10">
        <h1 className="text-[28px] font-bold text-kletta-dark">Bank accounts</h1>
        <button 
          onClick={() => alert("Bank connection flow")}
          className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center active:bg-gray-200 transition-colors"
        >
          <IconPlus size={24} className="text-kletta-dark" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar pb-36">
        {/* Summary Section */}
        <div className="px-6 mt-6">
          <div className="flex gap-4 overflow-x-auto no-scrollbar pb-4 snap-x">
             <AccountSummaryCard 
                title="Business account" 
                balance="€6,350.20" 
                color="bg-kletta-teal" 
                textColor="text-white"
             />
             <AccountSummaryCard 
                title="Tax account" 
                balance="€1,200.00" 
                color="bg-white" 
                textColor="text-kletta-dark"
                border
             />
          </div>
          <div className="flex items-center gap-2 mt-1 mb-6">
            <IconRefresh size={12} className="text-gray-400" />
            <span className="text-xs font-medium text-gray-400">Last sync: Today 09:15</span>
          </div>
        </div>

        {/* Reconciliation Status */}
        <div className="px-6 mb-8">
           <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">Reconciliation</h3>
           <div className="flex flex-wrap gap-2">
              <StatusPill label="12 transactions to review" type="warning" />
              <StatusPill label="45 reconciled" type="success" />
              <StatusPill label="2 unmatched" type="error" />
           </div>
        </div>

        {/* Accounts List */}
        <div className="bg-white rounded-t-[32px] shadow-[0_-4px_20px_rgba(0,0,0,0.03)] flex-1 min-h-[400px] p-6">
           <h3 className="text-[19px] font-bold text-kletta-dark mb-5">Your accounts</h3>
           <div className="space-y-4">
              <AccountRow 
                name="Nordea Business" 
                iban="FI12 •••• 1234" 
                balance="€6,350.20" 
                status="OK"
                onClick={() => handleAccountClick('Nordea Business')}
              />
              <AccountRow 
                name="OP Corporate" 
                iban="FI55 •••• 9876" 
                balance="€1,200.00" 
                status="Review"
                onClick={() => handleAccountClick('OP Corporate')}
              />
               <AccountRow 
                name="Wise" 
                iban="BE88 •••• 4421" 
                balance="€0.00" 
                status="Not connected"
                onClick={() => alert("Please reconnect Wise")}
              />
           </div>
        </div>
      </div>
    </div>
  );
};

// Detail Screen Component
const BankAccountDetailsScreen = ({ accountName, onBack }: { accountName: string, onBack: () => void }) => {
  return (
    <div className="flex-1 flex flex-col bg-white h-full font-aktifo animate-slide-up">
      {/* Detail Header */}
      <div className="bg-kletta-teal px-6 pt-16 pb-6 shadow-md z-10 text-white rounded-b-[32px]">
         <div className="flex items-center gap-4 mb-6">
            <button onClick={onBack} className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center active:bg-white/20">
               <IconBack size={20} color="white" />
            </button>
            <h1 className="text-xl font-bold">{accountName}</h1>
         </div>
         
         <div className="flex justify-between items-end">
            <div>
               <p className="text-white/60 text-sm font-medium mb-1">Current balance</p>
               <p className="text-3xl font-bold">€6,350.20</p>
            </div>
            <div className="bg-white/10 px-3 py-1.5 rounded-lg flex items-center gap-2">
               <span className="text-sm font-bold">This month</span>
               <IconChevronRight size={14} className="rotate-90" />
            </div>
         </div>
      </div>

      {/* Transactions List */}
      <div className="flex-1 overflow-y-auto no-scrollbar pt-6 px-6 pb-36">
         <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold text-kletta-dark">Transactions</h2>
            <div className="flex gap-2">
               <button className="p-2 bg-gray-50 rounded-lg"><IconSearch size={20} className="text-gray-500" /></button>
               <button className="p-2 bg-gray-50 rounded-lg"><IconFilter size={20} className="text-gray-500" /></button>
            </div>
         </div>

         <div className="space-y-4">
            <TransactionItem date="Today" desc="Prisma Helsinki" amount="-€45.20" status="Matched" />
            <TransactionItem date="Yesterday" desc="Shell Service" amount="-€60.00" status="Unmatched" />
            <TransactionItem date="12 Dec" desc="Client Payment #2201" amount="+€1,250.00" status="Matched" positive />
            <TransactionItem date="10 Dec" desc="Adobe Creative Cloud" amount="-€65.00" status="Excluded" />
            <TransactionItem date="08 Dec" desc="Wolt Enterprises" amount="-€18.50" status="Matched" />
         </div>
      </div>
      
      {/* Floating Action Button */}
      <div className="absolute bottom-28 right-6">
         <button onClick={() => alert("Matching flow not implemented")} className="bg-kletta-yellow text-kletta-dark px-6 py-4 rounded-2xl font-bold shadow-lg active:scale-95 transition-transform flex items-center gap-2">
            Match transactions
         </button>
      </div>
    </div>
  );
};

// Sub-components
const AccountSummaryCard = ({ title, balance, color, textColor, border }: any) => (
  <div className={`min-w-[240px] p-5 rounded-[24px] shadow-sm snap-start ${color} ${border ? 'border border-gray-200' : ''}`}>
     <p className={`text-sm font-medium opacity-70 mb-2 ${textColor}`}>{title}</p>
     <p className={`text-2xl font-bold ${textColor}`}>{balance}</p>
  </div>
);

const StatusPill = ({ label, type }: { label: string, type: 'success' | 'warning' | 'error' }) => {
   const colors = {
      success: 'bg-green-100 text-green-700',
      warning: 'bg-orange-100 text-orange-700',
      error: 'bg-red-100 text-red-700'
   };
   return (
      <span className={`px-3 py-1.5 rounded-full text-xs font-bold ${colors[type]}`}>
         {label}
      </span>
   );
};

const AccountRow = ({ name, iban, balance, status, onClick }: any) => (
   <button onClick={onClick} className="w-full bg-gray-50 p-4 rounded-2xl flex items-center justify-between group active:scale-[0.98] transition-all">
      <div className="flex items-center gap-4">
         <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-kletta-dark shadow-sm">
            <IconArrowRight size={18} className="-rotate-45" />
         </div>
         <div className="text-left">
            <p className="font-bold text-kletta-dark text-[15px]">{name}</p>
            <p className="text-xs text-gray-400 font-medium">{iban}</p>
         </div>
      </div>
      <div className="text-right">
         <p className="font-bold text-kletta-dark">{balance}</p>
         <span className={`text-[10px] font-bold uppercase tracking-wide ${status === 'OK' ? 'text-green-600' : status === 'Review' ? 'text-orange-500' : 'text-gray-400'}`}>
            {status}
         </span>
      </div>
   </button>
);

const TransactionItem = ({ date, desc, amount, status, positive }: any) => (
   <div className="flex justify-between items-center py-2 border-b border-gray-50 last:border-0">
      <div className="flex gap-4 items-center">
         <div className="flex flex-col items-center justify-center w-10">
            <span className="text-xs font-bold text-gray-400">{date}</span>
         </div>
         <div>
            <p className="font-bold text-[15px] text-kletta-dark">{desc}</p>
            <StatusPill label={status} type={status === 'Matched' ? 'success' : status === 'Unmatched' ? 'warning' : 'error'} />
         </div>
      </div>
      <div className="text-right flex items-center gap-3">
         <span className={`font-bold text-lg ${positive ? 'text-green-600' : 'text-kletta-dark'}`}>{amount}</span>
         <IconChevronRight size={16} className="text-gray-300" />
      </div>
   </div>
);

export default BankScreen;