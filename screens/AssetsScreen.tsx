import React, { useState } from 'react';
import { 
  IconCellSignalFull, IconWifiHigh, IconBatteryFull, 
  IconPlus, IconCar, IconBike, IconChevronDown
} from '../components/Icons';

const AssetsScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'vehicles' | 'assets'>('vehicles');

  return (
    <div className="h-full w-full bg-white flex flex-col font-aktifo animate-fade-in relative overflow-hidden">
      
      {/* Header Container - Fixed at Top */}
      <div className="w-full z-20 shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col shrink-0 bg-white">
          
          {/* Dark Header Part */}
          <div className="bg-kletta-teal w-full pb-5 pt-0">
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
              <div className="px-6 pt-2">
                  <div className="flex justify-between items-center">
                     <div className="flex flex-col">
                         <h1 className="text-[26px] font-medium text-white tracking-tight mb-0.5">Assets</h1>
                         <div className="flex items-center gap-1 opacity-70 text-white transition-opacity hover:opacity-100 cursor-pointer">
                             <span className="text-[13px] font-medium">All assets</span>
                             <IconChevronDown size={12} weight="bold" />
                         </div>
                     </div>
                     <button className="w-10 h-10 -mr-2 flex items-center justify-center rounded-full text-white hover:bg-white/10 transition-colors">
                        <IconPlus size={24} weight="regular" />
                     </button>
                  </div>
              </div>
          </div>

          {/* Light Tabs Part - Sticky below Header */}
          <div className="bg-white w-full grid grid-cols-2 border-b border-gray-100">
              <button 
                onClick={() => setActiveTab('vehicles')}
                className={`py-4 text-[15px] font-medium transition-colors relative w-full text-center ${activeTab === 'vehicles' ? 'text-kletta-dark' : 'text-kletta-secondary hover:text-gray-600'}`}
              >
                Vehicles
                {activeTab === 'vehicles' && (
                    <div className="absolute bottom-0 left-0 w-full h-[3px] bg-kletta-dark rounded-t-sm animate-fade-in"></div>
                )}
              </button>
              <button 
                onClick={() => setActiveTab('assets')}
                className={`py-4 text-[15px] font-medium transition-colors relative w-full text-center ${activeTab === 'assets' ? 'text-kletta-dark' : 'text-kletta-secondary hover:text-gray-600'}`}
              >
                Assets
                {activeTab === 'assets' && (
                    <div className="absolute bottom-0 left-0 w-full h-[3px] bg-kletta-dark rounded-t-sm animate-fade-in"></div>
                )}
              </button>
          </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto no-scrollbar pb-32 pt-0 bg-white">
         
         <div className="space-y-0">
            <VehicleRow 
               icon={<IconCar size={20} />}
               name="Cadillac"
               type="Motorcycle"
               usage="> 50% business use"
               value="€60,000"
            />
            <VehicleRow 
               icon={<IconCar size={20} />}
               name="Audi"
               type="Car"
               usage="< 50% business use"
               value="€45,000"
            />
            <VehicleRow 
               icon={<IconBike size={20} />}
               name="Honda"
               type="Bicycle"
               usage="> 50% business use"
               value="€55,000"
            />
             <VehicleRow 
               icon={<IconCar size={20} />}
               name="Ford"
               type="Taxi or van"
               usage="< 50% business use"
               value="€0.00"
            />
            <VehicleRow 
               icon={<IconCar size={20} />}
               name="Cadillac"
               type="Car"
               usage="> 50% business use"
               value="€60,000"
            />
            <VehicleRow 
               icon={<IconCar size={20} />}
               name="Volkswagen"
               type="Car"
               usage="> 50% business use"
               value="€30,000"
            />
         </div>

      </div>
    </div>
  );
};

const VehicleRow = ({ icon, name, type, usage, value }: any) => (
   <div className="w-full px-6 py-5 flex items-start gap-4 border-b border-gray-100 hover:bg-gray-50 transition-colors group">
      <div className="mt-1 text-kletta-secondary opacity-60">
         {icon}
      </div>
      <div className="flex-1">
         <h3 className="text-[15px] font-medium text-kletta-dark mb-0.5">{name}</h3>
         <div className="flex flex-wrap items-center gap-1 text-[13px] font-light text-kletta-secondary mb-1.5">
            <span>{type}</span>
            <span className="w-0.5 h-0.5 rounded-full bg-gray-300"></span>
            <span>{usage}</span>
            <span className="w-0.5 h-0.5 rounded-full bg-gray-300"></span>
            <span className="text-kletta-dark font-normal">{value}</span>
         </div>
         <button className="text-[12px] font-medium text-[#C03500] hover:underline opacity-80 hover:opacity-100 transition-opacity">
            Mark as sold or broken
         </button>
      </div>
   </div>
);

export default AssetsScreen;