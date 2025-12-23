import React, { useState, useMemo } from 'react';
import { NavigationProps } from '../types';
import { 
  IconCellSignalFull, IconWifiHigh, IconBatteryFull, 
  IconPlus, IconChevronDown, IconCheckCircle, IconWarningCircle,
  IconInvoice, IconCheck, IconFileText
} from '../components/Icons';

// --- Types ---
interface Invoice {
    id: string;
    amount: string;
    date: string;
    meta: string; // Combined string for Date • Invoice # • Customer
    status: 'paid' | 'overdue' | 'outstanding';
    iconType: 'terminal' | 'kletta';
}

// --- Mock Data ---
const INITIAL_INVOICES: Invoice[] = [
    { 
       id: '14128',
       amount: "€327.92",
       date: "29.04.2025",
       meta: "29.04.2025 • #14128 • Jari",
       status: "paid",
       iconType: 'terminal'
    },
    { 
       id: 'nocust',
       amount: "€50,000.00",
       date: "09.04.2025",
       meta: "09.04.2025 • No Customer",
       status: "paid",
       iconType: 'terminal'
    },
    { 
       id: '10712',
       amount: "€100.00",
       date: "18.03.2025",
       meta: "18.03.2025 • #10712 • Sami",
       status: "overdue",
       iconType: 'kletta'
    },
    { 
       id: '10708',
       amount: "€80.65",
       date: "18.03.2025",
       meta: "18.03.2025 • #10708 • Liz",
       status: "overdue",
       iconType: 'kletta'
    },
    { 
       id: '10394',
       amount: "€50.20",
       date: "13.03.2025",
       meta: "13.03.2025 • #10394 • Noja Rahoitus Oy",
       status: "overdue",
       iconType: 'terminal'
    },
    { 
       id: '10390',
       amount: "€1.00",
       date: "13.03.2025",
       meta: "13.03.2025 • #10390 • Unknown",
       status: "overdue",
       iconType: 'kletta'
    },
    // --- Additional Data for Grouping ---
    { 
       id: '10388',
       amount: "€1,250.00",
       date: "10.03.2025",
       meta: "10.03.2025 • #10388 • Design Studio",
       status: "paid",
       iconType: 'terminal'
    },
    { 
       id: '10385',
       amount: "€450.00",
       date: "05.03.2025",
       meta: "05.03.2025 • #10385 • Consulting Group",
       status: "paid",
       iconType: 'terminal'
    },
    { 
       id: '10382',
       amount: "€2,400.00",
       date: "01.03.2025",
       meta: "01.03.2025 • #10382 • Tech Corp",
       status: "outstanding",
       iconType: 'kletta'
    },
    { 
       id: '10380',
       amount: "€120.50",
       date: "28.02.2025",
       meta: "28.02.2025 • #10380 • Local Cafe",
       status: "paid",
       iconType: 'terminal'
    },
    { 
       id: '10375',
       amount: "€85.00",
       date: "25.02.2025",
       meta: "25.02.2025 • #10375 • Personal",
       status: "paid",
       iconType: 'terminal'
    },
    // --- More History for Scrolling ---
    { 
       id: '10250',
       amount: "€2,100.00",
       date: "15.02.2025",
       meta: "15.02.2025 • #10250 • Startup Inc",
       status: "paid",
       iconType: 'kletta'
    },
    { 
       id: '10245',
       amount: "€350.00",
       date: "02.02.2025",
       meta: "02.02.2025 • #10245 • Freelance Gig",
       status: "paid",
       iconType: 'terminal'
    },
    { 
       id: '10100',
       amount: "€99.00",
       date: "20.01.2025",
       meta: "20.01.2025 • #10100 • Web Hosting Ref",
       status: "paid",
       iconType: 'terminal'
    },
    { 
       id: '10090',
       amount: "€5,000.00",
       date: "05.01.2025",
       meta: "05.01.2025 • #10090 • Enterprise License",
       status: "paid",
       iconType: 'kletta'
    }
];

// --- Helpers ---
const parseDate = (dateStr: string) => {
    const [day, month, year] = dateStr.split('.').map(Number);
    return new Date(year, month - 1, day);
};

const getMonthYear = (dateStr: string) => {
    const date = parseDate(dateStr);
    return date.toLocaleString('default', { month: 'long', year: 'numeric' });
};

// Simplified Solid Icon - No background, no border
const SalesListIcon = ({ type }: { type: 'terminal' | 'kletta' }) => {
  return (
    <div className="shrink-0 pt-0.5">
       <IconFileText size={26} weight="fill" className="text-gray-200" />
    </div>
  );
};

const SalesScreen: React.FC<NavigationProps> = ({ navigate }) => {
  const [filter, setFilter] = useState<'all' | 'outstanding'>('all');
  const [invoices, setInvoices] = useState<Invoice[]>(INITIAL_INVOICES);
  const [selectedForPayment, setSelectedForPayment] = useState<Invoice | null>(null);

  const handleRegisterPaidClick = (e: React.MouseEvent, invoice: Invoice) => {
    e.stopPropagation();
    setSelectedForPayment(invoice);
  };

  const confirmPayment = () => {
    if (selectedForPayment) {
        setInvoices(prev => prev.map(inv => 
            inv.id === selectedForPayment.id ? { ...inv, status: 'paid' } : inv
        ));
        setSelectedForPayment(null);
    }
  };

  const handleRowClick = (invoice: Invoice) => {
      navigate('invoice-detail', { 
          id: invoice.id,
          amount: invoice.amount,
          status: invoice.status.toUpperCase(),
          date: invoice.date
      });
  };

  // Grouping Logic
  const groupedInvoices = useMemo<{ [key: string]: Invoice[] }>(() => {
    const filtered = filter === 'all' 
        ? invoices 
        : invoices.filter(inv => inv.status !== 'paid');

    // Sort by date descending
    const sorted = [...filtered].sort((a, b) => parseDate(b.date).getTime() - parseDate(a.date).getTime());

    // Group by month
    const groups: { [key: string]: Invoice[] } = {};
    sorted.forEach(inv => {
        const monthYear = getMonthYear(inv.date);
        if (!groups[monthYear]) {
            groups[monthYear] = [];
        }
        groups[monthYear].push(inv);
    });

    return groups;
  }, [invoices, filter]);

  return (
    <div className="h-full w-full bg-white flex flex-col font-aktifo animate-fade-in relative overflow-hidden">
      
      {/* Header Container - Fixed at Top */}
      <div className="w-full z-20 shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col shrink-0 bg-white">
          
          {/* Dark Header Part */}
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
              <div className="px-6 pt-2">
                  <div className="flex justify-between items-center">
                     <div className="flex flex-col">
                         <h1 className="text-[26px] font-medium text-white tracking-tight mb-0.5">Sales</h1>
                         <div className="flex items-center gap-1 opacity-70 text-white transition-opacity hover:opacity-100 cursor-pointer">
                             <span className="text-[13px] font-medium">All time</span>
                             <IconChevronDown size={12} weight="bold" />
                         </div>
                     </div>
                     <button 
                        onClick={() => navigate('new-invoice')}
                        className="w-10 h-10 -mr-2 flex items-center justify-center rounded-full text-white hover:bg-white/10 transition-colors"
                     >
                        <IconPlus size={24} weight="regular" />
                     </button>
                  </div>
              </div>
          </div>

          {/* Light Tabs Part - Sticky below Header */}
          <div className="bg-white w-full grid grid-cols-2 border-b border-gray-100">
              <button 
                onClick={() => setFilter('all')}
                className={`py-4 text-[15px] font-medium transition-colors relative w-full text-center ${filter === 'all' ? 'text-kletta-dark' : 'text-kletta-secondary hover:text-gray-600'}`}
              >
                All
                {filter === 'all' && (
                    <div className="absolute bottom-0 left-0 w-full h-[3px] bg-kletta-dark rounded-t-sm animate-fade-in"></div>
                )}
              </button>
              <button 
                onClick={() => setFilter('outstanding')}
                className={`py-4 text-[15px] font-medium transition-colors relative w-full text-center ${filter === 'outstanding' ? 'text-kletta-dark' : 'text-kletta-secondary hover:text-gray-600'}`}
              >
                Outstanding
                {filter === 'outstanding' && (
                    <div className="absolute bottom-0 left-0 w-full h-[3px] bg-kletta-dark rounded-t-sm animate-fade-in"></div>
                )}
              </button>
          </div>
      </div>

      {/* List Content */}
      <div className="flex-1 overflow-y-auto no-scrollbar pb-32 pt-0 bg-white">
        {Object.keys(groupedInvoices).length === 0 ? (
            <div className="flex flex-col items-center justify-center pt-20 px-6 opacity-50">
                <IconInvoice size={40} className="text-gray-300 mb-4" />
                <p className="text-kletta-secondary font-medium">No invoices found</p>
            </div>
        ) : (
            Object.keys(groupedInvoices).map((month) => (
                <div key={month} className="mb-0">
                    {/* Month Header - Light, Uppercase, Spaced, Subtle Gray */}
                    <div className="px-6 pt-8 pb-3 bg-white sticky top-0 z-10 bg-white/95 backdrop-blur-sm border-b border-gray-50/50">
                        <h2 className="text-[12px] font-medium text-kletta-secondary uppercase tracking-wider">{month}</h2>
                    </div>
                    <div>
                        {groupedInvoices[month].map(invoice => (
                            <InvoiceRow 
                                key={invoice.id}
                                invoice={invoice}
                                onRegisterPaid={(e) => handleRegisterPaidClick(e, invoice)}
                                onClick={() => handleRowClick(invoice)}
                            />
                        ))}
                    </div>
                </div>
            ))
        )}
      </div>

      {/* Confirmation Modal */}
      {selectedForPayment && (
        <div className="absolute inset-0 z-50 flex items-center justify-center p-6">
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-fade-in" onClick={() => setSelectedForPayment(null)} />
            <div className="bg-white w-full max-w-[320px] rounded-[24px] p-6 relative z-10 animate-slide-up shadow-2xl text-center">
                <div className="w-12 h-12 bg-kletta-yellow/20 rounded-full flex items-center justify-center mx-auto mb-4 text-kletta-dark">
                     <IconCheckCircle size={28} weight="fill" />
                </div>
                <h3 className="text-[18px] font-medium text-kletta-dark mb-2">Mark as paid?</h3>
                <p className="text-[14px] text-kletta-secondary font-light mb-6 leading-relaxed">
                    This will register the invoice as paid. You can’t undo this action easily.
                </p>
                <div className="flex flex-col gap-3">
                     <button 
                        onClick={confirmPayment}
                        className="w-full py-3.5 bg-kletta-yellow rounded-[14px] font-medium text-[15px] text-kletta-dark shadow-sm hover:shadow-md transition-all active:scale-[0.98]"
                     >
                        Mark as paid
                     </button>
                     <button 
                        onClick={() => setSelectedForPayment(null)}
                        className="w-full py-3.5 bg-white border border-gray-100 rounded-[14px] font-medium text-[15px] text-kletta-secondary hover:bg-gray-50 transition-colors"
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

// --- Row Component ---
interface InvoiceRowProps {
    invoice: Invoice;
    onRegisterPaid: (e: React.MouseEvent) => void;
    onClick: () => void;
}

const InvoiceRow: React.FC<InvoiceRowProps> = ({ invoice, onRegisterPaid, onClick }) => {
   const isPaid = invoice.status === 'paid';
   const isOverdue = invoice.status === 'overdue';

   return (
      <button 
         onClick={onClick}
         className="w-full px-6 py-5 flex items-start gap-4 transition-colors bg-white hover:bg-gray-50 group text-left border-b border-gray-50"
      >
         {/* Icon - Solid, No Background, Simple */}
         <div className="mt-0.5">
            <SalesListIcon type={invoice.iconType} />
         </div>

         {/* Content */}
         <div className="flex-1 min-w-0 flex flex-col gap-1">
             
             {/* Row 1: Amount & Status */}
             <div className="flex items-center justify-between">
                 <span className="text-[15px] font-medium text-kletta-dark leading-tight">
                    {invoice.amount}
                 </span>
                 
                 {/* Status Indicator - Clean, Inline, No Pill */}
                 {isPaid ? (
                     <div className="flex items-center gap-1.5">
                         <IconCheckCircle size={18} weight="fill" className="text-[#0D8240]" />
                         <span className="text-[12px] font-medium text-[#0D8240] tracking-wide">PAID</span>
                     </div>
                 ) : isOverdue ? (
                     <span className="text-[11px] font-medium text-[#D32F2F] tracking-wide">OVERDUE</span>
                 ) : (
                     <span className="text-[11px] font-medium text-kletta-secondary tracking-wide">UNPAID</span>
                 )}
             </div>
             
             {/* Row 2: Meta Info - Neutral Gray, Normal Weight */}
             <p className="text-[14px] text-kletta-secondary font-normal leading-relaxed w-full">
                 {invoice.meta}
             </p>

             {/* Row 3: Action Button (Register as paid) - Outlined, Clean */}
             {!isPaid && (
                 <div className="pt-2">
                     <div 
                        onClick={onRegisterPaid}
                        className="inline-flex items-center gap-2 px-3 py-2 rounded-[8px] border border-gray-200 bg-white hover:bg-gray-50 active:scale-[0.98] transition-all"
                     >
                         <IconCheck size={14} className="text-kletta-dark" weight="bold" />
                         <span className="text-[13px] font-medium text-kletta-dark">Register as paid</span>
                     </div>
                 </div>
             )}
         </div>
      </button>
   );
};

export default SalesScreen;