import React, { useState } from 'react';
import { 
  IconCellSignalFull, IconWifiHigh, IconBatteryFull, 
  IconPlus, IconCar, IconBike, IconChevronDown
} from '../components/Icons';

const AssetsScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'vehicles' | 'assets'>('vehicles');

  return (
    <div className="h-full w-full bg-white flex flex-col font-aktifo animate-fade-in relative overflow-hidden">
      
      {/* Dark Teal Header - Consistent Layout */}
      <div className="bg-kletta-teal w-full pb-6 pt-0 flex flex-col relative z-10 shadow-sm">
          
          {/* Status Bar */}
          <div className="w-full h-[50px] flex justify-between items-end px-6 pb-2 text-white pointer-events-none">
              <span className="text-[15px] font-medium tracking-normal leading-none ml-2">9:41</span>
              <div className="flex gap-1.5 items-center mr-1">
                 <IconCellSignalFull size={16} weight="fill" />
                 <IconWifiHigh size={16} weight="bold" />
                 <IconBatteryFull size={24} weight="fill" className="rotate-0" />
              </div>
          </div>

          {/* Header Content */}
          <div className="px-6 pt-2 flex flex-col">
              {/* Title Row */}
              <div className="flex justify-between items-center mb-6">
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

              {/* Segmented Control - Dark Transparent Track */}
              <div className="w-full h-[38px] bg-white/10 p-0.5 rounded-full flex relative backdrop-blur-sm">
                  <button 
                    onClick={() => setActiveTab('vehicles')}
                    className={`flex-1 rounded-full text-[13px] font-medium transition-all z-10 duration-200 ${activeTab === 'vehicles' ? 'bg-white text-kletta-dark shadow-sm' : 'text-white/70 hover:bg-white/5 hover:text-white'}`}
                  >
                    Vehicles
                  </button>
                  <button 
                    onClick={() => setActiveTab('assets')}
                    className={`flex-1 rounded-full text-[13px] font-medium transition-all z-10 duration-200 ${activeTab === 'assets' ? 'bg-white text-kletta-dark shadow-sm' : 'text-white/70 hover:bg-white/5 hover:text-white'}`}
                  >
                    Assets
                  </button>
              </div>
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
      <div className="mt-1 text-gray-400 opacity-60">
         {icon}
      </div>
      <div className="flex-1">
         <h3 className="text-[15px] font-bold text-kletta-dark mb-0.5">{name}</h3>
         <div className="flex flex-wrap items-center gap-1 text-[13px] font-light text-gray-500 mb-1.5">
            <span>{type}</span>
            <span className="w-0.5 h-0.5 rounded-full bg-gray-300"></span>
            <span>{usage}</span>
            <span className="w-0.5 h-0.5 rounded-full bg-gray-300"></span>
            <span className="text-gray-700 font-normal">{value}</span>
         </div>
         <button className="text-[12px] font-medium text-[#C03500] hover:underline opacity-80 hover:opacity-100 transition-opacity">
            Mark as sold or broken
         </button>
      </div>
   </div>
);

export default AssetsScreen;