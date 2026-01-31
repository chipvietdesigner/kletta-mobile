import React, { useState, useEffect } from 'react';
import { NavigationProps } from '../types';
import { 
  IconCellSignalFull, IconWifiHigh, IconBatteryFull, 
  IconPlus, IconChevronDown
} from '../components/Icons';

interface SalesScreenProps extends NavigationProps {
  dateRange: string;
  onOpenFilter: () => void;
  onModalToggle?: (open: boolean) => void;
}

const SalesScreen: React.FC<SalesScreenProps> = ({ navigate, dateRange, onOpenFilter, onModalToggle }) => {
  return (
    <div className="h-full w-full bg-[#F8F9FA] flex flex-col font-aktifo animate-fade-in relative overflow-hidden">
      
      {/* Header Container */}
      <div className="w-full bg-kletta-teal pb-8 pt-0 z-20 shrink-0">
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
                       <h1 className="text-[26px] font-bold text-white tracking-tight mb-0.5">Sales</h1>
                       <div 
                         onClick={onOpenFilter}
                         className="flex items-center gap-1 opacity-80 text-white transition-opacity hover:opacity-100 cursor-pointer"
                       >
                           <span className="text-[14px] font-medium">{dateRange}</span>
                           <IconChevronDown size={14} weight="bold" />
                       </div>
                   </div>
                   <button 
                        onClick={() => navigate('new-invoice')}
                        className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 active:scale-95 transition-all shadow-sm"
                    >
                        <IconPlus size={26} weight="bold" />
                    </button>
              </div>
      </div>

      {/* Main Content - Temporarily Emptied */}
      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-white">
          {/* Content area is currently empty as requested */}
      </div>
    </div>
  );
};

export default SalesScreen;