
import React, { useState } from 'react';
import { 
    IconBack, IconShare, IconChevronDown, IconChevronRight,
    IconTrendUp, IconTrendDown, IconMoney, IconCar,
    IconCellSignalFull, IconWifiHigh, IconBatteryFull, IconCoins
} from '../components/Icons';
import { NavigationProps } from '../types';
import DateFilterSheet from '../components/DateFilterSheet';

export const SummaryScreen: React.FC<NavigationProps> = ({ navigate, goBack }) => {
    const [showFilter, setShowFilter] = useState(false);
    const [dateRange, setDateRange] = useState("All time");

    return (
        <div className="h-full w-full bg-white flex flex-col font-aktifo animate-fade-in relative overflow-hidden text-kletta-dark">
             
            {/* Header Section - Dark Teal */}
            <div className="w-full bg-kletta-teal flex flex-col z-20 pb-5 pt-0 border-b border-white/5">
                
                {/* Status Bar */}
                <div className="w-full h-[50px] flex justify-between items-end px-6 pb-2 text-white pointer-events-none">
                    <span className="text-[15px] font-medium tracking-normal leading-none ml-2">9:41</span>
                    <div className="flex gap-1.5 items-center mr-1">
                        <IconCellSignalFull size={16} weight="fill" />
                        <IconWifiHigh size={16} weight="bold" />
                        <IconBatteryFull size={24} weight="fill" className="rotate-0" />
                    </div>
                </div>

                {/* Navigation Row */}
                <div className="px-6 pt-2 pb-2">
                    <button 
                        onClick={goBack} 
                        className="w-10 h-10 -ml-2 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors text-white"
                    >
                        <IconBack size={26} weight="bold" />
                    </button>
                </div>

                {/* Header Content */}
                <div className="px-6 pt-0 flex flex-col">
                    <div className="flex justify-between items-center mb-6">
                        <div className="flex flex-col">
                            <h1 className="text-[26px] font-medium text-white tracking-tight mb-1">Summary</h1>
                            <div 
                              onClick={() => setShowFilter(true)}
                              className="flex items-center gap-1 opacity-70 transition-opacity hover:opacity-100 cursor-pointer text-white"
                            >
                                <span className="text-[13px] font-medium">{dateRange}</span>
                                <IconChevronDown size={12} weight="bold" />
                            </div>
                        </div>
                        <button className="w-10 h-10 -mr-2 flex items-center justify-center hover:bg-white/10 rounded-full transition-colors text-white">
                            <IconShare size={24} weight="bold" />
                        </button>
                    </div>

                    <div className="flex flex-col gap-1">
                        <p className="text-[12px] font-medium text-white/70 uppercase tracking-widest">Total Profit</p>
                        <p className="text-[34px] font-light text-white tracking-tight leading-none">€135,433.10</p>
                    </div>
                </div>
            </div>

            {/* Scrollable Content - Flat List */}
            <div className="flex-1 overflow-y-auto no-scrollbar pb-36 pt-0 bg-white">
                
                {/* Income Section */}
                <div className="px-6 py-3 bg-white/95 sticky top-0 backdrop-blur-sm z-10 border-b border-gray-50">
                    <p className="text-[11px] font-medium text-kletta-secondary uppercase tracking-widest">Income</p>
                </div>
                
                <SummaryRow 
                    title="Business income" 
                    amount="€232,436.00" 
                    type="income"
                    icon={<IconTrendUp size={20} weight="bold" />}
                    onClick={() => navigate('summary-business-income')}
                />
                <SummaryRow 
                    title="Other income (grants, subsidies, refunds, etc.)" 
                    amount="€0.00" 
                    type="income"
                    icon={<IconTrendUp size={20} weight="bold" />}
                    onClick={() => navigate('summary-other-income')}
                />

                {/* Expenses Section */}
                <div className="px-6 py-3 bg-white/95 sticky top-0 backdrop-blur-sm z-10 border-b border-gray-50 mt-2">
                    <p className="text-[11px] font-medium text-kletta-secondary uppercase tracking-widest">Expenses</p>
                </div>

                <SummaryRow 
                    title="Business expenses" 
                    amount="€91,649.00" 
                    type="expense"
                    icon={<IconTrendDown size={20} weight="bold" />}
                    onClick={() => navigate('summary-business-expenses')}
                />
                <SummaryRow 
                    title="Non-allowable expenses" 
                    amount="€2,120.50" 
                    type="expense"
                    icon={<IconTrendDown size={20} weight="bold" />}
                    onClick={() => navigate('summary-nonallowable-expenses')}
                />

                {/* Other Section */}
                <div className="px-6 py-3 bg-white/95 sticky top-0 backdrop-blur-sm z-10 border-b border-gray-50 mt-2">
                    <p className="text-[11px] font-medium text-kletta-secondary uppercase tracking-widest">Other</p>
                </div>

                <SummaryRow 
                    title="Tax prepayments / Estimated tax prepayments" 
                    amount="€4,200.00" 
                    type="neutral"
                    icon={<IconCoins size={20} weight="fill" />}
                    onClick={() => navigate('summary-tax-prepayments')}
                />
                <SummaryRow 
                    title="Claimed kilometers" 
                    amount="€328.79" 
                    type="neutral"
                    icon={<IconCar size={20} weight="bold" />}
                    onClick={() => navigate('summary-claimed-kilometers')}
                />
                <SummaryRow 
                    title="Cash withdrawal" 
                    amount="€5,353.50" 
                    type="neutral"
                    icon={<IconMoney size={20} weight="bold" />}
                    onClick={() => navigate('summary-cash-withdrawal')}
                />

            </div>

            {/* Date Filter Sheet - Fixed to overlap everything */}
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

interface SummaryRowProps {
    title: string;
    amount: string;
    type: 'income' | 'expense' | 'neutral';
    icon: React.ReactNode;
    onClick?: () => void;
}

const SummaryRow: React.FC<SummaryRowProps> = ({ title, amount, type, icon, onClick }) => {
    return (
        <button 
            onClick={onClick}
            className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 active:bg-gray-100 transition-colors border-b border-gray-50 group text-left"
        >
            <div className="flex items-center gap-4 flex-1 min-w-0 pr-2">
                {/* Subtle Icon Container */}
                <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-kletta-secondary shrink-0">
                    {icon}
                </div>
                
                <div className="flex-1 min-w-0">
                    <p className="text-[15px] font-medium text-kletta-dark line-clamp-2 leading-tight">{title}</p>
                </div>
            </div>
            
            <div className="text-right flex items-center gap-3 shrink-0 pl-2">
                <p className={`text-[15px] font-medium tracking-normal whitespace-nowrap ${type === 'income' ? 'text-green-600' : 'text-kletta-dark'}`}>
                    {amount}
                </p>
                {onClick && (
                    <IconChevronRight size={14} weight="bold" className="text-gray-300 group-hover:text-kletta-teal transition-colors" />
                )}
            </div>
        </button>
    );
};
