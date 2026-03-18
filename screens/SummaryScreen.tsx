
import React, { useState } from 'react';
import { 
    IconChevronDown, IconChevronRight, IconBack, IconShare
} from '../components/Icons';
import { NavigationProps } from '../types';
import DateFilterSheet from '../components/DateFilterSheet';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const INCOME_DATA = [
  { name: 'Business income', value: 183392.04, color: '#005A66' },
  { name: 'Other income', value: 49043.96, color: '#FFDE33' },
];

const EXPENSES_DATA = [
  { name: 'Business expenses', value: 19906.68, color: '#3B82F6' },
  { name: 'Non-allowable expenses', value: 24883.35, color: '#10B981' },
  { name: 'Claimed kilometers', value: 9533.39, color: '#F59E0B' },
  { name: 'VAT', value: 1990.68, color: '#F87171' },
  { name: 'Tax prepayments', value: 0, color: '#9CA3AF' },
  { name: 'Cash withdrawal', value: 42799.36, color: '#8B5CF6' },
];

export const SummaryScreen: React.FC<NavigationProps> = ({ navigate, goBack }) => {
    const [showFilter, setShowFilter] = useState(false);
    const [dateRange, setDateRange] = useState("All time");

    return (
        <div className="h-full w-full bg-white flex flex-col font-aktifo animate-fade-in relative overflow-hidden">
            {/* Header */}
            <div className="pt-12 pb-4 px-6 flex flex-col items-center bg-white sticky top-0 z-20">
                <div className="absolute left-6 top-[52px]">
                    <button 
                        onClick={goBack}
                        className="w-10 h-10 -ml-2 rounded-full flex items-center justify-center text-kletta-dark hover:bg-white active:scale-95 transition-all"
                    >
                        <IconBack size={24} weight="bold" />
                    </button>
                </div>
                <h1 className="text-[20px] font-bold text-kletta-dark mb-1">Summary</h1>
                <div className="absolute right-6 top-[52px]">
                    <button className="w-10 h-10 -mr-2 rounded-full flex items-center justify-center text-kletta-dark hover:bg-white active:scale-95 transition-all">
                        <IconShare size={24} weight="bold" />
                    </button>
                </div>
                <button 
                    onClick={() => setShowFilter(true)}
                    className="flex items-center gap-1 text-kletta-dark hover:opacity-70 transition-opacity"
                >
                    <span className="text-[14px] font-medium">{dateRange}</span>
                    <IconChevronDown size={16} weight="bold" />
                </button>
            </div>

            <div className="flex-1 overflow-y-auto no-scrollbar pb-24 px-4">
                {/* Profit Card */}
                <div className="bg-[#002B2E] rounded-[20px] p-5 mb-4 mt-2">
                    <p className="text-[14px] font-medium text-white/70 mb-2">Profit</p>
                    <p className="text-[32px] font-bold text-white tracking-tight leading-tight">€232,436.00</p>
                </div>

                {/* Total Income Section */}
                <div className="bg-white rounded-[24px] p-6 mb-4 shadow-sm border border-gray-100">
                    <h2 className="text-[18px] font-bold text-kletta-dark mb-4">Total Income</h2>
                    
                    <div className="relative h-[240px] w-full mb-6">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={INCOME_DATA}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={75}
                                    outerRadius={100}
                                    paddingAngle={5}
                                    dataKey="value"
                                    stroke="none"
                                    animationBegin={200}
                                    animationDuration={1000}
                                >
                                    {INCOME_DATA.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                            <p className="text-[13px] text-kletta-secondary font-medium">Total Income</p>
                            <p className="text-[22px] font-bold text-kletta-dark">€232,436.00</p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        {INCOME_DATA.map((item, index) => (
                            <LegendItem 
                                key={index}
                                color={item.color}
                                label={item.name}
                                value={`€${item.value.toLocaleString('de-DE', { minimumFractionDigits: 2 })}`}
                                onClick={() => navigate('summary-business-income')}
                            />
                        ))}
                    </div>
                </div>

                {/* Total Expenses Section */}
                <div className="bg-white rounded-[24px] p-6 mb-4 shadow-sm border border-gray-100">
                    <h2 className="text-[18px] font-bold text-kletta-dark mb-4">Total Expenses</h2>
                    
                    <div className="relative h-[240px] w-full mb-6">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={EXPENSES_DATA}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={75}
                                    outerRadius={100}
                                    paddingAngle={3}
                                    dataKey="value"
                                    stroke="none"
                                    animationBegin={400}
                                    animationDuration={1200}
                                >
                                    {EXPENSES_DATA.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                            <p className="text-[13px] text-kletta-secondary font-medium">Total Expenses</p>
                            <p className="text-[22px] font-bold text-kletta-dark">€99,533.39</p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        {EXPENSES_DATA.map((item, index) => (
                            <LegendItem 
                                key={index}
                                color={item.color}
                                label={item.name}
                                value={`€${item.value.toLocaleString('de-DE', { minimumFractionDigits: 2 })}`}
                                onClick={() => {}}
                            />
                        ))}
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

interface LegendItemProps {
    color: string;
    label: string;
    value: string;
    onClick?: () => void;
}

const LegendItem: React.FC<LegendItemProps> = ({ color, label, value, onClick }) => (
    <div 
        onClick={onClick}
        className="flex items-center justify-between group cursor-pointer active:opacity-70 transition-opacity"
    >
        <div className="flex items-center gap-3">
            <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: color }}></div>
            <span className="text-[15px] text-kletta-dark font-medium">{label}</span>
        </div>
        <div className="flex items-center gap-2">
            <span className="text-[15px] text-kletta-dark font-bold">{value}</span>
            <IconChevronRight size={16} weight="bold" className="text-gray-300" />
        </div>
    </div>
);
