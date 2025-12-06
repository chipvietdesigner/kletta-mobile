import React, { useState } from 'react';
import { 
   IconPlus, IconSearch, IconFilter, IconChevronRight, IconUser, IconBack
} from '../components/Icons';

type Segment = 'invoices' | 'customers';
type ViewState = 'list' | 'detail';

const SalesScreen: React.FC = () => {
  const [segment, setSegment] = useState<Segment>('invoices');
  const [view, setView] = useState<ViewState>('list');
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const handleItemClick = (id: string) => {
    setSelectedItem(id);
    setView('detail');
  };

  const handleBack = () => {
    setView('list');
    setSelectedItem(null);
  };

  if (view === 'detail') {
      return <InvoiceDetailScreen id={selectedItem || ''} onBack={handleBack} />;
  }

  return (
    <div className="flex-1 flex flex-col bg-gray-50 h-full overflow-hidden font-aktifo animate-fade-in">
      {/* Top Bar */}
      <div className="bg-white px-6 pt-16 pb-4 flex justify-between items-center shadow-sm z-10">
        <h1 className="text-[28px] font-bold text-kletta-dark">Sales</h1>
        <button 
          onClick={() => alert("New invoice flow")}
          className="bg-kletta-yellow px-4 py-2 rounded-xl text-sm font-bold text-kletta-dark active:scale-95 transition-transform"
        >
          New invoice
        </button>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar pb-36">
        
        {/* KPI Cards */}
        <div className="px-6 mt-6 mb-8 overflow-x-auto no-scrollbar flex gap-4 snap-x">
           <KPICard title="Sales this month" value="€2,986.30" color="bg-kletta-teal" textColor="text-white" width="min-w-[180px]" />
           <KPICard title="Paid invoices" value="12" sub="Total €4,500" color="bg-white" textColor="text-kletta-dark" width="min-w-[140px]" />
           <KPICard title="Overdue" value="3" sub="Action needed" color="bg-orange-50" textColor="text-orange-700" width="min-w-[140px]" />
        </div>

        {/* Segmented Control */}
        <div className="px-6 mb-6">
           <div className="bg-gray-200 p-1 rounded-xl flex">
              <button 
                onClick={() => setSegment('invoices')}
                className={`flex-1 py-2.5 rounded-lg text-sm font-bold transition-all ${segment === 'invoices' ? 'bg-white shadow-sm text-kletta-dark' : 'text-gray-500'}`}
              >
                Invoices
              </button>
              <button 
                onClick={() => setSegment('customers')}
                className={`flex-1 py-2.5 rounded-lg text-sm font-bold transition-all ${segment === 'customers' ? 'bg-white shadow-sm text-kletta-dark' : 'text-gray-500'}`}
              >
                Customers
              </button>
           </div>
        </div>

        {/* Content based on Segment */}
        {segment === 'invoices' ? (
           <InvoicesList onItemClick={handleItemClick} />
        ) : (
           <CustomersList />
        )}

      </div>
    </div>
  );
};

const InvoicesList = ({ onItemClick }: { onItemClick: (id: string) => void }) => (
   <div className="bg-white rounded-t-[32px] p-6 shadow-[0_-4px_20px_rgba(0,0,0,0.03)] min-h-[500px]">
      <div className="flex gap-3 mb-6">
         <div className="flex-1 bg-gray-50 rounded-xl px-4 py-3 flex items-center gap-2">
            <IconSearch size={18} className="text-gray-400" />
            <input type="text" placeholder="Search..." className="bg-transparent outline-none w-full text-sm font-medium" />
         </div>
         <button className="bg-gray-50 w-12 rounded-xl flex items-center justify-center">
            <IconFilter size={20} className="text-gray-500" />
         </button>
      </div>

      <div className="flex gap-2 mb-6 overflow-x-auto no-scrollbar">
         {['All', 'Draft', 'Sent', 'Paid', 'Overdue'].map((filter, i) => (
            <button key={filter} className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap ${i === 0 ? 'bg-kletta-dark text-white' : 'bg-gray-100 text-gray-500'}`}>
               {filter}
            </button>
         ))}
      </div>

      <div className="space-y-4">
         <InvoiceRow client="Oy Company Ab" id="#2025-001" date="Due 15/12/2025" amount="€1,250.00" status="Paid" onClick={() => onItemClick('2025-001')} />
         <InvoiceRow client="Design Agency Ltd" id="#2025-002" date="Due 20/12/2025" amount="€4,500.00" status="Overdue" onClick={() => onItemClick('2025-002')} />
         <InvoiceRow client="StartUp Oy" id="#2025-003" date="Draft" amount="€800.00" status="Draft" onClick={() => onItemClick('2025-003')} />
         <InvoiceRow client="MegaCorp" id="#2025-004" date="Due 01/01/2026" amount="€12,000.00" status="Sent" onClick={() => onItemClick('2025-004')} />
      </div>
   </div>
);

const CustomersList = () => (
   <div className="bg-white rounded-t-[32px] p-6 shadow-[0_-4px_20px_rgba(0,0,0,0.03)] min-h-[500px]">
       <button onClick={() => alert("New customer")} className="w-full py-3 mb-6 border-2 border-dashed border-gray-200 rounded-xl flex items-center justify-center gap-2 text-gray-500 font-bold hover:border-kletta-teal hover:text-kletta-teal transition-colors">
          <IconPlus size={20} /> Add new customer
       </button>
       <div className="space-y-4">
          <CustomerRow name="Oy Company Ab" contact="billing@company.fi" total="€12,500" />
          <CustomerRow name="Design Agency Ltd" contact="hello@design.com" total="€4,500" />
          <CustomerRow name="StartUp Oy" contact="ceo@startup.io" total="€800" />
       </div>
   </div>
);

const InvoiceDetailScreen = ({ id, onBack }: { id: string, onBack: () => void }) => (
   <div className="flex-1 flex flex-col bg-white h-full font-aktifo animate-slide-up">
      <div className="px-6 pt-16 pb-4 flex items-center gap-4 border-b border-gray-100">
         <button onClick={onBack} className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center">
            <IconBack size={24} className="text-kletta-dark" />
         </button>
         <h1 className="text-xl font-bold">Invoice #{id}</h1>
      </div>
      <div className="p-8">
         <div className="bg-gray-50 rounded-2xl p-6 mb-8 text-center">
             <p className="text-gray-400 font-bold text-xs uppercase tracking-wider mb-2">Total Amount</p>
             <p className="text-4xl font-bold text-kletta-dark">€1,250.00</p>
             <div className="mt-4 inline-flex px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold">Paid on 14 Dec</div>
         </div>
         <h3 className="font-bold mb-4">Line Items</h3>
         <div className="space-y-4 border-t border-gray-100 pt-4">
             <div className="flex justify-between">
                <span>Consulting Services</span>
                <span className="font-bold">€1,000.00</span>
             </div>
             <div className="flex justify-between">
                <span>VAT 25.5%</span>
                <span className="font-bold">€250.00</span>
             </div>
         </div>
      </div>
   </div>
);


// Components
const KPICard = ({ title, value, sub, color, textColor, width }: any) => (
   <div className={`${width} ${color} p-5 rounded-[24px] shadow-sm snap-start flex flex-col justify-between h-[120px]`}>
      <p className={`text-[13px] font-bold opacity-80 ${textColor}`}>{title}</p>
      <div>
         <p className={`text-2xl font-bold ${textColor}`}>{value}</p>
         {sub && <p className={`text-[11px] font-medium opacity-70 mt-1 ${textColor}`}>{sub}</p>}
      </div>
   </div>
);

const InvoiceRow = ({ client, id, date, amount, status, onClick }: any) => {
   const statusColor = status === 'Paid' ? 'bg-green-100 text-green-700' : status === 'Overdue' ? 'bg-red-100 text-red-700' : status === 'Draft' ? 'bg-gray-100 text-gray-500' : 'bg-blue-100 text-blue-700';
   
   return (
      <button onClick={onClick} className="w-full flex justify-between items-center py-3 border-b border-gray-50 group hover:bg-gray-50 -mx-2 px-2 rounded-lg transition-colors">
         <div className="text-left">
            <div className="flex items-center gap-2 mb-1">
               <span className="font-bold text-[15px] text-kletta-dark">{client}</span>
               <span className="text-xs text-gray-400 font-medium">{id}</span>
            </div>
            <div className="flex items-center gap-2">
               <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${statusColor}`}>{status}</span>
               <span className="text-[13px] text-gray-400 font-medium">{date}</span>
            </div>
         </div>
         <div className="text-right">
            <span className="font-bold text-lg text-kletta-dark block">{amount}</span>
         </div>
      </button>
   );
};

const CustomerRow = ({ name, contact, total }: any) => (
   <button onClick={() => alert("Customer detail")} className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-2xl group active:scale-[0.98] transition-transform">
      <div className="flex items-center gap-4">
         <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-kletta-teal font-bold border border-gray-100">
            {name.charAt(0)}
         </div>
         <div className="text-left">
            <p className="font-bold text-kletta-dark">{name}</p>
            <p className="text-xs text-gray-400">{contact}</p>
         </div>
      </div>
      <div className="text-right">
         <p className="text-xs text-gray-400 font-bold uppercase">Lifetime</p>
         <p className="font-bold text-kletta-dark">{total}</p>
      </div>
   </button>
);

export default SalesScreen;