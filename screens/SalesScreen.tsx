
import React, { useState } from 'react';
import { 
   IconPlus, IconChevronDown, IconInvoice, IconCellSignalFull, IconWifiHigh, IconBatteryFull
} from '../components/Icons';
import { NavigationProps } from '../types';

type Segment = 'all' | 'outstanding';

const SalesScreen: React.FC<Partial<NavigationProps>> = ({ navigate }) => {
  const [segment, setSegment] = useState<Segment>('all');

  const handleRowClick = (invoice: any) => {
      if (navigate) {
          navigate('invoice-detail', invoice);
      }
  };

  return (
    <div className="flex-1 flex flex-col bg-white h-full overflow-hidden font-aktifo animate-fade-in relative">
      
      {/* Header Section (Dark Teal, containing everything) */}
      <div className="bg-kletta-teal pt-0 pb-8 px-6 shadow-md z-20 relative">
         
         {/* Status Bar (White) */}
         <div className="w-full h-[50px] flex justify-between items-end pb-2 text-white pointer-events-none mb-2">
            <span className="text-[15px] font-bold tracking-normal leading-none ml-2">9:41</span>
            <div className="flex gap-1.5 items-center mr-1">
               <IconCellSignalFull size={16} weight="fill" />
               <IconWifiHigh size={16} weight="bold" />
               <IconBatteryFull size={24} weight="fill" className="rotate-0" />
            </div>
         </div>

         {/* Title Area */}
         <div className="flex justify-between items-start mb-6">
            <div className="w-10"></div> {/* Spacer */}
            
            <div className="flex flex-col items-center">
               <h1 className="text-[20px] font-bold text-white leading-tight">Sales</h1>
               <button className="flex items-center gap-1 text-white/70 hover:text-white transition-colors mt-0.5 active:scale-95">
                  <span className="text-[13px] font-bold">All time</span>
                  <IconChevronDown size={12} weight="bold" />
               </button>
            </div>

            <button className="w-10 h-10 -mt-1 -mr-2 flex items-center justify-center text-white active:opacity-70 transition-opacity">
               <IconPlus size={26} weight="bold" />
            </button>
         </div>

         {/* Segmented Control (Inside Header) */}
         <div className="bg-[#00262b]/40 p-1 rounded-[16px] flex relative w-full h-[50px] backdrop-blur-sm">
            <button 
               onClick={() => setSegment('all')}
               className={`flex-1 rounded-[14px] text-[14px] font-bold transition-all duration-200 shadow-sm ${segment === 'all' ? 'bg-white text-kletta-dark' : 'bg-transparent text-white/60 hover:text-white shadow-none'}`}
            >
               All
            </button>
            <button 
               onClick={() => setSegment('outstanding')}
               className={`flex-1 rounded-[14px] text-[14px] font-bold transition-all duration-200 shadow-sm ${segment === 'outstanding' ? 'bg-white text-kletta-dark' : 'bg-transparent text-white/60 hover:text-white shadow-none'}`}
            >
               Outstanding
            </button>
         </div>
      </div>

      {/* Scrollable Invoice List (Pure White) */}
      <div className="flex-1 overflow-y-auto no-scrollbar px-5 pb-36 pt-4">
         <InvoiceRow 
            amount="€100.00" 
            date="29.04.2025" 
            id="12345" 
            name="Jari" 
            status="Paid"
            onClick={() => handleRowClick({ id: '12345', amount: '€100.00', status: 'Paid', name: 'Jari', date: '29.04.2025' })}
         />
         <InvoiceRow 
            amount="€250.00" 
            date="28.04.2025" 
            id="12344" 
            name="Matti Meikäläinen" 
            status="Overdue"
            onClick={() => handleRowClick({ id: '12344', amount: '€250.00', status: 'Overdue', name: 'Matti Meikäläinen', date: '28.04.2025' })}
         />
         <InvoiceRow 
            amount="€850.00" 
            date="25.04.2025" 
            id="12343" 
            name="Design Agency Oy" 
            status="Unpaid"
            onClick={() => handleRowClick({ id: '12343', amount: '€850.00', status: 'Unpaid', name: 'Design Agency Oy', date: '25.04.2025' })}
         />
         <InvoiceRow 
            amount="€120.00" 
            date="20.04.2025" 
            id="12342" 
            name="Konsultti K" 
            status="Paid"
            onClick={() => handleRowClick({ id: '12342', amount: '€120.00', status: 'Paid', name: 'Konsultti K', date: '20.04.2025' })}
         />
         <InvoiceRow 
            amount="€3,200.00" 
            date="15.04.2025" 
            id="12341" 
            name="Big Corp Ltd" 
            status="Unpaid"
            onClick={() => handleRowClick({ id: '12341', amount: '€3,200.00', status: 'Unpaid', name: 'Big Corp Ltd', date: '15.04.2025' })}
         />
          <InvoiceRow 
            amount="€450.00" 
            date="10.04.2025" 
            id="12340" 
            name="Startup Oy" 
            status="Overdue"
            onClick={() => handleRowClick({ id: '12340', amount: '€450.00', status: 'Overdue', name: 'Startup Oy', date: '10.04.2025' })}
         />
      </div>
    </div>
  );
};

interface InvoiceRowProps {
   amount: string;
   date: string;
   id: string;
   name: string;
   status: 'Paid' | 'Overdue' | 'Unpaid';
   onClick?: () => void;
}

const InvoiceRow: React.FC<InvoiceRowProps> = ({ amount, date, id, name, status, onClick }) => {
   return (
      <div onClick={onClick} className="py-5 border-b border-dashed border-gray-100 last:border-0 flex items-center gap-4 group cursor-pointer active:scale-[0.99] transition-transform -mx-2 px-2 rounded-xl hover:bg-gray-50">
         {/* Thumbnail */}
         <div className="w-[50px] h-[64px] bg-white rounded-[6px] border border-gray-200 flex items-center justify-center shrink-0 overflow-hidden relative shadow-sm">
            <div className="absolute top-2 left-1 right-1 h-[2px] bg-gray-100"></div>
            <div className="absolute top-4 left-1 right-3 h-[2px] bg-gray-100"></div>
            <div className="absolute top-6 left-1 right-2 h-[2px] bg-gray-100"></div>
            <IconInvoice size={24} className="text-gray-300 z-10" weight="fill" />
         </div>

         {/* Info */}
         <div className="flex-1 min-w-0 flex flex-col justify-center h-full">
            <div className="flex items-center gap-2 mb-1.5">
               <span className="font-bold text-[19px] text-kletta-dark leading-none tracking-tight">{amount}</span>
            </div>
            <p className="text-[13px] text-gray-400 font-medium truncate leading-normal">
               {date} • Invoice #{id} • <span className="text-kletta-dark">{name}</span>
            </p>
         </div>

         {/* Status / Action */}
         <div className="shrink-0">
            {status === 'Paid' && (
               <div className="px-4 py-1.5 bg-kletta-yellow rounded-full flex items-center justify-center min-w-[60px] shadow-sm">
                  <span className="text-[12px] font-bold text-kletta-dark">Paid</span>
               </div>
            )}
            
            {status === 'Unpaid' && (
               <button className="px-4 py-2 bg-kletta-teal rounded-full text-white active:scale-95 transition-transform shadow-md hover:bg-[#004a53]">
                  <span className="text-[11px] font-bold whitespace-nowrap">Register as paid</span>
               </button>
            )}

            {status === 'Overdue' && (
               <div className="px-4 py-1.5 bg-orange-100 rounded-full flex items-center justify-center min-w-[60px] shadow-sm">
                  <span className="text-[11px] font-bold text-orange-600 uppercase tracking-wide">OVERDUE</span>
               </div>
            )}
         </div>
      </div>
   );
};

export default SalesScreen;
