import React from 'react';
import { 
    IconBack, IconCheckCircle, IconWarningCircle, IconClock
} from '../components/Icons';
import { NavigationProps } from '../types';

export const InvoiceDetailScreen: React.FC<NavigationProps> = ({ navigate, goBack, params }) => {
  // Mock data matching the design requirement, overlaid with params
  const invoice = {
      id: params?.id || '123456',
      amount: params?.amount || '€100.00',
      status: params?.status || 'PAID', // EXPECTS: 'PAID', 'OVERDUE', 'UNPAID', 'OUTSTANDING'
      name: params?.name || 'Sami',
      email: params?.email || 'sami@kletta.com',
      address: params?.address || 'Laajaniintie 12 D46, 01620 Vantaa',
      createdDate: params?.date || '12/10/2025',
      dueDate: params?.dueDate || '30/12/2025'
  };

  const getStatusConfig = () => {
      const s = invoice.status.toUpperCase();
      if (s === 'PAID') {
          return {
              color: 'text-[#009944]',
              icon: <IconCheckCircle size={22} weight="fill" />,
              label: 'PAID'
          };
      } else if (s === 'OVERDUE') {
          return {
              color: 'text-[#C03500]',
              icon: <IconWarningCircle size={22} weight="fill" />,
              label: 'OVERDUE'
          };
      } else {
          // Unpaid / Outstanding
          return {
              color: 'text-gray-500',
              icon: null, // No green check for unpaid
              label: 'UNPAID'
          };
      }
  };

  const statusConfig = getStatusConfig();

  return (
    <div className="h-full w-full bg-white flex flex-col font-aktifo animate-fade-in relative overflow-hidden text-[#111111]">
        
        {/* Header - Light (White) */}
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
            
            <div className="px-6 pb-8">
                {/* Title & Status Row */}
                <div className="flex justify-between items-center mb-2">
                    <h1 className="text-[26px] font-normal tracking-tight text-[#111111]">Invoice #{invoice.id}</h1>
                    <div className={`flex items-center gap-1.5 ${statusConfig.color}`}>
                        {statusConfig.icon}
                        <span className="text-[13px] font-bold tracking-wide mt-0.5">{statusConfig.label}</span>
                    </div>
                </div>

                {/* Amount */}
                <h2 className="text-[34px] font-bold text-[#111111] tracking-tight mb-6">{invoice.amount}</h2>

                {/* Customer Info Stack */}
                <div className="flex flex-col space-y-1">
                    <p className="text-[15px] font-normal text-[#111111]">{invoice.name}</p>
                    <a href={`mailto:${invoice.email}`} className="text-[15px] font-medium text-kletta-teal hover:underline">{invoice.email}</a>
                    <p className="text-[15px] font-normal text-[#111111]">{invoice.address}</p>
                </div>
            </div>

            {/* Hero Illustration Block */}
            <div className="w-full h-[220px] bg-[#E0F7F5] mb-8 flex items-center justify-center relative overflow-hidden">
                {/* Decorative mock element representing the payment terminal illustration */}
                <div className="relative z-10 flex flex-col items-center justify-center">
                    <div className="w-24 h-32 bg-gray-100 rounded-xl shadow-xl border border-gray-200 flex flex-col items-center justify-end pb-4 relative">
                         {/* Card popping out */}
                         <div className="absolute -top-6 w-16 h-10 bg-gray-300 rounded-md shadow-md flex items-center justify-center">
                             <div className="w-3 h-3 rounded-full bg-red-400 ml-1"></div>
                             <div className="w-3 h-3 rounded-full bg-yellow-400 -ml-1"></div>
                         </div>
                         {/* Terminal Screen */}
                         <div className="w-16 h-8 bg-gray-600 rounded mb-2"></div>
                         {/* Buttons */}
                         <div className="grid grid-cols-3 gap-1">
                             {[...Array(9)].map((_, i) => <div key={i} className="w-1.5 h-1.5 bg-gray-300 rounded-full"></div>)}
                         </div>
                    </div>
                    <div className="w-32 h-2 bg-black/5 rounded-[100%] absolute bottom-[-10px] blur-sm"></div>
                </div>
            </div>

            <div className="px-6 pb-12">
                {/* Meta Row: Created / Due */}
                <div className="flex justify-between items-baseline mb-6">
                    <p className="text-[15px] text-[#111111]">Created on</p>
                    <p className="text-[15px] font-medium text-[#111111]">{invoice.createdDate}</p>
                </div>
                <div className="flex justify-end items-baseline mb-6 -mt-4">
                    <p className={`text-[15px] mr-2 ${statusConfig.label === 'OVERDUE' ? 'text-red-600 font-medium' : 'text-[#111111]'}`}>Due on</p>
                    <p className={`text-[15px] ${statusConfig.label === 'OVERDUE' ? 'text-red-600 font-medium' : 'text-[#111111]'}`}>{invoice.dueDate}</p>
                </div>

                {/* Thin Divider */}
                <div className="h-px w-full bg-[#E5E5E5] mb-8"></div>

                {/* Items Section */}
                <div className="mb-6">
                    <h3 className="text-[16px] font-medium text-[#111111] mb-5">Service</h3>
                    
                    <div className="flex items-start justify-between">
                        <span className="text-[15px] text-[#111111] flex-1">25,5 palvelu</span>
                        <span className="text-[15px] text-[#111111] opacity-40 mx-6">x1</span>
                        <span className="text-[15px] font-medium text-[#111111] whitespace-nowrap">
                            €{invoice.amount.replace('€', '')} <span className="text-[15px] font-normal text-[#111111]">(VAT 0%)</span>
                        </span>
                    </div>
                </div>

                {/* Dotted Divider */}
                <div className="w-full border-t border-dotted border-gray-300 my-6"></div>

                {/* Summary Rows */}
                <div className="space-y-3 mb-6">
                    <div className="flex justify-between">
                        <span className="text-[15px] text-[#111111]">Subtotal</span>
                        <span className="text-[15px] font-medium text-[#111111]">{invoice.amount}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-[15px] text-[#111111]">VAT</span>
                        <span className="text-[15px] font-bomediumld text-[#111111]">€0.00</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-[15px] text-[#111111]">Discount</span>
                        <span className="text-[15px] font-medium text-[#111111]">0%</span>
                    </div>
                    <div className="flex justify-between mt-1 pt-1">
                        <span className="text-[16px] font-medium text-[#111111]">Total</span>
                        <span className="text-[16px] font-medium text-[#111111]">{invoice.amount}</span>
                    </div>
                </div>

                {/* Thin Divider */}
                <div className="h-px w-full bg-[#E5E5E5] mb-8 mt-6"></div>

                {/* Additional Note */}
                <div className="mb-10">
                    <h3 className="text-[16px] font-medium text-[#111111] mb-3">Additional note</h3>
                    <p className="text-[15px] text-[#111111] leading-relaxed">
                        Lorem ipsum dolor sit amet, conse tetur adipiscing elit.
                    </p>
                </div>

                {/* Bottom Actions Button */}
                <button className="w-full py-4 bg-[#F5F5F5] rounded-[12px] font-medium text-[16px] text-[#111111] hover:bg-gray-200 transition-colors active:scale-[0.99]">
                    Actions
                </button>

                {/* Bottom Safe Area Spacer */}
                <div className="h-6"></div>
            </div>
        </div>
    </div>
  );
};