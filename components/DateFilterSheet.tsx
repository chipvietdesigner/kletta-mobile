
import React, { useState } from 'react';
import { IconClose, IconChevronDown, IconArrowRight } from './Icons';

interface DateFilterSheetProps {
  onClose: () => void;
  onApply: (range: string) => void;
  currentValue?: string;
}

const PRESETS = [
  "1 week",
  "4 weeks",
  "Last month",
  "1 year",
  "Month to date",
  "Quarter to date",
  "Year to date",
  "All time"
];

const TAX_YEARS = [
  { label: "This tax year", range: "01.01.2026 – 31.12.2026" },
  { label: "Last tax year", range: "01.01.2025 – 31.12.2025" }
];

const DateFilterSheet: React.FC<DateFilterSheetProps> = ({ onClose, onApply, currentValue = "All time" }) => {
  const [selectedPreset, setSelectedPreset] = useState<string | null>(currentValue);
  const [startDate, setStartDate] = useState("07.01.2025");
  const [endDate, setEndDate] = useState("07.01.2026");

  const handlePresetSelect = (preset: string) => {
    setSelectedPreset(preset);
  };

  const handleApply = () => {
    if (selectedPreset) {
      onApply(selectedPreset);
    } else {
      onApply(`${startDate} – ${endDate}`);
    }
    onClose();
  };

  return (
    <div className="absolute inset-0 z-[100] flex flex-col justify-end">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px] animate-fade-in" onClick={onClose} />

      {/* Sheet Content */}
      <div className="w-full bg-white z-10 animate-slide-up shadow-[0_-8px_40px_rgba(0,0,0,0.12)] rounded-t-[32px] overflow-hidden flex flex-col max-h-[92%] pb-12">
        
        {/* Header - More Padding */}
        <div className="px-7 pt-10 pb-6">
          <h2 className="text-[16px] font-medium text-kletta-dark tracking-tight">Select dates or choose time span</h2>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto no-scrollbar px-7">
          
          {/* Custom Date Range Row - Refined and More Padding */}
          <div className="flex items-center gap-2 mb-8">
            <div 
              className="flex-1 bg-[#F2F4F7] rounded-[12px] px-4 py-4 flex items-center justify-between cursor-pointer active:bg-gray-200 transition-colors shadow-sm"
              onClick={() => setSelectedPreset(null)}
            >
              <span className="text-[14px] font-normal text-kletta-dark">{startDate}</span>
              <IconChevronDown size={16} weight="bold" className="text-gray-400" />
            </div>
            
            <div className="shrink-0">
               <IconArrowRight size={18} weight="bold" className="text-kletta-dark opacity-60" />
            </div>

            <div 
              className="flex-1 bg-[#F2F4F7] rounded-[12px] px-4 py-4 flex items-center justify-between cursor-pointer active:bg-gray-200 transition-colors shadow-sm"
              onClick={() => setSelectedPreset(null)}
            >
              <span className="text-[14px] font-normal text-kletta-dark">{endDate}</span>
              <IconChevronDown size={16} weight="bold" className="text-gray-400" />
            </div>
          </div>

          {/* Presets List - Larger vertical padding for each item */}
          <div className="space-y-0">
            {PRESETS.map((p) => (
              <button 
                key={p}
                onClick={() => handlePresetSelect(p)}
                className="w-full py-3 flex items-center justify-between border-b border-gray-100/50 text-left active:bg-gray-50 transition-colors group"
              >
                <span className={`text-[14px] tracking-tight ${selectedPreset === p ? 'font-bold text-kletta-teal' : 'font-normal text-kletta-dark'}`}>
                  {p}
                </span>
              </button>
            ))}
          </div>

          {/* Tax Years */}
          <div className="mt-0">
            {TAX_YEARS.map((ty) => (
              <button 
                key={ty.label}
                onClick={() => handlePresetSelect(ty.label)}
                className="w-full py-3 flex items-center justify-between border-b border-gray-100/50 text-left active:bg-gray-50 transition-colors"
              >
                <span className={`text-[14px] tracking-tight ${selectedPreset === ty.label ? 'font-bold text-kletta-teal' : 'font-medium text-kletta-dark'}`}>
                  {ty.label}
                </span>
                <span className="text-[13px] text-gray-500 font-light pr-1">{ty.range}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Primary Action Button - More breathing space at bottom */}
        <div className="px-7 pt-8 bg-white">
          <button 
            onClick={handleApply}
            className="w-full h-[52px] bg-kletta-yellow rounded-[16px] text-kletta-dark font-semibold text-[16px] shadow-sm active:scale-[0.98] transition-all"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};

export default DateFilterSheet;
