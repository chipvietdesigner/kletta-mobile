
import React, { useState } from 'react';
import { 
  IconCellSignalFull, IconWifiHigh, IconBatteryFull, 
  IconPlus, IconChevronDown, IconReceipt, IconChevronRight,
  IconSearch
} from '../components/Icons';

// --- Helper: List Image ---
const ExpenseListImage = ({ src, alt }: { src?: string, alt?: string }) => {
  const [error, setError] = useState(false);
  
  if (!src || error) {
    return null;
  }

  return (
    <div className="w-[72px] h-[72px] rounded-[16px] bg-gray-100 overflow-hidden border border-gray-100 shrink-0 relative">
      <img 
        src={src} 
        alt={alt} 
        onError={() => setError(true)}
        className="w-full h-full object-cover"
      />
    </div>
  );
};

// --- Mock Data: Receipts ---
const EXPENSE_DATA = [
    {
        id: "82815",
        title: "Receipt #82815",
        merchant: "A-T Lastenturva",
        meta: "16 Apr, 2025 • Other deductible ...",
        description: "Padwico itkuhälytin 850 musta",
        amount: "€149.00",
        imageUrl: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=200&h=200&fit=crop"
    },
    {
        id: "74865",
        title: "Receipt #74865",
        merchant: "TSUKI",
        meta: "03 Apr, 2025 • Representation e...",
        description: "Buffet-ateria ja limu",
        amount: "€31.00",
        imageUrl: "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?w=200&h=200&fit=crop"
    },
    {
        id: "77997",
        title: "Receipt #77997",
        merchant: "HELSINGIN KAUPUNKI, P...",
        meta: "01 Apr, 2025 • Non-allowable ex...",
        description: "Pysäköintivirhemaksu Helsingin kaupungil...",
        amount: "€60.00",
        imageUrl: "https://images.unsplash.com/photo-1554224155-1696413565d3?w=200&h=200&fit=crop"
    },
    {
        id: "76993",
        title: "Receipt #76993",
        merchant: "JYSK OY",
        meta: "31 Mar, 2025 • Other deductible ...",
        description: "Storage box for cushions BISNAP 117",
        amount: "€35.00",
        imageUrl: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=200&h=200&fit=crop"
    },
    {
        id: "68927",
        title: "Receipt #68927",
        merchant: "Clas Ohlson",
        meta: "26 Mar, 2025 • Purchases and in...",
        description: "PIKALIIMA FLEX CO",
        amount: "€8.99",
        imageUrl: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=200&h=200&fit=crop"
    },
    {
        id: "66851",
        title: "Expenses #66851",
        merchant: null,
        meta: "21 Mar, 2025 • Purchases and in...",
        description: "alviton",
        amount: "€79.68",
        imageUrl: "https://images.unsplash.com/photo-1554224155-1696413565d3?w=200&h=200&fit=crop"
    },
    {
        id: "64335",
        title: "Expenses #64335",
        merchant: null,
        meta: "21 Mar, 2025 • Purchases and in...",
        description: "",
        amount: "€7.97",
        imageUrl: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=200&h=200&fit=crop"
    }
];

// --- Mock Data: Trips ---
const TRIP_DATA = [
    {
        id: 'header-import',
        title: 'Imported kilometers and daily allowances',
        type: 'action'
    },
    {
        id: 't1',
        from: 'Haarniskatie 6d, ...',
        to: 'Haarniskatie 6d, ...',
        date: '29.04.2025',
        duration: '02:03:24',
        distance: '177.66km',
        amount: '€0.00',
        stops: [
          'Vantaanlaaksontie 34, 01670 Vantaa, Finland',
          'Laajaniitynkuja 6, 01620 Vantaa, Finland',
          'Lamminjärventie, 39100 Hämeenkyrö, Finland'
        ]
    },
    {
        id: 't5',
        title: 'Daily allowance',
        date: '29.04.2025',
        amount: '€51.00',
        isAllowance: true
    },
    {
        id: 't2',
        from: 'Haarniskatie 6d',
        to: 'Haarniskatie 6d, ...',
        date: '29.04.2025',
        duration: '02:03:24',
        distance: '177.66km',
        amount: '€150.97',
        stops: [
          'Vantaanlaaksontie 34, 01670 Vantaa, Finland',
          'Lamminjärventie, 39100 Hämeenkyrö, Finland'
        ]
    },
    {
        id: 't3',
        from: 'Haarniskatie 6d',
        to: 'Haarniskatie 6d, ...',
        date: '29.04.2025',
        duration: '02:03:24',
        distance: '177.66km',
        amount: '€150.97',
        stops: [
          'Vantaanlaaksontie 34, 01670 Vantaa, Finland'
        ]
    }
];

interface ExpensesScreenProps {
  dateRange: string;
  onOpenFilter: () => void;
}

const ExpensesScreen: React.FC<ExpensesScreenProps> = ({ dateRange, onOpenFilter }) => {
  const [activeTab, setActiveTab] = useState<'receipts' | 'trips'>('receipts');

  return (
    <div className="h-full w-full bg-white flex flex-col font-aktifo animate-fade-in relative overflow-hidden">
      
      {/* Header Container - Fixed at Top */}
      <div className="w-full z-20 flex flex-col shrink-0 bg-white">
          
          {/* Status Bar - Dark Text */}
          <div className="w-full h-[44px] flex justify-between items-end px-6 pb-1 text-kletta-dark pointer-events-none">
              <span className="text-[14px] font-semibold tracking-tight ml-2">9:41</span>
              <div className="flex gap-1.5 items-center mr-1">
                 <IconCellSignalFull size={16} weight="fill" />
                 <IconWifiHigh size={16} weight="bold" />
                 <IconBatteryFull size={22} weight="fill" className="rotate-0" />
              </div>
          </div>

          {/* Title Row */}
          <div className="px-6 pt-4 pb-2 relative">
              <div className="flex justify-between items-center relative">
                  <h1 className="text-[24px] font-bold text-kletta-dark tracking-tight">Expenses</h1>
                  <div className="flex items-center gap-2">
                      <button className="w-10 h-10 flex items-center justify-center rounded-full text-kletta-dark hover:bg-gray-100 transition-colors">
                        <IconSearch size={24} weight="regular" />
                      </button>
                      <button className="w-10 h-10 flex items-center justify-center rounded-full text-kletta-dark hover:bg-gray-100 transition-colors">
                        <IconPlus size={28} weight="regular" />
                      </button>
                  </div>
              </div>
              <div className="flex mt-1">
                  <button 
                    onClick={onOpenFilter}
                    className="flex items-center gap-1 text-kletta-dark hover:opacity-70 transition-opacity"
                  >
                      <span className="text-[16px] font-medium">{dateRange}</span>
                      <IconChevronDown size={14} weight="bold" />
                  </button>
              </div>
          </div>

          {/* Segmented Control - Pill Style */}
          <div className="px-6 py-2">
              <div className="bg-[#F2F2F2] p-0.5 rounded-[10px] flex w-full h-[32px]">
                  <button 
                    onClick={() => setActiveTab('receipts')}
                    className={`flex-1 h-full rounded-[8px] text-[13px] transition-all flex items-center justify-center ${activeTab === 'receipts' ? 'bg-white text-[#0C0D0D] font-medium shadow-sm' : 'text-[#0C0D0D] font-normal hover:opacity-70'}`}
                  >
                    Receipts
                  </button>
                  <button 
                    onClick={() => setActiveTab('trips')}
                    className={`flex-1 h-full rounded-[8px] text-[13px] transition-all flex items-center justify-center ${activeTab === 'trips' ? 'bg-white text-[#0C0D0D] font-medium shadow-sm' : 'text-[#0C0D0D] font-normal hover:opacity-70'}`}
                  >
                    Journey
                  </button>
              </div>
          </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto no-scrollbar pb-32 pt-2 bg-white">
         {activeTab === 'receipts' ? (
             EXPENSE_DATA.map((item) => (
                <ExpenseRow 
                    key={item.id}
                    {...item}
                />
             ))
         ) : (
             TRIP_DATA.map((item) => (
                 <TripRow 
                    key={item.id}
                    {...item}
                 />
             ))
         )}
      </div>
    </div>
  );
};

// --- Receipt Row ---
const ExpenseRow = ({ id, merchant, meta, description, amount, imageUrl }: any) => {
   return (
      <button className="w-full px-6 py-4 flex items-start gap-4 transition-colors border-b border-gray-100 bg-white hover:bg-gray-50 group text-left">
         
         {/* Image (Fixed Size) */}
         <div className="shrink-0">
             {imageUrl ? (
                 <div className="w-[56px] h-[56px] rounded-[10px] bg-gray-100 overflow-hidden border border-gray-100 shrink-0 relative">
                    <img 
                        src={imageUrl} 
                        alt={merchant || "receipt"} 
                        className="w-full h-full object-cover"
                    />
                </div>
             ) : (
                 <div className="w-[56px] h-[56px] bg-gray-50 rounded-[10px] flex items-center justify-center">
                    <IconReceipt size={20} className="text-gray-300" />
                 </div>
             )}
         </div>

         {/* Content */}
         <div className="flex-1 min-w-0">
             <div className="flex justify-between items-start">
                 <div className="flex-1 min-w-0">
                     <h3 className="text-[14px] font-semibold text-kletta-dark leading-tight mb-0.5">Receipt #{id}</h3>
                     {merchant && (
                         <h4 className="text-[14px] font-semibold text-kletta-dark leading-tight mb-0.5">{merchant}</h4>
                     )}
                     <p className="text-[13px] text-gray-500 font-normal truncate leading-tight">
                         {meta}
                     </p>
                     {description && (
                         <p className="text-[13px] text-gray-500 font-normal italic truncate leading-tight mt-0.5">
                             {description}
                         </p>
                     )}
                 </div>
                 <span className="text-[16px] font-semibold text-kletta-dark shrink-0 ml-2 leading-none">{amount}</span>
             </div>
         </div>
      </button>
   );
};

// --- Trip Row ---
const TripRow = (props: any) => {
    // Action Row (Header)
    if (props.type === 'action') {
        return (
            <button className="w-full px-6 py-4 flex items-center justify-between transition-colors border-b border-gray-100 bg-white hover:bg-gray-50 group text-left">
                <span className="text-[15px] font-medium text-kletta-dark truncate pr-4">{props.title}</span>
            </button>
        );
    }

    // Daily Allowance special case
    if (props.isAllowance) {
        return (
            <div className="px-6 py-6 border-b border-dashed border-gray-200 bg-white">
                <div className="flex justify-between items-start mb-3">
                    <h3 className="text-[16px] font-medium text-kletta-dark tracking-tight leading-none">{props.title}</h3>
                    <span className="text-[16px] font-medium text-kletta-dark leading-none">{props.amount}</span>
                </div>
                <div className="flex gap-2">
                    <span className="px-3 py-1 bg-[#F2F4F7] rounded-[8px] text-[14px] font-normal text-kletta-dark">
                        {props.date}
                    </span>
                </div>
            </div>
        );
    }

    // Standard Trip Row (Multi-stop)
    return (
        <div className="px-6 py-6 border-b border-dashed border-gray-200 bg-white">
            {/* Header: Title and Price */}
            <div className="flex justify-between items-start mb-3">
                <h3 className="text-[16px] font-medium text-kletta-dark tracking-tight leading-tight pr-4">
                    {props.from} – {props.to}
                </h3>
                <span className="text-[16px] font-medium text-kletta-dark shrink-0 leading-none">{props.amount}</span>
            </div>

            {/* Chips */}
            <div className="flex flex-wrap gap-2 mb-6">
                <div className="flex items-center gap-2">
                    <span className="px-3 py-1 bg-[#F2F4F7] rounded-[8px] text-[15px] font-normal text-kletta-dark leading-none">{props.date}</span>
                </div>
                <div className="flex items-center gap-2 before:content-['•'] before:text-gray-300 before:text-xs">
                    <span className="px-3 py-1 bg-[#F2F4F7] rounded-[8px] text-[15px] font-normal text-kletta-dark leading-none">{props.distance}</span>
                </div>
                <div className="flex items-center gap-2 before:content-['•'] before:text-gray-300 before:text-xs">
                    <span className="px-3 py-1 bg-[#F2F4F7] rounded-[8px] text-[15px] font-normal text-kletta-dark leading-none">{props.duration}</span>
                </div>
            </div>

            {/* Stops / Timeline */}
            <div className="space-y-4">
                {props.stops?.map((stop: string, idx: number) => (
                    <div key={idx} className="flex items-start gap-4 relative">
                        {/* Vertical line between dots (dashed) */}
                        {idx < props.stops.length - 1 && (
                            <div className="absolute left-[4.5px] top-[14px] bottom-[-18px] w-px border-l border-dotted border-gray-400"></div>
                        )}
                        
                        {/* Dot */}
                        {idx === 0 ? (
                            <div className="w-[10px] h-[10px] rounded-full bg-kletta-teal mt-[6px] shrink-0 z-10"></div>
                        ) : (
                            <div className="w-[10px] h-[10px] rounded-full border border-kletta-dark bg-white mt-[6px] shrink-0 z-10"></div>
                        )}
                        
                        {/* Address */}
                        <span className="text-[14.5px] text-kletta-dark font-normal leading-snug">{stop}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ExpensesScreen;
