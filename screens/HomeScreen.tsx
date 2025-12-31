
import React, { useState, useEffect } from 'react';
import { 
  IconSettings, IconGear, IconChevronDown, IconChevronRight, IconClose, IconArrowRight,
  IconHome, IconSales, IconExpenses, IconChat, IconPieChart, IconBank,
  IconNewInvoice, IconAddEntry, IconNewProduct, IconStartTrip, IconScanReceipt, IconUploadReceipt,
  IconCheck, IconRun, IconSparkle, IconVerified, IconInvoice, IconAddTrip,
  KlettaLogo
} from '../components/Icons';
import { TabName, ScreenName, NavigationProps } from '../types';
import SalesScreen from './SalesScreen';
import ExpensesScreen from './ExpensesScreen';
import ChatScreen from './ChatScreen';
import AssetsScreen from './AssetsScreen';
import BankScreen from './BankScreen';

// Dashboard (Original Home Content)
const DashboardContent = ({ navigate, onBankClick }: { navigate: (screen: ScreenName) => void, onBankClick: () => void }) => (
  <div className="w-full h-full relative overflow-hidden flex flex-col font-aktifo bg-[#F5F5F5] animate-fade-in">
      
      {/* Scrollable Content */}
      <div className="flex-1 w-full overflow-y-auto no-scrollbar pb-32">
        {/* Top Header Card */}
        <div className="bg-kletta-teal pt-12 pb-16 px-6 rounded-b-[42px] text-white relative shadow-sm z-0">
           
          {/* Header Row */}
          <div className="flex justify-between items-center mb-6 mt-2">
            <div className="flex items-center gap-2">
               <button 
                  onClick={() => navigate('settings')}
                  className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 active:bg-white/30 transition-colors"
               >
                  <IconGear size={22} color="white" weight="fill" />
               </button>
               <KlettaLogo color="white" className="h-6 ml-1" />
            </div>
            
            <div className="flex items-center gap-1 opacity-100 hover:opacity-80 transition-opacity cursor-pointer">
              <span className="text-[13px] font-medium tracking-wide">Year to date</span>
              <IconChevronDown size={14} weight="bold" />
            </div>
          </div>

          {/* Main Profit */}
          <div className="flex flex-col items-center mb-4">
            <span className="text-[11px] font-medium opacity-70 mb-1 uppercase tracking-widest text-white">Operating profit</span>
            <span className="text-[40px] font-bold mb-2 tracking-tight leading-none text-white">+€1,456.90</span>
            
            <div className="flex items-center gap-1.5 opacity-90">
              <span className="text-[13px] font-medium text-white">Tim Sole Trader (1234567890)</span>
              <IconVerified size={18} className="text-kletta-yellow" weight="fill" />
            </div>
          </div>
        </div>

        {/* Unified Summary Card - Overlapping Header */}
        <div className="px-5 -mt-12 relative z-10 mb-6">
            <div className="bg-white rounded-[20px] shadow-[0_4px_24px_rgba(0,0,0,0.04)] flex flex-col overflow-hidden">
               
               {/* Stats Row */}
               <div className="flex justify-between py-5 px-1">
                  <div className="flex-1 flex flex-col items-center text-center">
                     <p className="text-[13px] font-light text-kletta-dark mb-1 opacity-80">Income</p>
                     <p className="font-medium text-[16px] text-kletta-dark leading-tight">€2,986.30</p>
                  </div>
                  <div className="w-[1px] bg-gray-100 h-10 self-center"></div>
                  <div className="flex-1 flex flex-col items-center text-center">
                     <p className="text-[13px] font-light text-kletta-dark mb-1 opacity-80">Expenses</p>
                     <p className="font-medium text-[16px] text-kletta-dark leading-tight">€523.46</p>
                  </div>
                   <div className="w-[1px] bg-gray-100 h-10 self-center"></div>
                  <div className="flex-1 flex flex-col items-center text-center">
                     <p className="text-[13px] font-light text-kletta-dark mb-1 opacity-80">VAT</p>
                     <p className="font-medium text-[16px] text-kletta-dark leading-tight">€145.90</p>
                  </div>
               </div>

               {/* Button */}
               <button 
                 onClick={() => navigate('summary')}
                 className="w-full py-4 bg-kletta-yellow flex items-center justify-center gap-1 font-medium text-[14px] text-kletta-dark active:bg-[#FCD32A] transition-colors"
               >
                  View summary <IconChevronRight size={16} weight="bold" />
               </button>
            </div>
        </div>

        {/* Main Body Content */}
        <div className="px-5 space-y-6">
          
          {/* Action Grid (2 rows x 4 cols) */}
          <div className="grid grid-cols-4 gap-y-6 gap-x-2 py-2">
            <ActionIcon icon={IconNewInvoice} label="New invoice" onClick={() => navigate('new-invoice')} />
            <ActionIcon icon={IconAddEntry} label="Add entry" />
            <ActionIcon icon={IconNewProduct} label="New product" />
            <ActionIcon icon={IconStartTrip} label="Start trip" />
            
            <ActionIcon icon={IconAddTrip} label="Add trip" /> 
            <ActionIcon icon={IconBank} label="Bank" onClick={onBankClick} />
            <ActionIcon icon={IconScanReceipt} label="Scan receipt" highlight />
            <ActionIcon icon={IconUploadReceipt} label="Upload receipt" highlight />
          </div>

          {/* Upcoming Section */}
          <div className="bg-white rounded-[20px] p-5 shadow-sm border border-gray-100/50">
            <div className="flex justify-between items-center mb-4">
                <h3 className="font-medium text-[16px] text-kletta-dark">Upcoming</h3>
            </div>
            <div className="space-y-0">
              <UpcomingItem days={45} text="VAT return 06/2025 not ready" dotColor="bg-gray-300" />
              <div className="h-px bg-gray-50 my-1 ml-0"></div>
              <UpcomingItem days={76} text="VAT return 06/2025 not ready" dotColor="bg-orange-400" />
            </div>
          </div>

          {/* Banner */}
          <div className="bg-kletta-yellow rounded-[20px] p-5 flex items-start justify-between relative shadow-sm">
            <div className="flex gap-3.5 items-center">
               <div className="w-10 h-10 flex items-center justify-center">
                  <IconRun size={30} color="#000000" weight="fill" />
               </div>
              <p className="font-medium text-[14px] leading-snug text-kletta-dark max-w-[200px]">
                Earn money by inviting your friends to Kletta
              </p>
            </div>
            <button className="opacity-60 hover:opacity-100 p-1 -mt-1 -mr-1">
               <IconClose size={20} weight="bold" />
            </button>
          </div>

          {/* Setup Account */}
          <div className="bg-white rounded-[20px] p-5 shadow-sm border border-gray-100/50">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-medium text-[16px] text-kletta-dark">Set up your account</h3>
              <span className="text-[11px] font-medium text-[#008c9e]">55% complete</span>
            </div>
            <div className="divide-y divide-gray-50">
              <ChecklistItem text="Lisää yrityksesi tiedot" />
              <ChecklistItem text="Vahvista Y-tunnus" />
              <ChecklistItem text="Lisää edelliset ALV-verokaudet" />
            </div>
          </div>
          
           {/* Overdue */}
           <button className="w-full py-4 bg-kletta-yellow rounded-[20px] flex flex-col items-center justify-center font-medium text-kletta-dark shadow-sm active:scale-[0.98] transition-transform gap-0.5">
            <span className="text-xl tracking-tight font-bold">27(28)</span>
            <span className="text-[11px] font-medium opacity-70 uppercase tracking-wide">Overdue invoices</span>
          </button>


          {/* YEL Insurance */}
          <div className="bg-[#00343B] rounded-[20px] p-6 text-white shadow-sm">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-medium text-[16px] leading-tight max-w-[200px]">Get YEL insurance from Ilmarinen</h3>
              <div className="mt-0.5">
                 <IconArrowRight size={20} weight="bold" />
              </div>
            </div>
            <p className="text-[13px] leading-relaxed opacity-80 font-light mt-2">
              When you take Ilmarinen YEL insurance through our application, we offer you one free month of Kletta's service. The offer does not affect the price or conditions of YEL insurance
            </p>
          </div>

          {/* AI Assistant */}
          <button className="w-full bg-white rounded-[20px] p-4 flex justify-between items-center shadow-sm border border-gray-100/50 active:bg-gray-50 transition-colors">
            <div className="flex items-center gap-3">
              <IconSparkle size={20} className="text-kletta-yellow" weight="fill" />
              <span className="text-[14px] font-medium text-kletta-secondary">Ask from David Kletta AI Assistant</span>
            </div>
            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-kletta-secondary">
              <IconArrowRight size={16} weight="bold" />
            </div>
          </button>
        </div>
      </div>
  </div>
);


// Main Component
const HomeScreen: React.FC<NavigationProps> = ({ navigate, goBack, params }) => {
  const [activeTab, setActiveTab] = useState<TabName>(params?.tab || 'home');

  useEffect(() => {
    if (params?.tab) {
        setActiveTab(params.tab);
    }
  }, [params?.tab]);

  const handleBankClick = () => {
    setActiveTab('bank');
  };

  return (
    <div className="h-full w-full pt-5 bg-[#F5F5F5] relative font-aktifo overflow-hidden">
      
      {/* Content Area Based on Tab */}
      <div className="absolute inset-0 w-full h-full z-0">
        {activeTab === 'home' && <DashboardContent navigate={navigate} onBankClick={handleBankClick} />}
        {activeTab === 'bank' && <BankScreen />}
        {activeTab === 'sales' && <SalesScreen navigate={navigate} goBack={goBack} />}
        {activeTab === 'expenses' && <ExpensesScreen />}
        {activeTab === 'chat' && <ChatScreen />}
        {activeTab === 'assets' && <AssetsScreen />}
      </div>

      {/* Fixed Bottom Tab Bar */}
      <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-100 pb-8 pt-3 px-4 flex justify-between items-end z-50">
        <TabItem 
          active={activeTab === 'home'} 
          icon={IconHome} 
          label="Home" 
          onClick={() => setActiveTab('home')} 
        />
        <TabItem 
          active={activeTab === 'bank'} 
          icon={IconBank} 
          label="Bank" 
          onClick={() => setActiveTab('bank')} 
        />
        <TabItem 
          active={activeTab === 'sales'} 
          icon={IconSales} 
          label="Sales" 
          onClick={() => setActiveTab('sales')} 
        />
        <TabItem 
          active={activeTab === 'expenses'} 
          icon={IconExpenses} 
          label="Expenses" 
          onClick={() => setActiveTab('expenses')} 
        />
        <TabItem 
          active={activeTab === 'chat'} 
          icon={IconChat} 
          label="Chat" 
          onClick={() => setActiveTab('chat')} 
        />
        <TabItem 
          active={activeTab === 'assets'} 
          icon={IconPieChart} 
          label="Assets" 
          onClick={() => setActiveTab('assets')} 
        />
      </div>
    </div>
  );
};

const ActionIcon = ({ icon: Icon, label, highlight, onClick }: { icon: any, label: string, highlight?: boolean, onClick?: () => void }) => (
  <button onClick={onClick} className="flex flex-col items-center gap-2 group w-full">
    <div className={`w-[56px] h-[56px] rounded-full flex items-center justify-center shadow-sm relative transition-all duration-200 group-active:scale-95 ${highlight ? 'bg-[#005c66] text-white' : 'bg-kletta-teal text-white'}`}>
      <Icon size={24} weight="bold" />
      {highlight && <IconSparkle size={12} weight="fill" className="absolute top-0 right-0 text-kletta-yellow" />}
    </div>
    <span className="text-[11px] font-medium text-center leading-tight text-kletta-dark max-w-[70px]">{label}</span>
  </button>
);

const UpcomingItem = ({ days, text, dotColor }: { days: number, text: string, dotColor: string }) => (
  <button className="w-full flex justify-between items-center py-3 group">
    <div className="flex-1 text-left">
        <p className="font-medium text-[14px] text-kletta-dark mb-1">{days} days</p>
        <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${dotColor}`}></div>
            <p className="text-[13px] text-kletta-secondary font-light">{text}</p>
        </div>
    </div>
    <div className="w-8 h-8 flex items-center justify-end">
        <IconChevronRight size={16} className="text-gray-300" weight="bold" />
    </div>
  </button>
);

const ChecklistItem = ({ text }: { text: string }) => (
  <button className="w-full flex items-center justify-between py-4 group hover:bg-gray-50 -mx-2 px-2 transition-colors">
    <div className="flex items-center gap-3">
      <div className="w-5 h-5 border-[1.5px] border-gray-300 rounded-[6px] group-hover:border-kletta-teal transition-colors"></div>
      <span className="text-[14px] font-medium text-gray-700">{text}</span>
    </div>
    <IconChevronRight size={16} className="text-gray-300 group-hover:text-kletta-teal" weight="bold" />
  </button>
);

const TabItem = ({ active, icon: Icon, label, onClick }: { active: boolean, icon: any, label: string, onClick: () => void }) => (
  <button onClick={onClick} className="flex flex-col items-center gap-1 w-14 group">
    <div className={`transition-all duration-200`}>
        {/* Active: Filled Teal, Inactive: Outlined Grey */}
        <Icon 
           size={26} 
           color={active ? '#00343B' : '#9ca3af'} 
           weight={active ? "fill" : "regular"} 
        />
    </div>
    <span className={`text-[10px] font-medium tracking-wide transition-colors ${active ? 'text-kletta-teal' : 'text-kletta-secondary'}`}>{label}</span>
  </button>
);

export default HomeScreen;
