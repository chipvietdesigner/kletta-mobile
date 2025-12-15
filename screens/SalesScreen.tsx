import React, { useState } from 'react';
import { NavigationProps } from '../types';
import { 
  IconCellSignalFull, IconWifiHigh, IconBatteryFull, 
  IconPlus, IconChevronDown, IconUser, IconCheck, IconWarningCircle
} from '../components/Icons';

// --- Types ---
interface Invoice {
    id: string;
    client: string;
    number: string;
    date: string;
    amount: string;
    status: 'paid' | 'overdue' | 'unpaid' | 'outstanding';
    imageUrl?: string;
    email?: string;
}

// --- Mock Data ---
const INITIAL_INVOICES: Invoice[] = [
    { 
       id: '12345',
       client: "Jari",
       number: "#12345",
       date: "29.04.2025",
       amount: "€100.00",
       status: "paid",
       imageUrl: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=100&h=100&fit=crop",
       email: "jari@example.com"
    },
    { 
       id: '12346',
       client: "Matti Meikäläinen",
       number: "#12346",
       date: "29.04.2025",
       amount: "€250.00",
       status: "overdue",
       imageUrl: "https://images.unsplash.com/photo-1542435503-956c469947f6?w=100&h=100&fit=crop",
       email: "matti@example.com"
    },
    { 
       id: '12347',
       client: "Tech Oy Long Company Name Test Truncation",
       number: "#12347",
       date: "29.04.2025",
       amount: "€1,200.00",
       status: "unpaid",
       imageUrl: "https://images.unsplash.com/photo-1555099962-4199c345e5dd?w=100&h=100&fit=crop",
       email: "contact@techoy.fi"
    },
    { 
       id: '12344',
       client: "Design Studio",
       number: "#12344",
       date: "15.03.2025",
       amount: "€450.00",
       status: "paid",
       imageUrl: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=100&h=100&fit=crop",
       email: "studio@design.com"
    },
    { 
       id: '12343',
       client: "Consulting Group",
       number: "#12343",
       date: "12.03.2025",
       amount: "€3,400.00",
       status: "paid",
       imageUrl: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=100&h=100&fit=crop",
       email: "billing@consulting.com"
    },
    { 
       id: '12342',
       client: "Personal Project",
       number: "#12342",
       date: "01.03.2025",
       amount: "€120.00",
       status: "paid",
       imageUrl: "https://images.unsplash.com/photo-1513530534585-c7b1394c6d51?w=100&h=100&fit=crop",
       email: "me@project.com"
    }
];

// --- Helper: List Image ---
const SalesListImage = ({ src, alt }: { src?: string, alt?: string }) => {
  const [error, setError] = useState(false);
  
  if (!src || error) {
    return (
      <div className="w-11 h-11 rounded-[12px] bg-gray-50 flex items-center justify-center border border-gray-100 shrink-0">
         <IconUser size={20} className="text-gray-300" weight="fill" />
      </div>
    );
  }

  return (
    <div className="w-11 h-11 rounded-[12px] bg-gray-50 overflow-hidden border border-gray-100 shrink-0 relative">
      <img 
        src={src} 
        alt={alt} 
        onError={() => setError(true)}
        className="w-full h-full object-cover"
      />
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
          status: invoice.status.toUpperCase(), // Convert to display format (PAID, OVERDUE, UNPAID)
          name: invoice.client,
          date: invoice.date,
          email: invoice.email
      });
  };

  // Filter Logic
  const filteredInvoices = filter === 'all' 
    ? invoices 
    : invoices.filter(inv => inv.status !== 'paid');

  // Group by Month (Simple check for demo)
  const aprilInvoices = filteredInvoices.filter(inv => inv.date.includes('.04.'));
  const marchInvoices = filteredInvoices.filter(inv => inv.date.includes('.03.'));

  return (
    <div className="h-full w-full bg-white flex flex-col font-aktifo animate-fade-in relative overflow-hidden">
      
      {/* Header Section - Dark Theme (Kletta Teal) */}
      <div className="w-full bg-kletta-teal flex flex-col z-20 pb-6 pt-0 shadow-sm">
          
          {/* Status Bar */}
          <div className="w-full h-[50px] flex justify-between items-end px-6 pb-2 text-white pointer-events-none">
              <span className="text-[15px] font-medium tracking-normal leading-none ml-2">9:41</span>
              <div className="flex gap-1.5 items-center mr-1">
                 <IconCellSignalFull size={16} weight="fill" />
                 <IconWifiHigh size={16} weight="bold" />
                 <IconBatteryFull size={24} weight="fill" className="rotate-0" />
              </div>
          </div>

          {/* Header Content */}
          <div className="px-6 pt-2 flex flex-col">
              {/* Title Row */}
              <div className="flex justify-between items-center mb-6">
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

              {/* Segmented Control */}
              <div className="w-full h-[38px] bg-white/10 p-0.5 rounded-full flex relative backdrop-blur-sm">
                  <button 
                    onClick={() => setFilter('all')}
                    className={`flex-1 rounded-full text-[13px] font-medium transition-all z-10 duration-200 ${filter === 'all' ? 'bg-white text-kletta-dark shadow-sm' : 'text-white/70 hover:bg-white/5 hover:text-white'}`}
                  >
                    All
                  </button>
                  <button 
                    onClick={() => setFilter('outstanding')}
                    className={`flex-1 rounded-full text-[13px] font-medium transition-all z-10 duration-200 ${filter === 'outstanding' ? 'bg-white text-kletta-dark shadow-sm' : 'text-white/70 hover:bg-white/5 hover:text-white'}`}
                  >
                    Outstanding
                  </button>
              </div>
          </div>
      </div>

      {/* List Content */}
      <div className="flex-1 overflow-y-auto no-scrollbar pb-32 pt-0 bg-white">
        
        {/* April Group */}
        {aprilInvoices.length > 0 && (
            <>
                <div className="px-6 pt-5 pb-3 bg-white/95 sticky top-0 backdrop-blur-sm z-10 border-b border-gray-50">
                    <p className="text-[12px] font-medium text-[#6F7683] uppercase tracking-wider">April 2025</p>
                </div>
                {aprilInvoices.map(invoice => (
                    <InvoiceRow 
                        key={invoice.id}
                        invoice={invoice}
                        onRegisterPaid={(e) => handleRegisterPaidClick(e, invoice)}
                        onClick={() => handleRowClick(invoice)}
                    />
                ))}
            </>
        )}

        {/* March Group */}
        {marchInvoices.length > 0 && (
            <>
                <div className="px-6 pt-6 pb-3 bg-white/95 sticky top-0 backdrop-blur-sm z-10 border-b border-gray-50 mt-2">
                    <p className="text-[12px] font-medium text-[#6F7683] uppercase tracking-wider">March 2025</p>
                </div>
                {marchInvoices.map(invoice => (
                    <InvoiceRow 
                        key={invoice.id}
                        invoice={invoice}
                        onRegisterPaid={(e) => handleRegisterPaidClick(e, invoice)}
                        onClick={() => handleRowClick(invoice)}
                    />
                ))}
            </>
        )}
      </div>

      {/* Confirmation Modal */}
      {selectedForPayment && (
        <div className="absolute inset-0 z-50 flex items-center justify-center p-6">
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-fade-in" onClick={() => setSelectedForPayment(null)} />
            <div className="bg-white w-full max-w-[320px] rounded-[24px] p-6 relative z-10 animate-slide-up shadow-2xl text-center">
                <div className="w-12 h-12 bg-kletta-yellow/20 rounded-full flex items-center justify-center mx-auto mb-4 text-kletta-dark">
                     <IconCheck size={28} weight="bold" />
                </div>
                <h3 className="text-[18px] font-bold text-kletta-dark mb-2">Mark as paid?</h3>
                <p className="text-[14px] text-gray-500 font-light mb-6 leading-relaxed">
                    This will register the invoice as paid. You can’t undo this action easily.
                </p>
                <div className="flex flex-col gap-3">
                     <button 
                        onClick={confirmPayment}
                        className="w-full py-3.5 bg-kletta-yellow rounded-[14px] font-bold text-[15px] text-kletta-dark shadow-sm hover:shadow-md transition-all active:scale-[0.98]"
                     >
                        Mark as paid
                     </button>
                     <button 
                        onClick={() => setSelectedForPayment(null)}
                        className="w-full py-3.5 bg-white border border-gray-100 rounded-[14px] font-bold text-[15px] text-gray-600 hover:bg-gray-50 transition-colors"
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
const InvoiceRow = ({ invoice, onRegisterPaid, onClick }: { invoice: Invoice, onRegisterPaid: (e: React.MouseEvent) => void, onClick: () => void }) => {
   // Determine styling based on status
   let statusText = '';
   let statusColor = 'text-[#8A8F9A]'; 

   if (invoice.status === 'overdue') {
       statusText = 'OVERDUE'; // Uppercase for consistency
       statusColor = 'text-red-600 font-bold';
   } else if (invoice.status === 'unpaid' || invoice.status === 'outstanding') {
       statusText = 'Unpaid';
       statusColor = 'text-kletta-dark font-medium opacity-60';
   } else if (invoice.status === 'paid') {
       statusText = 'Paid';
       statusColor = 'text-green-600 font-medium';
   }

   const showAction = invoice.status !== 'paid';

   return (
      <button 
         onClick={onClick}
         className="w-full px-6 py-4 flex items-center gap-4 transition-colors border-b border-gray-50 bg-white hover:bg-gray-50 group text-left min-h-[80px]"
      >
         {/* Image */}
         <SalesListImage src={invoice.imageUrl} alt={invoice.client} />

         {/* Middle Content - Flex Grow with min-width 0 to allow truncation */}
         <div className="flex-1 min-w-0 flex flex-col justify-center">
             <div className="flex items-center justify-between mb-1">
                 <p className="text-[13px] font-light text-[#111111] leading-snug whitespace-nowrap overflow-hidden text-ellipsis pr-2">
                     {invoice.client}
                 </p>
             </div>
             
             {/* Meta Line: Date • Number • Status */}
             <div className="flex items-center text-[12px] font-light leading-tight text-left">
                 <span className="text-[#8A8F9A] whitespace-nowrap">{invoice.date} • {invoice.number}</span>
                 <span className="mx-1.5 text-[#E5E5E5]">|</span>
                 {/* Status is shrink-0 to prevent truncation */}
                 <span className={`shrink-0 ${statusColor} tracking-wide`}>{statusText}</span>
             </div>
         </div>

         {/* Right Content */}
         <div className="shrink-0 pl-2 text-right flex flex-col items-end gap-1.5 justify-center min-w-[80px]">
             <p className={`text-[15px] font-medium tracking-normal ${invoice.status === 'paid' ? 'text-green-600' : 'text-kletta-dark'}`}>
                {invoice.amount}
             </p>
             
             {/* Premium "Register as paid" Action */}
             {showAction && (
                 <div 
                    onClick={onRegisterPaid}
                    className="px-3 py-1.5 bg-kletta-yellow rounded-[14px] shadow-sm hover:shadow-md active:scale-95 transition-all cursor-pointer flex items-center justify-center"
                 >
                     <span className="text-[11px] font-bold text-kletta-teal whitespace-nowrap">Register as paid</span>
                 </div>
             )}
         </div>
      </button>
   );
};

export default SalesScreen;