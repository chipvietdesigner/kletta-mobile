
import React, { useState, useEffect } from 'react';
import { 
  IconCellSignalFull, IconWifiHigh, IconBatteryFull, 
  IconPlus, IconCar, IconBike, IconChevronDown,
  IconMotorcycle, IconTaxi, IconVan, IconTrash
} from '../components/Icons';
import { ScreenName } from '../types';

interface AssetsScreenProps {
  navigate: (screen: ScreenName, params?: any) => void;
  onModalToggle?: (open: boolean) => void;
}

const AssetsScreen: React.FC<AssetsScreenProps> = ({ navigate }) => {
  const [activeTab, setActiveTab] = useState<'vehicles' | 'assets'>('vehicles');

  const VEHICLE_DATA = [
    { name: "KIA", type: "Car", usage: "Over 50%", value: "€60,000.00" },
    { name: "Cadillac", type: "Car", usage: "Under 50%", value: "€45,000.00" },
    { name: "Jee", type: "Car", usage: "Under 50%", value: "€52,000.00" },
    { name: "Audi", type: "Car", usage: "Under 50%", value: "€38,500.00" },
    { name: "MKV-740", type: "Car", usage: "Over 50%", value: "€0.00" },
  ];

  const ASSET_DATA = [
    { name: "MacBook Pro", type: "Electronics", usage: "100% business", value: "€2,400.00" },
    { name: "Office Desk", type: "Furniture", usage: "100% business", value: "€450.00" },
    { name: "iPhone 15", type: "Electronics", usage: "80% business", value: "€1,100.00" },
  ];

  const currentData = activeTab === 'vehicles' ? VEHICLE_DATA : ASSET_DATA;

  return (
    <div className="h-full w-full bg-[#FAF8F5] flex flex-col font-aktifo animate-fade-in relative overflow-hidden">
      
      {/* Header Container - Fixed at Top */}
      <div className="w-full z-20 flex flex-col shrink-0 bg-[#FAF8F5]">
          
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
              <div className="flex justify-center items-center relative">
                  <h1 className="text-[20px] font-bold text-kletta-dark tracking-tight">Vehicles and assets</h1>
                  <button 
                    onClick={() => navigate('add-vehicle')}
                    className="absolute right-0 w-10 h-10 flex items-center justify-center rounded-full text-kletta-dark hover:bg-gray-100 transition-colors"
                  >
                    <IconPlus size={28} weight="regular" />
                  </button>
              </div>
          </div>

          {/* Segmented Control - Pill Style */}
          <div className="px-6 py-2">
              <div className="bg-[#F1F0E8] p-0.5 rounded-[10px] flex w-full h-[32px]">
                  <button 
                    onClick={() => setActiveTab('vehicles')}
                    className={`flex-1 h-full rounded-[8px] text-[13px] transition-all flex items-center justify-center ${activeTab === 'vehicles' ? 'bg-white text-[#0C0D0D] font-medium shadow-sm' : 'text-[#0C0D0D] font-normal hover:opacity-70'}`}
                  >
                    Vehicles
                  </button>
                  <button 
                    onClick={() => setActiveTab('assets')}
                    className={`flex-1 h-full rounded-[8px] text-[13px] transition-all flex items-center justify-center ${activeTab === 'assets' ? 'bg-white text-[#0C0D0D] font-medium shadow-sm' : 'text-[#0C0D0D] font-normal hover:opacity-70'}`}
                  >
                    Assets
                  </button>
              </div>
          </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto no-scrollbar pb-32 pt-4 bg-[#FAF8F5]">
         
         <div className="space-y-1">
            {currentData.map((item, index) => (
              <VehicleRow 
                key={index}
                name={item.name}
                type={item.type}
                usage={item.usage}
                value={item.value}
                onDelete={() => {}}
              />
            ))}
         </div>
      </div>
    </div>
  );
};

const VehicleRow = ({ name, type, usage, value, onDelete }: any) => (
   <div className="mx-6 mb-6 bg-white rounded-[16px] p-5 border border-[#F1F0E8] shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] transition-all group active:scale-[0.98]">
      <div className="flex justify-between items-start mb-3">
         <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#F1F0E8] flex items-center justify-center text-kletta-teal shadow-inner">
               {type === 'Car' ? <IconCar size={24} weight="bold" /> : 
                type === 'Motorcycle' ? <IconMotorcycle size={24} weight="bold" /> :
                <IconVan size={24} weight="bold" />}
            </div>
            <div>
               <h3 className="text-[18px] font-bold text-kletta-dark tracking-tight leading-tight">{name}</h3>
               <p className="text-[14px] text-kletta-secondary font-medium mt-0.5">{type}</p>
            </div>
         </div>
         <button 
            onClick={onDelete}
            className="w-10 h-10 flex items-center justify-center text-[#E58B8B] hover:bg-red-50 rounded-full transition-colors active:scale-90"
         >
            <IconTrash size={22} weight="regular" />
         </button>
      </div>
      
      <div className="grid grid-cols-2 gap-3">
         <div className="bg-[#FAF8F5] rounded-[12px] p-3 border border-[#F1F0E8]/50 flex flex-col justify-center">
            <p className="text-[10px] text-kletta-secondary uppercase tracking-[0.1em] font-bold mb-1 opacity-50">Business Use</p>
            <p className="text-[16px] text-kletta-dark font-bold tracking-tight leading-none">{usage}</p>
         </div>
         <div className="bg-[#FAF8F5] rounded-[12px] p-3 border border-[#F1F0E8]/50 flex flex-col justify-center">
            <p className="text-[10px] text-kletta-secondary uppercase tracking-[0.1em] font-bold mb-1 opacity-50">Value</p>
            <p className="text-[16px] text-kletta-dark font-bold tracking-tight leading-none">{value || '€0.00'}</p>
         </div>
      </div>
   </div>
);

export default AssetsScreen;
