
import React, { useState, useEffect, useRef } from 'react';
import { 
  IconSettings, IconGear, IconChevronDown, IconChevronRight, IconClose, IconArrowRight,
  IconHome, IconSales, IconExpenses, IconChat, IconPieChart, IconBank,
  IconNewInvoice, IconAddEntry, IconNewProduct, IconStartTrip, IconScanReceipt, IconUploadReceipt,
  IconCheck, IconRun, IconSparkle, IconVerified, IconInvoice, IconAddTrip,
  KlettaLogo, IconSend, IconScan, IconFileText, IconFileArrowUp, IconCalendarBlank, IconFile, IconPhone, IconScales, IconHandWaving
} from '../components/Icons';
import { TabName, ScreenName, NavigationProps } from '../types';
import SalesScreen from './SalesScreen';
import ExpensesScreen from './ExpensesScreen';
import ChatScreen from './ChatScreen';
import AssetsScreen from './AssetsScreen';
import BankScreen from './BankScreen';
import { SummaryScreen } from './SummaryScreen';
import DateFilterSheet from '../components/DateFilterSheet';
import { ProductTypeSelectionSheet } from './ProductFlowScreens';
import { KlettaInput, KlettaTextarea } from '../components/Inputs';
import { IncompleteOnboardingEntry } from './IncompleteOnboarding';

// Mock Gallery Data
const MOCK_GALLERY_IMAGES = [
  "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&fit=crop",
  "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&fit=crop",
  "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?w=800&fit=crop",
  "https://images.unsplash.com/photo-1554224155-1696413565d3?w=800&fit=crop",
  "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=800&fit=crop",
  "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&fit=crop",
  "https://images.unsplash.com/photo-1626262323023-455b9e072464?w=800&fit=crop",
  "https://images.unsplash.com/photo-1512418490979-92798ccc13a0?w=800&fit=crop",
  "https://images.unsplash.com/photo-1534670007418-fbb7f6cf32c3?w=800&fit=crop"
];

const VirtualGallerySheet = ({ onClose, onSelect }: { onClose: () => void, onSelect: (url: string) => void }) => {
  return (
    <div className="absolute inset-0 z-[100] flex flex-col justify-end">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px] animate-fade-in" onClick={onClose} />

      {/* Sheet Content */}
      <div className="w-full bg-white z-10 animate-slide-up shadow-[0_-8px_40px_rgba(0,0,0,0.12)] rounded-t-[32px] overflow-hidden flex flex-col max-h-[90%] pb-12">
        
        {/* Header */}
        <div className="px-6 pt-8 pb-4 flex items-center justify-between border-b border-gray-50">
          <h2 className="text-[17px] font-medium text-kletta-dark">Select from gallery</h2>
          <button onClick={onClose} className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors">
            <IconClose size={22} weight="bold" className="text-kletta-dark" />
          </button>
        </div>

        {/* Scrollable Grid */}
        <div className="flex-1 overflow-y-auto no-scrollbar px-1 pt-1">
          <div className="grid grid-cols-3 gap-1">
            {MOCK_GALLERY_IMAGES.map((url, idx) => (
              <button 
                key={idx}
                onClick={() => onSelect(url)}
                className="aspect-square w-full relative group overflow-hidden active:opacity-70 transition-opacity"
              >
                <img 
                  src={url} 
                  alt={`Receipt ${idx + 1}`} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// New Scan Sales Report Sheet
const ScanSalesReportSheet = ({ onClose, onContinue }: { onClose: () => void, onContinue: () => void }) => {
  return (
    <div className="absolute inset-0 z-[100] flex flex-col justify-end font-aktifo">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 animate-fade-in" onClick={onClose} />

      {/* Sheet Content */}
      <div className="w-full bg-white z-10 animate-slide-up shadow-2xl rounded-t-[32px] overflow-hidden flex flex-col max-h-[95%]">
        
        {/* Header */}
        <div className="px-6 pt-10 pb-4 flex items-center justify-between sticky top-0 bg-white z-20">
          <div className="w-10 h-10" />
          <h2 className="text-[19px] font-bold text-kletta-dark tracking-tight">Scan sales report</h2>
          <button onClick={onClose} className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-50 active:bg-gray-100 transition-colors">
            <IconClose size={26} weight="bold" className="text-gray-400" />
          </button>
        </div>

        {/* Scrollable Form */}
        <div className="flex-1 overflow-y-auto no-scrollbar px-6 pb-32">
          
          {/* Action Cards (Opening Bookkeeping Style) */}
          <div className="space-y-3 mb-8">
               <button 
                  className="w-full flex flex-col items-center justify-center py-6 rounded-[20px] border-2 border-gray-100 border-dashed bg-white active:bg-gray-50 transition-colors"
               >
                  <IconFileArrowUp size={30} className="text-kletta-teal mb-2" weight="regular" />
                  <span className="text-[14px] font-medium text-kletta-dark">Upload report</span>
               </button>

               <button 
                  className="w-full flex items-center gap-4 p-5 rounded-[20px] border-2 border-gray-100 bg-white active:bg-gray-50 transition-colors text-left"
               >
                  <IconScan size={28} className="text-kletta-dark shrink-0" weight="regular" />
                  <div className="flex-1">
                     <h3 className="text-[14px] font-medium text-kletta-dark">Take a photo of the report</h3>
                  </div>
               </button>
          </div>

          <p className="text-[13px] text-gray-500 font-light text-center mb-8 px-4">
            Amount should include VAT. Fill only necessary fields.
          </p>

          {/* Form Fields */}
          <div className="space-y-8">
            
            {/* Date Section */}
            <div>
              <KlettaInput 
                label="Date" 
                defaultValue="17.01.2026" 
                readOnly
                icon={<IconCalendarBlank size={18} className="text-gray-400" />}
                className="text-center font-bold"
              />
            </div>

            {/* Sales Grid */}
            <div className="space-y-4">
              <SalesReportInputRow label="Sale Exempted from VAT" />
              <SalesReportInputRow label="Sale 0%" />
              <SalesReportInputRow label="Sale 10%" />
              <SalesReportInputRow label="Sale 13.5%" />
              <SalesReportInputRow label="Sale 14%" />
              <SalesReportInputRow label="Sale 25.5%" />
              <SalesReportInputRow 
                label="Tips (Exempted from VAT)" 
                sublabel="Other business income category" 
              />
              <SalesReportInputRow 
                label="Commission expense 25.5%" 
                sublabel="Other deductible expense category" 
              />
            </div>

            {/* Description Section */}
            <div>
              <KlettaTextarea 
                label="Description" 
                placeholder="Write description" 
                className="h-24"
              />
            </div>
          </div>
        </div>

        {/* Fixed Footer */}
        <div className="absolute bottom-0 left-0 right-0 bg-white p-6 border-t border-gray-100">
           <button 
             onClick={onContinue}
             className="w-full h-[56px] bg-kletta-yellow rounded-[14px] text-kletta-dark font-bold text-[16px] active:scale-[0.98] transition-all shadow-sm"
           >
             Continue
           </button>
        </div>
      </div>
    </div>
  );
};

const SalesReportInputRow = ({ label, sublabel }: { label: string, sublabel?: string }) => (
  <div className="flex items-start justify-between py-1">
    <div className="flex-1 pr-4 pt-2">
      <p className="text-[15px] font-bold text-kletta-teal leading-tight">{label}</p>
      {sublabel && <p className="text-[12px] text-gray-500 font-light mt-1">{sublabel}</p>}
    </div>
    <div className="w-[130px] shrink-0">
       <input 
          type="text" 
          placeholder="VAT Included" 
          className="w-full h-[48px] bg-white border border-gray-200 rounded-[14px] px-4 text-right text-[14px] font-medium text-kletta-dark outline-none focus:border-kletta-teal transition-all placeholder:text-gray-300 shadow-sm"
       />
    </div>
  </div>
);

// Dashboard (Original Home Content)
const DashboardContent = ({ 
  navigate, 
  onBankClick, 
  onUploadClick, 
  onScanSalesReportClick,
  onViewSummary,
  onOpenIncompleteOnboarding,
  dateRange, 
  onOpenFilter 
}: { 
  navigate: (screen: ScreenName) => void, 
  onBankClick: () => void, 
  onUploadClick: () => void,
  onScanSalesReportClick: () => void,
  onViewSummary: () => void,
  onOpenIncompleteOnboarding: () => void,
  dateRange: string, 
  onOpenFilter: () => void 
}) => {
  return (
    <div className="w-full h-full relative overflow-hidden flex flex-col font-aktifo bg-[#F5F5F5] animate-fade-in">
        
        {/* Scrollable Content */}
        <div className="flex-1 w-full overflow-y-auto no-scrollbar pb-64">
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
              
              <div 
                onClick={onOpenFilter}
                className="flex items-center gap-1 opacity-100 hover:opacity-80 transition-opacity cursor-pointer"
              >
                <span className="text-[13px] font-medium tracking-wide">{dateRange}</span>
                <IconChevronDown size={14} weight="bold" />
              </div>
            </div>

            {/* Main Profit */}
            <div className="flex flex-col items-center mb-4">
              <span className="text-[15px] font-semibold mb-1 tracking-normal text-kletta-yellow">Operating profit</span>
              <span className="text-[40px] font-bold mb-2 tracking-tight leading-none text-white">+€2,361.43</span>
              
              <div className="flex items-center gap-1.5 opacity-90">
                <span className="text-[13px] font-medium text-white">Tim Sole Trader (1234567890)</span>
                <IconVerified size={18} className="text-kletta-yellow" weight="fill" />
              </div>
            </div>
          </div>

          {/* Unified Summary Card - Overlapping Header */}
          <div className="px-5 -mt-12 relative z-10 mb-6">
              <div className="bg-white rounded-[20px] shadow-[0_8px_32px_rgba(0,0,0,0.12)] flex flex-col overflow-hidden border border-gray-100">
                 
                 {/* Stats Row - TEXT SIZES INCREASED BY 1PX */}
                 <div className="flex justify-between py-5 px-1">
                    <div className="flex-1 flex flex-col items-center text-center">
                       <p className="text-[14px] font-normal text-gray-500 mb-1">Income</p>
                       <p className="font-medium text-[17px] text-kletta-dark leading-tight">€2,986.30</p>
                    </div>
                    <div className="w-[1px] bg-gray-100 h-10 self-center"></div>
                    <div className="flex-1 flex flex-col items-center text-center">
                       <p className="text-[14px] font-normal text-gray-500 mb-1">Expenses</p>
                       <p className="font-medium text-[17px] text-kletta-dark leading-tight">€523.46</p>
                    </div>
                     <div className="w-[1px] bg-gray-100 h-10 self-center"></div>
                    <div className="flex-1 flex flex-col items-center text-center">
                       <p className="text-[14px] font-normal text-gray-500 mb-1">VAT</p>
                       <p className="font-medium text-[17px] text-kletta-dark leading-tight">€145.90</p>
                    </div>
                 </div>

                 {/* Integrated View Summary Link - INSIDE THE CARD NOW WITH LIGHT GREY BG */}
                 <div className="border-t border-gray-50 py-3.5 flex justify-center bg-gray-50">
                    <button 
                      onClick={onViewSummary}
                      className="flex items-center gap-1 text-[13px] font-medium text-kletta-secondary hover:text-kletta-teal transition-colors active:opacity-60"
                    >
                      View summary
                      <IconChevronRight size={14} weight="bold" />
                    </button>
                 </div>
              </div>
          </div>

          {/* Main Body Content */}
          <div className="px-5 space-y-6">
            
            {/* 1. Action Grid - Updated Action Icons to use custom squircle shape */}
            <div className="grid grid-cols-4 gap-y-6 gap-x-2 py-2">
              <ActionIcon icon={IconNewInvoice} label="New invoice" onClick={() => navigate('new-invoice')} />
              <ActionIcon icon={IconAddEntry} label="Add entry" onClick={() => navigate('add-entry')} />
              <ActionIcon icon={IconScan} label="Scan sales report" onClick={onScanSalesReportClick} />
              <ActionIcon icon={IconStartTrip} label="Start trip" />
              
              <ActionIcon icon={IconAddTrip} label="Add trip" /> 
              <ActionIcon icon={IconBank} label="Bank" onClick={onBankClick} />
              <ActionIcon icon={IconScanReceipt} label="Scan receipt" highlight onClick={() => navigate('scan-receipt-camera')} />
              <ActionIcon icon={IconUploadReceipt} label="Upload receipt" highlight onClick={onUploadClick} />
            </div>

            {/* 2. Upcoming Section */}
            <div className="bg-white rounded-[20px] p-5 shadow-sm border border-gray-100/50">
              <div className="flex justify-between items-center mb-4">
                  <h3 className="font-medium text-[16px] text-kletta-dark">Upcoming</h3>
              </div>
              <div className="space-y-0">
                <UpcomingItem 
                  days={45} 
                  text="VAT return 06/2025 not ready" 
                  dotColor="bg-gray-300" 
                  label="Review"
                  onClick={() => navigate('tax-return')}
                />
                <div className="h-px bg-gray-50 my-1 ml-0"></div>
                <UpcomingItem 
                  days={76} 
                  text="VAT return 06/2025 not ready" 
                  dotColor="bg-orange-400" 
                  label="Review"
                  onClick={() => navigate('tax-return')}
                />
                 <div className="h-px bg-gray-50 my-1 ml-0"></div>
                <UpcomingItem 
                  days={102} 
                  text="Confirm your tax return" 
                  dotColor="bg-kletta-yellow" 
                  label="Review"
                  secondaryLabel="Confirm"
                  onClick={() => navigate('tax-return')}
                  onSecondaryClick={() => navigate('tax-return')}
                />
              </div>
            </div>

            {/* 3. Banner */}
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
            
            {/* 4. Setup Account */}
            <div className="bg-white rounded-[20px] p-5 shadow-[0_4px_20px_rgba(0,0,0,0.04)] border border-gray-100/50">
              <div className="flex justify-between items-center mb-4 px-1">
                <h3 className="font-medium text-[16px] text-kletta-dark">Set up your account</h3>
                <span className="text-[11px] font-medium text-[#008c9e]">50% complete</span>
              </div>
              <div className="divide-y divide-gray-50">
                <ChecklistItem 
                  text="Add your tax information" 
                  icon={<IconFile size={20} weight="regular" />}
                  onClick={() => navigate('incomplete-onboarding-tax-info')}
                />
                <ChecklistItem 
                  text="Confirm your tax return" 
                  icon={<IconFile size={20} weight="regular" />}
                  onClick={() => navigate('incomplete-onboarding-tax-confirm')}
                />
                <ChecklistItem 
                  text="Add phone number" 
                  icon={<IconPhone size={20} weight="regular" />}
                  onClick={() => navigate('incomplete-onboarding-phone')}
                />
              </div>
            </div>

             {/* 5. Overdue */}
             <button className="w-full py-4 bg-kletta-yellow rounded-[20px] flex flex-col items-center justify-center font-medium text-kletta-dark shadow-sm active:scale-[0.98] transition-transform gap-0.5">
              <span className="text-xl tracking-tight font-bold">27(28)</span>
              <span className="text-[11px] font-medium opacity-70 uppercase tracking-wide">Overdue invoices</span>
            </button>

            {/* 6. Next Steps Section */}
            <div className="space-y-4 pt-2">
              <h3 className="font-medium text-[17px] text-kletta-dark tracking-tight px-1">Next you could...</h3>
              
              {/* Care Promo Banner - Close Icon consistent with top banner */}
              <div className="bg-kletta-yellow rounded-[20px] p-5 flex items-start justify-between shadow-sm relative group overflow-hidden border border-kletta-yellow/40">
                <div className="flex gap-4 items-center">
                   <div className="w-11 h-11 bg-white/30 rounded-full flex items-center justify-center shrink-0">
                      <IconScales size={26} className="text-kletta-dark" weight="bold" />
                   </div>
                  <p className="font-normal text-[14px] leading-tight text-kletta-dark max-w-[210px]">
                    Upgrade to Kletta CARE where accounting expert verifies all entries <span className="font-bold">69€/month</span>
                  </p>
                </div>
                <button className="opacity-60 hover:opacity-100 p-1 -mt-1 -mr-1 shrink-0">
                   <IconClose size={20} weight="bold" />
                </button>
              </div>

              {/* Step List Items */}
              <div className="space-y-3">
                <NextStepRow number={1} label="Setup Business Profile" />
                <NextStepRow number={2} label="Create new product or service" />
                <NextStepRow number={3} label="Setup bank information for invoicing" />
                <NextStepRow number={4} label="Set up vehicles to track mileage" />
                <NextStepRow number={5} label="Upload year-to-date book keeping" />
                <NextStepRow number={7} label="Confirm Business ID" />
                <NextStepRow number={8} label="Declare Advanced Taxes" />
                <NextStepRow 
                    icon={<IconCalendarBlank size={20} weight="bold" className="text-kletta-dark" />} 
                    label="Reserve online meeting" 
                />
              </div>
            </div>


            {/* 7. YEL Insurance */}
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
          </div>
        </div>
    </div>
  );
};

// --- MAIN COMPONENT ---
const HomeScreen: React.FC<NavigationProps> = ({ navigate, goBack, params }) => {
  const [activeTab, setActiveTab] = useState<TabName>(params?.tab || 'home');
  const [isTabBarHidden, setIsTabBarHidden] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [showGallery, setShowGallery] = useState(false);
  const [showScanReportSheet, setShowScanReportSheet] = useState(false);
  const [showIncompleteModal, setShowIncompleteModal] = useState(false);
  const [dateRange, setDateRange] = useState("Year to date");
  
  // AI Assistant Bar States
  const [isAiInputActive, setIsAiInputActive] = useState(false);
  const [aiInputValue, setAiInputValue] = useState('');
  const [openAiChatDirectly, setOpenAiChatDirectly] = useState(false);
  const aiInputRef = useRef<HTMLInputElement>(null);
  
  useEffect(() => {
    if (params?.tab) {
        setActiveTab(params.tab);
    }
    if (params?.showIncompleteOnboarding) {
        setShowIncompleteModal(true);
    }
  }, [params?.tab, params?.showIncompleteOnboarding]);

  useEffect(() => {
    if (isAiInputActive) {
      aiInputRef.current?.focus();
    }
  }, [isAiInputActive]);

  const handleBankClick = () => {
    setActiveTab('bank');
  };

  const handleUploadClick = () => {
    setShowGallery(true);
  };

  const handleAiSend = () => {
    if (!aiInputValue.trim()) return;
    setAiInputValue('');
    setIsAiInputActive(false);
    setOpenAiChatDirectly(true);
    setActiveTab('chat');
  };

  const handleGallerySelect = (url: string) => {
    setShowGallery(false);
    navigate('scan-receipt-preview', { imageUrl: url });
  };

  return (
    <div className="h-full w-full pt-5 bg-[#F5F5F5] relative font-aktifo overflow-hidden">
      
      {/* Content Area Based on Tab */}
      <div className="absolute inset-0 w-full h-full z-0">
        {activeTab === 'home' && (
          <DashboardContent 
            navigate={navigate} 
            onBankClick={handleBankClick} 
            onUploadClick={handleUploadClick}
            onScanSalesReportClick={() => setShowScanReportSheet(true)}
            onViewSummary={() => setActiveTab('summary')}
            onOpenIncompleteOnboarding={() => setShowIncompleteModal(true)}
            dateRange={dateRange} 
            onOpenFilter={() => setShowFilter(true)} 
          />
        )}
        {activeTab === 'bank' && <BankScreen />}
        {activeTab === 'sales' && (
          <SalesScreen 
            navigate={navigate} 
            goBack={goBack} 
            dateRange={dateRange} 
            onOpenFilter={() => setShowFilter(true)} 
            onModalToggle={setIsTabBarHidden}
          />
        )}
        {activeTab === 'expenses' && <ExpensesScreen dateRange={dateRange} onOpenFilter={() => setShowFilter(true)} />}
        {activeTab === 'chat' && (
          <ChatScreen 
            onChatActive={setIsTabBarHidden} 
            autoOpenAi={openAiChatDirectly} 
            onAutoOpenHandled={() => setOpenAiChatDirectly(false)}
          />
        )}
        {activeTab === 'assets' && <AssetsScreen navigate={navigate} onModalToggle={setIsTabBarHidden} />}
      </div>

      {/* Fixed Bottom Action Group */}
      {!isTabBarHidden && !showIncompleteModal && (
        <div className="absolute bottom-0 left-0 right-0 z-50 animate-fade-in">
            {/* AI Assistant Bar */}
            {activeTab === 'home' && (
              <div className="w-full bg-white/95 backdrop-blur-md px-6 py-4 flex flex-col border-t border-gray-100 transition-all">
                {isAiInputActive ? (
                  <div className="flex items-center gap-3 animate-fade-in">
                    <IconSparkle size={20} className="text-kletta-yellow shrink-0" weight="fill" />
                    <input 
                      ref={aiInputRef}
                      type="text" 
                      value={aiInputValue}
                      onChange={(e) => setAiInputValue(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleAiSend()}
                      onBlur={() => !aiInputValue && setIsAiInputActive(false)}
                      placeholder="Type your question..."
                      className="flex-1 bg-transparent border-none outline-none text-[14px] font-medium text-kletta-dark placeholder:text-kletta-secondary/50"
                    />
                    <button 
                      onClick={handleAiSend}
                      disabled={!aiInputValue.trim()}
                      className={`transition-all ${aiInputValue.trim() ? 'text-kletta-teal opacity-100' : 'text-gray-300 opacity-50'}`}
                    >
                      <IconSend size={20} weight="fill" />
                    </button>
                  </div>
                ) : (
                  <button 
                    onClick={() => setIsAiInputActive(true)}
                    className="flex justify-between items-center w-full group active:opacity-70 transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <IconSparkle size={20} className="text-kletta-yellow" weight="fill" />
                      <span className="text-[14px] font-medium text-kletta-secondary">Ask from David Kletta AI Assistant</span>
                    </div>
                    <div className="text-kletta-secondary opacity-60">
                      <IconArrowRight size={18} weight="bold" />
                    </div>
                  </button>
                )}
              </div>
            )}

            {/* Fixed Bottom Tab Bar */}
            <div className="bg-white border-t border-gray-100 pb-8 pt-3 px-4 flex justify-between items-end">
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
                onClick={() => {
                  setActiveTab('chat');
                  setOpenAiChatDirectly(false);
                }} 
                />
                <TabItem 
                active={activeTab === 'assets'} 
                icon={IconPieChart} 
                label="Assets" 
                onClick={() => setActiveTab('assets')} 
                />
            </div>
        </div>
      )}

      {/* Modals & Sheets */}
      {showIncompleteModal && (
        <IncompleteOnboardingEntry 
          navigate={navigate} 
          goBack={() => setShowIncompleteModal(false)} 
        />
      )}
      {showFilter && (
        <DateFilterSheet 
          currentValue={dateRange}
          onClose={() => setShowFilter(false)} 
          onApply={(val) => setDateRange(val)}
        />
      )}
      {showGallery && (
        <VirtualGallerySheet 
          onClose={() => setShowGallery(false)}
          onSelect={handleGallerySelect}
        />
      )}
      {showScanReportSheet && (
        <ScanSalesReportSheet 
          onClose={() => setShowScanReportSheet(false)}
          onContinue={() => setShowScanReportSheet(false)}
        />
      )}
    </div>
  );
};

// ActionIcon Component - Updated to use the custom squircle shape path and remove shadow as requested
const ActionIcon = ({ icon: Icon, label, highlight, onClick }: { icon: any, label: string, highlight?: boolean, onClick?: () => void }) => (
  <button onClick={onClick} className="flex flex-col items-center gap-2 group w-full">
    <div className="w-[56px] h-[56px] flex items-center justify-center relative transition-all duration-200 group-active:scale-95">
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M52 26C52 43.3333 43.3333 52 26 52C8.66667 52 0 43.3333 0 26C0 8.66667 8.66667 0 26 0C43.3333 0 52 8.66667 52 26Z" fill={highlight ? "#005c66" : "#00343B"} />
      </svg>
      <div className="relative z-10 text-white">
        <Icon size={24} weight="bold" />
      </div>
      {highlight && <IconSparkle size={12} weight="fill" className="absolute top-0 right-0 text-kletta-yellow z-20" />}
    </div>
    <span className="text-[11px] font-medium text-center leading-tight text-kletta-dark max-w-[70px]">{label}</span>
  </button>
);

const UpcomingItem = ({ days, text, dotColor, label = "Review", onClick, secondaryLabel, onSecondaryClick }: { days: number, text: string, dotColor: string, label?: string, onClick?: () => void, secondaryLabel?: string, onSecondaryClick?: () => void }) => (
  <div className="w-full flex justify-between items-center py-3">
    <div className="flex-1 text-left pr-2">
        <p className="font-medium text-[14px] text-kletta-dark mb-1">{days} days</p>
        <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${dotColor}`}></div>
            <p className="text-[13px] text-kletta-secondary font-light">{text}</p>
        </div>
    </div>
    <div className="flex flex-col gap-2 shrink-0">
        <button 
          onClick={onClick}
          className="px-4 py-2 bg-white border border-gray-200 rounded-[10px] text-[13px] font-medium text-kletta-dark active:bg-gray-50 transition-colors shadow-sm min-w-[84px] text-center"
        >
          {label}
        </button>
        {secondaryLabel && (
          <button 
            onClick={onSecondaryClick}
            className="px-4 py-2 bg-white border border-gray-200 rounded-[10px] text-[13px] font-medium text-kletta-dark active:bg-gray-50 transition-colors shadow-sm min-w-[84px] text-center"
          >
            {secondaryLabel}
          </button>
        )}
    </div>
  </div>
);

const ChecklistItem = ({ text, onClick, icon }: { text: string, onClick?: () => void, icon: React.ReactNode }) => (
  <button 
    onClick={onClick}
    className="w-full flex items-center justify-between py-4 group -mx-2 px-2 hover:bg-gray-50 transition-colors"
  >
    <div className="flex-1 items-center gap-3 pr-2 hidden sm:flex">
      <div className="w-6 h-6 flex items-center justify-center text-gray-400 shrink-0 transition-all">
         {React.cloneElement(icon as React.ReactElement<any>, { size: 20, weight: 'regular' })}
      </div>
      <span className="text-[14px] font-medium text-gray-600 leading-tight">{text}</span>
    </div>
    <div className="flex-1 flex items-center gap-3 pr-2 sm:hidden">
      <div className="w-6 h-6 flex items-center justify-center text-gray-400 shrink-0 transition-all">
         {React.cloneElement(icon as React.ReactElement<any>, { size: 20, weight: 'regular' })}
      </div>
      <span className="text-[14px] font-medium text-gray-600 leading-tight">{text}</span>
    </div>
    <IconChevronRight size={18} className="text-gray-300 group-hover:text-kletta-teal transition-colors" weight="bold" />
  </button>
);

const NextStepRow = ({ number, icon, label, onClick }: { number?: number, icon?: React.ReactNode, label: string, onClick?: () => void }) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center justify-between p-4 bg-white rounded-[16px] border border-gray-100/50 active:scale-[0.99] transition-all group shadow-[0_2px_8px_rgba(0,0,0,0.03)]`}
  >
    <div className="flex items-center gap-4">
      {number ? (
        <div className="w-8 h-8 rounded-full bg-kletta-yellow flex items-center justify-center text-[13px] font-medium text-kletta-dark">
          {number}
        </div>
      ) : (
        <div className="w-8 h-8 flex items-center justify-center shrink-0">
          {icon}
        </div>
      )}
      <span className="text-[15px] font-normal text-kletta-dark tracking-tight text-left leading-tight">{label}</span>
    </div>
    <div className="w-7 h-7 rounded-full bg-gray-50/80 flex items-center justify-center text-gray-600 shrink-0 border border-gray-100">
       <IconClose size={14} weight="bold" />
    </div>
  </button>
);

const TabItem = ({ active, icon: Icon, label, onClick }: { active: boolean, icon: any, label: string, onClick: () => void }) => (
  <button onClick={onClick} className="flex flex-col items-center gap-1 w-14 group">
    <div className={`transition-all duration-200`}>
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
