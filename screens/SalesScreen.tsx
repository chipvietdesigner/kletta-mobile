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
  { id: '12345', amount: '€50,000.00', date: '29.04.2025', customer: 'Vanamo Group Oy', status: 'Unpaid' },
  { id: '84721', amount: '€149.00', date: '29.04.2025', customer: 'No customer', status: 'Paid' },
  { id: '56213', amount: '€50,000.00', date: '29.04.2025', customer: 'Vanamo Group Oy', status: 'Paid' },
  { id: '99821', amount: '€50,000.00', date: '29.04.2025', customer: 'Noja Rahoitus Oy', status: 'Overdue' },
  { id: '77102', amount: '€50,000.00', date: '29.04.2025', customer: 'Vanamo Group Oy', status: 'Paid' },
  { id: '12346', amount: '€50,000.00', date: '29.04.2025', customer: 'Vanamo Group Oy', status: 'Paid' },
  { id: '84722', amount: '€49.00', date: '02.05.2025', customer: 'TSUKI', status: 'Paid' },
  { id: '56214', amount: '€980.00', date: '15.04.2025', customer: 'Nordic Solutions Ltd', status: 'Unpaid' },
  { id: '99822', amount: '€120.00', date: '01.04.2025', customer: 'Helsinki Foods Oy', status: 'Paid' },
  { id: '77103', amount: '€2,450.00', date: '21.03.2025', customer: 'Aurora Tech', status: 'Paid' },
  { id: '12347', amount: '€350.00', date: '02.05.2025', customer: 'GreenLeaf Co.', status: 'Unpaid' },
  { id: '84723', amount: '€5,600.00', date: '29.04.2025', customer: 'Polar Logistics', status: 'Paid' },
  { id: '56215', amount: '€12,300.00', date: '15.04.2025', customer: 'Blue Ocean Ltd', status: 'Overdue' },
  { id: '99823', amount: '€25,000.00', date: '01.04.2025', customer: 'Smart Retail Oy', status: 'Paid' },
  { id: '77104', amount: '€49.00', date: '21.03.2025', customer: 'TSUKI', status: 'Paid' },
  { id: '12348', amount: '€120.00', date: '02.05.2025', customer: 'Helsinki Foods Oy', status: 'Paid' },
  { id: '84724', amount: '€980.00', date: '29.04.2025', customer: 'Nordic Solutions Ltd', status: 'Paid' },
  { id: '56216', amount: '€350.00', date: '15.04.2025', customer: 'GreenLeaf Co.', status: 'Paid' },
  { id: '99824', amount: '€2,450.00', date: '01.04.2025', customer: 'Aurora Tech', status: 'Unpaid' },
  { id: '77105', amount: '€5,600.00', date: '21.03.2025', customer: 'Polar Logistics', status: 'Paid' },
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
                 <h1 className="text-[24px] font-bold text-kletta-dark leading-tight">Outstanding invoices</h1>
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
    <div className="h-full w-full bg-white flex flex-col font-aktifo animate-fade-in relative overflow-hidden">
      
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
      <div className="px-6 pt-4 pb-4 bg-white flex flex-col shrink-0">
          <div className="flex justify-between items-center relative">
              <h1 className="text-[20px] font-bold text-kletta-dark tracking-tight">Sales</h1>
              <div className="flex items-center gap-2">
                  <button className="w-10 h-10 flex items-center justify-center text-kletta-dark active:scale-95 transition-all">
                      <IconSearch size={24} weight="regular" />
                  </button>
                  <button 
                      onClick={() => navigate('new-invoice')}
                      className="w-10 h-10 flex items-center justify-center text-kletta-dark active:scale-95 transition-all"
                  >
                      <IconPlus size={28} weight="regular" />
                  </button>
              </div>
          </div>
          <div className="flex mt-1">
              <button 
                  onClick={onOpenFilter}
                  className="flex items-center gap-1 text-kletta-dark hover:opacity-70 transition-opacity"
              >
                  <span className="text-[16px] font-medium">All time</span>
                  <IconChevronDown size={14} weight="bold" />
              </button>
          </div>
      </div>

      {/* Segmented Control - Pill Style */}
      <div className="px-6 py-2">
          <div className="bg-[#F2F2F2] p-0.5 rounded-[10px] flex w-full h-[36px]">
              {['All', 'Paid', 'Unpaid', 'Overdue'].map((tab) => (
                <button 
                  key={tab}
                  className={`flex-1 h-full rounded-[8px] text-[13px] transition-all flex items-center justify-center ${tab === 'All' ? 'bg-white text-[#0C0D0D] font-medium shadow-sm' : 'text-[#0C0D0D] font-normal hover:opacity-70'}`}
                >
                  {tab}
                </button>
              ))}
          </div>
      </div>

      {/* Main Scrollable Content Area */}
      <div className="flex-1 overflow-y-auto no-scrollbar bg-white pt-2">
          
          {/* All Sales Section */}
          <div className="bg-white">
              <div className="space-y-0 pb-32">
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

const SaleListItem = ({ amount, date, id, customer, status }: any) => (
  <div className={`w-full px-6 py-4 flex items-start justify-between border-b border-gray-100 transition-colors ${status === 'Overdue' ? 'bg-[#FFF8F8]' : 'bg-white'}`}>
     <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
            <span className="text-[14px] font-semibold text-kletta-dark truncate">{customer}</span>
            {status === 'Overdue' && (
                <span className="text-[14px] font-semibold text-[#E58B8B]">Overdue</span>
            )}
        </div>
        <p className="text-[13px] text-gray-500 font-normal">
          {date} • Invoice #{id}
        </p>
     </div>
     <div className="flex flex-col items-end gap-1.5">
        <span className="text-[16px] font-semibold text-kletta-dark leading-none">{amount}</span>
        {status === 'Paid' ? (
            <div className="px-3 h-[26px] bg-[#E6F2F3] rounded-[13px] flex items-center justify-center">
                <span className="text-[12px] font-semibold text-[#005A66]">Paid</span>
            </div>
        ) : (
            <button className="px-3 h-[30px] bg-[#005A66] rounded-[6px] text-[12px] font-semibold text-white active:scale-95 whitespace-nowrap">
                Register as paid
            </button>
        )}
     </div>
  </div>
);

export default SalesScreen;