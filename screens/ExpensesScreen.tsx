import React, { useState } from 'react';
import { 
  IconScanReceipt, IconChevronDown, IconPlus, IconClose, IconCar, IconMonitor, IconBriefcase
} from '../components/Icons';

type ViewState = 'list' | 'add';

const ExpensesScreen: React.FC = () => {
  const [view, setView] = useState<ViewState>('list');

  const handleAdd = () => setView('add');
  const handleClose = () => setView('list');

  return (
    <div className="flex-1 flex flex-col bg-gray-50 h-full overflow-hidden font-aktifo animate-fade-in relative">
      
      {/* Top Bar */}
      <div className="bg-white px-6 pt-16 pb-4 flex justify-between items-center shadow-sm z-10">
        <h1 className="text-[28px] font-bold text-kletta-dark">Expenses</h1>
        <button className="w-10 h-10 bg-kletta-teal rounded-full flex items-center justify-center active:scale-95 transition-transform shadow-md">
          <IconScanReceipt size={20} className="text-white" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar pb-36">
        
        {/* Summary Strip */}
        <div className="bg-white mt-1 py-4 px-6 shadow-sm flex justify-between items-center text-center divide-x divide-gray-100">
            <div className="flex-1">
               <p className="text-xs text-gray-400 font-bold uppercase mb-1">This Month</p>
               <p className="text-lg font-bold text-kletta-dark">€1,240</p>
            </div>
            <div className="flex-1">
               <p className="text-xs text-gray-400 font-bold uppercase mb-1">Deductible</p>
               <p className="text-lg font-bold text-green-600">€980</p>
            </div>
            <div className="flex-1">
               <p className="text-xs text-gray-400 font-bold uppercase mb-1">Other</p>
               <p className="text-lg font-bold text-gray-500">€260</p>
            </div>
        </div>

        {/* Filters */}
        <div className="px-6 my-6">
           <div className="flex justify-between items-center mb-4">
              <button className="flex items-center gap-2 font-bold text-kletta-dark bg-white px-3 py-1.5 rounded-lg shadow-sm border border-gray-100">
                 This month <IconChevronDown size={14} />
              </button>
           </div>
           <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
              <FilterChip label="All" active />
              <FilterChip label="Meals" />
              <FilterChip label="Travel" />
              <FilterChip label="Office" />
              <FilterChip label="Software" />
           </div>
        </div>

        {/* Expense List */}
        <div className="px-6 space-y-3">
           <p className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-2">Recent</p>
           
           <ExpenseRow 
              vendor="Uber Trip" 
              date="Today • Travel" 
              amount="€18.40" 
              vat="VAT 10%" 
              icon={<IconCar size={20} className="text-blue-600" />} 
              iconBg="bg-blue-100"
              status="OK"
           />
           <ExpenseRow 
              vendor="Adobe Systems" 
              date="Yesterday • Software" 
              amount="€64.90" 
              vat="VAT 24%" 
              icon={<IconMonitor size={20} className="text-purple-600" />} 
              iconBg="bg-purple-100"
              status="OK"
           />
           <ExpenseRow 
              vendor="Lunch Meeting" 
              date="12 Dec • Meals" 
              amount="€45.00" 
              vat="VAT 14%" 
              icon={<IconBriefcase size={20} className="text-orange-600" />} 
              iconBg="bg-orange-100"
              status="Needs receipt"
           />
           <ExpenseRow 
              vendor="Office Chair" 
              date="10 Dec • Office" 
              amount="€250.00" 
              vat="VAT 24%" 
              icon={<IconMonitor size={20} className="text-teal-600" />} 
              iconBg="bg-teal-100"
              status="OK"
           />
        </div>
      </div>

      {/* Floating Add Button */}
      <div className="absolute bottom-28 right-6 z-20">
         <button 
            onClick={handleAdd}
            className="bg-kletta-yellow text-kletta-dark h-14 w-auto px-6 rounded-full font-bold shadow-xl active:scale-95 transition-transform flex items-center gap-2"
         >
            <IconPlus size={22} /> Add expense
         </button>
      </div>

      {/* Add Expense Form Overlay */}
      {view === 'add' && (
         <div className="absolute inset-0 bg-white z-50 flex flex-col animate-slide-up">
            <div className="bg-white px-6 pt-16 pb-4 flex justify-between items-center border-b border-gray-100">
               <h2 className="text-xl font-bold text-kletta-dark">Add Expense</h2>
               <button onClick={handleClose} className="p-2 bg-gray-100 rounded-full">
                  <IconClose size={20} />
               </button>
            </div>
            <div className="p-6 flex-1">
               <div className="space-y-6">
                  <div>
                     <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Amount</label>
                     <input type="text" placeholder="€0.00" className="w-full text-4xl font-bold text-kletta-dark outline-none placeholder:text-gray-300" autoFocus />
                  </div>
                  <div>
                     <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Category</label>
                     <div className="flex gap-3 overflow-x-auto py-2">
                        <CategorySelect label="Travel" icon={<IconCar size={18} />} active />
                        <CategorySelect label="Office" icon={<IconMonitor size={18} />} />
                        <CategorySelect label="Meals" icon={<IconBriefcase size={18} />} />
                     </div>
                  </div>
                  <div>
                     <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Vendor / Description</label>
                     <input type="text" placeholder="e.g. Train ticket" className="w-full p-4 bg-gray-50 rounded-xl font-bold text-kletta-dark outline-none" />
                  </div>
               </div>
               <button onClick={handleClose} className="w-full bg-kletta-dark text-white font-bold py-4 rounded-xl mt-12 text-lg shadow-lg">
                  Save expense
               </button>
            </div>
         </div>
      )}
    </div>
  );
};

const FilterChip = ({ label, active }: { label: string, active?: boolean }) => (
   <button className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap border transition-colors ${active ? 'bg-kletta-dark text-white border-kletta-dark' : 'bg-white text-gray-500 border-gray-200'}`}>
      {label}
   </button>
);

const CategorySelect = ({ label, icon, active }: any) => (
   <button className={`flex flex-col items-center justify-center w-20 h-20 rounded-2xl border-2 transition-all ${active ? 'border-kletta-teal bg-teal-50 text-kletta-teal' : 'border-gray-100 text-gray-400'}`}>
      <div className="mb-1">{icon}</div>
      <span className="text-[11px] font-bold">{label}</span>
   </button>
);

const ExpenseRow = ({ vendor, date, amount, vat, icon, iconBg, status }: any) => (
   <div className="bg-white p-4 rounded-2xl shadow-sm flex items-center justify-between border border-gray-50">
      <div className="flex items-center gap-4">
         <div className={`w-12 h-12 ${iconBg} rounded-xl flex items-center justify-center`}>
            {icon}
         </div>
         <div>
            <p className="font-bold text-[15px] text-kletta-dark leading-tight">{vendor}</p>
            <div className="flex items-center gap-2 mt-0.5">
               <span className="text-xs text-gray-400 font-medium">{date}</span>
               <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
               <span className="text-[10px] bg-gray-100 px-1.5 py-0.5 rounded text-gray-500 font-bold">{vat}</span>
            </div>
         </div>
      </div>
      <div className="text-right">
         <p className="font-bold text-lg text-kletta-dark">{amount}</p>
         <p className={`text-[10px] font-bold uppercase tracking-wide ${status === 'OK' ? 'text-green-600' : 'text-orange-500'}`}>{status}</p>
      </div>
   </div>
);

export default ExpensesScreen;