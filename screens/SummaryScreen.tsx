
import React, { useState } from 'react';
import { 
    IconBack, IconChevronDown, IconChevronRight,
    IconTrendUp, IconTrendDown, IconCar,
    IconCellSignalFull, IconWifiHigh, IconBatteryFull, IconFileText,
    IconMoney, IconShare
} from '../components/Icons';
import { NavigationProps } from '../types';
import DateFilterSheet from '../components/DateFilterSheet';

export const SummaryScreen: React.FC<NavigationProps> = ({ navigate, goBack }) => {
    const [showFilter, setShowFilter] = useState(false);
    const [dateRange, setDateRange] = useState("1 Year");

    return (
        <div className="h-full w-full bg-white flex flex-col font-aktifo animate-fade-in relative overflow-hidden">
             
            {/* Fixed Header Section: Title and Profit */}
            <div className="w-full bg-kletta-teal flex flex-col z-20 pb-8 pt-10 shrink-0 shadow-sm relative">
                
                {/* Navigation Bar Row */}
                <div className="flex justify-end items-center px-6 pt-2 mb-2">
                    <button 
                        className="w-10 h-10 -mr-2 rounded-full flex items-center justify-center text-white hover:bg-white/10 active:scale-95 transition-all"
                        onClick={() => console.log('Share summary')}
                    >
                        <IconShare size={26} weight="bold" />
                    </button>
                </div>

                {/* Centered Title, Filter, and Profit Area */}
                <div className="px-6 flex flex-col items-center -mt-12">
                    <h1 className="text-[24px] font-bold text-white tracking-tight">Summary</h1>
                    <button 
                      onClick={() => setShowFilter(true)}
                      className="flex items-center gap-1.5 text-white transition-opacity hover:opacity-80 active:opacity-60 mt-0.5 mb-4"
                    >
                        <span className="text-[14px] font-medium opacity-80">{dateRange}</span>
                        <IconChevronDown size={14} weight="bold" className="opacity-80" />
                    </button>

                    {/* Centered Profit Amount */}
                    <div className="flex items-baseline text-white">
                        <span className="text-[38px] font-bold tracking-tighter">€2,361</span>
                        <span className="text-[26px] font-bold tracking-tighter opacity-80">.43</span>
                    </div>
                </div>
            </div>

            {/* Scrollable Content: Chart + Seamless List */}
            <div className="flex-1 overflow-y-auto no-scrollbar bg-white">
                
                {/* Line Chart Section - Remains Teal */}
                <div className="w-full bg-kletta-teal pb-8 px-4 relative">
                    <div className="w-full h-32 relative">
                        <svg viewBox="0 0 400 120" className="w-full h-full" preserveAspectRatio="none">
                            <defs>
                                <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="white" stopOpacity="0.3" />
                                    <stop offset="100%" stopColor="white" stopOpacity="0" />
                                </linearGradient>
                            </defs>
                            
                            {/* Grid Lines (Dashed) */}
                            <line x1="55" y1="20" x2="400" y2="20" stroke="white" strokeWidth="1" strokeDasharray="4 4" opacity="0.15" />
                            <line x1="55" y1="60" x2="400" y2="60" stroke="white" strokeWidth="1" strokeDasharray="4 4" opacity="0.15" />
                            <line x1="55" y1="100" x2="400" y2="100" stroke="white" strokeWidth="1" strokeDasharray="4 4" opacity="0.15" />

                            {/* Y-Axis Labels */}
                            <text x="0" y="24" fill="white" fontSize="10" fontWeight="600" opacity="0.6">€2,500</text>
                            <text x="0" y="64" fill="white" fontSize="10" fontWeight="600" opacity="0.6">€1,250</text>
                            <text x="0" y="104" fill="white" fontSize="10" fontWeight="600" opacity="0.6">€0</text>

                            {/* Updated Path geometry */}
                            <path 
                                d="M55,100 L160,100 C190,100 200,65 230,65 L330,60 C360,60 380,50 395,20" 
                                fill="none" 
                                stroke="white" 
                                strokeWidth="3" 
                                strokeLinecap="round"
                            />
                            
                            {/* Gradient Fill under the line */}
                            <path 
                                d="M55,100 L160,100 C190,100 200,65 230,65 L330,60 C360,60 380,50 395,20 V120 H55 Z" 
                                fill="url(#chartGradient)"
                            />

                            {/* Final Data Point Circle */}
                            <circle cx="395" cy="20" r="5" fill="white" />
                        </svg>
                    </div>
                </div>

                {/* Seamless List Section */}
                <div className="pb-36 bg-white">
                    <div className="w-full flex flex-col">
                        <SummaryCardRow 
                            title="Business Income" 
                            amount="€2,383.08" 
                            icon={<IconTrendUp size={22} weight="bold" />}
                            onClick={() => navigate('summary-business-income')}
                        />
                        <SummaryCardRow 
                            title="Other income" 
                            amount="€0.00" 
                            icon={<IconTrendUp size={22} weight="bold" />}
                            onClick={() => navigate('summary-other-income')}
                        />
                        <SummaryCardRow 
                            title="Business expenses" 
                            amount="€0.00" 
                            icon={<IconTrendDown size={22} weight="bold" />}
                            onClick={() => navigate('summary-business-expenses')}
                        />
                        <SummaryCardRow 
                            title="Non-allowable expenses" 
                            amount="€0.00" 
                            icon={<IconTrendDown size={22} weight="bold" />}
                            onClick={() => navigate('summary-nonallowable-expenses')}
                        />
                        <SummaryCardRow 
                            title="Claimed kilometers" 
                            amount="€385.51" 
                            icon={<IconCar size={22} weight="bold" />}
                            onClick={() => navigate('summary-claimed-kilometers')}
                        />
                        <SummaryCardRow 
                            title="VAT" 
                            amount="€81.60" 
                            icon={<IconFileText size={22} weight="regular" />}
                            onClick={() => {}}
                        />
                        <SummaryCardRow 
                            title="Tax prepayments / Estimated tax prepayments" 
                            amount="€0.00" 
                            icon={<IconFileText size={22} weight="regular" />}
                            onClick={() => navigate('summary-tax-prepayments')}
                        />
                        <SummaryCardRow 
                            title="Cash withdrawal" 
                            amount="€0.00" 
                            icon={<IconMoney size={22} weight="regular" />}
                            onClick={() => navigate('summary-cash-withdrawal')}
                            isLast
                        />
                    </div>
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

interface SummaryCardRowProps {
    title: string;
    amount: string;
    icon: React.ReactNode;
    isLast?: boolean;
    onClick?: () => void;
}

const SummaryCardRow: React.FC<SummaryCardRowProps> = ({ 
    title, amount, icon, isLast, onClick 
}) => {
    return (
        <button 
            onClick={onClick}
            className={`w-full px-5 py-4 flex items-center justify-between bg-white active:bg-gray-50 transition-colors group text-left ${!isLast ? 'border-b border-gray-100' : ''}`}
        >
            <div className="flex items-center gap-4 flex-1 min-w-0 pr-2">
                <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-kletta-teal shrink-0 group-active:scale-95 transition-transform">
                    {icon}
                </div>
                <div className="flex-1 min-w-0 flex flex-col">
                    <p className="text-[14px] font-medium leading-[20px] text-[#616A6B] mb-0.5">{title}</p>
                    <p className="text-[16px] font-semibold leading-[24px] text-[#0C0D0D] tracking-tight whitespace-nowrap">
                        {amount}
                    </p>
                </div>
            </div>
            
            <div className="shrink-0 pl-2">
                <IconChevronRight size={20} weight="bold" className="text-gray-300 transition-colors" />
            </div>
        </button>
    );
};
