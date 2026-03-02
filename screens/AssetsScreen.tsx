
import React, { useState, useEffect } from 'react';
import { 
  IconCellSignalFull, IconWifiHigh, IconBatteryFull, 
  IconPlus, IconCar, IconBike, IconChevronDown,
  IconMotorcycle, IconTaxi, IconVan
} from '../components/Icons';
import { ScreenName } from '../types';

interface AssetsScreenProps {
  navigate: (screen: ScreenName, params?: any) => void;
  onModalToggle?: (open: boolean) => void;
}

const AssetsScreen: React.FC<AssetsScreenProps> = ({ navigate, onModalToggle }) => {
  const [activeTab, setActiveTab] = useState<'vehicles' | 'assets'>('vehicles');
  const [showSoldModal, setShowSoldModal] = useState(false);
  const [selectedVehicleName, setSelectedVehicleName] = useState('');

  // Sync modal state with parent to hide tab bar
  useEffect(() => {
    if (onModalToggle) {
      onModalToggle(showSoldModal);
    }
  }, [showSoldModal, onModalToggle]);

  const handleMarkAsSold = (name: string) => {
    setSelectedVehicleName(name);
    setShowSoldModal(true);
  };

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
                  <h1 className="text-[20px] font-bold text-kletta-dark tracking-tight">Assets</h1>
                  <button 
                    onClick={() => navigate('add-vehicle')}
                    className="absolute right-0 w-10 h-10 flex items-center justify-center rounded-full text-kletta-dark hover:bg-gray-100 transition-colors"
                  >
                    <IconPlus size={28} weight="regular" />
                  </button>
              </div>
              <div className="flex justify-center mt-1">
                  <button className="flex items-center gap-1 text-kletta-dark hover:opacity-70 transition-opacity">
                      <span className="text-[16px] font-medium">All assets</span>
                      <IconChevronDown size={14} weight="bold" />
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
      <div className="flex-1 overflow-y-auto no-scrollbar pb-32 pt-2 bg-white">
         
         <div className="space-y-0">
            <VehicleRow 
               icon={<IconMotorcycle size={28} weight="duotone" />}
               name="Cadillac"
               type="Motorcycle"
               usage="> 50% business use"
               value="€60,000"
               onMarkAsSold={() => handleMarkAsSold('Cadillac')}
            />
            <VehicleRow 
               icon={<IconCar size={28} weight="duotone" />}
               name="Audi"
               type="Car"
               usage="< 50% business use"
               value="€45,000"
               onMarkAsSold={() => handleMarkAsSold('Audi')}
            />
            <VehicleRow 
               icon={<IconBike size={28} weight="duotone" />}
               name="Honda"
               type="Bicycle"
               usage="> 50% business use"
               value="€55,000"
               onMarkAsSold={() => handleMarkAsSold('Honda')}
            />
             <VehicleRow 
               icon={<IconVan size={28} weight="duotone" />}
               name="Ford"
               type="Taxi or van"
               usage="< 50% business use"
               value="€0.00"
               onMarkAsSold={() => handleMarkAsSold('Ford')}
            />
            <VehicleRow 
               icon={<IconCar size={28} weight="duotone" />}
               name="Cadillac"
               type="Car"
               usage="> 50% business use"
               value="€60,000"
               onMarkAsSold={() => handleMarkAsSold('Cadillac')}
            />
            <VehicleRow 
               icon={<IconCar size={28} weight="duotone" />}
               name="Volkswagen"
               type="Car"
               usage="> 50% business use"
               value="€30,000"
               onMarkAsSold={() => handleMarkAsSold('Volkswagen')}
            />
         </div>
      </div>

      {/* Mark as sold or broken Modal */}
      {showSoldModal && (
        <div className="absolute inset-0 z-[100] flex items-center justify-center p-6 animate-fade-in overflow-hidden">
            <div className="absolute inset-0 bg-black/80" onClick={() => setShowSoldModal(false)} />
            <div className="bg-white w-full max-w-[340px] rounded-[18px] p-7 relative z-10 animate-slide-up shadow-2xl text-center">
                <h3 className="text-[19px] font-bold text-kletta-dark mb-4 tracking-tight leading-none">Mark as sold or broken</h3>
                <p className="text-[14px] text-kletta-dark font-light mb-8 leading-relaxed px-2">
                    Are you sure you want to mark <span className="font-medium">{selectedVehicleName}</span> as sold or broken?
                </p>

                <div className="text-left w-full mb-2">
                    <label className="text-[14px] font-normal text-kletta-dark">Sold value or insurance compensation</label>
                </div>
                
                <div className="w-full bg-[#F5F5F5] rounded-[12px] py-6 flex items-center justify-center mb-8">
                    <span className="text-[32px] font-bold text-kletta-dark">€313.80</span>
                </div>

                <div className="flex gap-4">
                    <button 
                        onClick={() => setShowSoldModal(false)}
                        className="flex-1 h-[52px] bg-white border border-gray-200 rounded-[12px] font-bold text-[16px] text-kletta-dark active:scale-[0.98] transition-all"
                    >
                        No
                    </button>
                    <button 
                        onClick={() => setShowSoldModal(false)}
                        className="flex-1 h-[52px] bg-kletta-yellow rounded-[12px] font-bold text-[16px] text-kletta-dark active:scale-[0.98] transition-all shadow-sm"
                    >
                        Yes
                    </button>
                </div>
            </div>
        </div>
      )}
    </div>
  );
};

const VehicleRow = ({ icon, name, type, usage, value, onMarkAsSold }: any) => (
   <div className="w-full px-6 py-5 flex items-start gap-4 border-b border-gray-100 hover:bg-gray-50 transition-colors group">
      <div className="mt-0.5 text-kletta-teal shrink-0">
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
         <button 
            onClick={onMarkAsSold}
            className="text-[12px] font-medium text-[#C03500] hover:underline opacity-80 hover:opacity-100 transition-opacity"
         >
            Mark as sold or broken
         </button>
      </div>
   </div>
);

export default AssetsScreen;
