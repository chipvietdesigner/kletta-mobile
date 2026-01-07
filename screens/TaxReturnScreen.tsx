
import React from 'react';
import { 
  IconBack, IconCellSignalFull, IconWifiHigh, IconBatteryFull,
  IconCheckCircle
} from '../components/Icons';
import { NavigationProps } from '../types';

export const TaxReturnScreen: React.FC<NavigationProps> = ({ goBack }) => {
    return (
        <div className="h-full w-full bg-[#F5F5F5] flex flex-col font-aktifo animate-fade-in relative overflow-hidden">
            
            {/* Teal Header */}
            <div className="bg-kletta-teal w-full z-20 shadow-sm shrink-0">
                {/* Status Bar */}
                <div className="w-full h-[50px] flex justify-between items-end px-6 pb-2 text-white pointer-events-none">
                   <span className="text-[15px] font-medium tracking-normal leading-none ml-2">9:41</span>
                   <div className="flex gap-1.5 items-center mr-1">
                      <IconCellSignalFull size={16} weight="fill" />
                      <IconWifiHigh size={16} weight="bold" />
                      <IconBatteryFull size={24} weight="fill" className="rotate-0" />
                   </div>
                </div>

                {/* Navbar */}
                <div className="pt-2 pb-6 px-6 flex flex-col items-center relative">
                   <button 
                       onClick={goBack} 
                       className="absolute left-6 top-2 w-10 h-10 rounded-full flex items-center justify-center hover:bg-white/10 active:bg-white/20 transition-colors text-white"
                   >
                      <IconBack size={26} weight="bold" />
                   </button>
                   <h1 className="text-[18px] font-bold text-white tracking-wide">Tax return 2024</h1>
                   <p className="text-[14px] text-white/70 font-medium">01.04.2025</p>
                </div>
            </div>

            {/* Scrollable Report Content */}
            <div className="flex-1 overflow-y-auto no-scrollbar pt-4 pb-32">
                
                {/* Profile Section */}
                <div className="bg-white rounded-[16px] mx-6 p-8 mb-6 text-center shadow-sm border border-gray-100">
                    <h2 className="text-[20px] font-bold text-kletta-dark mb-1">Kletta Sami</h2>
                    <p className="text-[14px] text-gray-500 font-medium">1234567-8</p>
                </div>

                {/* Info List */}
                <div className="px-6 space-y-3 mb-8">
                    <div className="flex justify-between items-center py-2 border-b border-gray-100/50">
                        <span className="text-[15px] text-gray-400 font-medium">Accounting period</span>
                        <span className="text-[15px] font-bold text-kletta-dark">1.1–31.12.2024</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-100/50">
                        <span className="text-[15px] text-gray-400 font-medium">Status</span>
                        <div className="flex items-center gap-1.5">
                             <IconCheckCircle size={18} weight="fill" className="text-green-600" />
                             <span className="text-[15px] font-bold text-kletta-dark">Completed</span>
                        </div>
                    </div>
                </div>

                {/* Section: Business Income */}
                <div className="px-6 mb-10">
                    <h3 className="text-[16px] font-bold text-kletta-dark mb-5">Business Income</h3>
                    <div className="space-y-4">
                        <ReportRow label="Revenue" value="€209,224.86" bold />
                        <ReportRow label="Grants and subsidies received" value="€0.00" />
                        <ReportRow label="Other business income" value="€0.00" />
                        <ReportRow label="Use on business assets for private purposes" value="€18,125.17" />
                        <ReportRow label="Private use of a vehicle" value="€18,125.17" indent />
                        <ReportRow label="Private use of goods" value={<ContactBtn />} indent />
                        <ReportRow label="Other private use" value={<ContactBtn />} indent />
                        <ReportRow label="Dividends and surplus" value={<ContactBtn />} />
                        <ReportRow label="Interest income and other financial income" value="€0.00" />
                        <ReportRow label="Relieved write-offs and reserves" value={<ContactBtn />} />
                        <ReportRow label="Taxable business income" value="€227,350.03" highlight />
                    </div>
                </div>

                {/* Section: Business Expenses */}
                <div className="px-6 mb-10">
                    <h3 className="text-[16px] font-bold text-kletta-dark mb-5">Business Expenses</h3>
                    <div className="space-y-4">
                        <ReportRow label="Purchases and changes in inventory" value="€4,215.35" />
                        <ReportRow label="External services" value="€15,224.80" bold />
                        <ReportRow label="Staff expenses (e.g. YEL)" value="€13,556.05" bold />
                        <ReportRow label="Depreciation" value="€15,000.00" bold />
                        <ReportRow label="Entertainment expenses (50%)" value="€5,158.39" />
                        <ReportRow label="Rental expenses" value="€190.91" />
                        <ReportRow label="Other deductible expenses" value="€5,108.81" bold />
                        <ReportRow label="Business related vehicle costs" value="€0.00" indent />
                        <ReportRow label="Business related van costs" value="€4,128.00" indent />
                        <ReportRow label="Interest expenses" value="€0.00" />
                        <ReportRow label="Other financial cost" value="€13.60" />
                        <ReportRow label="Total off-book deductible expenses" value="€2,000.00" />
                        <ReportRow label="Off-book deductible expenses" value={<InputBox placeholder="Input value" />} indent />
                        <ReportRow label="Additional deductions" value="€1,525.89" />
                        <ReportRow label="Mileage allowance" value="€328.89" indent />
                        <ReportRow label="Mileage allowance" value="€1,197.00" indent />
                        <ReportRow label="Deductible business expense" value="€61,993.80" highlight />
                    </div>
                </div>

                {/* Non-deductible */}
                <div className="px-6 mb-10">
                    <h3 className="text-[16px] font-bold text-kletta-dark mb-5">Non-deductible expenses</h3>
                    <div className="space-y-4">
                        <ReportRow label="Tax prepayment" value="€2,060.00" />
                        <ReportRow label="Other non-deductible expenses" value="€0.00" />
                        <ReportRow label="Total non-deductible expenses" value="€2,060.00" highlight />
                    </div>
                </div>

                {/* Profit */}
                <div className="px-6 mb-10 border-t border-gray-100 pt-6">
                    <ReportRow label="Business profit" value="€165,356.24" highlight large />
                </div>

                {/* Request for deduction */}
                <div className="px-6 mb-10">
                    <h3 className="text-[16px] font-bold text-kletta-dark mb-4 leading-tight">Request for deduction of loss from capital income</h3>
                    <ReportRow label="Amount of business losses deductible from capital income" value={<InputBox value="12.34" />} />
                </div>

                <div className="px-6 mb-10">
                    <ReportRow label="Division of business income between spouses" value={<ContactBtn />} />
                </div>

                {/* Depreciation */}
                <div className="px-6 mb-10">
                    <h3 className="text-[16px] font-bold text-kletta-dark mb-5">Depreciation on tangible fixed assets</h3>
                    <div className="space-y-4">
                        <ReportRow label="Remaining taxable balance of fixed assets at the beginning of the tax year" value="€0.00" />
                        <ReportRow label="Additions during the tax year" value="€60,000.00" bold />
                        <ReportRow label="Sales prices and insurance compensations" value="€0.00" />
                        <ReportRow label="Depreciation for the tax year" value="€15,000.00" bold />
                        <ReportRow label="Remaining taxable balance at the end of the tax year" value="€45,000.00" bold />
                    </div>
                </div>

                {/* Vehicle Costs */}
                <div className="px-6 mb-10">
                    <h3 className="text-[16px] font-bold text-kletta-dark mb-1">Self-employed person vehicle costs</h3>
                    <p className="text-[13px] text-gray-400 mb-5">(Over 50% of business use)</p>
                    <div className="space-y-4">
                        <ReportRow label="Total kilometers" value="161,213 km" bold />
                        <ReportRow label="Total costs" value="€19,128.00" bold />
                        <ReportRow label="Vehicle depreciation" value="€15,000.00" indent />
                        <ReportRow label="Vehicle costs" value="€4,128.00" indent />
                        <ReportRow label="Costs / km" value="€0.12 / km" bold />
                        <ReportRow label="Depreciation for the tax year" value="€15,000.00" bold />
                        <ReportRow label="Private use" value={<div><p className="text-right">€18,125.17</p><p className="text-[12px] text-gray-400">(152,761 km)</p></div>} />
                    </div>
                </div>

                {/* Residence */}
                <div className="px-6 mb-10">
                    <h3 className="text-[16px] font-bold text-kletta-dark mb-5">Use of private residence</h3>
                    <div className="space-y-4">
                        <ReportRow label="Total area of the residence" value={<InputBox value="100" suffix="m2" />} />
                        <ReportRow label="Area used for the business" value={<InputBox value="10" suffix="m2" />} />
                        <ReportRow label="Total property expenses" value={<InputBox value="20,000" suffix="€" />} />
                        <ReportRow label="Business use share of the costs" value="€2,000.00" bold />
                    </div>
                </div>

                {/* Travel Days */}
                <div className="px-6 mb-10">
                    <h3 className="text-[16px] font-bold text-kletta-dark mb-5">Business travel days</h3>
                    <div className="space-y-4">
                        <ReportRow label="Travel in Finland over 10h" value={<div><p className="text-right">€1,173.00</p><p className="text-[12px] text-gray-400">(23 days)</p></div>} bold />
                        <ReportRow label="Travel in Finland over 6h" value={<div><p className="text-right">€24.00</p><p className="text-[12px] text-gray-400">(1 day)</p></div>} bold />
                        <ReportRow label="Travel abroad" value="€0.00" bold />
                        <ReportRow label="Number of foreign travel days" value={<InputBox placeholder="Input value" />} indent />
                        <ReportRow label="Enimmäismäärä yhteensä ulkomaanmatkoilla" value={<InputBox placeholder="Input value" />} indent />
                    </div>
                </div>

                <div className="px-6 mb-10 border-t border-gray-100 pt-6">
                    <ReportRow label="Business travel deductions" value="€1,197.00" highlight />
                </div>

                {/* Private Car */}
                <div className="px-6 mb-10">
                    <h3 className="text-[16px] font-bold text-kletta-dark mb-1">Private car use for business purposes</h3>
                    <p className="text-[13px] text-gray-400 mb-5">(Over 50% of private use)</p>
                    <div className="space-y-4">
                        <ReportRow label="Total kilometers" value="109,831 km" />
                        <ReportRow label="Business use" value={<div><p className="text-right">€328.89</p><p className="text-[12px] text-gray-400">(577 km)</p></div>} bold />
                    </div>
                </div>

                <div className="px-6 mb-10 border-t border-gray-100 pt-6">
                    <ReportRow label="Deduction for private vehicle" value="€328.89" highlight />
                </div>

                {/* Business Assets */}
                <div className="px-6 mb-10">
                    <h3 className="text-[16px] font-bold text-kletta-dark mb-5">Business assets</h3>
                    <div className="space-y-4">
                        <ReportRow label="Real estate, buildings and structures" value={<ContactBtn />} />
                        <ReportRow label="Machinery and equipment" value="€45,000.00" bold />
                        <ReportRow label="Fixed-asset securities" value={<ContactBtn />} />
                        <ReportRow label="Warehouse inventory value" value={<InputBox placeholder="Input value" />} />
                        <ReportRow label="Other current assets" value={<ContactBtn />} />
                        <ReportRow label="Accounts receivable" value="€8,703.94" bold />
                        <ReportRow label="Cash in cashier" value={<InputBox placeholder="Input value" />} />
                        <ReportRow label="Financial-asset securities" value={<ContactBtn />} />
                        <ReportRow label="Other financial assets (e.g. VAT receivables)" value={<InputBox placeholder="Input value" />} />
                        <ReportRow label="Total business assets" value="€53,703.94" highlight />
                    </div>
                </div>

                {/* Liabilities */}
                <div className="px-6 mb-10">
                    <h3 className="text-[16px] font-bold text-kletta-dark mb-5">Business liabilities</h3>
                    <div className="space-y-4">
                        <ReportRow label="Short-term debt (under 12 months)" value={<InputBox placeholder="Input value" />} />
                        <ReportRow label="Long-term debt (over 12 months)" value={<InputBox placeholder="Input value" />} />
                        <ReportRow label="Adjusted negative equity" value={<ContactBtn />} />
                        <ReportRow label="Total business liabilities" value="€0.00" highlight />
                    </div>
                </div>

                <div className="px-6 mb-10 border-t border-gray-100 pt-6">
                    <ReportRow label="Net worth of business" value="€53,703.94" highlight large />
                </div>

                {/* Requirement for Distributed Income */}
                <div className="px-6 mb-20">
                    <h3 className="text-[16px] font-bold text-kletta-dark mb-6 leading-tight">Requirement for Distributed Corporate Income</h3>
                    <div className="space-y-5">
                        <RadioItem selected label="All of the business income is treated as earned income similar to salary" />
                        <RadioItem label="Amount of capital income is maximum 10% of net assets" />
                        <RadioItem label="Amount of capital income is maximum 20% of net assets" />
                    </div>
                </div>

            </div>
        </div>
    );
};

// --- Sub-components for Report ---

const ReportRow = ({ label, value, bold, indent, highlight, large }: any) => (
    <div className={`flex items-center justify-between gap-4 py-1.5 ${indent ? 'pl-5' : ''}`}>
        <span className={`text-[15px] flex-1 min-w-0 ${bold ? 'font-bold' : 'font-medium'} ${highlight ? 'text-kletta-dark font-bold' : 'text-gray-500'} leading-tight`}>
            {label}
        </span>
        <div className={`shrink-0 ${highlight ? 'text-kletta-dark font-bold' : 'text-kletta-dark font-medium'} ${large ? 'text-[18px]' : 'text-[15px]'}`}>
            {value}
        </div>
    </div>
);

const ContactBtn = () => (
    <button className="px-4 py-1.5 border border-gray-200 rounded-full text-[13px] font-medium text-kletta-dark hover:bg-gray-50 active:bg-gray-100 transition-colors">
        Contact us
    </button>
);

const InputBox = ({ value, placeholder, suffix }: any) => (
    <div className="relative flex items-center">
        <input 
            type="text" 
            defaultValue={value} 
            placeholder={placeholder}
            className="w-[100px] h-[36px] bg-white border border-gray-200 rounded-[8px] px-3 text-[14px] text-right text-kletta-dark outline-none focus:border-kletta-teal transition-all placeholder:text-gray-300"
        />
        {suffix && <span className="absolute -right-6 text-[12px] text-gray-400 font-medium">{suffix}</span>}
    </div>
);

const RadioItem = ({ selected, label }: any) => (
    <div className="flex items-start gap-4 group cursor-pointer">
        <div className={`w-[26px] h-[26px] rounded-full border-[2px] mt-0.5 flex items-center justify-center shrink-0 transition-colors ${selected ? 'border-[#005c66]' : 'border-kletta-dark'}`}>
            {selected && <div className="w-[14px] h-[14px] bg-[#005c66] rounded-full" />}
        </div>
        <span className={`text-[15px] font-medium leading-tight ${selected ? 'text-kletta-dark font-bold' : 'text-kletta-dark opacity-80'}`}>
            {label}
        </span>
    </div>
);
