
import React from 'react';
import { 
    IconBack, IconCheckCircle, IconWarningCircle, IconClock,
    IconShoppingCart, IconCalendarBlank, IconFolder, IconFileText,
    IconChevronDown
} from '../components/Icons';
import { NavigationProps } from '../types';

export const InvoiceDetailScreen: React.FC<NavigationProps> = ({ navigate, goBack, params }) => {
  // Mock data matching the design requirement, overlaid with params
  const invoice = {
      id: params?.id || '82815',
      amount: params?.amount || '€12.00',
      status: params?.status || 'PAID', // EXPECTS: 'PAID', 'OVERDUE', 'UNPAID', 'OUTSTANDING'
      name: params?.name || 'Welcome Break Group Keele Noth Fct.',
      email: params?.email || 'receipt@kletta.com',
      address: params?.address || 'London, United Kingdom',
      createdDate: params?.date || '29 Apr, 2025',
      dueDate: params?.dueDate || '29 Apr, 2025',
      type: params?.type || 'receipt',
      category: params?.category || 'Non-allowable expense',
      description: params?.description || 'Taxi service from Helsinki on 29th April 2025.',
      vatInfo: '€14.24 Incl. VAT 14%'
  };

  const isReceipt = invoice.type === 'receipt';

  return (
    <div className="h-full w-full bg-white flex flex-col font-aktifo animate-fade-in relative overflow-hidden text-kletta-dark">
        
        {/* Header - Transparent/White */}
        <div className="w-full pt-14 pb-2 px-6 bg-white z-20 shrink-0">
            <button 
                onClick={goBack} 
                className="w-10 h-10 -ml-2 flex items-center justify-center rounded-full hover:bg-gray-50 active:bg-gray-100 transition-colors text-kletta-dark"
            >
               <IconBack size={26} weight="bold" />
            </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto no-scrollbar bg-white">
            
            <div className="px-6 pb-6">
                {/* Title */}
                <h1 className="text-[24px] font-normal tracking-tight text-[#111111] mb-1">
                    <span className="opacity-80 font-light">{isReceipt ? 'Receipt' : 'Invoice'}</span> <span className="font-normal opacity-40">#{invoice.id}</span>
                </h1>

                {/* Amount */}
                <h2 className="text-[36px] font-bold text-[#111111] tracking-tight mb-0.5 leading-tight">{invoice.amount}</h2>
                
                {/* VAT Line */}
                <p className="text-[15px] font-normal text-gray-400">
                    {invoice.vatInfo}
                </p>
            </div>

            {/* Thin Divider before Image */}
            <div className="w-full h-px bg-gray-50 mb-1"></div>

            {/* Receipt Image Block */}
            <div className="w-full h-[220px] bg-gray-50 flex items-center justify-center relative overflow-hidden group">
                <img 
                    src="https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&fit=crop" 
                    className="w-full h-full object-cover grayscale-[0.2] group-active:scale-105 transition-transform duration-500" 
                    alt="Receipt source"
                />
                <div className="absolute inset-0 bg-black/5"></div>
            </div>

            {/* Detail Rows */}
            <div className="px-6 py-4">
                
                {/* Supplier Row */}
                <div className="py-4 border-b border-gray-50/50 flex items-center gap-5">
                    <div className="shrink-0 text-kletta-dark opacity-40">
                        <IconShoppingCart size={24} weight="regular" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-[13px] text-gray-400 font-light uppercase tracking-wide mb-1">Supplier</p>
                        <p className="text-[15px] font-medium text-kletta-dark truncate">{invoice.name}</p>
                    </div>
                </div>

                {/* Date Row */}
                <button className="w-full py-4 border-b border-gray-50/50 flex items-center gap-5 group hover:bg-gray-50 transition-colors text-left">
                    <div className="shrink-0 text-kletta-dark opacity-40">
                        <IconCalendarBlank size={24} weight="regular" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-[13px] text-gray-400 font-light uppercase tracking-wide mb-1">Date</p>
                        <p className="text-[15px] font-medium text-kletta-dark">{invoice.createdDate}</p>
                    </div>
                    <div className="shrink-0 text-gray-300">
                        <IconChevronDown size={20} weight="bold" />
                    </div>
                </button>

                {/* Category Row */}
                <button className="w-full py-4 border-b border-gray-50/50 flex items-center gap-5 group hover:bg-gray-50 transition-colors text-left">
                    <div className="shrink-0 text-kletta-dark opacity-40">
                        <IconFolder size={24} weight="regular" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-[13px] text-gray-400 font-light uppercase tracking-wide mb-1">Category</p>
                        <p className="text-[15px] font-medium text-kletta-dark truncate">{invoice.category}</p>
                    </div>
                    <div className="shrink-0 text-gray-300">
                        <IconChevronDown size={20} weight="bold" />
                    </div>
                </button>

                {/* Description Row */}
                <button className="w-full py-4 flex items-center gap-5 group hover:bg-gray-50 transition-colors text-left">
                    <div className="shrink-0 text-kletta-dark opacity-40">
                        <IconFileText size={24} weight="regular" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-[13px] text-gray-400 font-light uppercase tracking-wide mb-1">Description</p>
                        <p className="text-[15px] font-medium text-kletta-dark leading-snug">{invoice.description}</p>
                    </div>
                    <div className="shrink-0 text-gray-300">
                        <IconChevronDown size={20} weight="bold" />
                    </div>
                </button>

            </div>

            {/* Delete Button */}
            <div className="px-6 py-6">
                <button 
                    onClick={() => navigate('home', { tab: 'expenses' })}
                    className="w-full h-[60px] bg-[#F5F5F5] rounded-[14px] flex items-center justify-center active:scale-[0.98] transition-all"
                >
                    <span className="text-[17px] font-bold text-[#A03416]">Delete Expense</span>
                </button>
            </div>

            <div className="h-10"></div>
        </div>
    </div>
  );
};
