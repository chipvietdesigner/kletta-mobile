
import React, { useState } from 'react';
import { 
  IconClose, IconUpload, IconCamera, IconChevronDown, 
  IconSparkle, IconCellSignalFull, IconWifiHigh, IconBatteryFull
} from '../components/Icons';
import { NavigationProps } from '../types';

export const AddEntryScreen: React.FC<NavigationProps> = ({ navigate, goBack }) => {
    const [activeTab, setActiveTab] = useState<'Book keeping' | 'Income' | 'Expenses' | 'Journey'>('Income');
    const [selectedVat, setSelectedVat] = useState('10%');

    const tabs = ['Book keeping', 'Income', 'Expenses', 'Journey'] as const;

    const renderBookKeeping = () => (
        <div className="flex flex-col animate-fade-in">
            {/* Header Text */}
            <div className="px-6 text-center mb-8">
                <h2 className="text-[20px] font-bold text-kletta-dark mb-2">Input year-to-date amount</h2>
                <p className="text-[14px] text-gray-500 font-normal leading-relaxed">
                    Please check the amounts from income statement, amounts can not include value added taxes
                </p>
            </div>

            {/* Scan / Upload Section */}
            <div className="px-6 mb-8 text-center">
                <p className="text-[16px] font-bold text-kletta-dark mb-6">Scan or upload your income statement</p>
                <div className="relative w-[180px] mx-auto group">
                    <div className="w-full aspect-[3/4] bg-white border border-gray-100 shadow-lg rounded-[4px] overflow-hidden p-3 flex flex-col gap-1.5 opacity-80 group-hover:opacity-100 transition-opacity">
                        <div className="h-1.5 w-1/2 bg-gray-200 rounded-full" />
                        <div className="h-1 w-full bg-gray-100 rounded-full" />
                        <div className="h-1 w-full bg-gray-100 rounded-full" />
                        <div className="h-1 w-3/4 bg-gray-100 rounded-full" />
                        <div className="mt-auto h-2 w-1/4 bg-gray-200 rounded-full self-end" />
                    </div>
                    <button className="absolute -top-2 -right-2 w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-kletta-dark shadow-md active:scale-90 transition-transform">
                        <IconClose size={18} weight="bold" />
                    </button>
                </div>
            </div>

            {/* Year Selector */}
            <div className="px-6 mb-10">
                <div className="flex items-center justify-between py-4 border-y border-gray-100 cursor-pointer active:bg-gray-50 transition-colors">
                    <span className="text-[16px] font-normal text-kletta-dark">Year</span>
                    <div className="flex items-center gap-2">
                        <span className="text-[16px] font-normal text-kletta-dark">2025</span>
                        <IconChevronDown size={18} className="text-kletta-dark" weight="bold" />
                    </div>
                </div>
            </div>

            {/* Income Section */}
            <div className="px-6 mb-12">
                <h3 className="text-[16px] font-bold text-kletta-dark mb-1">Income</h3>
                <p className="text-[14px] text-gray-500 font-normal mb-6">Previous tax periods (not the ongoing)</p>
                <div className="space-y-6">
                    <FinancialInput label="Sales" desc="Revenue of previous tax periods" />
                    <FinancialInput label="Grants received and subsidies" desc="Additional income you got from e.g. government as support" />
                    <FinancialInput label="Other Income" desc="e.g. income from capital gains of fixed assets or from damages" />
                    <FinancialInput label="Interest income and other financial income" desc="Interest income and other financial income sub title" />
                </div>
            </div>

            {/* Expenses Section */}
            <div className="px-6 mb-12">
                <h3 className="text-[16px] font-bold text-kletta-dark mb-1">Expenses</h3>
                <p className="text-[14px] text-gray-500 font-normal mb-6">Previous tax periods (not the ongoing)</p>
                <div className="space-y-6">
                    <FinancialInput label="Purchases and changes in inventory" desc="Costs for acquiring goods and materials" />
                    <FinancialInput label="External services" desc="Subcontracting" />
                    <FinancialInput label="Representation expenses" desc="Total representation expenses in Kletta will be 2x the amount input in this field because only 50% of representation expenses are deductible." />
                    <FinancialInput label="Rents" desc="Payments for leasing office space, etc." />
                    <FinancialInput label="Other deductible expenses" desc="Merge here expenses from e.g. accounting, phone, network, accommodation, public transportation and marketing." />
                    <FinancialInput label="Interest expenses" desc="Interest paid on business loans and other borrowed funds." />
                    <FinancialInput label="Other financial cost" desc="Bank fees, transaction chargers and currency exchange losses." />
                    <FinancialInput label="Personnel cost" desc="e.g. entrepreneur's pension and personal insurances." />
                    <FinancialInput label="Vehicle costs" desc="Fuel, parts and repairs if business use is over 50%." />
                </div>
            </div>

            {/* Others Section */}
            <div className="px-6 mb-12">
                <h3 className="text-[16px] font-bold text-kletta-dark mb-1">Others</h3>
                <p className="text-[14px] text-gray-500 font-normal mb-6">Input only necessary fields.</p>
                <div className="space-y-6">
                    <FinancialInput label="Tax prepayment" desc="How much you have already paid advanced taxes?" />
                    <FinancialInput label="Cash withdrawal" desc="How much cash you have already taken for yourself?" />
                    <FinancialInput label="Total of paid VATs" desc="Input total amount of already paid VATs." />
                </div>
            </div>
            
            <div className="h-20" />
        </div>
    );

    const renderCommonForm = (categories: { title: string, desc: string }[]) => (
        <div className="flex flex-col animate-fade-in">
            {/* Amount Section */}
            <div className="px-6 text-center mb-10 pt-2">
                <p className="text-[14px] font-normal text-kletta-dark mb-4">Type amount (incl. VAT)</p>
                <h2 className="text-[32px] font-bold text-kletta-dark tracking-tight">€100.00</h2>
                <div className="h-px bg-gray-100 w-full mt-6" />
            </div>

            {/* VAT Selection Section */}
            <div className="px-6 mb-10">
                <p className="text-[14px] font-bold text-kletta-dark text-center mb-5">Choose VAT%</p>
                
                {/* Rate Grid */}
                <div className="grid grid-cols-4 gap-3 mb-4">
                    {['0%', '10%', '14%', '24%'].map((rate) => (
                        <button
                            key={rate}
                            onClick={() => setSelectedVat(rate)}
                            className={`h-[44px] rounded-full border flex items-center justify-center text-[14px] font-normal transition-all ${selectedVat === rate ? 'bg-kletta-teal text-white border-kletta-teal' : 'bg-white text-gray-500 border-gray-200'}`}
                        >
                            {rate}
                        </button>
                    ))}
                </div>

                {/* Special Category Buttons */}
                <div className="space-y-3">
                    <VatSpecialBtn label="Construction services - 0%" />
                    <div className="flex gap-3">
                        <VatSpecialBtn label="Exempted from VAT" className="flex-1" />
                        <VatSpecialBtn label="Goods EU - 0%" className="flex-1" />
                    </div>
                    <div className="flex gap-3">
                        <VatSpecialBtn label="Services EU - 0%" className="flex-1" />
                        <VatSpecialBtn label="Goods outside EU - 0%" className="flex-1" />
                    </div>
                    <div className="flex gap-3">
                        <VatSpecialBtn label="Services outside EU - 0%" className="flex-1 text-center leading-tight" />
                        <VatSpecialBtn label="25.5%" className="w-1/3" />
                    </div>
                </div>
            </div>

            {/* Date Row */}
            <div className="px-6 mb-8">
                <div className="flex items-center justify-between py-4 border-y border-gray-50 group cursor-pointer active:bg-gray-50 transition-colors">
                    <span className="text-[15px] font-bold text-kletta-dark">Date</span>
                    <div className="flex items-center gap-2">
                        <span className="text-[15px] font-normal text-kletta-dark">27 Apr, 2025</span>
                        <span className="text-gray-500">
                           <IconChevronDown size={16} />
                        </span>
                    </div>
                </div>
            </div>

            {/* Description */}
            <div className="px-6 mb-10 text-center">
                <p className="text-[15px] font-bold text-kletta-dark mb-4">Description</p>
                <p className="text-[15px] text-gray-500 font-normal">Write a description</p>
                <div className="h-px bg-gray-100 w-full mt-6" />
            </div>

            {/* Attachments Section */}
            <div className="px-6 mb-10 text-center">
                <p className="text-[15px] font-bold text-kletta-dark mb-6">Add attachment</p>
                
                {/* Dashed Upload Box */}
                <div className="w-full border-2 border-dashed border-gray-200 rounded-[16px] p-6 flex flex-col items-center gap-2 mb-4 hover:border-kletta-teal/30 transition-colors">
                    <IconUpload size={24} className="text-kletta-teal" weight="bold" />
                    <p className="text-[15px] font-bold text-kletta-dark mt-2">Upload income statement</p>
                    <p className="text-[13px] text-gray-500 font-light max-w-[200px] leading-relaxed">Kletta will automatically read the necessary data.</p>
                </div>

                {/* Camera Action Card */}
                <div className="w-full bg-white rounded-[16px] border border-gray-100 shadow-sm p-4 flex items-center gap-4 text-left active:bg-gray-50 transition-colors">
                    <div className="w-12 h-12 bg-gray-50 rounded-[12px] flex items-center justify-center text-kletta-dark shrink-0">
                        <IconCamera size={24} weight="bold" />
                    </div>
                    <div className="flex-1">
                        <p className="text-[15px] font-bold text-kletta-dark">Take a photo of the statement</p>
                        <p className="text-[12px] text-gray-500 font-light mt-0.5">Kletta will automatically read the necessary data.</p>
                    </div>
                </div>
                <div className="h-px bg-gray-100 w-full mt-10" />
            </div>

            {/* Categories Section */}
            <div className="px-6 mb-10 text-center">
                <p className="text-[15px] font-bold text-kletta-dark mb-8">Choose a category</p>
                
                <div className="space-y-1">
                    {categories.map((cat, idx) => (
                        <CategoryItem key={idx} title={cat.title} desc={cat.desc} />
                    ))}
                    {/* Extra spacer for scrolling */}
                    <div className="h-20" /> 
                </div>
            </div>
        </div>
    );

    const renderJourney = () => (
        <div className="flex flex-col animate-fade-in divide-y divide-gray-100">
            {/* Vehicle Selection */}
            <JourneySelectRow label="Vehicle" value="Public or other transport" />

            {/* Mileage Inputs */}
            <JourneyInputRow label="Amount of business mileage" />
            <JourneyInputRow label="Amount of personal mileage" />

            {/* Date Selectors */}
            <JourneySelectRow label="Start date" value="27 Apr, 2025" />
            <JourneySelectRow label="End date" value="27 Apr, 2025" />

            {/* Daily Allowance Header */}
            <div className="px-6 pt-8 pb-4 bg-white">
                <h3 className="text-[17px] font-bold text-kletta-dark">Daily allowance</h3>
            </div>

            {/* Allowance Counts */}
            <JourneyInputRow 
                label="Short pcs" 
                sublabel="(over 6h journeys, not for couriers)" 
            />
            <JourneyInputRow 
                label="Long pcs" 
                sublabel="(over 10h journeys, not for couriers)" 
            />

            <div className="h-32" />
        </div>
    );

    const incomeCategories = [
        { title: "Purchases and inventory changes", desc: "Description" },
        { title: "External services", desc: "Description" },
    ];

    const expenseCategories = [
        { title: "Purchases and inventory changes", desc: "Description" },
        { title: "External services", desc: "Description" },
        { title: "Representation expenses", desc: "Description" },
        { title: "Rents", desc: "Description" },
        { title: "Rents", desc: "Description" },
        { title: "Rents", desc: "Description" },
        { title: "Rents", desc: "Description" },
    ];

    return (
        <div className="h-full w-full bg-white flex flex-col font-aktifo animate-fade-in relative overflow-hidden text-[#111111]">
            
            {/* Status Bar */}
            <div className="w-full h-[50px] flex justify-between items-end px-6 pb-2 text-kletta-dark pointer-events-none z-20 bg-white">
                <span className="text-[15px] font-normal tracking-normal leading-none ml-2">9:41</span>
                <div className="flex gap-1.5 items-center mr-1">
                    <IconCellSignalFull size={16} weight="fill" />
                    <IconWifiHigh size={16} weight="bold" />
                    <IconBatteryFull size={24} weight="fill" className="rotate-0" />
                </div>
            </div>

            {/* Header */}
            <div className="px-6 pt-2 pb-4 flex flex-col z-10 bg-white shrink-0">
                <button 
                    onClick={goBack} 
                    className="w-10 h-10 -ml-2 rounded-full flex items-center justify-center hover:bg-gray-50 active:bg-gray-100 transition-colors"
                >
                    <IconClose size={26} className="text-kletta-dark" weight="bold" />
                </button>
                <div className="mt-4">
                    <h1 className="text-[28px] font-bold text-kletta-dark tracking-tight">Add entry</h1>
                    <p className="text-[15px] text-gray-500 font-normal mt-1">Select what you’re adding to your tax record.</p>
                </div>
            </div>

            {/* Segmented Control Tabs */}
            <div className="px-6 mb-6">
                <div className="bg-[#F2F4F5] p-1 rounded-[14px] flex w-full">
                    {tabs.map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`flex-1 py-2.5 text-[14px] font-normal rounded-[10px] transition-all duration-200 ${activeTab === tab ? 'bg-white text-kletta-dark shadow-sm' : 'text-gray-500'}`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            </div>

            {/* Scrollable Form Content */}
            <div className="flex-1 overflow-y-auto no-scrollbar bg-white">
                {activeTab === 'Book keeping' && renderBookKeeping()}
                {activeTab === 'Income' && renderCommonForm(incomeCategories)}
                {activeTab === 'Expenses' && renderCommonForm(expenseCategories)}
                {activeTab === 'Journey' && renderJourney()}
            </div>

            {/* Sticky Bottom Action */}
            <div className="absolute bottom-0 left-0 right-0 bg-white px-6 pt-4 pb-10 border-t border-gray-100 z-30">
                <button 
                    onClick={() => navigate('home')}
                    className="w-full py-4 bg-kletta-teal rounded-[14px] font-bold text-[16px] text-white shadow-sm hover:shadow-md active:scale-[0.98] transition-all"
                >
                    Continue
                </button>
            </div>
        </div>
    );
};

// --- Sub-components ---

const JourneyInputRow = ({ label, sublabel, placeholder = "0" }: { label: string, sublabel?: string, placeholder?: string }) => (
    <div className="px-6 py-5 flex items-center justify-between bg-white">
        <div className="flex flex-col flex-1 pr-4">
            <span className="text-[17px] font-normal text-kletta-dark leading-tight">{label}</span>
            {sublabel && <span className="text-[14px] font-light text-gray-500 mt-0.5">{sublabel}</span>}
        </div>
        <div className="w-[100px] h-[44px] border border-gray-200 rounded-[12px] flex items-center justify-end px-4">
            <input 
                type="text" 
                placeholder={placeholder}
                className="w-full text-right bg-transparent outline-none text-[17px] text-kletta-dark placeholder:text-gray-300"
            />
        </div>
    </div>
);

const JourneySelectRow = ({ label, value }: { label: string, value: string }) => (
    <div className="px-6 py-5 flex items-center justify-between bg-white cursor-pointer active:bg-gray-50 transition-colors">
        <span className="text-[17px] font-normal text-kletta-dark">{label}</span>
        <div className="flex items-center gap-2">
            <span className="text-[17px] font-normal text-kletta-dark">{value}</span>
            <IconChevronDown size={18} className="text-kletta-dark" weight="bold" />
        </div>
    </div>
);

const FinancialInput = ({ label, desc }: { label: string, desc: string }) => (
    <div className="flex items-start gap-4">
        <div className="flex-1">
            <p className="text-[14px] font-medium text-kletta-dark leading-tight mb-1">{label}</p>
            <p className="text-[13px] text-gray-500 font-light leading-snug">{desc}</p>
        </div>
        <div className="relative shrink-0 pt-0.5">
            <input 
                type="text" 
                placeholder="0"
                className="w-[100px] h-[40px] bg-white border border-gray-200 rounded-[10px] px-3 pr-8 text-right text-[15px] text-kletta-dark outline-none focus:border-kletta-teal transition-all placeholder:text-gray-300"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 mt-0.5 text-[14px] text-gray-500 font-light pointer-events-none">€</span>
        </div>
    </div>
);

const VatSpecialBtn = ({ label, className = '' }: { label: string, className?: string }) => (
    <button className={`h-[44px] px-4 bg-white border border-gray-200 rounded-full flex items-center justify-center text-[13px] font-normal text-gray-500 hover:border-kletta-teal hover:text-kletta-dark transition-all ${className}`}>
        {label}
    </button>
);

const CategoryItem = ({ title, desc }: { title: string, desc: string }) => (
    <button className="w-full flex items-start gap-4 py-4 px-2 hover:bg-gray-50 active:bg-gray-100 transition-colors text-left border-b border-gray-50 last:border-none">
        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center shrink-0">
            <IconSparkle size={20} weight="fill" className="text-white" />
        </div>
        <div className="flex-1 pt-0.5">
            <p className="text-[14px] font-normal text-kletta-dark leading-tight">{title}</p>
            <p className="text-[13px] text-gray-500 font-light mt-0.5">{desc}</p>
        </div>
    </button>
);
