
import React, { useState, useEffect } from 'react';
import { 
  IconBack, IconPlus, IconTag, IconBriefcase, IconCamera, IconUpload,
  IconChevronRight, IconChevronDown, IconCheckCircle, IconClose,
  IconCellSignalFull, IconWifiHigh, IconBatteryFull, IconCheck, IconSparkle
} from '../components/Icons';
import { NavigationProps, ScreenName } from '../types';

// --- SHARED UI COMPONENTS ---

const StepIndicator = ({ current, total = 5 }: { current: number; total?: number }) => {
  return (
    <div className="flex flex-col gap-1.5 w-6">
      {Array.from({ length: total }).map((_, i) => (
        <div 
          key={i} 
          className={`h-[1px] w-full transition-all duration-300 ${i < current ? 'bg-kletta-teal opacity-100 w-full' : 'bg-gray-200 opacity-40 w-3/4'}`}
        />
      ))}
    </div>
  );
};

// Fix: Made children optional to resolve TS prop missing errors in JSX usage
const ProductFlowLayout = ({ 
  step, 
  title, 
  headerValue, 
  goBack, 
  children 
}: { 
  step: number; 
  title: string; 
  headerValue?: string; 
  goBack: () => void; 
  children?: React.ReactNode 
}) => {
  return (
    <div className="h-full w-full bg-white flex flex-col font-aktifo animate-fade-in relative overflow-hidden">
      {/* Header Row */}
      <div className="pt-14 px-6 flex items-center justify-between z-20">
        <button onClick={goBack} className="w-10 h-10 -ml-2 rounded-full flex items-center justify-center hover:bg-gray-50 active:scale-95 transition-all text-kletta-dark">
          <IconBack size={26} weight="bold" />
        </button>
        {headerValue && (
          <div className="bg-gray-100 rounded-full px-4 py-1.5 shadow-sm border border-gray-100">
             <span className="text-[13px] font-medium text-gray-500">{headerValue}</span>
          </div>
        )}
      </div>

      <div className="flex-1 flex pt-20 px-6">
        {/* Left Side: Step Indicator */}
        <div className="w-10 shrink-0 pt-2">
           <p className="text-[12px] font-medium text-gray-300 mb-4">{step} / 5</p>
           <StepIndicator current={step} />
        </div>

        {/* Right Side: Content Area */}
        <div className="flex-1 pl-4 pb-20">
          <h1 className="text-[24px] font-bold text-kletta-dark leading-tight tracking-tight mb-12">
            {title}
          </h1>
          {children}
        </div>
      </div>
    </div>
  );
};

const CircleCheckBtn = ({ onClick, disabled = false }: { onClick: () => void; disabled?: boolean }) => (
  <button 
    onClick={onClick}
    disabled={disabled}
    className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all active:scale-90 ${disabled ? 'bg-gray-100 text-gray-300' : 'bg-kletta-teal text-white'}`}
  >
    <IconCheck size={28} weight="bold" />
  </button>
);

// --- PRODUCT TYPE SELECTION SHEET ---
export const ProductTypeSelectionSheet = ({ onClose, onSelect }: { onClose: () => void, onSelect: (type: 'Product' | 'Service') => void }) => {
  return (
    <div className="absolute inset-0 z-[100] flex flex-col justify-end">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in" onClick={onClose} />
      <div className="w-full bg-white z-10 animate-slide-up shadow-[0_-8px_40px_rgba(0,0,0,0.12)] rounded-t-[32px] overflow-hidden flex flex-col pb-12">
        <div className="px-6 pt-10 pb-4 flex items-center justify-between">
          <h2 className="text-[19px] font-bold text-kletta-dark tracking-tight">What would you like to add?</h2>
          <button onClick={onClose} className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-50 active:bg-gray-100 transition-colors">
            <IconClose size={26} weight="bold" className="text-gray-400" />
          </button>
        </div>
        <div className="px-6 space-y-3">
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
  );
};

export const ProductSelectTypeScreen: React.FC<NavigationProps> = ({ navigate, goBack }) => {
    return (
        <div className="h-full w-full bg-white flex flex-col font-aktifo animate-fade-in relative overflow-hidden">
            <div className="pt-14 px-6 flex items-center z-20">
              <button onClick={goBack} className="w-10 h-10 -ml-2 rounded-full flex items-center justify-center hover:bg-gray-50 text-kletta-dark">
                <IconBack size={26} weight="bold" />
              </button>
            </div>
            <div className="flex-1 px-8 pt-12 space-y-2">
                <h2 className="text-[28px] font-bold text-kletta-dark tracking-tight leading-tight mb-10">What do you want to add?</h2>
                <div className="divide-y divide-gray-50 border-t border-gray-50">
                    <TypeButton 
                        title="Product" 
                        desc="Physical item or inventory" 
                        icon={<IconTag size={24} weight="regular" />} 
                        onClick={() => navigate('product-step-name', { type: 'Product' })} 
                    />
                    <TypeButton 
                        title="Service" 
                        desc="Work or time-based service" 
                        icon={<IconBriefcase size={24} weight="regular" />} 
                        onClick={() => navigate('product-step-name', { type: 'Service' })} 
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
            <h3 className="text-[16px] font-medium text-kletta-dark mb-0.5">{title}</h3>
            <p className="text-[14px] text-gray-500 font-light">{desc}</p>
        </div>
        <IconChevronRight size={18} className="text-gray-500" weight="bold" />
    </button>
);

// Step 1: Name
export const ProductStepName: React.FC<NavigationProps> = ({ navigate, goBack, params }) => {
  const [name, setName] = useState(params?.name || '');
  
  const handleNext = () => {
    if (!name.trim()) return;
    navigate('product-step-tax', { ...params, name });
  };

  return (
    <ProductFlowLayout 
      step={1} 
      title="Now, let's add a name and a price. What would you like to call it?" 
      goBack={goBack}
    >
      <div className="relative mt-20">
        <input 
          autoFocus
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Eg: Customer work"
          className="w-full bg-transparent border-b border-gray-200 py-4 text-[24px] font-medium text-kletta-dark placeholder:text-gray-200 outline-none focus:border-kletta-teal transition-colors"
        />
        <p className="text-[12px] text-gray-400 mt-2 text-right">max. 50 characters</p>
        
        <div className="absolute right-0 -bottom-24">
          <CircleCheckBtn onClick={handleNext} disabled={!name.trim()} />
        </div>
      </div>
    </ProductFlowLayout>
  );
};

// Step 2: Tax Rate
export const ProductStepTax: React.FC<NavigationProps> = ({ navigate, goBack, params }) => {
  const rates = [
    { label: '0%', value: 0 },
    { label: '10%', value: 10 },
    { label: '14%', value: 14 },
    { label: '24%', value: 24 },
    { label: '25,5%', value: 25.5 },
  ];

  const handleSelect = (rate: number, label: string) => {
    navigate('product-step-price', { ...params, vat: rate, vatLabel: label });
  };

  return (
    <ProductFlowLayout 
      step={2} 
      title="Select tax rate" 
      headerValue={params?.name}
      goBack={goBack}
    >
      <div className="flex flex-col items-end gap-3 mt-10">
        {rates.map((r) => (
          <button 
            key={r.label}
            onClick={() => handleSelect(r.value, r.label)}
            className="px-6 py-2.5 rounded-xl border border-gray-100 bg-white text-[15px] font-medium text-kletta-dark shadow-sm hover:bg-gray-50 active:scale-95 transition-all"
          >
            {r.label}
          </button>
        ))}
        <button 
          onClick={() => handleSelect(0, 'Exempted from VAT')}
          className="px-6 py-2.5 rounded-xl border border-gray-100 bg-white text-[15px] font-medium text-kletta-dark shadow-sm active:scale-95 transition-all"
        >
          Exempted from VAT
        </button>
        <button 
          onClick={() => handleSelect(0, 'Construction services - 0%')}
          className="px-6 py-2.5 rounded-xl border border-gray-100 bg-white text-[14px] font-medium text-kletta-dark shadow-sm active:scale-95 transition-all text-right leading-tight max-w-[240px]"
        >
          Construction services and scrap metal - 0%
        </button>
      </div>
    </ProductFlowLayout>
  );
};

// Step 3: Pricing
export const ProductStepPrice: React.FC<NavigationProps> = ({ navigate, goBack, params }) => {
  const [priceExcl, setPriceExcl] = useState('');
  const [priceIncl, setPriceIncl] = useState('');
  const [unit, setUnit] = useState('Fixed');
  const vat = params?.vat || 0;

  const handleExclChange = (val: string) => {
    setPriceExcl(val);
    const num = parseFloat(val) || 0;
    setPriceIncl((num * (1 + vat / 100)).toFixed(2));
  };

  const handleInclChange = (val: string) => {
    setPriceIncl(val);
    const num = parseFloat(val) || 0;
    setPriceExcl((num / (1 + vat / 100)).toFixed(2));
  };

  const handleNext = () => {
    navigate('product-step-art', { ...params, priceExcl, priceIncl, unit });
  };

  return (
    <ProductFlowLayout 
      step={3} 
      title="Choose the pricing (provide price and unit)" 
      headerValue={params?.vatLabel}
      goBack={goBack}
    >
      <div className="space-y-12 mt-10 relative">
        <div className="space-y-10">
          <div className="relative">
            <span className="absolute left-0 top-1.5 text-[20px] text-gray-300">€</span>
            <input 
              autoFocus
              type="number"
              value={priceIncl}
              onChange={(e) => handleInclChange(e.target.value)}
              placeholder="Enter amount incl. VAT"
              className="w-full bg-transparent border-b border-gray-200 py-2 pl-6 text-[20px] font-medium text-kletta-dark placeholder:text-gray-200 outline-none focus:border-kletta-teal"
            />
          </div>
          
          <div className="relative">
            <span className="absolute left-0 top-1.5 text-[20px] text-gray-300">€</span>
            <input 
              type="number"
              value={priceExcl}
              onChange={(e) => handleExclChange(e.target.value)}
              placeholder="Enter amount excl. VAT"
              className="w-full bg-transparent border-b border-gray-200 py-2 pl-6 text-[20px] font-medium text-kletta-dark placeholder:text-gray-200 outline-none focus:border-kletta-teal"
            />
          </div>
        </div>

        <div className="flex gap-2">
          {['Fixed', '/Hour', '/Day'].map(u => (
            <button 
              key={u}
              onClick={() => setUnit(u)}
              className={`px-6 py-2.5 rounded-xl border transition-all text-[14px] font-medium ${unit === u ? 'bg-kletta-teal text-white border-kletta-teal' : 'bg-white text-gray-500 border-gray-200'}`}
            >
              {u}
            </button>
          ))}
        </div>

        <div className="absolute right-0 -bottom-24">
          <CircleCheckBtn onClick={handleNext} disabled={!priceIncl} />
        </div>
      </div>
    </ProductFlowLayout>
  );
};

// Step 4: Cover Art
export const ProductStepArt: React.FC<NavigationProps> = ({ navigate, goBack, params }) => {
  const headerValue = `€${params?.priceIncl}${params?.unit !== 'Fixed' ? params?.unit : ''}`;

  const handleFinish = () => {
    navigate('product-success', params);
  };

  return (
    <ProductFlowLayout 
      step={4} 
      title="Assign a piece of cover art to go" 
      headerValue={headerValue}
      goBack={goBack}
    >
      <div className="flex flex-col items-end gap-6 mt-32">
        <button 
          onClick={handleFinish}
          className="text-[15px] font-medium text-kletta-dark hover:text-kletta-teal transition-colors"
        >
          Pick a cover art
        </button>
        <button 
          onClick={handleFinish}
          className="text-[15px] font-medium text-kletta-dark hover:text-kletta-teal transition-colors"
        >
          Search from Unsplash
        </button>
        <button 
          onClick={handleFinish}
          className="text-[15px] font-medium text-gray-500 hover:text-kletta-dark transition-colors"
        >
          Skip - I don't want to use image
        </button>
      </div>
    </ProductFlowLayout>
  );
};

// Step 5: Success
export const ProductSuccessScreen: React.FC<NavigationProps> = ({ navigate, params }) => {
    const isService = params?.type === 'Service';
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
                    onClick={() => navigate('product-select-type')}
                    className="w-full py-4 text-[15px] font-medium text-kletta-dark active:opacity-60 transition-opacity"
                 >
                    Add another
                 </button>
             </div>
        </div>
    );
};
