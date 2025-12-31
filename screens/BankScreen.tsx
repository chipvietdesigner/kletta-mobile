
import React from 'react';
import { 
  IconCellSignalFull, IconWifiHigh, IconBatteryFull, 
  IconBank, IconSparkle
} from '../components/Icons';

const BankScreen: React.FC = () => {
  return (
    <div className="h-full w-full bg-white flex flex-col font-aktifo animate-fade-in relative overflow-hidden">
      
      {/* Status Bar */}
      <div className="w-full h-[50px] flex justify-between items-end px-6 pb-2 text-kletta-dark pointer-events-none z-20 bg-white">
          <span className="text-[15px] font-medium tracking-normal leading-none ml-2">9:41</span>
          <div className="flex gap-1.5 items-center mr-1">
             <IconCellSignalFull size={16} weight="fill" />
             <IconWifiHigh size={16} weight="bold" />
             <IconBatteryFull size={24} weight="fill" className="rotate-0" />
          </div>
      </div>

      {/* Centered Coming Soon Content */}
      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
          <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center text-kletta-teal mb-6 shadow-sm border border-gray-100">
             <IconBank size={40} weight="fill" />
          </div>
          
          <h1 className="text-[26px] font-medium text-kletta-dark tracking-tight mb-2">Coming soon</h1>
          <p className="text-[15px] text-kletta-secondary font-light max-w-[240px] leading-relaxed">
             We are working hard to bring seamless banking integration to your fingertips.
          </p>

          <div className="mt-10 flex items-center gap-2 px-4 py-2 bg-kletta-yellow/10 rounded-full border border-kletta-yellow/20">
             <IconSparkle size={16} className="text-kletta-yellow" weight="fill" />
             <span className="text-[12px] font-medium text-kletta-teal uppercase tracking-widest">Early access</span>
          </div>
      </div>
    </div>
  );
};

export default BankScreen;
