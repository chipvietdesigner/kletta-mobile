
import React, { useState, useEffect } from 'react';
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
  onModalToggle?: (open: boolean) => void;
}

const SalesScreen: React.FC<SalesScreenProps> = ({ navigate, dateRange, onOpenFilter, onModalToggle }) => {
  const [showPaidModal, setShowPaidModal] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);

  // Sync modal state with parent to hide tab bar
  useEffect(() => {
    if (onModalToggle) {
      onModalToggle(showPaidModal);
    }
  }, [showPaidModal, onModalToggle]);

  const handleInvoiceClick = (inv: Invoice) => {
    navigate('invoice-detail', {
      id: inv.invoiceNumber.replace('#', ''),
      amount: inv.amount,
      status: inv.status.toUpperCase(),
      name: inv.clientName,
      date: inv.date,
      type: 'invoice'
    });
  };

  const handleOpenPaidModal = (e: React.MouseEvent, inv: Invoice) => {
    e.stopPropagation();
    setSelectedInvoice(inv);
    setShowPaidModal(true);
  };

  const handleCloseModal = () => {
    setShowPaidModal(false);
  };

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
              <div className="px-6 pt-2 flex items-center justify-between">
                   <div className="flex flex-col">
                       <h1 className="text-[24px] font-medium text-white tracking-tight mb-0.5">Sales</h1>
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
                        className="w-10 h-10 flex items-center justify-end text-white hover:opacity-70 transition-opacity"
                    >
                        <IconPlus size={28} weight="regular" />
                    </button>
              </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto no-scrollbar pb-32 pt-6">
        
        {/* Outstanding Invoices Section */}
        <div className="mb-10">
            <h2 className="px-4 text-[16px] font-medium text-kletta-dark mb-4 tracking-tight">Outstanding invoices</h2>
            
            {/* Horizontal Carousel */}
            <div className="flex overflow-x-auto no-scrollbar px-4 gap-4 pt-4 pb-4 snap-x snap-mandatory">
                {OUTSTANDING_INVOICES.map((inv) => (
                    <div 
                        key={inv.id} 
                        onClick={() => handleInvoiceClick(inv)}
                        className="w-[200px] shrink-0 bg-white rounded-[20px] p-3 shadow-[0_12px_12px_rgba(0,0,0,0.06)] snap-center flex flex-col border border-gray-100 cursor-pointer active:scale-[0.99] transition-transform"
                    >
                        <div className="flex justify-start mb-10">
                            <span className="bg-[#DCDDFD] text-kletta-teal text-[12px] font-semibold px-4 py-1.5 rounded-lg">
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
                            <button 
                                onClick={(e) => handleOpenPaidModal(e, inv)}
                                className="w-full py-2 bg-kletta-teal text-white rounded-[12px] font-medium text-[12px] active:scale-[0.98] transition-transform"
                            >
                                Register as paid
                            </button>
                            <button 
                                onClick={(e) => { e.stopPropagation(); }}
                                className="w-full py-2 bg-white border border-gray-100 text-gray-500 rounded-[12px] font-medium text-[12px] active:scale-[0.98] transition-transform"
                            >
                                Send a reminder
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>

        {/* All Sales Section */}
        <div>
            <h2 className="px-4 text-[16px] font-medium text-kletta-dark mb-4 tracking-tight">All Sales</h2>
            <div className="divide-y divide-gray-100">
                {ALL_SALES.map((inv) => (
                    <div 
                        key={inv.id} 
                        onClick={() => handleInvoiceClick(inv)}
                        className="px-6 py-5 flex items-center justify-between group active:bg-gray-50 transition-colors bg-white cursor-pointer"
                    >
                        <div className="flex items-center gap-4 flex-1">
                            {/* Logo Placeholder */}
                            <div className="w-12 h-12 flex items-center justify-center">
                                <div className="flex-1 flex items-center justify-center mb-2 opacity-20">
                                <IconInvoice size={40} weight="fill" />
                            </div>
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
                                <button 
                                    onClick={(e) => handleOpenPaidModal(e, inv)}
                                    className="bg-kletta-teal px-2 py-2 rounded-[12px] text-[12px] font-medium text-white min-w-[120px] active:scale-[0.95] transition-transform"
                                >
                                    Register as paid
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </div>

      {/* Confirmation Modal - Optimized for Premium Look with reduced radius/padding and absolute positioning to fit frame */}
      {showPaidModal && (
        <div className="absolute inset-0 z-[100] flex items-center justify-center p-6 animate-fade-in overflow-hidden">
            <div className="absolute inset-0 bg-black/50 backdrop-blur-md" onClick={handleCloseModal} />
            <div className="bg-white w-full max-w-[300px] rounded-[16px] p-6 relative z-10 animate-slide-up shadow-xl text-center">
                <h3 className="text-[19px] font-bold text-kletta-dark mb-3 tracking-tight leading-none">Register as paid?</h3>
                <p className="text-[15px] text-kletta-dark font-normal mb-6 leading-normal">
                    Mark invoice <span className="font-bold">{selectedInvoice?.invoiceNumber}</span> for <span className="font-bold">{selectedInvoice?.amount}</span> as paid?
                </p>

                <div className="flex flex-col gap-2">
                    <button 
                        onClick={handleCloseModal}
                        className="w-full h-[52px] bg-kletta-yellow rounded-[14px] font-bold text-[15px] text-kletta-dark active:scale-[0.98] transition-all shadow-sm"
                    >
                        Register as paid
                    </button>
                    <button 
                        onClick={handleCloseModal}
                        className="w-full py-4 font-bold text-[15px] text-kletta-dark active:opacity-60 transition-opacity"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
      )}
    </div>
  );
};

export default SalesScreen;
