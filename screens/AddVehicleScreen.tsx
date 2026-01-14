
import React, { useState } from 'react';
import { 
  IconBack, IconCar, IconCalendarBlank, 
  IconCellSignalFull, IconWifiHigh, IconBatteryFull,
  IconChevronDown
} from '../components/Icons';
import { NavigationProps } from '../types';
import { KlettaInput } from '../components/Inputs';

type VehicleType = 'Passenger car' | 'Taxi or van' | 'Motorcycle' | 'Bicycle';
type AcquisitionType = 'Transfer from personal' | 'Transfer from old bookkeeping' | 'New acquisition';

export const AddVehicleScreen: React.FC<NavigationProps> = ({ navigate, goBack }) => {
    const [vehicleType, setVehicleType] = useState<VehicleType>('Passenger car');
    const [acquisitionType, setAcquisitionType] = useState<AcquisitionType>('Transfer from personal');
    const [proportion, setProportion] = useState('< 50%');
    const [taxRate, setTaxRate] = useState('10%');

    return (
        <div className="h-full w-full bg-white flex flex-col font-aktifo animate-fade-in relative overflow-hidden">
            
            {/* Header Section - Flattened to a straight line */}
            <div className="relative w-full h-[140px] shrink-0 bg-kletta-teal mb-10">
                {/* Status Bar */}
                <div className="w-full h-[50px] flex justify-between items-end px-6 pb-2 text-white pointer-events-none z-20">
                    <span className="text-[15px] font-medium ml-2">9:41</span>
                    <div className="flex gap-1.5 items-center mr-1">
                        <IconCellSignalFull size={16} weight="fill" />
                        <IconWifiHigh size={16} weight="bold" />
                        <IconBatteryFull size={24} weight="fill" />
                    </div>
                </div>

                {/* Back Button */}
                <button 
                    onClick={goBack}
                    className="absolute top-14 left-6 z-30 w-10 h-10 flex items-center justify-center text-white"
                >
                    <IconBack size={26} weight="bold" />
                </button>

                {/* Stars Decorative Pattern */}
                <div className="absolute inset-0 z-0 opacity-40">
                    <div className="absolute top-16 left-1/4 w-1 h-1 bg-yellow-300 rounded-full" />
                    <div className="absolute top-20 right-1/3 w-1.5 h-1.5 bg-yellow-400 rotate-45" />
                    <div className="absolute top-24 left-1/2 w-1 h-1 bg-white rounded-full animate-pulse" />
                    <div className="absolute top-12 right-1/4 w-1 h-1 bg-yellow-200 rounded-full" />
                </div>

                {/* Icon in Circle - Positioned to center on the straight bottom edge */}
                <div className="absolute -bottom-[43px] left-1/2 -translate-x-1/2 z-20">
                    <div className="w-[86px] h-[86px] rounded-full bg-white flex items-center justify-center shadow-lg border border-gray-50">
                        <div className="w-[78px] h-[78px] rounded-full border-[3px] border-kletta-teal flex items-center justify-center">
                            <IconCar size={34} weight="fill" className="text-kletta-teal" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto no-scrollbar pt-6 pb-32">
                <div className="px-8 text-center mb-8">
                    <h1 className="text-[26px] font-bold text-kletta-dark mb-2 tracking-tight">Add a vehicle</h1>
                    <p className="text-[15px] text-gray-600 font-light leading-snug">
                        The name helps you distinguish between vehicles. It will not be visible to others.
                    </p>
                </div>

                {/* Vehicle Name Input */}
                <div className="px-8 mb-10">
                    <KlettaInput placeholder="Vehicle name" />
                </div>

                {/* Vehicle Type Section */}
                <div className="px-8 mb-10">
                    <h3 className="text-[16px] font-medium text-kletta-dark mb-6">Vehicle type</h3>
                    <div className="space-y-5">
                        <SimpleRadioItem 
                            label="Passenger car" 
                            active={vehicleType === 'Passenger car'} 
                            onClick={() => setVehicleType('Passenger car')} 
                        />
                        <SimpleRadioItem 
                            label="Taxi or van" 
                            active={vehicleType === 'Taxi or van'} 
                            onClick={() => setVehicleType('Taxi or van')} 
                        />
                        <SimpleRadioItem 
                            label="Motorcycle" 
                            active={vehicleType === 'Motorcycle'} 
                            onClick={() => setVehicleType('Motorcycle')} 
                        />
                        <SimpleRadioItem 
                            label="Bicycle" 
                            active={vehicleType === 'Bicycle'} 
                            onClick={() => setVehicleType('Bicycle')} 
                        />
                    </div>
                </div>

                {/* Proportion Section */}
                <div className="bg-[#F8F9FA] py-8 px-8 mb-10 flex items-center justify-between">
                    <h3 className="text-[16px] font-medium text-kletta-dark">Proportion of business use</h3>
                    <div className="relative">
                        <select 
                            value={proportion}
                            onChange={(e) => setProportion(e.target.value)}
                            className="bg-white border border-gray-200 rounded-[10px] pl-4 pr-10 py-2.5 text-[15px] font-medium text-kletta-dark appearance-none shadow-sm outline-none focus:border-kletta-teal"
                        >
                            <option>&lt; 50%</option>
                            <option>&gt; 50%</option>
                            <option>100%</option>
                        </select>
                        <IconChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" weight="bold" />
                    </div>
                </div>

                {/* Transfer Section */}
                <div className="px-8 mb-10">
                    <h3 className="text-[16px] font-medium text-kletta-dark mb-6 leading-tight">
                        Is this a transfer of personal property to the business name or a new acquisition?
                    </h3>
                    <div className="space-y-4">
                        <CardRadioItem 
                            label="Transfer from personal" 
                            active={acquisitionType === 'Transfer from personal'} 
                            onClick={() => setAcquisitionType('Transfer from personal')} 
                        />
                        <CardRadioItem 
                            label="Transfer from old bookkeeping" 
                            active={acquisitionType === 'Transfer from old bookkeeping'} 
                            onClick={() => setAcquisitionType('Transfer from old bookkeeping')} 
                        />
                        <CardRadioItem 
                            label="New acquisition" 
                            active={acquisitionType === 'New acquisition'} 
                            onClick={() => setAcquisitionType('New acquisition')} 
                        />
                    </div>
                </div>

                {/* Provide relevant information - Conditional based on acquisitionType */}
                <div className="px-8 mb-12">
                    <h3 className="text-[16px] font-medium text-kletta-dark mb-6">Provide relevant information</h3>
                    
                    <div className="space-y-5">
                        {acquisitionType === 'Transfer from personal' && (
                            <>
                                <KlettaInput placeholder="Value start of the year" />
                                <KlettaInput 
                                    placeholder="Transfer date" 
                                    icon={<IconCalendarBlank size={20} className="text-gray-400" />} 
                                    className="flex-row-reverse pr-4" 
                                />
                            </>
                        )}

                        {acquisitionType === 'Transfer from old bookkeeping' && (
                            <>
                                <KlettaInput placeholder="Value in old bookkeeping" />
                                <div className="space-y-5">
                                    <div className="relative">
                                        <div className="w-full h-[60px] bg-white rounded-[12px] border border-[#E6E8EC] px-4 pt-5 pb-1 relative">
                                            <span className="absolute top-2 left-4 text-[11px] text-gray-500 font-medium uppercase tracking-wider">Latest year of oldbooking value</span>
                                            <span className="text-[15px] font-medium text-kletta-dark">2025</span>
                                        </div>
                                        <IconChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1 mt-1 text-gray-500" />
                                    </div>
                                    <div className="relative">
                                        <div className="w-full h-[60px] bg-white rounded-[12px] border border-[#E6E8EC] px-4 pt-5 pb-1 relative">
                                            <span className="absolute top-2 left-4 text-[11px] text-gray-500 font-medium uppercase tracking-wider">Purchase year</span>
                                            <span className="text-[15px] font-medium text-kletta-dark">2025</span>
                                        </div>
                                        <IconChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1 mt-1 text-gray-500" />
                                    </div>
                                </div>
                            </>
                        )}

                        {acquisitionType === 'New acquisition' && (
                            <>
                                <KlettaInput placeholder="Purchase value (excl. VAT)" />
                                <div className="relative">
                                    <div className="w-full h-[60px] bg-white rounded-[12px] border border-[#E6E8EC] px-4 pt-5 pb-1 relative">
                                        <span className="absolute top-2 left-4 text-[11px] text-gray-500 font-medium uppercase tracking-wider">Purchase date</span>
                                        <span className="text-[15px] font-medium text-kletta-dark">2025</span>
                                    </div>
                                    <IconCalendarBlank size={20} className="absolute right-4 top-1/2 -translate-y-1 mt-1 text-gray-400" />
                                </div>

                                {/* Tax Rate Selection Grid */}
                                <div className="pt-4">
                                    <h4 className="text-[15px] font-medium text-kletta-dark text-center mb-6">Choose a tax rate</h4>
                                    
                                    <div className="space-y-3">
                                        {/* Row 1: Equal width rates */}
                                        <div className="grid grid-cols-4 gap-3">
                                            {['0%', '10%', '14%', '24%'].map(rate => (
                                                <button 
                                                    key={rate}
                                                    onClick={() => setTaxRate(rate)}
                                                    className={`h-[44px] rounded-full border flex items-center justify-center text-[13px] font-medium transition-all ${taxRate === rate ? 'bg-kletta-teal text-white border-kletta-teal shadow-sm' : 'bg-white text-kletta-dark border-gray-200'}`}
                                                >
                                                    {rate}
                                                </button>
                                            ))}
                                        </div>

                                        {/* Row 2: Full width */}
                                        <button 
                                            onClick={() => setTaxRate('Construction services - 0%')}
                                            className={`w-full h-[44px] rounded-full border flex items-center justify-center text-[13px] font-medium transition-all ${taxRate === 'Construction services - 0%' ? 'bg-kletta-teal text-white border-kletta-teal' : 'bg-white text-kletta-dark border-gray-200'}`}
                                        >
                                            Construction services - 0%
                                        </button>

                                        {/* Row 3: Pairs */}
                                        <div className="flex gap-3">
                                            <button 
                                                onClick={() => setTaxRate('Exempted from VAT')}
                                                className={`flex-1 h-[44px] rounded-full border flex items-center justify-center text-[13px] font-medium transition-all ${taxRate === 'Exempted from VAT' ? 'bg-kletta-teal text-white border-kletta-teal' : 'bg-white text-kletta-dark border-gray-200'}`}
                                            >
                                                Exempted from VAT
                                            </button>
                                            <button 
                                                onClick={() => setTaxRate('Goods EU - 0%')}
                                                className={`flex-1 h-[44px] rounded-full border flex items-center justify-center text-[13px] font-medium transition-all ${taxRate === 'Goods EU - 0%' ? 'bg-kletta-teal text-white border-kletta-teal' : 'bg-white text-kletta-dark border-gray-200'}`}
                                            >
                                                Goods EU - 0%
                                            </button>
                                        </div>

                                        {/* Row 4: Pairs */}
                                        <div className="flex gap-3">
                                            <button 
                                                onClick={() => setTaxRate('Goods outside EU - 0%')}
                                                className={`flex-1 h-[44px] rounded-full border flex items-center justify-center text-[13px] font-medium transition-all ${taxRate === 'Goods outside EU - 0%' ? 'bg-kletta-teal text-white border-kletta-teal' : 'bg-white text-kletta-dark border-gray-200'}`}
                                            >
                                                Goods outside EU - 0%
                                            </button>
                                            <button 
                                                onClick={() => setTaxRate('Services EU - 0%')}
                                                className={`flex-1 h-[44px] rounded-full border flex items-center justify-center text-[13px] font-medium transition-all ${taxRate === 'Services EU - 0%' ? 'bg-kletta-teal text-white border-kletta-teal' : 'bg-white text-kletta-dark border-gray-200'}`}
                                            >
                                                Services EU - 0%
                                            </button>
                                        </div>

                                        {/* Row 5: Mixed width */}
                                        <div className="flex gap-3">
                                            <button 
                                                onClick={() => setTaxRate('Services outside EU - 0%')}
                                                className={`flex-[2.5] h-[44px] rounded-full border flex items-center justify-center text-[13px] font-medium transition-all ${taxRate === 'Services outside EU - 0%' ? 'bg-kletta-teal text-white border-kletta-teal' : 'bg-white text-kletta-dark border-gray-200'}`}
                                            >
                                                Services outside EU - 0%
                                            </button>
                                            <button 
                                                onClick={() => setTaxRate('25.5%')}
                                                className={`flex-1 h-[44px] rounded-full border flex items-center justify-center text-[13px] font-medium transition-all ${taxRate === '25.5%' ? 'bg-kletta-teal text-white border-kletta-teal' : 'bg-white text-kletta-dark border-gray-200'}`}
                                            >
                                                25.5%
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* Sticky Save Button */}
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-white border-t border-gray-50 z-30">
                <button 
                    onClick={() => navigate('invoice-success', { type: 'vehicle' })}
                    className="w-full h-[60px] bg-kletta-yellow rounded-[16px] text-kletta-dark font-bold text-[17px] active:scale-[0.98] transition-all shadow-sm"
                >
                    Save
                </button>
            </div>
        </div>
    );
};

// --- Helper Components ---

const SimpleRadioItem = ({ label, active, onClick }: { label: string, active: boolean, onClick: () => void }) => (
    <button onClick={onClick} className="flex items-center gap-4 w-full group">
        <div className={`w-[26px] h-[26px] rounded-full border-[2px] flex items-center justify-center shrink-0 transition-colors ${active ? 'border-[#005c66]' : 'border-kletta-dark'}`}>
            {active && <div className="w-[14px] h-[14px] bg-[#005c66] rounded-full" />}
        </div>
        <span className={`text-[16px] font-normal ${active ? 'text-kletta-dark font-medium' : 'text-gray-600'}`}>
            {label}
        </span>
    </button>
);

const CardRadioItem = ({ label, active, onClick }: { label: string, active: boolean, onClick: () => void }) => (
    <button 
        onClick={onClick} 
        className={`w-full p-5 rounded-[14px] border-[1.5px] transition-all flex items-center gap-4 text-left ${active ? 'border-kletta-teal bg-[#F0FBFC] shadow-sm' : 'border-gray-200 bg-white hover:border-gray-300'}`}
    >
        <div className={`w-[26px] h-[26px] rounded-full border-[2px] flex items-center justify-center shrink-0 transition-colors ${active ? 'border-[#005c66]' : 'border-kletta-dark'}`}>
            {active && <div className="w-[14px] h-[14px] bg-[#005c66] rounded-full" />}
        </div>
        <span className={`text-[15px] font-medium ${active ? 'text-kletta-dark' : 'text-kletta-dark/80'}`}>
            {label}
        </span>
    </button>
);
