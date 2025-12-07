import React from 'react';
import { 
    IconBack, IconChevronDown, IconPlus, IconQuestion, IconChevronRight, IconTrendUp,
    IconCellSignalFull, IconWifiHigh, IconBatteryFull
} from '../components/Icons';
import { NavigationProps } from '../types';

export const BusinessIncomeScreen: React.FC<NavigationProps> = ({ navigate, goBack }) => {
    return (
        <div className="h-full w-full bg-[#FAFAFA] flex flex-col font-aktifo animate-fade-in relative overflow-hidden">
             
            {/* Status Bar */}
            <div className="w-full h-[50px] flex justify-between items-end px-6 pb-2 text-kletta-dark pointer-events-none z-20">
                <span className="text-[15px] font-bold tracking-normal leading-none ml-2">9:41</span>
                <div className="flex gap-1.5 items-center mr-1">
                    <IconCellSignalFull size={16} weight="fill" />
                    <IconWifiHigh size={16} weight="bold" />
                    <IconBatteryFull size={24} weight="fill" className="rotate-0" />
                </div>
            </div>

            {/* Header */}
            <div className="bg-[#FAFAFA] px-6 pt-2 pb-6 flex items-start justify-between z-10">
                <button onClick={goBack} className="w-10 h-10 -ml-2 rounded-full flex items-center justify-center hover:bg-black/5 active:bg-black/10 transition-colors">
                    <IconBack size={26} className="text-kletta-dark" />
                </button>
                <div className="flex flex-col items-center">
                    <h1 className="text-[17px] font-bold text-kletta-dark leading-tight">Business Income</h1>
                    <div className="flex items-center gap-1 text-kletta-dark/60">
                        <span className="text-[13px] font-medium">All time</span>
                        <IconChevronDown size={12} weight="bold" />
                    </div>
                </div>
                <button className="w-10 h-10 -mr-2 rounded-full flex items-center justify-center hover:bg-black/5 active:bg-black/10 transition-colors">
                    <IconPlus size={26} weight="bold" className="text-kletta-dark" />
                </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto no-scrollbar pb-36 px-5 space-y-6">
                
                {/* Total Card */}
                <div className="bg-kletta-teal rounded-[24px] p-6 text-white shadow-sm flex items-center justify-between">
                    <div>
                        <p className="text-[13px] font-bold uppercase tracking-wider opacity-80 mb-1">Total – Business Income</p>
                        <p className="text-[32px] font-bold leading-none tracking-tight">€272,015.35</p>
                    </div>
                    <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center">
                        <IconQuestion size={18} weight="bold" />
                    </div>
                </div>

                {/* List */}
                <div className="space-y-0">
                    <IncomeRow label="No invoice available" amount="€200.00" isPill />
                    <div className="h-[1px] bg-gray-100 mx-2 border-t border-dashed border-gray-200"></div>
                    <IncomeRow label="Big one" amount="€15,300.00" isPill />
                    <div className="h-[1px] bg-gray-100 mx-2 border-t border-dashed border-gray-200"></div>
                    <IncomeRow label="7k tuote" amount="€7,000.00" isPill />
                    <div className="h-[1px] bg-gray-100 mx-2 border-t border-dashed border-gray-200"></div>
                    <IncomeRow label="Risuijen ajo" amount="€100.00" isPill />
                    <div className="h-[1px] bg-gray-100 mx-2 border-t border-dashed border-gray-200"></div>
                    <IncomeRow label="24%" amount="€222,000.00" isPill />
                    <div className="h-[1px] bg-gray-100 mx-2 border-t border-dashed border-gray-200"></div>
                    <IncomeRow label="Invoice #1023" amount="€1,250.00" />
                    <div className="h-[1px] bg-gray-100 mx-2 border-t border-dashed border-gray-200"></div>
                    <IncomeRow label="Consulting" amount="€5,400.00" />
                </div>

            </div>
        </div>
    );
};

const IncomeRow = ({ label, amount, isPill }: { label: string, amount: string, isPill?: boolean }) => (
    <button className="w-full py-4 flex items-center gap-3 active:opacity-60 transition-opacity">
        <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 shrink-0">
            <IconTrendUp size={20} weight="bold" />
        </div>
        
        <div className="flex-1 text-left flex items-center">
            {isPill ? (
                <span className="px-3 py-1 bg-gray-100 rounded-lg text-[13px] font-bold text-gray-600">{label}</span>
            ) : (
                <span className="text-[15px] font-bold text-kletta-dark">{label}</span>
            )}
        </div>

        <div className="flex items-center gap-3">
            <span className="text-[15px] font-bold text-kletta-dark">{amount}</span>
            <IconChevronRight size={16} weight="bold" className="text-gray-300" />
        </div>
    </button>
);