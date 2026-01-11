
import React, { useState, useEffect } from 'react';
import { 
  IconBack, IconPlus, IconTag, IconBriefcase, IconCamera, IconUpload,
  IconChevronRight, IconChevronDown, IconCheckCircle, IconClose,
  IconCellSignalFull, IconWifiHigh, IconBatteryFull, IconCheck, IconSparkle
} from '../components/Icons';
import { NavigationProps, ScreenName } from '../types';
import { KlettaInput, KlettaSelect } from '../components/Inputs';

// --- SHARED HEADER ---
const ProductFlowHeader = ({ title, goBack, white = false }: { title: string, goBack: () => void, white?: boolean }) => (
    <div className={`${white ? 'bg-white' : 'bg-kletta-teal'} w-full z-20 shrink-0`}>
        <div className={`w-full h-[50px] flex justify-between items-end px-6 pb-2 ${white ? 'text-kletta-dark' : 'text-white'} pointer-events-none`}>
            <span className="text-[15px] font-medium ml-2">9:41</span>
            <div className="flex gap-1.5 items-center mr-1">
                <IconCellSignalFull size={16} weight="fill" />
                <IconWifiHigh size={16} weight="bold" />
                <IconBatteryFull size={24} weight="fill" />
            </div>
        </div>
        <div className="pt-2 pb-2 px-6 flex items-center gap-4">
            <button onClick={goBack} className={`w-10 h-10 -ml-2 rounded-full flex items-center justify-center hover:bg-black/5 active:scale-95 transition-all ${white ? 'text-kletta-dark' : 'text-white'}`}>
                <IconBack size={26} weight="bold" />
            </button>
            {title && <h1 className={`text-[17px] font-medium tracking-wide ${white ? 'text-kletta-dark' : 'text-white'}`}>{title}</h1>}
        </div>
    </div>
);

// --- STEP 1: SELECT TYPE (NOW A BOTTOM SHEET) ---
export const ProductTypeSelectionSheet = ({ 
    onClose, 
    onSelect 
}: { 
    onClose: () => void, 
    onSelect: (type: 'Product' | 'Service') => void 
}) => {
    return (
        <div className="absolute inset-0 z-[100] flex flex-col justify-end">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px] animate-fade-in" onClick={onClose} />

            {/* Sheet Content */}
            <div className="w-full bg-white z-10 animate-slide-up shadow-[0_-8px_40px_rgba(0,0,0,0.12)] rounded-t-[32px] overflow-hidden flex flex-col max-h-[90%] pb-12">
                {/* Drag Handle */}
                <div className="w-10 h-1 bg-gray-200 rounded-full mx-auto mt-3 mb-2" />
                
                <div className="px-6 pt-6 pb-4 flex items-center justify-between">
                    <h2 className="text-[20px] font-medium text-kletta-dark tracking-tight leading-tight">What do you want to add?</h2>
                    <button onClick={onClose} className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors text-kletta-dark">
                        <IconClose size={20} weight="regular" />
                    </button>
                </div>

                <div className="px-6 space-y-2 mt-4">
                    <div className="divide-y divide-gray-100 border-t border-gray-100">
                        <TypeButton 
                            title="Product" 
                            desc="Physical item or inventory" 
                            icon={<IconTag size={24} weight="regular" />} 
                            onClick={() => onSelect('Product')} 
                        />
                        
                        <TypeButton 
                            title="Service" 
                            desc="Work or time-based service" 
                            icon={<IconBriefcase size={24} weight="regular" />} 
                            onClick={() => onSelect('Service')} 
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

// Kept for type safety and App routing compatibility, though triggered as sheet from Home
export const ProductSelectTypeScreen: React.FC<NavigationProps> = ({ navigate, goBack }) => {
    return (
        <div className="h-full w-full bg-white flex flex-col font-aktifo animate-fade-in relative overflow-hidden">
            <ProductFlowHeader title="" goBack={goBack} white />
            <div className="flex-1 px-6 pt-8 space-y-2">
                <h2 className="text-[28px] font-medium text-kletta-dark tracking-tight leading-tight mb-10">What do you want to add?</h2>
                <div className="divide-y divide-gray-50 border-t border-gray-50">
                    <TypeButton 
                        title="Product" 
                        desc="Physical item or inventory" 
                        icon={<IconTag size={24} weight="regular" />} 
                        onClick={() => navigate('product-add-details', { type: 'Product' })} 
                    />
                    <TypeButton 
                        title="Service" 
                        desc="Work or time-based service" 
                        icon={<IconBriefcase size={24} weight="regular" />} 
                        onClick={() => navigate('product-add-details', { type: 'Service' })} 
                    />
                </div>
            </div>
        </div>
    );
};

const TypeButton = ({ title, desc, icon, onClick }: any) => (
    <button 
        onClick={onClick}
        className="w-full py-6 flex items-center gap-5 text-left active:bg-gray-50/50 transition-all group px-2 -mx-2"
    >
        <div className="w-10 h-10 flex items-center justify-center text-kletta-dark group-hover:text-kletta-teal transition-colors">
            {icon}
        </div>
        <div className="flex-1">
            <h3 className="text-[17px] font-medium text-kletta-dark mb-0.5">{title}</h3>
            <p className="text-[14px] text-gray-500 font-light">{desc}</p>
        </div>
        <IconChevronRight size={18} className="text-gray-500" weight="bold" />
    </button>
);

// --- STEP 2: ADD DETAILS ---
export const ProductAddDetailsScreen: React.FC<NavigationProps> = ({ navigate, goBack, params }) => {
    const itemType = params?.type || 'product';
    const [name, setName] = useState('Customer work');
    const [priceExcl, setPriceExcl] = useState('100.00');
    const [priceIncl, setPriceIncl] = useState('100.00');
    const [vat, setVat] = useState(0);
    const [pricingType, setPricingType] = useState('Fixed');

    useEffect(() => {
        const val = parseFloat(priceExcl) || 0;
        const total = val * (1 + vat / 100);
        setPriceIncl(total.toFixed(2));
    }, [priceExcl, vat]);

    const handlePriceInclChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setPriceIncl(val);
        const numeric = parseFloat(val) || 0;
        const excl = numeric / (1 + vat / 100);
        setPriceExcl(excl.toFixed(2));
    };

    return (
        <div className="h-full w-full bg-white flex flex-col font-aktifo animate-fade-in relative overflow-hidden">
            <ProductFlowHeader title="" goBack={goBack} white />
            
            <div className="flex-1 overflow-y-auto px-6 pt-2 pb-32">
                <h1 className="text-[28px] font-medium text-kletta-dark tracking-tight mb-8">Add new {itemType.toLowerCase()}</h1>
                
                <div className="space-y-10">
                    {/* Name Section */}
                    <div>
                        <h2 className="text-[18px] font-medium text-kletta-dark mb-4">What would you like to call it?</h2>
                        <KlettaInput 
                            label="NAME" 
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="e.g. Design Consulting" 
                        />
                        <p className="text-[13px] text-gray-400 font-light mt-2 ml-1">Max 50 characters</p>
                    </div>

                    {/* Price Section */}
                    <div>
                        <h2 className="text-[18px] font-medium text-kletta-dark mb-4">Enter the price</h2>
                        
                        <div className="space-y-6">
                            <KlettaInput 
                                label="AMOUNT EXCL. VAT (€)" 
                                type="number"
                                value={priceExcl}
                                onChange={(e) => setPriceExcl(e.target.value)}
                            />

                            <KlettaSelect label="SELECT TAX RATE" value={vat} onChange={(e) => setVat(Number(e.target.value))}>
                                <option value={0}>0%</option>
                                <option value={10}>10%</option>
                                <option value={14}>14%</option>
                                <option value={24}>24%</option>
                                <option value={25.5}>25.5%</option>
                            </KlettaSelect>

                            <KlettaInput 
                                label="AMOUNT INCL. VAT (€)" 
                                type="number"
                                value={priceIncl}
                                onChange={handlePriceInclChange}
                            />

                            <div className="flex gap-3 pt-2">
                                <PricingToggle active={pricingType === 'Fixed'} label="Fixed" onClick={() => setPricingType('Fixed')} />
                                <PricingToggle active={pricingType === '/Hour'} label="/Hour" onClick={() => setPricingType('/Hour')} />
                                <PricingToggle active={pricingType === '/Day'} label="/Day" onClick={() => setPricingType('/Day')} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-6 bg-white border-t border-gray-50">
                <button 
                    onClick={() => navigate('product-cover-art', { itemType, name, priceExcl, vat })}
                    className="w-full h-[60px] bg-kletta-yellow rounded-[16px] text-kletta-dark font-bold text-[16px] active:scale-[0.98] transition-all shadow-sm"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

const PricingToggle = ({ active, label, onClick }: any) => (
    <button 
        onClick={onClick}
        className={`h-[44px] px-6 rounded-full border transition-all text-[14px] font-medium ${active ? 'bg-kletta-teal text-white border-kletta-teal shadow-sm' : 'bg-white text-kletta-dark border-gray-200'}`}
    >
        {label}
    </button>
);

// --- STEP 3: COVER ART ---
export const ProductCoverArtScreen: React.FC<NavigationProps> = ({ navigate, goBack, params }) => {
    return (
        <div className="h-full w-full bg-white flex flex-col font-aktifo animate-fade-in relative overflow-hidden">
            <ProductFlowHeader title="" goBack={goBack} white />
            
            <div className="flex-1 flex flex-col items-center pt-12 px-10 text-center">
                <div className="w-48 h-48 bg-gray-50 border-2 border-dashed border-gray-200 rounded-[32px] flex items-center justify-center text-gray-300 mb-8">
                    <IconPlus size={48} weight="bold" />
                </div>
                
                <h2 className="text-[20px] font-medium text-kletta-dark tracking-tight mb-3">Add a cover image</h2>
                <p className="text-[14px] text-gray-500 font-light leading-relaxed mb-10">
                    This will help you recognize the item later. You can skip this and add it later.
                </p>

                <div className="grid grid-cols-2 gap-4 w-full max-w-[320px]">
                    <ArtActionBtn icon={<IconCamera size={24} weight="bold" />} label="Take photo" />
                    <ArtActionBtn icon={<IconUpload size={24} weight="bold" />} label="Upload" />
                </div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-6 bg-white flex flex-col gap-3">
                <button 
                    onClick={() => navigate('product-success', { itemType: params?.itemType })}
                    className="w-full h-[56px] bg-kletta-yellow rounded-[16px] text-kletta-dark font-bold text-[16px] shadow-sm active:scale-[0.98] transition-all"
                >
                    Continue
                </button>
                <button 
                    onClick={() => navigate('product-success', { itemType: params?.itemType })}
                    className="w-full py-4 text-kletta-dark font-medium text-[16px]"
                >
                    Skip for now
                </button>
            </div>
        </div>
    );
};

const ArtActionBtn = ({ icon, label }: any) => (
    <button className="flex flex-col items-center justify-center p-5 bg-white border border-gray-100 rounded-[12px] shadow-sm active:bg-gray-50 transition-colors gap-3">
        <div className="text-kletta-teal">{icon}</div>
        <span className="text-[13px] font-medium text-kletta-dark">{label}</span>
    </button>
);

// --- STEP 4: SUCCESS ---
export const ProductSuccessScreen: React.FC<NavigationProps> = ({ navigate, params }) => {
    const isService = params?.itemType === 'Service';
    const title = isService ? 'Service added!' : 'Product added!';
    
    return (
        <div className="h-full w-full bg-white flex flex-col font-aktifo animate-fade-in relative overflow-hidden items-center justify-center p-8">
             
             <div className="bg-[#00343B] w-[120px] h-[120px] rounded-full flex items-center justify-center relative mb-10 shadow-xl">
                 <IconCheck size={60} weight="bold" className="text-white" />
                 <IconSparkle size={24} weight="fill" className="text-kletta-yellow absolute top-2 right-4 animate-pulse" />
                 <IconSparkle size={16} weight="fill" className="text-kletta-yellow absolute bottom-4 left-2 animate-bounce" />
             </div>

             <h1 className="text-[24px] font-medium text-kletta-dark text-center mb-4 leading-tight">{title}</h1>
             
             <p className="text-[16px] text-gray-500 font-light text-center leading-relaxed max-w-[280px] mb-12">
                Your new {isService ? 'service' : 'product'} has been saved to your inventory.
             </p>

             {/* Feedback Card */}
             <div className="w-full bg-[#FAFAFA] rounded-[20px] p-5 flex items-center gap-4 border border-gray-100 mb-20">
                 <div className="w-12 h-12 bg-kletta-yellow rounded-full flex items-center justify-center text-2xl shadow-sm">
                     😉
                 </div>
                 <div className="flex-1">
                     <p className="text-[14px] font-medium text-kletta-dark mb-0.5">Are you loving your experience with us so far?</p>
                     <button className="text-[12px] font-medium text-kletta-teal underline">Give us a rating</button>
                 </div>
             </div>

             <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col gap-3">
                 <button 
                    onClick={() => navigate('home')}
                    className="w-full py-4 bg-kletta-yellow rounded-[14px] font-medium text-[16px] text-kletta-dark shadow-sm hover:shadow-md active:scale-[0.98] transition-all"
                 >
                    Done
                 </button>
                 <button 
                    onClick={() => navigate('home')}
                    className="w-full py-4 text-[15px] font-medium text-kletta-dark active:opacity-60 transition-opacity"
                 >
                    Add another
                 </button>
             </div>
        </div>
    );
};
