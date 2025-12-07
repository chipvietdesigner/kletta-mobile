
import React from 'react';
import { 
    IconBack, IconShare, IconChevronDown, IconChevronRight, IconCoins,
    IconTrendUp, IconTrendDown, IconMoney, IconCar,
    IconCellSignalFull, IconWifiHigh, IconBatteryFull
} from '../components/Icons';
import { NavigationProps } from '../types';

export const SummaryScreen: React.FC<NavigationProps> = ({ navigate, goBack }) => {
    return (
        <div className="h-full w-full bg-[#F5F5F5] flex flex-col font-aktifo animate-fade-in relative overflow-hidden">
             
            {/* Status Bar */}
            <div className="w-full h-[50px] flex justify-between items-end px-6 pb-2 text-kletta-dark pointer-events-none z-20 bg-white/0">
                <span className="text-[15px] font-bold tracking-normal leading-none ml-2">9:41</span>
                <div className="flex gap-1.5 items-center mr-1">
                    <IconCellSignalFull size={16} weight="fill" />
                    <IconWifiHigh size={16} weight="bold" />
                    <IconBatteryFull size={24} weight="fill" className="rotate-0" />
                </div>
            </div>

            {/* Header */}
            <div className="bg-[#F5F5F5] px-6 pt-2 pb-6 flex items-start justify-between z-10">
                <button onClick={goBack} className="w-10 h-10 -ml-2 rounded-full flex items-center justify-center hover:bg-black/5 active:bg-black/10 transition-colors">
                    <IconBack size={26} className="text-kletta-dark" />
                </button>
                <div className="flex flex-col items-center">
                    <h1 className="text-[17px] font-bold text-kletta-dark leading-tight">Summary</h1>
                    <div className="flex items-center gap-1 text-kletta-dark/60">
                        <span className="text-[13px] font-bold">All time</span>
                        <IconChevronDown size={12} weight="bold" />
                    </div>
                </div>
                <button className="w-10 h-10 -mr-2 rounded-full flex items-center justify-center hover:bg-black/5 active:bg-black/10 transition-colors">
                    <IconShare size={24} className="text-kletta-teal" />
                </button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto no-scrollbar pb-36 px-5 space-y-8">
                
                {/* Profit Card */}
                <div className="bg-kletta-teal rounded-[32px] p-8 text-white shadow-sm flex items-center justify-between relative overflow-hidden">
                    <div className="relative z-10">
                        <p className="text-[13px] font-bold uppercase tracking-wider opacity-70 mb-1">Profit</p>
                        <p className="text-[36px] font-bold leading-none tracking-tight">€135,433.10</p>
                    </div>
                    <div className="relative z-10 w-14 h-14 bg-white/10 rounded-full flex items-center justify-center text-kletta-yellow">
                        <IconCoins size={32} weight="fill" />
                    </div>
                </div>

                {/* Income Section */}
                <div>
                    <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-3 ml-1">INCOME</h3>
                    <div className="bg-white rounded-[24px] overflow-hidden shadow-sm">
                        <SummaryRow 
                            icon={<IconTrendUp size={20} />} 
                            title="Business income" 
                            amount="€232,436.00" 
                            isTop
                            onClick={() => navigate('summary-business-income')}
                        />
                        <div className="h-[1px] bg-gray-50 mx-4 border-t border-dashed border-gray-200"></div>
                        <SummaryRow 
                            icon={<IconTrendUp size={20} />} 
                            title="Other income" 
                            amount="€0.00" 
                        />
                    </div>
                </div>

                {/* Expense Section */}
                <div>
                    <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-3 ml-1">EXPENSE</h3>
                    <div className="bg-white rounded-[24px] overflow-hidden shadow-sm">
                        <SummaryRow 
                            icon={<IconTrendDown size={20} />} 
                            title="Business expenses" 
                            amount="€232,436.00" 
                            isTop
                        />
                        <div className="h-[1px] bg-gray-50 mx-4 border-t border-dashed border-gray-200"></div>
                        <SummaryRow 
                            icon={<IconTrendDown size={20} />} 
                            title="Non-allowable expenses" 
                            amount="€232,436.00" 
                        />
                    </div>
                </div>

                {/* Other Section */}
                <div>
                    <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-3 ml-1">OTHER</h3>
                    <div className="bg-white rounded-[24px] overflow-hidden shadow-sm">
                        <SummaryRow 
                            icon={<IconCar size={20} />} 
                            title="Claimed kilometers" 
                            amount="€328.79" 
                            isTop
                        />
                        <div className="h-[1px] bg-gray-50 mx-4 border-t border-dashed border-gray-200"></div>
                        <SummaryRow 
                            icon={<IconMoney size={20} />} 
                            title="Cash withdrawal" 
                            amount="€5,353.50" 
                        />
                    </div>
                </div>

            </div>
        </div>
    );
};

interface SummaryRowProps {
    icon: React.ReactNode;
    title: string;
    amount: string;
    isTop?: boolean;
    onClick?: () => void;
}

const SummaryRow: React.FC<SummaryRowProps> = ({ icon, title, amount, isTop, onClick }) => {
    return (
        <button onClick={onClick} className="w-full p-5 flex items-center gap-4 hover:bg-gray-50 active:bg-gray-100 transition-colors group">
            <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-gray-400 shrink-0">
                {icon}
            </div>
            <div className="flex-1 text-left">
                <div className="flex justify-between items-center mb-1">
                    <p className="text-[14px] font-medium text-kletta-dark">{title}</p>
                    <IconChevronRight size={14} weight="bold" className="text-gray-300 group-hover:text-kletta-teal transition-colors" />
                </div>
                <p className="text-[14px] font-bold text-kletta-dark">{amount}</p>
            </div>
        </button>
    );
};
