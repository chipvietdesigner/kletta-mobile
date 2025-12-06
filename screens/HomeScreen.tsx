import React, { useState } from 'react';
import { 
  IconSettings, IconChevronDown, IconChevronRight, IconClose, IconArrowRight,
  IconHome, IconBank, IconSales, IconExpenses, IconChat, IconPieChart,
  IconNewInvoice, IconAddEntry, IconNewProduct, IconStartTrip, IconScanReceipt, IconUploadReceipt,
  IconCheck
} from '../components/Icons';
import { TabName } from '../types';
import BankScreen from './BankScreen';
import SalesScreen from './SalesScreen';
import ExpensesScreen from './ExpensesScreen';
import ChatScreen from './ChatScreen';
import AssetsScreen from './AssetsScreen';

// Dashboard (Original Home Content)
const DashboardContent = () => (
  <div className="flex-1 overflow-y-auto no-scrollbar relative font-aktifo animate-fade-in">
        <div className="pb-36"> 
          
          {/* Top Header Card */}
          <div className="bg-kletta-teal pt-20 pb-14 px-8 rounded-b-[48px] text-white relative shadow-lg">
            {/* Header Row */}
            <div className="flex justify-between items-start mb-8">
              <button className="w-11 h-11 bg-white/10 rounded-full flex items-center justify-center active:bg-white/20 transition-colors">
                <IconSettings size={22} color="white" />
              </button>
              <div className="flex items-center gap-1 opacity-90 py-2.5 px-4 bg-black/10 rounded-full">
                <span className="text-[13px] font-bold tracking-wide">Year to date</span>
                <IconChevronDown size={14} />
              </div>
            </div>

            {/* Main Profit */}
            <div className="flex flex-col items-center mb-4">
              <span className="text-[15px] font-medium opacity-70 mb-2 uppercase tracking-widest">Operating profit</span>
              <span className="text-[52px] font-bold mb-5 tracking-tight leading-none">+€1,456.90</span>
              <div className="flex items-center gap-2 bg-[#004a52] px-5 py-2.5 rounded-full border border-white/5">
                <span className="text-[13px] font-bold text-white/90">Tim Sole Trader</span>
                <div className="w-4 h-4 rounded-full bg-kletta-yellow flex items-center justify-center">
                  <IconCheck size={10} className="text-black" />
                </div>
              </div>
            </div>
          </div>

          {/* Stats Chips */}
          <div className="px-7 -mt-9 flex gap-3 overflow-x-auto no-scrollbar pb-8 relative z-10 snap-x">
            <StatChip label="Income" value="€2,986.30" />
            <StatChip label="Expenses" value="€523.46" />
            <StatChip label="VAT" value="€145.90" />
          </div>

          {/* Main Body Content */}
          <div className="px-6 space-y-7 mt-2">
            
            {/* View Summary */}
            <button className="w-full py-4 bg-kletta-yellow rounded-2xl flex items-center justify-center gap-2 font-bold text-[17px] text-kletta-dark shadow-sm active:scale-[0.98] transition-transform">
              View summary <IconChevronRight size={20} />
            </button>

            {/* Action Grid */}
            <div className="grid grid-cols-4 gap-y-8 gap-x-4 py-3">
              <ActionIcon icon={IconNewInvoice} label="New invoice" />
              <ActionIcon icon={IconAddEntry} label="Add entry" />
              <ActionIcon icon={IconNewProduct} label="New product" />
              <ActionIcon icon={IconBank} label="Bank" />
              
              <ActionIcon icon={IconStartTrip} label="Start trip" />
              <ActionIcon icon={IconHome} label="Add trip" /> 
              <ActionIcon icon={IconScanReceipt} label="Scan receipt" highlight />
              <ActionIcon icon={IconUploadReceipt} label="Upload receipt" highlight />
            </div>

            {/* Upcoming Section */}
            <div className="bg-white rounded-[28px] p-6 shadow-sm border border-gray-100/50">
              <div className="flex justify-between items-center mb-5">
                  <h3 className="font-bold text-[19px] text-kletta-dark">Upcoming</h3>
              </div>
              <div className="space-y-1">
                <UpcomingItem days={45} text="VAT return 06/2025 not ready" color="bg-gray-300" />
                <div className="h-px bg-gray-100 my-2 ml-14"></div>
                <UpcomingItem days={76} text="VAT return 06/2025 not ready" color="bg-orange-400" />
              </div>
            </div>

            {/* Banner */}
            <div className="bg-kletta-yellow rounded-[28px] p-6 flex items-start justify-between relative shadow-sm">
              <div className="flex gap-4 items-center">
                <div className="h-11 w-11 bg-white/20 rounded-full flex items-center justify-center text-2xl shadow-inner">🏃</div>
                <p className="font-bold text-[15px] max-w-[200px] leading-snug text-kletta-dark">
                  Earn money by inviting your friends to Kletta
                </p>
              </div>
              <button className="opacity-60 hover:opacity-100 p-1">
                 <IconClose size={22} />
              </button>
            </div>

            {/* Setup Account */}
            <div className="bg-white rounded-[28px] p-6 shadow-sm border border-gray-100/50">
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-bold text-[15px] text-kletta-dark">Set up your account</h3>
                <span className="text-xs font-bold text-teal-600 bg-teal-50 px-2.5 py-1.5 rounded-lg">55% complete</span>
              </div>
              <div className="divide-y divide-gray-100">
                <ChecklistItem text="Lisää yrityksesi tiedot" />
                <ChecklistItem text="Vahvista Y-tunnus" />
                <ChecklistItem text="Lisää edelliset ALV-verokaudet" />
              </div>
            </div>
            
             {/* Overdue */}
             <button className="w-full py-5 bg-kletta-yellow rounded-[28px] flex flex-col items-center justify-center font-bold text-kletta-dark shadow-sm active:scale-[0.98] transition-transform gap-1.5">
              <span className="text-2xl tracking-tight">27(28)</span>
              <span className="text-[11px] font-bold uppercase tracking-wider opacity-60">Overdue invoices</span>
            </button>


            {/* YEL Insurance */}
            <div className="bg-[#002830] rounded-[28px] p-7 text-white shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-xl">Get YEL insurance</h3>
                <div className="bg-white/10 p-2.5 rounded-full">
                   <IconArrowRight size={20} />
                </div>
              </div>
              <p className="text-[15px] leading-relaxed opacity-80 font-medium">
                When you take Ilmarinen YEL insurance through our application, we offer you one free month.
              </p>
            </div>

            {/* AI Assistant */}
            <button className="w-full bg-white rounded-[28px] p-6 flex justify-between items-center shadow-sm border border-gray-100/50 active:bg-gray-50 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-sm shadow-md">✨</div>
                <span className="text-[15px] font-bold text-gray-800">Ask David Kletta AI</span>
              </div>
              <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
                <IconArrowRight size={18} />
              </div>
            </button>
          </div>
        </div>
  </div>
);


// Main Component
const HomeScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabName>('home');

  return (
    <div className="h-full w-full bg-[#F5F5F5] flex flex-col relative font-aktifo">
      
      {/* Content Area Based on Tab */}
      <div className="flex-1 h-full w-full relative">
        {activeTab === 'home' && <DashboardContent />}
        {activeTab === 'bank' && <BankScreen />}
        {activeTab === 'sales' && <SalesScreen />}
        {activeTab === 'expenses' && <ExpensesScreen />}
        {activeTab === 'chat' && <ChatScreen />}
        {activeTab === 'assets' && <AssetsScreen />}
      </div>

      {/* Fixed Bottom Tab Bar */}
      <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-100 pb-9 pt-4 px-4 flex justify-between items-end z-30 shadow-[0_-4px_30px_rgba(0,0,0,0.03)]">
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
          active={activeTab === 'assets'} 
          icon={IconPieChart} 
          label="Assets" 
          onClick={() => setActiveTab('assets')} 
        />
        <TabItem 
          active={activeTab === 'chat'} 
          icon={IconChat} 
          label="Chat" 
          onClick={() => setActiveTab('chat')} 
        />
      </div>
    </div>
  );
};

// Helper Components for Dashboard
const StatChip = ({ label, value }: { label: string; value: string }) => (
  <div className="bg-white rounded-[20px] p-4 min-w-[130px] shadow-[0_4px_16px_rgba(0,0,0,0.03)] border border-gray-100 flex-shrink-0 snap-start">
    <p className="text-[11px] font-bold text-gray-400 mb-1.5 uppercase tracking-wider">{label}</p>
    <p className="font-bold text-[19px] text-kletta-dark">{value}</p>
  </div>
);

const ActionIcon = ({ icon: Icon, label, highlight }: { icon: any, label: string, highlight?: boolean }) => (
  <button className="flex flex-col items-center gap-2.5 group w-full">
    <div className={`w-[68px] h-[68px] rounded-[26px] flex items-center justify-center shadow-sm relative transition-all duration-200 group-active:scale-95 ${highlight ? 'bg-[#005c66] text-white' : 'bg-[#004a52] text-white'}`}>
      <Icon size={28} strokeWidth={1.5} />
      {highlight && <div className="absolute top-0 right-0 w-4 h-4 bg-kletta-yellow rounded-full border-[3px] border-[#F5F5F5]"></div>}
    </div>
    <span className="text-[12px] font-bold text-center leading-tight text-gray-600 group-hover:text-kletta-dark">{label}</span>
  </button>
);

const UpcomingItem = ({ days, text, color }: { days: number, text: string, color: string }) => (
  <button className="w-full flex justify-between items-center py-3.5 group">
    <div className="flex items-center gap-4">
      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center font-bold text-[19px] ${color} text-white shadow-sm`}>
        {days}
      </div>
      <div className="text-left">
        <p className="font-bold text-[15px] text-kletta-dark group-hover:text-kletta-teal transition-colors">VAT return</p>
        <p className="text-[13px] text-gray-400 font-medium">Due in {days} days</p>
      </div>
    </div>
    <div className="w-9 h-9 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-gray-100 transition-colors">
        <IconChevronRight size={18} className="text-gray-400" />
    </div>
  </button>
);

const ChecklistItem = ({ text }: { text: string }) => (
  <button className="w-full flex items-center justify-between py-4.5 group hover:bg-gray-50 px-3 -mx-3 rounded-2xl transition-colors">
    <div className="flex items-center gap-3.5">
      <div className="w-6 h-6 border-[2.5px] border-gray-200 rounded-[8px] flex items-center justify-center group-hover:border-kletta-teal transition-colors"></div>
      <span className="text-[15px] font-bold text-gray-700">{text}</span>
    </div>
    <IconChevronRight size={18} className="text-gray-300 group-hover:text-kletta-teal" />
  </button>
);

const TabItem = ({ active, icon: Icon, label, onClick }: { active: boolean, icon: any, label: string, onClick: () => void }) => (
  <button onClick={onClick} className="flex flex-col items-center gap-1 w-14 group">
    <div className={`transition-all duration-200 ${active ? '-translate-y-1' : ''}`}>
        <Icon size={24} color={active ? '#00343B' : '#C3C7CB'} strokeWidth={active ? 2.5 : 2} />
    </div>
    <span className={`text-[10px] font-bold tracking-wide transition-colors ${active ? 'text-kletta-teal' : 'text-gray-300'}`}>{label}</span>
  </button>
);

export default HomeScreen;