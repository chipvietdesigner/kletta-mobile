import React, { useState } from 'react';
import { NavigationProps } from '../types';
import { 
  IconPlus, IconChevronDown, IconBack,
  IconSparkle, IconChevronRight,
  IconCalendarBlank, IconTag, IconMonitor,
  IconCellSignalFull, IconWifiHigh, IconBatteryFull,
  IconSearch, IconFolder, IconShoppingCart
} from '../components/Icons';

interface SalesScreenProps extends NavigationProps {
  dateRange: string;
  onOpenFilter: () => void;
  onModalToggle?: (open: boolean) => void;
  goBack: () => void;
}

// --- MOCK DATA ---
const OUTSTANDING_INVOICES = [
  { id: '20260002', amount: '€250.00', customer: 'TechCorp', status: 'Overdue', label: '30 days', imageUrl: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=200&fit=crop" },
  { id: '20260002', amount: '€250.00', customer: 'TechCorp', status: 'Overdue', label: '30 days', imageUrl: "https://images.unsplash.com/photo-1544441893-675973e31985?w=200&fit=crop" },
  { id: '20260002', amount: '€250.00', customer: 'TechCorp', status: 'Overdue', label: '30 days', imageUrl: "https://images.unsplash.com/photo-1621607512214-68297480165e?w=200&fit=crop" },
];

const ALL_SALES = [
  { id: '12345', amount: '€250.00', date: '29.04.2025', customer: 'Jari', status: 'Overdue', imageUrl: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=200&fit=crop" },
  { id: '12345', amount: '€250.00', date: '29.04.2025', customer: 'Jari', status: 'Paid', imageUrl: "https://images.unsplash.com/photo-1544441893-675973e31985?w=200&fit=crop" },
  { id: '12345', amount: '€250.00', date: '29.04.2025', customer: 'Jari', status: 'Unpaid', imageUrl: "https://images.unsplash.com/photo-1621607512214-68297480165e?w=200&fit=crop" },
  { id: '12345', amount: '€250.00', date: '29.04.2025', customer: 'Jari', status: 'Paid', imageUrl: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=200&fit=crop" },
];

const SalesScreen: React.FC<SalesScreenProps> = ({ navigate, dateRange, onOpenFilter, onModalToggle }) => {
  const [view, setView] = useState<'main' | 'outstanding'>('main');

  const handleOpenOutstanding = () => {
    setView('outstanding');
    if (onModalToggle) onModalToggle(true);
  };

  const handleCloseOutstanding = () => {
    setView('main');
    if (onModalToggle) onModalToggle(false);
  };

  if (view === 'outstanding') {
    return (
      <div className="h-full w-full bg-white flex flex-col font-aktifo animate-slide-in-right relative overflow-hidden">
        <div className="w-full h-[44px] flex justify-between items-end px-6 pb-1 text-kletta-dark pointer-events-none z-20 shrink-0">
            <span className="text-[14px] font-semibold tracking-tight ml-2">9:41</span>
            <div className="flex gap-1.5 items-center mr-1">
               <IconCellSignalFull size={16} weight="fill" />
               <IconWifiHigh size={16} weight="bold" />
               <IconBatteryFull size={22} weight="fill" className="rotate-0" />
            </div>
        </div>

        <div className="w-full pt-4 pb-6 px-6 bg-white shrink-0 border-b border-gray-50">
           <div className="flex items-center gap-4">
              <button onClick={handleCloseOutstanding} className="w-10 h-10 -ml-2 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors">
                <IconBack size={24} weight="bold" />
              </button>
              <div>
                 <h1 className="text-[20px] font-bold text-kletta-dark leading-tight">Outstanding invoices</h1>
                 <p className="text-[13px] text-gray-500 font-normal">7 invoices require action</p>
              </div>
           </div>
        </div>
        <div className="flex-1 overflow-y-auto no-scrollbar pb-24">
            {/* List content for outstanding view would go here */}
        </div>
      </div>
    );
  }

  return (
    <div className="h-full w-full bg-[#FAF8F5] flex flex-col font-aktifo animate-fade-in relative overflow-hidden">
      
      {/* Status Bar */}
      <div className="w-full h-[44px] flex justify-between items-end px-6 pb-1 text-kletta-dark pointer-events-none z-20 shrink-0">
          <span className="text-[14px] font-semibold tracking-tight ml-2">9:41</span>
          <div className="flex gap-1.5 items-center mr-1">
             <IconCellSignalFull size={16} weight="fill" />
             <IconWifiHigh size={16} weight="bold" />
             <IconBatteryFull size={22} weight="fill" className="rotate-0" />
          </div>
      </div>

      {/* Fixed Header */}
      <div className="px-6 pt-4 pb-0 bg-[#FAF8F5] flex flex-col shrink-0">
          <div className="flex justify-center items-center mb-1 relative">
              <h1 className="text-[28px] font-semibold text-kletta-dark tracking-tight">Sales</h1>
              <button 
                  onClick={() => navigate('new-invoice')}
                  className="absolute right-0 w-10 h-10 flex items-center justify-center text-kletta-dark active:scale-95 transition-all"
              >
                  <IconPlus size={30} weight="regular" />
              </button>
          </div>
          <div className="flex justify-center mb-6">
              <button 
                  onClick={onOpenFilter}
                  className="flex items-center gap-1.5 text-kletta-dark"
              >
                  <span className="text-[16px] font-medium">All time</span>
                  <IconChevronDown size={14} weight="bold" />
              </button>
          </div>

          {/* Search Bar */}
          <div className="w-full relative mb-6">
              <input 
                type="text" 
                placeholder="Search" 
                className="w-full h-[48px] bg-[#F2EEE8] rounded-[10px] pl-4 pr-10 text-[16px] text-kletta-dark outline-none placeholder:text-gray-500"
              />
          </div>
      </div>

      {/* Main Scrollable Content Area */}
      <div className="flex-1 overflow-y-auto no-scrollbar">
          
          {/* Outstanding Section Header - Spacing increased and "View all" hidden */}
          <div className="px-6 flex items-center justify-between mb-3">
              <h2 className="text-[17px] font-semibold text-kletta-dark">Outstanding invoices</h2>
          </div>

          {/* Carousel Body */}
          <div className="flex overflow-x-auto no-scrollbar px-6 gap-4 pb-10">
              {OUTSTANDING_INVOICES.map((item, idx) => (
                <div key={idx} className="min-w-[187px] bg-white rounded-[16px] overflow-hidden border border-gray-200 flex flex-col transition-all">
                    {/* Card Header area */}
                    <div className="bg-[#FFF1F1] p-4 pt-1 relative">
                        <div className="absolute top-0 left-0 bg-[#8C2E0B] text-white text-[10px] font-bold px-2 py-0.5 rounded-br-[8px] z-10">
                            {item.label}
                        </div>
                        <div className="flex items-center gap-3 pt-6">
                            <div className="w-[53px] h-[53px] bg-white rounded-[8px] flex items-center justify-center shadow-sm shrink-0 overflow-hidden border border-gray-50">
                               <img src={item.imageUrl} className="w-full h-full object-cover" alt="invoice preview" />
                            </div>
                            <div className="flex flex-col min-w-0">
                               <span className="text-[17px] font-semibold text-kletta-dark truncate">{item.amount}</span>
                               <span className="text-[12px] font-medium text-[#C03500]">{item.status}</span>
                            </div>
                        </div>
                    </div>
                    {/* Card Footer area */}
                    <div className="p-4 pt-3 flex flex-col flex-1">
                        <p className="text-[14px] font-medium text-kletta-dark leading-tight">{item.customer}</p>
                        <p className="text-[12px] text-gray-600 font-light mb-4">Invoices #{item.id}</p>
                        
                        <button className="w-full h-[36px] bg-kletta-teal rounded-[8px] text-white font-medium text-[13px] mb-2 active:scale-[0.98] transition-all">
                            Register as paid
                        </button>
                        <button className="w-full h-[36px] text-gray-500 font-medium text-[12px] active:bg-gray-50 rounded-[8px]">
                            Send a reminder
                        </button>
                    </div>
                </div>
              ))}
          </div>

          {/* All Sales Section */}
          <div className="px-6 bg-[#FAF8F5]">
              <h2 className="text-[17px] font-semibold text-kletta-dark mb-6 mt-2">All sales</h2>
              <div className="space-y-4 pb-32">
                  {ALL_SALES.map((item, idx) => (
                     <SaleListItem key={idx} {...item} />
                  ))}
              </div>
          </div>
      </div>
    </div>
  );
};

// --- Sub-components ---

const SaleListItem = ({ amount, date, id, customer, status, imageUrl }: any) => (
  <div className="w-full flex items-start gap-4 border-b border-gray-100 pb-5 group">
     <div className={`w-[53px] h-[53px] rounded-[8px] bg-gray-50 flex items-center justify-center shrink-0 overflow-hidden border border-gray-50`}>
        <img src={imageUrl} className="w-full h-full object-cover" alt="invoice thumbnail" />
     </div>
     <div className="flex-1 min-w-0">
        <div className="flex justify-between items-center mb-1">
           <div className="flex flex-col">
              <span className="text-[18px] font-medium text-kletta-dark">{amount}</span>
              {status === 'Overdue' && (
                <span className="text-[12px] font-medium text-[#C03500] leading-none mt-0.5">Overdue</span>
              )}
           </div>
           {status === 'Overdue' || status === 'Unpaid' ? (
              /* Decreased size and increased font-weight to semibold as requested */
              <button className="px-3 h-[32px] bg-kletta-teal rounded-[8px] text-[12px] font-semibold text-white active:scale-95 whitespace-nowrap flex items-center justify-center">
                Register as paid
              </button>
           ) : (
              /* Adjusted height to 32px for consistency and reduced font size */
              <div className="px-3 h-[32px] bg-kletta-yellow rounded-[8px] flex items-center justify-center">
                <span className="text-[11px] font-bold text-kletta-dark tracking-wide">Paid</span>
              </div>
           )}
        </div>
        <p className="text-[13px] text-gray-500 font-light truncate">
          {date} • Invoice #{id} • {customer}
        </p>
     </div>
  </div>
);

export default SalesScreen;