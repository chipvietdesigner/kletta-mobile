
import React, { useState } from 'react';
import { 
    IconBack, IconCheckCircle, IconWarningCircle, IconClock,
    IconShoppingCart, IconCalendarBlank, IconFolder, IconFileText,
    IconChevronDown, IconSparkle, IconChevronRight
} from '../components/Icons';
import { NavigationProps } from '../types';

export const InvoiceDetailScreen: React.FC<NavigationProps> = ({ navigate, goBack, params }) => {
  const isReceipt = params?.type === 'receipt';
  
  // --- STATE FOR RECEIPT (EXPENSES) ---
  const initialAmountStr = (params?.amount || '€35.00').replace('€', '');
  const initialAmount = parseFloat(initialAmountStr) || 35.00;
  const [vatRate, setVatRate] = useState(14);
  const [amount, setAmount] = useState(initialAmount);
  const netAmount = initialAmount / 1.14; 

  const handleVatChange = (rate: number) => {
    setVatRate(rate);
    setAmount(netAmount * (1 + rate / 100));
  };

  // --- MOCK DATA ---
  const invoice = {
      id: params?.id || '76993',
      status: params?.status || 'PAID',
      name: params?.name || (isReceipt ? 'JYSK OY' : 'Kletta'),
      email: params?.email || 'receipt@kletta.com',
      address: params?.address || 'Helsinki, Finland',
      createdDate: params?.date || '31 Mar, 2025',
      dueDate: params?.dueDate || '15 Apr, 2025',
      type: params?.type || 'receipt',
      category: params?.category || 'Non-allowable expense',
      description: params?.description || 'Taxi service from Helsinki on 29th April 2025.',
  };

  const getStatusConfig = () => {
    const s = invoice.status.toUpperCase();
    if (s === 'PAID') return { color: 'text-[#009944]', icon: <IconCheckCircle size={22} weight="fill" />, label: 'PAID' };
    if (s === 'OVERDUE') return { color: 'text-[#C03500]', icon: <IconWarningCircle size={22} weight="fill" />, label: 'OVERDUE' };
    return { color: 'text-gray-500', icon: null, label: 'UNPAID' };
  };

  const statusConfig = getStatusConfig();

  // --- RENDER RECEIPT VIEW (EXPENSES) ---
  if (isReceipt) {
    return (
      <div className="h-full w-full bg-white flex flex-col font-aktifo animate-fade-in relative overflow-hidden text-kletta-dark">
          <div className="w-full pt-14 pb-2 px-6 bg-white z-20 shrink-0">
              <button onClick={goBack} className="w-10 h-10 -ml-2 flex items-center justify-center rounded-full hover:bg-gray-50 text-kletta-dark">
                 <IconBack size={26} weight="bold" />
              </button>
          </div>

          <div className="flex-1 overflow-y-auto no-scrollbar bg-white">
              <div className="px-6 pb-6">
                  <h1 className="text-[24px] font-normal tracking-tight text-[#111111] mb-1">
                      <span className="opacity-80 font-light">Receipt</span> <span className="font-normal opacity-40">#{invoice.id}</span>
                  </h1>
                  <h2 className="text-[36px] font-bold text-[#111111] tracking-tight mb-0.5 leading-tight">€{amount.toFixed(2)}</h2>
                  <p className="text-[15px] font-normal text-gray-400">€{amount.toFixed(2)} Incl. VAT {vatRate === 25.5 ? '25,5' : vatRate}%</p>
              </div>

              <div className="w-full h-px bg-gray-50 mb-1"></div>
              <div className="w-full h-[220px] bg-gray-50 flex items-center justify-center relative overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&fit=crop" className="w-full h-full object-cover grayscale-[0.2]" alt="Receipt source" />
              </div>

              <div className="px-6 pt-6">
                  <div className="bg-kletta-yellow rounded-[14px] p-4 flex items-center justify-between shadow-sm">
                      <span className="text-[15px] font-medium text-kletta-dark">Non-allowable business expenses</span>
                      <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-full bg-kletta-teal flex items-center justify-center">
                              <IconSparkle size={16} weight="fill" className="text-white" />
                          </div>
                          <IconChevronRight size={18} weight="bold" className="text-kletta-dark" />
                      </div>
                  </div>
                  <div className="py-3 flex items-center gap-2">
                      <IconSparkle size={14} weight="fill" className="text-kletta-teal" />
                      <span className="text-[11px] font-bold text-kletta-dark uppercase tracking-wide">Proposed by David Kletta AI assistant</span>
                  </div>
              </div>

              <div className="px-6 py-4">
                  <label className="text-[13px] font-light text-gray-400 mb-3 block uppercase tracking-wide">Update VAT rate</label>
                  <div className="flex flex-wrap gap-2">
                      {[25.5, 14, 0, 10].map((rate) => (
                          <button key={rate} onClick={() => handleVatChange(rate)} className={`h-[40px] px-5 rounded-full border transition-all text-[13px] font-medium ${vatRate === rate ? 'bg-[#00343B] text-white border-[#00343B]' : 'bg-white text-kletta-dark border-gray-200'}`}>
                              {rate === 25.5 ? '25,5' : rate}%
                          </button>
                      ))}
                  </div>
              </div>

              <div className="px-6 py-2">
                  <div className="py-4 border-b border-gray-50/50 flex items-center gap-5">
                      <IconShoppingCart size={24} className="opacity-40" />
                      <div className="flex-1">
                          <p className="text-[13px] text-gray-400 font-light uppercase tracking-wide mb-1">Supplier</p>
                          <p className="text-[15px] font-medium text-kletta-dark truncate">{invoice.name}</p>
                      </div>
                  </div>
                  <button className="w-full py-4 border-b border-gray-50/50 flex items-center gap-5 text-left">
                      <IconCalendarBlank size={24} className="opacity-40" />
                      <div className="flex-1">
                          <p className="text-[13px] text-gray-400 font-light uppercase tracking-wide mb-1">Date</p>
                          <p className="text-[15px] font-medium text-kletta-dark">{invoice.createdDate}</p>
                      </div>
                      <IconChevronDown size={20} className="text-gray-300" />
                  </button>
                  <button className="w-full py-4 border-b border-gray-50/50 flex items-center gap-5 text-left">
                      <IconFolder size={24} className="opacity-40" />
                      <div className="flex-1">
                          <p className="text-[13px] text-gray-400 font-light uppercase tracking-wide mb-1">Category</p>
                          <p className="text-[15px] font-medium text-kletta-dark truncate">{invoice.category}</p>
                      </div>
                      <IconChevronDown size={20} className="text-gray-300" />
                  </button>
              </div>

              <div className="px-6 py-6">
                  <button onClick={() => navigate('home', { tab: 'expenses' })} className="w-full h-[60px] bg-[#F5F5F5] rounded-[14px] flex items-center justify-center font-bold text-[#A03416]">Delete Expense</button>
              </div>
              <div className="h-10"></div>
          </div>
      </div>
    );
  }

  // --- RENDER INVOICE VIEW (SALES) ---
  return (
    <div className="h-full w-full bg-white flex flex-col font-aktifo animate-fade-in relative overflow-hidden text-[#111111]">
        <div className="w-full pt-14 pb-2 px-6 bg-white z-20 shrink-0">
            <button onClick={goBack} className="w-10 h-10 -ml-2 flex items-center justify-center rounded-full hover:bg-gray-50 text-kletta-dark">
               <IconBack size={26} weight="bold" />
            </button>
        </div>

        <div className="flex-1 overflow-y-auto no-scrollbar bg-white">
            <div className="px-6 pb-8">
                <div className="flex justify-between items-center mb-2">
                    <h1 className="text-[26px] font-normal tracking-tight text-[#111111]">Invoice #{invoice.id}</h1>
                    <div className={`flex items-center gap-1.5 ${statusConfig.color}`}>
                        {statusConfig.icon}
                        <span className="text-[13px] font-bold tracking-wide mt-0.5">{statusConfig.label}</span>
                    </div>
                </div>
                <h2 className="text-[34px] font-bold text-[#111111] tracking-tight mb-6">{params?.amount || '€100.00'}</h2>
                <div className="flex flex-col space-y-1">
                    <p className="text-[15px] font-normal text-[#111111]">{invoice.name}</p>
                    <a href={`mailto:${invoice.email}`} className="text-[15px] font-medium text-kletta-teal hover:underline">{invoice.email}</a>
                    <p className="text-[15px] font-normal text-[#111111]">{invoice.address}</p>
                </div>
            </div>

            <div className="w-full h-[220px] bg-[#E0F7F5] mb-8 flex items-center justify-center relative overflow-hidden">
                <div className="relative z-10 flex flex-col items-center justify-center pt-8">
                    <div className="w-24 h-36 bg-white rounded-xl shadow-xl border border-gray-100 flex flex-col items-center justify-end pb-6 relative">
                         <div className="absolute -top-7 w-16 h-12 bg-[#D1D5DB] rounded-md shadow-md flex items-center justify-center">
                             <div className="w-3.5 h-3.5 rounded-full bg-[#FF5F5F] mr-1.5"></div>
                             <div className="w-3.5 h-3.5 rounded-full bg-[#FFD93B] -ml-1.5"></div>
                         </div>
                         <div className="w-18 h-10 bg-[#4B5563] rounded-[4px] mb-3 shadow-inner"></div>
                         <div className="grid grid-cols-3 gap-1.5">
                             {[...Array(9)].map((_, i) => <div key={i} className="w-2 h-2 bg-[#E5E7EB] rounded-full"></div>)}
                         </div>
                    </div>
                </div>
            </div>

            <div className="px-6 pb-12">
                <div className="flex justify-between items-baseline mb-6">
                    <p className="text-[15px] text-[#111111]">Created on</p>
                    <p className="text-[15px] font-medium text-[#111111]">{invoice.createdDate}</p>
                </div>
                <div className="flex justify-end items-baseline mb-6 -mt-4">
                    <p className={`text-[15px] mr-2 ${statusConfig.label === 'OVERDUE' ? 'text-red-600 font-medium' : 'text-[#111111]'}`}>Due on</p>
                    <p className={`text-[15px] ${statusConfig.label === 'OVERDUE' ? 'text-red-600 font-medium' : 'text-[#111111]'}`}>{invoice.dueDate}</p>
                </div>
                <div className="h-px w-full bg-[#E5E5E5] mb-8"></div>
                <div className="mb-6">
                    <h3 className="text-[16px] font-medium text-[#111111] mb-5">Service</h3>
                    <div className="flex items-start justify-between">
                        <span className="text-[15px] text-[#111111] flex-1">Customer work</span>
                        <span className="text-[15px] text-[#111111] opacity-40 mx-6">x1</span>
                        <span className="text-[15px] font-medium text-[#111111] whitespace-nowrap">{params?.amount || '€100.00'}</span>
                    </div>
                </div>
                <div className="w-full border-t border-dotted border-gray-300 my-6"></div>
                <div className="space-y-3 mb-6">
                    <div className="flex justify-between"><span>Subtotal</span><span className="font-medium">{params?.amount || '€100.00'}</span></div>
                    <div className="flex justify-between"><span>VAT</span><span className="font-medium">€0.00</span></div>
                    <div className="flex justify-between mt-1 pt-1 border-t border-dashed border-gray-200"><span className="font-medium">Total</span><span className="font-medium">{params?.amount || '€100.00'}</span></div>
                </div>
                <button className="w-full py-4 bg-[#F5F5F5] rounded-[12px] font-medium text-[16px] text-[#111111] active:scale-[0.99]">Actions</button>
                <div className="h-6"></div>
            </div>
        </div>
    </div>
  );
};
