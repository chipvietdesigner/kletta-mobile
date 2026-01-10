
import React, { useState } from 'react';
import { NavigationProps } from '../types';
import { 
  IconCellSignalFull, IconWifiHigh, IconBatteryFull, 
  IconPlus, IconChevronDown, IconCheckCircle, IconWarningCircle,
  IconInvoice, IconCheck, IconDotsThree
} from '../components/Icons';

// --- Types ---
interface Invoice {
    id: string;
    amount: string;
    date: string;
    clientName: string;
    invoiceNumber: string;
    status: 'paid' | 'overdue' | 'outstanding';
    daysUntilDue?: string;
    imageUrl?: string;
}

// --- Mock Data ---
const OUTSTANDING_INVOICES: Invoice[] = [
    { 
       id: 'inv-out-1',
       amount: "€634.90",
       date: "05.01.2026",
       invoiceNumber: "#20260001",
       clientName: "Kletta",
       status: "outstanding",
       daysUntilDue: "24 Days"
    },
    { 
       id: 'inv-out-2',
       amount: "€420.00",
       date: "12.01.2026",
       invoiceNumber: "#20260002",
       clientName: "Design Oy",
       status: "outstanding",
       daysUntilDue: "-32 Days"
    },
     { 
       id: 'inv-out-3',
       amount: "€250.00",
       date: "12.01.2026",
       invoiceNumber: "#20260002",
       clientName: "Kletta",
       status: "outstanding",
       daysUntilDue: "-32 Days"
    }
];

const ALL_SALES: Invoice[] = [
    { 
       id: 'inv-all-1',
       amount: "€634.90",
       date: "05.01.2026",
       invoiceNumber: "#20260001",
       clientName: "Kletta",
       status: "outstanding"
    },
    { 
       id: 'inv-all-2',
       amount: "€623.00",
       date: "02.12.2025",
       invoiceNumber: "#20250006",
       clientName: "Kletta",
       status: "paid"
    },
    { 
       id: 'inv-all-3',
       amount: "€678.69",
       date: "06.11.2025",
       invoiceNumber: "#20250005",
       clientName: "Kletta",
       status: "overdue"
    },
    { 
       id: 'inv-all-4',
       amount: "€756.88",
       date: "09.10.2025",
       invoiceNumber: "#20250004",
       clientName: "Kletta",
       status: "overdue"
    },
     { 
       id: 'inv-all-5',
       amount: "€756.88",
       date: "09.10.2025",
       invoiceNumber: "#20250004",
       clientName: "Kletta",
       status: "paid"
    }
];

interface SalesScreenProps extends NavigationProps {
  dateRange: string;
  onOpenFilter: () => void;
}

const SalesScreen: React.FC<SalesScreenProps> = ({ navigate, dateRange, onOpenFilter }) => {
  return (
    <div className="h-full w-full bg-white flex flex-col font-aktifo animate-fade-in relative overflow-hidden">
      
      {/* Header Container */}
      <div className="w-full bg-kletta-teal pb-5 pt-0">
          {/* Status Bar */}
          <div className="w-full h-[50px] flex justify-between items-end px-6 pb-2 text-white pointer-events-none">
                  <span className="text-[15px] font-medium tracking-normal leading-none ml-2">9:41</span>
                  <div className="flex gap-1.5 items-center mr-1">
                     <IconCellSignalFull size={16} weight="fill" />
                     <IconWifiHigh size={16} weight="bold" />
                     <IconBatteryFull size={24} weight="fill" className="rotate-0" />
                  </div>
              </div>
            {/* Title Row */}
              <div className="px-6 pt-2 flex items-center justify-between ">
                  <div className="flex justify-between items-center">
                     <div className="flex flex-col">
                         <h1 className="text-[26px] font-medium text-white tracking-tight mb-0.5">Sales</h1>
                         <div 
                           onClick={onOpenFilter}
                           className="flex items-center gap-1 opacity-70 text-white transition-opacity hover:opacity-100 cursor-pointer"
                         >
                             <span className="text-[13px] font-medium">{dateRange}</span>
                             <IconChevronDown size={12} weight="bold" />
                         </div>
                     </div>
                     <button 
                            onClick={() => navigate('new-invoice')}
                            className="w-10 h-10 flex  justify-center text-white hover:opacity-70 transition-opacity"
                        >
                            <IconPlus size={28} weight="regular" />
                        </button>
                  </div>
              </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto no-scrollbar pb-32 pt-6 bg-white">
        
        {/* Outstanding Invoices Section */}
        <div className="mb-10">
            <h2 className="px-6 text-[16px] font-medium text-kletta-dark mb-4 tracking-tight">Outstanding invoices</h2>
            
            {/* Horizontal Carousel */}
            <div className="flex overflow-x-auto no-scrollbar px-[calc(50%-130px)] gap-4 px-4 snap-x snap-mandatory">
                {OUTSTANDING_INVOICES.map((inv) => (
                    <div key={inv.id} className="w-[200px] shrink-0 bg-[#F7F8F9]  rounded-[20px] p-3 shadow-sm snap-center flex flex-col">
                        <div className="flex justify-start mb-10">
                            <span className="bg-gray-200 text-white text-[12px] font-normal px-4 py-1.5 rounded-lg">
                                {inv.daysUntilDue}
                            </span>
                        </div>
                        
                        {/* Illustration Placeholder */}
                        <div className="flex-1 flex items-center justify-center mb-2 opacity-20">
                            <IconInvoice size={40} weight="fill" />
                        </div>

                        <div className="text-center mb-2">
                            <p className="text-[13px] font-normal text-kletta-dark opacity-80 mb-1">Invoice {inv.invoiceNumber}</p>
                            <p className="text-[16px] font-semibold text-kletta-dark tracking-tight">{inv.amount}</p>
                            <p className="text-[13px] font-normal text-kletta-dark opacity-60">{inv.clientName}</p>
                        </div>

                        <div className="space-y-2">
                            <button className="w-full py-2 bg-kletta-teal text-white rounded-[12px] font-medium text-[12px] active:scale-[0.98] transition-transform">
                                Register as paid
                            </button>
                            <button className="w-full py-2 bg-white border border-gray-100 text-gray-500 rounded-[12px] font-medium text-[12px] active:scale-[0.98] transition-transform">
                                Send a reminder
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>

        {/* All Sales Section */}
        <div>
            <h2 className="px-6 text-[16px] font-medium text-kletta-dark mb-4 tracking-tight">All Sales</h2>
            <div className="divide-y divide-gray-100">
                {ALL_SALES.map((inv) => (
                    <div key={inv.id} className="px-6 py-5 flex items-center justify-between group active:bg-gray-50 transition-colors">
                        <div className="flex items-center gap-4 flex-1">
                            {/* Logo Placeholder */}
                            <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center text-kletta-yellow opacity-60">
                                <span className="font-bold text-lg">K</span>
                            </div>
                            
                            <div className="flex-1">
                                <div className="flex items-baseline gap-2 mb-1">
                                    <span className="text-[14px] font-medium text-kletta-dark">{inv.amount}</span>
                                    {inv.status === 'overdue' && (
                                        <span className="text-[12px] font-light text-[#FF5F5F] uppercase tracking-wide">OVERDUE</span>
                                    )}
                                </div>
                                <p className="text-[13px] font-normal text-kletta-dark opacity-40">
                                    {inv.date} • Invoice {inv.invoiceNumber} • {inv.clientName}
                                </p>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="shrink-0 ml-4">
                            {inv.status === 'paid' ? (
                                <div className="bg-kletta-yellow px-2 py-2 rounded-[10px] text-[12px] font-medium text-kletta-dark min-w-[120px] text-center">
                                    Paid
                                </div>
                            ) : (
                                <button className="bg-kletta-teal px-2 py-2 rounded-[12px] text-[12px] font-medium text-white min-w-[120px] active:scale-[0.95] transition-transform">
                                    Register as paid
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>

      </div>
    </div>
  );
};

export default SalesScreen;
