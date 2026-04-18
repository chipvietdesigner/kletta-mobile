
import React, { useState, useEffect } from 'react';
import { 
  IconCellSignalFull, IconWifiHigh, IconBatteryFull, 
  IconPlus, IconCar, IconBike, IconChevronDown,
  IconMotorcycle, IconTaxi, IconVan, IconSparkle, IconTrash,
  IconSearch
} from '../components/Icons';
import { ScreenName } from '../types';

interface AssetsScreenProps {
  navigate: (screen: ScreenName, params?: any) => void;
  onModalToggle?: (open: boolean) => void;
}

const AssetsScreen: React.FC<AssetsScreenProps> = ({ navigate }) => {
  const [activeTab, setActiveTab] = useState<'vehicles' | 'assets'>('vehicles');

  const VEHICLE_DATA = [
    { name: "KIA", type: "Car", usage: "Over 50%", value: "€60,000" },
    { name: "Cadillac", type: "Car", usage: "Under 50%", value: "€45,000" },
    { name: "Jee", type: "Car", usage: "Under 50%", value: "€52,000" },
    { name: "Audi", type: "Car", usage: "Under 50%", value: "€38,500" },
    { name: "Tesla Model 3", type: "Electric", usage: "100% business", value: "€45,000" },
    { name: "Volvo XC90", type: "SUV", usage: "40% business", value: "€75,000" },
    { name: "MKV-740", type: "Car", usage: "Over 50%", value: "€0" },
    { name: "BMW X5", type: "SUV", usage: "60% business", value: "€82,000" },
    { name: "Mercedes C-Class", type: "Sedan", usage: "30% business", value: "€55,000" },
  ];

  const ASSET_DATA = [
    { name: "MacBook Pro", type: "Electronics", usage: "100% business", value: "€2,400" },
    { name: "Office Desk", type: "Furniture", usage: "100% business", value: "€450" },
    { name: "iPhone 15", type: "Electronics", usage: "80% business", value: "€1,100" },
    { name: "iPad Pro", type: "Electronics", usage: "90% business", value: "€1,200" },
    { name: "Standing Desk", type: "Furniture", usage: "100% business", value: "€600" },
    { name: "Dell Monitor", type: "Electronics", usage: "100% business", value: "€350" },
    { name: "Herman Miller Chair", type: "Furniture", usage: "100% business", value: "€1,500" },
  ];

  const currentData = activeTab === 'vehicles' ? VEHICLE_DATA : ASSET_DATA;

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
                  <h1 className="text-[24px] font-bold text-kletta-dark tracking-tight">Vehicles and assets</h1>
                  <div className="flex items-center gap-2">
                      <button className="w-10 h-10 flex items-center justify-center rounded-full text-kletta-dark hover:bg-gray-100 transition-colors">
                        <IconSearch size={24} weight="regular" />
                      </button>
                      <button 
                        onClick={() => navigate('add-vehicle')}
                        className="w-10 h-10 flex items-center justify-center rounded-full text-kletta-dark hover:bg-gray-100 transition-colors"
                      >
                        <IconPlus size={28} weight="regular" />
                      </button>
                  </div>
              </div>
              <div className="flex mt-1">
                  <button 
                    className="flex items-center gap-1 text-kletta-dark hover:opacity-70 transition-opacity"
                  >
                      <span className="text-[16px] font-medium">All time</span>
                      <IconChevronDown size={14} weight="bold" />
                  </button>
              </div>
          </div>

          {/* Segmented Control - Pill Style */}
          <div className="px-6 py-2">
              <div className="bg-[#F2F2F2] p-0.5 rounded-[10px] flex w-full h-[32px]">
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
      <div className="flex-1 overflow-y-auto no-scrollbar pb-32 bg-white">
         
         <div className="flex flex-col">
            {currentData.map((item, index) => (
              <VehicleRow 
                key={index}
                name={item.name}
                type={item.type}
                usage={item.usage}
                value={item.value}
                isAsset={activeTab === 'assets'}
                onDelete={() => {}}
              />
            ))}
         </div>
      </div>
    </div>
  );
};

const VehicleRow = ({ name, type, usage, value, isAsset }: any) => (
   <div className="w-full px-6 py-4 flex items-start justify-between border-b border-gray-100 bg-white hover:bg-gray-50 transition-colors">
      <div className="flex-1 min-w-0">
         <div className="flex items-center gap-2 mb-0.5">
            <span className="text-[14px] font-semibold text-kletta-dark truncate">{name}</span>
         </div>
         <p className="text-[13px] text-gray-500 font-normal">
           {type} • {usage}
         </p>
      </div>
      <div className="flex flex-col items-end gap-1.5">
         <span className="text-[16px] font-semibold text-kletta-dark leading-none">{value}</span>
         <div className="px-3 h-[24px] bg-[#F2F2F2] rounded-[12px] flex items-center justify-center">
             <span className="text-[11px] font-semibold text-kletta-dark">{isAsset ? 'Asset' : 'Vehicle'}</span>
         </div>
      </div>
   </div>
);

export default AssetsScreen;
