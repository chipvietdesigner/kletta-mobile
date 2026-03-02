
import React, { useState } from 'react';
import { 
    IconChevronDown, IconChevronRight, IconMoney, IconBack
} from '../components/Icons';
import { NavigationProps } from '../types';
import DateFilterSheet from '../components/DateFilterSheet';

const ProfitChartIcon = () => (
  <div className="relative w-[72px] h-[72px]">
    <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
      {/* Red segment (top right) */}
      <circle
        cx="50"
        cy="50"
        r="38"
        fill="transparent"
        stroke="#F87171"
        strokeWidth="10"
        strokeDasharray="59.7 238.8"
        strokeDashoffset="0"
        strokeLinecap="round"
      />
      {/* Orange segment (bottom right) */}
      <circle
        cx="50"
        cy="50"
        r="38"
        fill="transparent"
        stroke="#FB923C"
        strokeWidth="10"
        strokeDasharray="59.7 238.8"
        strokeDashoffset="-59.7"
        strokeLinecap="round"
      />
      {/* Blue segment (bottom left) */}
      <circle
        cx="50"
        cy="50"
        r="38"
        fill="transparent"
        stroke="#818CF8"
        strokeWidth="10"
        strokeDasharray="59.7 238.8"
        strokeDashoffset="-119.4"
        strokeLinecap="round"
      />
      {/* Teal segment (top left) */}
      <circle
        cx="50"
        cy="50"
        r="38"
        fill="transparent"
        stroke="#4FD1C5"
        strokeWidth="10"
        strokeDasharray="59.7 238.8"
        strokeDashoffset="-179.1"
        strokeLinecap="round"
      />
      
      {/* Indicators on the left */}
      <g className="transform rotate-90 origin-center">
         <line x1="5" y1="35" x2="20" y2="35" stroke="#4FD1C5" strokeWidth="2.5" strokeLinecap="round" />
         <line x1="5" y1="42" x2="16" y2="42" stroke="#4FD1C5" strokeWidth="2.5" strokeLinecap="round" />
         <line x1="5" y1="49" x2="12" y2="49" stroke="#4FD1C5" strokeWidth="2.5" strokeLinecap="round" />
      </g>
    </svg>
    <div className="absolute inset-0 flex items-center justify-center">
       <div className="w-10 h-10 bg-[#FFD700] rounded-full flex items-center justify-center shadow-sm border-2 border-white">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
            <path d="M12.65 10C11.83 10 11 10.46 11 11.25C11 12.87 15 12.62 15 15.25C15 16.5 13.75 17.25 12 17.25V19H10V17.25C8.25 17.25 7 16.5 7 15.25H9C9 15.75 9.83 16.25 11 16.25C12.17 16.25 13 15.75 13 15.25C13 13.62 9 13.87 9 11.25C9 10 10.25 9.25 12 9.25V7.5H14V9.25C15.75 9.25 17 10 17 11.25H15C15 10.75 14.17 10 13 10H12.65Z" />
            <path d="M19,4H5C3.89,4 3,4.9 3,6V18C3,19.1 3.89,20 5,20H19C20.1,20 21,19.1 21,18V6C21,4.9 20.1,4 19,4M19,18H5V6H19V18Z" opacity="0.3" />
          </svg>
       </div>
    </div>
  </div>
);

export const SummaryScreen: React.FC<NavigationProps> = ({ navigate, goBack }) => {
    const [showFilter, setShowFilter] = useState(false);
    const [dateRange, setDateRange] = useState("All time");

    return (
        <div className="h-full w-full bg-white flex flex-col font-aktifo animate-fade-in relative overflow-hidden">
            {/* Header */}
            <div className="pt-12 pb-4 px-6 flex flex-col items-center bg-[#FAF8F5] sticky top-0 z-20">
                <div className="absolute left-6 top-[52px]">
                    <button 
                        onClick={goBack}
                        className="w-10 h-10 -ml-2 rounded-full flex items-center justify-center text-kletta-dark hover:bg-white active:scale-95 transition-all"
                    >
                        <IconBack size={24} weight="bold" />
                    </button>
                </div>
                <h1 className="text-[22px] font-bold text-[#0C0D0D] mb-1">Summary</h1>
                <button 
                    onClick={() => setShowFilter(true)}
                    className="flex items-center gap-1 text-[#0C0D0D] hover:opacity-70 transition-opacity"
                >
                    <span className="text-[14px] font-medium">{dateRange}</span>
                    <IconChevronDown size={16} weight="bold" />
                </button>
            </div>

            <div className="flex-1 overflow-y-auto no-scrollbar pb-24">
                {/* Top Section with Profit Card */}
                <div className="bg-[#FAF8F5] px-5 pt-2 pb-8">
                    {/* Profit Card */}
                    <div className="bg-white rounded-[24px] p-6 flex justify-between items-center shadow-[0_4px_20px_rgba(0,0,0,0.04)] border border-gray-50">
                        <div className="flex flex-col">
                            <p className="text-[15px] font-medium text-[#616A6B] mb-1.5">Profit</p>
                            <p className="text-[30px] font-bold text-[#0C0D0D] tracking-tight leading-tight">€135,433.10</p>
                        </div>
                        <ProfitChartIcon />
                    </div>
                </div>

                {/* List Items */}
                <div className="flex flex-col px-5 bg-white">
                    <SummaryItem 
                        title="Business Income" 
                        value="€2,383.08" 
                        onClick={() => navigate('summary-business-income')}
                    />
                    <SummaryItem 
                        title="Other income" 
                        value="€0.00" 
                        onClick={() => navigate('summary-other-income')}
                    />
                    <SummaryItem 
                        title="Business expenses" 
                        value="€0.00" 
                        onClick={() => navigate('summary-business-expenses')}
                    />
                    <SummaryItem 
                        title="Non-allowable expenses" 
                        value="€0.00" 
                        onClick={() => navigate('summary-nonallowable-expenses')}
                    />
                    <SummaryItem 
                        title="Claimed kilometers" 
                        value="€385.51" 
                        onClick={() => navigate('summary-claimed-kilometers')}
                    />
                    <SummaryItem 
                        title="VAT" 
                        value="€81.60" 
                        onClick={() => {}}
                    />
                    <SummaryItem 
                        title="Tax prepayments" 
                        value="€0.00" 
                        onClick={() => navigate('summary-tax-prepayments')}
                    />
                    <SummaryItem 
                        title="Cash withdrawal" 
                        value="€0.00" 
                        onClick={() => navigate('summary-cash-withdrawal')}
                        isLast 
                    />
                </div>
            </div>

            {/* Date Filter Sheet */}
            {showFilter && (
                <DateFilterSheet 
                    currentValue={dateRange}
                    onClose={() => setShowFilter(false)} 
                    onApply={(val) => setDateRange(val)}
                />
            )}
        </div>
    );
};

const SummaryItem = ({ title, value, isLast, onClick }: { title: string; value: string; isLast?: boolean; onClick?: () => void }) => (
    <div 
        onClick={onClick}
        className="flex items-center justify-between py-4 group cursor-pointer active:opacity-70 transition-opacity relative"
    >
        <div className="flex items-center gap-4 flex-1">
            <div className="w-[52px] h-[52px] rounded-[18px] bg-[#F2F4F5] flex items-center justify-center text-[#0C0D0D]">
                <IconMoney size={26} weight="bold" />
            </div>
            <div className="flex flex-col">
                <p className="text-[15px] text-[#616A6B] mb-0.5">{title}</p>
                <p className="text-[17px] font-bold text-[#0C0D0D]">{value}</p>
            </div>
        </div>
        <div className="flex items-center">
            <IconChevronRight size={18} weight="bold" className="text-gray-300" />
        </div>
        {!isLast && (
            <div className="absolute left-[68px] right-0 bottom-0 h-[1px] bg-gray-50"></div>
        )}
    </div>
);
