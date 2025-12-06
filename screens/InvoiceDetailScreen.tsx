
import React from 'react';
import { IconBack, IconCheckCircle, IconBatteryFull, IconWifiHigh, IconCellSignalFull, IconCheck, IconPaperclip, IconChevronRight } from '../components/Icons';
import { NavigationProps } from '../types';

export const InvoiceDetailScreen: React.FC<NavigationProps> = ({ navigate, goBack, params }) => {
  // Default values if no params passed
  const invoice = {
      id: params?.id || '123456',
      amount: params?.amount || '€100.00',
      status: params?.status || 'Paid', // 'Paid' | 'Overdue' | 'Unpaid'
      name: params?.name || 'Sami',
      email: params?.email || 'sami@kletta.com',
      date: params?.date || '12/10/2025'
  };

  const renderStatusBadge = () => {
      switch (invoice.status) {
          case 'Paid':
              return (
                <div className="flex items-center gap-1.5 px-3 py-1 bg-kletta-yellow rounded-full">
                    <IconCheck size={12} weight="bold" className="text-kletta-dark" />
                    <span className="text-[11px] font-bold text-kletta-dark tracking-wide uppercase">PAID</span>
                </div>
              );
          case 'Overdue':
              return (
                <div className="flex items-center gap-1.5 px-3 py-1 bg-orange-100 rounded-full">
                    <div className="w-1.5 h-1.5 rounded-full bg-orange-500"></div>
                    <span className="text-[11px] font-bold text-orange-600 tracking-wide uppercase">OVERDUE</span>
                </div>
              );
          case 'Unpaid':
          default:
              return (
                <div className="flex items-center gap-1.5 px-3 py-1 bg-kletta-teal rounded-full">
                    <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
                    <span className="text-[11px] font-bold text-white tracking-wide uppercase">UNPAID</span>
                </div>
              );
      }
  };

  return (
    <div className="h-full w-full bg-white flex flex-col font-aktifo animate-fade-in relative overflow-hidden">
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
        <div className="px-6 pt-2 pb-2 flex items-center justify-between z-10">
            <button 
                onClick={goBack} 
                className="w-10 h-10 -ml-2 rounded-full flex items-center justify-center hover:bg-gray-50 active:bg-gray-100 transition-colors"
            >
                <IconBack size={26} className="text-kletta-dark" />
            </button>
            <button className="text-[13px] font-bold text-kletta-teal hover:underline">
                Share
            </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto no-scrollbar pb-36 px-6">
            
            {/* Title Block */}
            <div className="flex justify-between items-start mb-4 mt-2">
                <div>
                    <h1 className="text-[28px] font-bold text-kletta-dark tracking-tight mb-1">Invoice #{invoice.id}</h1>
                    <p className="text-[15px] text-gray-400 font-medium">Created on {invoice.date}</p>
                </div>
                <div className="mt-1">
                    {renderStatusBadge()}
                </div>
            </div>
            
            <p className="text-[40px] font-bold text-kletta-dark mb-8 leading-none tracking-tight">{invoice.amount}</p>

            {/* Customer Info */}
            <div className="mb-8 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">Billed to</p>
                <p className="font-bold text-[17px] text-kletta-dark mb-0.5">{invoice.name}</p>
                <p className="text-[15px] font-medium text-kletta-teal mb-0.5">{invoice.email}</p>
                <p className="text-[15px] text-gray-500">Laajaniintie 12 D46, 01620 Vantaa</p>
            </div>

            {/* Visual Illustration */}
            <div className="w-full h-[220px] bg-[#E0F7F4] rounded-[32px] mb-8 flex items-center justify-center relative overflow-hidden shadow-inner">
                 <div className="absolute inset-0 bg-gradient-to-tr from-[#D4F5F0] to-[#E0F7F4] opacity-50"></div>
                 
                 {/* CSS Payment Terminal Mockup */}
                 <div className="relative w-32 shadow-2xl rounded-xl z-10 animate-slide-up transform scale-110">
                    {/* Card inserted */}
                    <div className="w-24 h-16 bg-gray-300 rounded-lg absolute -top-10 left-1/2 -translate-x-1/2 border border-white/40 shadow-sm flex flex-col p-2">
                         <div className="flex justify-between items-start">
                             <div className="w-6 h-4 bg-red-400/80 rounded-sm relative overflow-hidden">
                                <div className="absolute right-0 top-0 bottom-0 w-3 bg-yellow-400/80 rounded-l-full"></div>
                             </div>
                             <div className="text-[6px] text-gray-500 font-bold rotate-90 origin-top-right translate-x-1">11/25</div>
                         </div>
                    </div>
                    
                    {/* Terminal Body */}
                    <div className="bg-white rounded-xl p-3 pb-5 flex flex-col items-center shadow-[0_10px_40px_rgba(0,0,0,0.1)] border border-white relative z-10">
                         {/* Screen */}
                         <div className="w-full h-10 bg-kletta-dark rounded-md mb-3 flex items-center justify-center relative overflow-hidden shadow-inner">
                            <div className="flex justify-between w-full px-2 items-center">
                                <span className="text-[5px] text-white font-mono tracking-widest">VISA CREDIT</span>
                                <span className="text-[5px] text-white font-mono">{invoice.amount.replace('€', '')}</span>
                            </div>
                            <div className="absolute bottom-1 left-2 text-[4px] text-gray-400">Processing...</div>
                            <div className="flex gap-0.5 absolute bottom-1 right-2 animate-pulse">
                                <div className="w-0.5 h-0.5 bg-green-400 rounded-full"></div>
                                <div className="w-0.5 h-0.5 bg-white rounded-full"></div>
                            </div>
                         </div>
                         
                         {/* Keypad */}
                         <div className="grid grid-cols-4 gap-1.5 w-full px-1">
                             {[1,2,3].map(n => <div key={n} className="w-4 h-3 bg-gray-100 rounded-[3px] flex items-center justify-center text-[6px] font-bold text-gray-600 shadow-[0_1px_0_rgba(0,0,0,0.1)]">{n}</div>)}
                             <div className="w-4 h-3 bg-red-50 rounded-[3px] flex items-center justify-center text-[6px] text-red-500 shadow-[0_1px_0_rgba(254,202,202,1)]">✕</div>
                             
                             {[4,5,6].map(n => <div key={n} className="w-4 h-3 bg-gray-100 rounded-[3px] flex items-center justify-center text-[6px] font-bold text-gray-600 shadow-[0_1px_0_rgba(0,0,0,0.1)]">{n}</div>)}
                             <div className="w-4 h-3 bg-yellow-50 rounded-[3px] flex items-center justify-center text-[6px] text-yellow-600 shadow-[0_1px_0_rgba(253,230,138,1)]">←</div>

                             {[7,8,9].map(n => <div key={n} className="w-4 h-3 bg-gray-100 rounded-[3px] flex items-center justify-center text-[6px] font-bold text-gray-600 shadow-[0_1px_0_rgba(0,0,0,0.1)]">{n}</div>)}
                             <div className="w-4 h-3 bg-green-50 rounded-[3px] flex items-center justify-center text-[6px] text-green-600 shadow-[0_1px_0_rgba(187,247,208,1)]">✓</div>
                             
                             <div className="w-4 h-3"></div>
                             <div className="w-4 h-3 bg-gray-100 rounded-[3px] flex items-center justify-center text-[6px] font-bold text-gray-600 shadow-[0_1px_0_rgba(0,0,0,0.1)]">0</div>
                             <div className="w-4 h-3 bg-gray-50 flex items-center justify-center rounded-[3px]"><div className="w-2 h-2 border border-gray-400 rounded-[1px]"></div></div>
                         </div>
                    </div>
                 </div>
            </div>

            {/* Services */}
            <div className="mb-6">
                <div className="flex justify-between items-end mb-4 border-b border-gray-100 pb-2">
                    <h3 className="font-bold text-[17px] text-kletta-dark">Items</h3>
                    <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Due on 30/12/2025</p>
                </div>
                
                <div className="flex justify-between items-start py-3 border-b border-dashed border-gray-200">
                    <div className="flex-1">
                        <p className="text-[15px] font-bold text-kletta-dark">Consulting Services</p>
                        <p className="text-[13px] text-gray-400 mt-0.5">Project management & review</p>
                    </div>
                    <div className="w-16 text-center">
                        <p className="text-[13px] font-bold text-gray-400 bg-gray-100 rounded-md py-0.5">x1</p>
                    </div>
                    <div className="flex-1 text-right">
                        <p className="text-[15px] font-bold text-kletta-dark">{invoice.amount} <span className="text-[11px] text-gray-400 font-normal">(0%)</span></p>
                    </div>
                </div>
            </div>

            {/* Summary */}
            <div className="space-y-3 mb-8 bg-gray-50 p-5 rounded-2xl border border-gray-100">
                 <SummaryRow label="Subtotal" value={invoice.amount} />
                 <SummaryRow label="VAT (0%)" value="€0.00" />
                 <SummaryRow label="Discount" value="0%" />
                 <div className="flex justify-between items-center pt-3 mt-1 border-t border-gray-200">
                    <span className="text-[17px] font-bold text-kletta-dark">Total</span>
                    <span className="text-[20px] font-bold text-kletta-dark">{invoice.amount}</span>
                 </div>
            </div>

            {/* Note */}
            <div className="mb-8 p-4 rounded-2xl border border-gray-100 bg-white shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                    <IconPaperclip size={16} weight="bold" className="text-kletta-teal" />
                    <h3 className="font-bold text-[15px] text-kletta-dark">Additional note</h3>
                </div>
                <p className="text-[14px] text-gray-500 leading-relaxed">
                    Thank you for your business! Please include invoice number in payment reference.
                </p>
            </div>

        </div>

        {/* Fixed Bottom Action */}
        <div className="absolute bottom-0 left-0 right-0 bg-white p-6 border-t border-gray-50 z-30 flex gap-3">
             <button className="flex-1 py-4 bg-gray-100 rounded-2xl font-bold text-[15px] text-kletta-dark active:scale-[0.98] transition-transform hover:bg-gray-200">
                Download PDF
            </button>
            <button className="flex-[2] py-4 bg-kletta-yellow rounded-2xl font-bold text-[15px] text-kletta-dark active:scale-[0.98] transition-transform shadow-sm hover:shadow-md flex items-center justify-center gap-2">
                Send Receipt <IconChevronRight size={16} weight="bold" />
            </button>
        </div>
    </div>
  );
};

const SummaryRow = ({ label, value }: { label: string, value: string }) => (
    <div className="flex justify-between items-center">
        <span className="text-[14px] font-medium text-gray-500">{label}</span>
        <span className="text-[14px] font-bold text-kletta-dark">{value}</span>
    </div>
);
