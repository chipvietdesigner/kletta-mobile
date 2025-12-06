import React, { useState } from 'react';
import { 
  IconPlus, IconSearch, IconFilter, IconChevronRight, IconBack, IconTrash, IconClock, IconPieChart
} from '../components/Icons';

type ViewState = 'list' | 'detail';

const AssetsScreen: React.FC = () => {
  const [view, setView] = useState<ViewState>('list');
  const [selectedAsset, setSelectedAsset] = useState<string | null>(null);

  const handleAssetClick = (name: string) => {
    setSelectedAsset(name);
    setView('detail');
  };

  const handleBack = () => {
    setView('list');
    setSelectedAsset(null);
  };

  if (view === 'detail') {
     return <AssetDetailScreen name={selectedAsset || ''} onBack={handleBack} />;
  }

  return (
    <div className="flex-1 flex flex-col bg-gray-50 h-full overflow-hidden font-aktifo animate-fade-in">
      
      {/* Top Bar */}
      <div className="bg-white px-6 pt-16 pb-4 flex justify-between items-center shadow-sm z-10">
        <h1 className="text-[28px] font-bold text-kletta-dark">Assets</h1>
        <button onClick={() => alert("Add asset flow")} className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors">
           <IconPlus size={24} className="text-kletta-dark" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar pb-36">
         
         {/* Summary Card */}
         <div className="px-6 mt-6 mb-6">
            <div className="bg-kletta-dark text-white p-6 rounded-[28px] shadow-lg">
               <div className="flex justify-between items-start mb-6">
                  <div>
                     <p className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-1">Book Value Today</p>
                     <p className="text-3xl font-bold">€14,250.00</p>
                  </div>
                  <div className="bg-white/10 p-2 rounded-xl">
                     <IconPieChart size={24} />
                  </div>
               </div>
               <div className="grid grid-cols-2 gap-4 border-t border-white/10 pt-4">
                  <div>
                     <p className="text-gray-400 text-[10px] font-bold uppercase mb-1">Total Cost</p>
                     <p className="font-bold text-lg">€22,500</p>
                  </div>
                  <div>
                     <p className="text-gray-400 text-[10px] font-bold uppercase mb-1">Depreciation (YTD)</p>
                     <p className="font-bold text-lg text-orange-400">-€3,200</p>
                  </div>
               </div>
            </div>
         </div>

         {/* Filters */}
         <div className="px-6 mb-6 flex items-center justify-between">
            <div className="flex gap-2">
               <span className="px-4 py-2 bg-white rounded-full text-xs font-bold shadow-sm border border-gray-100 text-kletta-dark">All assets</span>
               <span className="px-4 py-2 bg-transparent rounded-full text-xs font-bold text-gray-400">Active</span>
               <span className="px-4 py-2 bg-transparent rounded-full text-xs font-bold text-gray-400">Sold</span>
            </div>
            <IconFilter size={20} className="text-gray-400" />
         </div>

         {/* Asset List */}
         <div className="bg-white flex-1 min-h-[500px] rounded-t-[32px] p-6 shadow-sm space-y-4">
            <AssetRow 
               name="MacBook Pro 16" 
               date="Acquired 01/02/2024" 
               meta="3-year SL" 
               cost="€3,200" 
               value="€2,800" 
               onClick={() => handleAssetClick('MacBook Pro 16')} 
            />
            <AssetRow 
               name="Office Furniture Set" 
               date="Acquired 15/05/2023" 
               meta="5-year SL" 
               cost="€5,000" 
               value="€3,500" 
               onClick={() => handleAssetClick('Office Furniture Set')} 
            />
            <AssetRow 
               name="Sony Alpha Camera" 
               date="Acquired 10/11/2024" 
               meta="3-year SL" 
               cost="€2,400" 
               value="€2,350" 
               onClick={() => handleAssetClick('Sony Alpha Camera')} 
            />
             <AssetRow 
               name="Workstation PC" 
               date="Acquired 01/01/2022" 
               meta="3-year SL" 
               cost="€4,000" 
               value="€0" 
               onClick={() => handleAssetClick('Workstation PC')} 
               depreciated
            />
         </div>
      </div>
    </div>
  );
};

const AssetDetailScreen = ({ name, onBack }: { name: string, onBack: () => void }) => (
   <div className="flex-1 flex flex-col bg-white h-full font-aktifo animate-slide-up">
      <div className="px-6 pt-16 pb-4 flex items-center justify-between border-b border-gray-100">
         <div className="flex items-center gap-4">
            <button onClick={onBack} className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors">
               <IconBack size={24} className="text-kletta-dark" />
            </button>
            <h1 className="text-lg font-bold truncate max-w-[200px]">{name}</h1>
         </div>
         <button className="text-red-500 p-2 bg-red-50 rounded-lg">
            <IconTrash size={20} />
         </button>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar p-6 pb-36">
         {/* Detail Grid */}
         <div className="grid grid-cols-2 gap-4 mb-8">
            <DetailBox label="Original Cost" value="€3,200.00" />
            <DetailBox label="Current Value" value="€2,800.00" highlight />
            <DetailBox label="Purchase Date" value="01 Feb 2024" />
            <DetailBox label="Method" value="Straight-line" />
            <DetailBox label="Useful Life" value="3 Years" />
            <DetailBox label="Status" value="Active" />
         </div>

         <h3 className="text-lg font-bold text-kletta-dark mb-4">Depreciation Schedule</h3>
         <div className="border border-gray-100 rounded-2xl overflow-hidden">
            <div className="bg-gray-50 px-4 py-3 grid grid-cols-3 text-xs font-bold text-gray-500 uppercase tracking-wide">
               <span>Year</span>
               <span className="text-center">Depreciation</span>
               <span className="text-right">Book Value</span>
            </div>
            <div className="divide-y divide-gray-50">
               <ScheduleRow year="2024" dep="-€1,066" val="€2,134" current />
               <ScheduleRow year="2025" dep="-€1,066" val="€1,068" />
               <ScheduleRow year="2026" dep="-€1,068" val="€0" />
            </div>
         </div>
      </div>
   </div>
);

const DetailBox = ({ label, value, highlight }: any) => (
   <div className={`p-4 rounded-xl ${highlight ? 'bg-kletta-yellow/10 border border-kletta-yellow' : 'bg-gray-50'}`}>
      <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">{label}</p>
      <p className={`font-bold text-lg ${highlight ? 'text-kletta-dark' : 'text-gray-800'}`}>{value}</p>
   </div>
);

const ScheduleRow = ({ year, dep, val, current }: any) => (
   <div className={`px-4 py-3 grid grid-cols-3 text-sm font-medium ${current ? 'bg-kletta-teal/5' : 'bg-white'}`}>
      <span className="text-kletta-dark flex items-center gap-2">
         {year} {current && <span className="w-2 h-2 rounded-full bg-kletta-teal"></span>}
      </span>
      <span className="text-center text-gray-500">{dep}</span>
      <span className="text-right font-bold text-kletta-dark">{val}</span>
   </div>
);

const AssetRow = ({ name, date, meta, cost, value, depreciated, onClick }: any) => (
   <button onClick={onClick} className={`w-full text-left p-4 rounded-2xl border flex justify-between items-center group active:scale-[0.98] transition-all ${depreciated ? 'bg-gray-50 border-gray-100 opacity-60' : 'bg-white border-gray-200 hover:border-kletta-teal'}`}>
      <div>
         <p className="font-bold text-[15px] text-kletta-dark mb-1">{name}</p>
         <div className="flex items-center gap-2 text-xs font-medium text-gray-400">
            <span>{date}</span>
            <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
            <span>{meta}</span>
         </div>
      </div>
      <div className="text-right">
         <p className="text-xs text-gray-400 line-through mb-0.5">{cost}</p>
         <p className="font-bold text-[15px] text-kletta-dark">{value}</p>
      </div>
   </button>
);

export default AssetsScreen;