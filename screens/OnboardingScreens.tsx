import React, { useState } from 'react';
import { NavigationProps } from '../types';
import { 
  IconChevronDown, 
  IconShield, 
  IconFile, 
  IconUpload, 
  IconCamera, 
  IconPhone, 
  IconGift, 
  IconCar, 
  IconCheck, 
  IconBike,
  IconInfo
} from '../components/Icons';

// --- Shared Layout with Custom Header ---
interface OnboardingLayoutProps extends React.PropsWithChildren {
    title: string;
    subtitle?: string;
    icon: React.ReactNode;
    onPrimary: () => void;
    onSecondary: () => void;
    primaryLabel?: string;
    secondaryLabel?: string;
    disablePrimary?: boolean;
}

const OnboardingHeader = ({ icon }: { icon: React.ReactNode }) => {
    // Header Logic:
    // Full width teal background.
    // Height approx 180px.
    // Rounded bottom corners (40px).
    // Icon overlaps bottom edge (half in, half out).
    
    return (
        <div className="relative w-full shrink-0 z-20 bg-white">
            {/* Teal background with rounded bottom corners */}
            <div className="bg-kletta-teal w-full h-[180px] rounded-b-[40px] pt-14 flex items-start justify-center shadow-sm">
                {/* Optional: Add a subtle texture or keep plain teal */}
            </div>

            {/* Icon Wrapper: Absolute positioned to overlap */}
            {/* Bottom position = - half of icon size (72px / 2 = 36px) */}
            <div className="absolute bottom-[-36px] left-0 right-0 flex justify-center items-center pointer-events-none">
                <div className="w-[72px] h-[72px] rounded-full bg-white flex items-center justify-center border-[4px] border-kletta-teal shadow-md z-20">
                    {/* The icon itself. We clone it to force the teal color since it sits on white. */}
                    {React.cloneElement(icon as React.ReactElement<any>, { 
                        color: '#00343B', 
                        size: 32 
                    })}
                </div>
            </div>
        </div>
    );
};

const OnboardingLayout: React.FC<OnboardingLayoutProps> = ({ 
    title, subtitle, icon, children, onPrimary, onSecondary, 
    primaryLabel = "Continue", secondaryLabel = "Remind me later", disablePrimary = false 
}) => {
    return (
        <div className="h-full w-full bg-white flex flex-col font-aktifo relative animate-fade-in overflow-hidden">
            {/* Custom Header */}
            <OnboardingHeader icon={icon} />

            {/* Scrollable Content Body */}
            {/* Padding Top = Icon Half Size (36) + Spacing (24) = 60px */}
            <div className="flex-1 overflow-y-auto no-scrollbar px-6 pt-[60px] pb-40 bg-white">
                <h1 className="text-[26px] font-bold text-kletta-dark text-center mb-4 leading-tight">{title}</h1>
                {subtitle && (
                    <p className="text-center text-gray-500 font-medium text-[15px] leading-relaxed mb-8 max-w-[320px] mx-auto">
                        {subtitle}
                    </p>
                )}
                
                {/* Main Content Injection */}
                <div className="w-full">
                    {children}
                </div>
            </div>

            {/* Fixed Bottom Action Area */}
            <div className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm px-6 pt-4 pb-10 border-t border-gray-50 z-30">
               <button 
                 onClick={onPrimary}
                 disabled={disablePrimary}
                 className={`w-full py-4 rounded-2xl font-bold text-lg shadow-sm transition-all active:scale-[0.98] ${disablePrimary ? 'bg-gray-100 text-gray-400' : 'bg-kletta-yellow text-kletta-dark hover:shadow-md'}`}
               >
                 {primaryLabel}
               </button>
               <button 
                 onClick={onSecondary}
                 className="w-full py-3 mt-2 text-gray-400 font-bold text-sm hover:text-kletta-dark transition-colors"
               >
                 {secondaryLabel}
               </button>
            </div>
        </div>
    );
};

// --- Step 1: Authorization ---
export const OnboardingStep1: React.FC<NavigationProps> = ({ navigate }) => {
    const [expanded, setExpanded] = useState(false);

    return (
        <OnboardingLayout
            title="Tax return authorizations"
            icon={<IconShield />}
            primaryLabel="Proceed to authorize"
            onPrimary={() => navigate('onboarding-2')}
            onSecondary={() => navigate('onboarding-2')}
        >
            <div className="flex flex-col items-center">
                <p className="text-gray-500 text-[15px] font-medium leading-relaxed text-center mb-6">
                    We need Suomi.fi authorizations in order to handle your tax matters.
                </p>
                
                <button 
                   onClick={() => setExpanded(!expanded)}
                   className="flex items-center gap-2 text-kletta-teal font-bold mb-6 hover:opacity-80 transition-opacity bg-teal-50 px-5 py-2.5 rounded-full"
                >
                   Read more <IconChevronDown size={16} className={`transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`} />
                </button>
                
                {expanded && (
                    <div className="bg-gray-50 p-5 rounded-2xl text-left text-sm text-gray-600 leading-relaxed mb-4 animate-slide-up border border-gray-100 w-full">
                        <p>Kletta uses the Suomi.fi authorization service to submit your tax returns directly to the Tax Administration. This ensures your data is handled securely and correctly.</p>
                    </div>
                )}
            </div>
        </OnboardingLayout>
    );
};

// --- Step 2: Tax Info ---
export const OnboardingStep2: React.FC<NavigationProps> = ({ navigate }) => {
    return (
        <OnboardingLayout
            title="Add your tax information"
            subtitle="Support will verify your Business ID (Y-tunnus) and tax period. After verification, tax reports will be sent automatically."
            icon={<IconFile />}
            onPrimary={() => navigate('onboarding-3')}
            onSecondary={() => navigate('onboarding-3')}
        >
            <div className="space-y-6 mb-8">
                <InputGroup label="Business ID" placeholder="1234567-8" />
                <InputGroup label="Company Name" placeholder="Company ABC" />
                
                <div>
                   <label className="text-xs font-bold text-kletta-dark uppercase tracking-wider ml-1 mb-2 block">VAT Period</label>
                   <div className="relative">
                      <select className="w-full p-4 bg-gray-50 rounded-2xl border border-gray-200 font-bold text-kletta-dark outline-none focus:border-kletta-teal focus:bg-white transition-all appearance-none text-[15px]">
                         <option>No VAT liability</option>
                         <option>Monthly</option>
                         <option>Quarterly</option>
                         <option>Yearly</option>
                      </select>
                      <IconChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
                   </div>
                </div>
            </div>

            <div className="bg-teal-50 border border-teal-100 p-5 rounded-2xl flex gap-3.5 items-start">
                <IconInfo size={20} className="text-kletta-teal flex-shrink-0 mt-0.5" />
                <p className="text-[13px] text-gray-600 leading-relaxed font-medium">
                    These details cannot be changed later. Information such as the VAT period can only be updated through support.
                </p>
            </div>
        </OnboardingLayout>
    );
};

// --- Step 3: Bookkeeping ---
export const OnboardingStep3: React.FC<NavigationProps> = ({ navigate }) => {
    const [selected, setSelected] = useState<number | null>(null);

    return (
        <OnboardingLayout
            title="Opening bookkeeping"
            subtitle="How would you like to import this season’s bookkeeping?"
            icon={<IconFile />}
            onPrimary={() => navigate('onboarding-4')}
            onSecondary={() => navigate('onboarding-4')}
            disablePrimary={selected === null}
        >
            <div className="space-y-4">
               <SelectionCard 
                  icon={<IconUpload size={24} />} 
                  title="Upload statement" 
                  desc="Kletta will automatically read the necessary data."
                  selected={selected === 1}
                  onClick={() => setSelected(1)}
               />
               <SelectionCard 
                  icon={<IconCamera size={24} />} 
                  title="Take a photo" 
                  desc="Kletta will automatically read the necessary data."
                  selected={selected === 2}
                  onClick={() => setSelected(2)}
               />
               <SelectionCard 
                  icon={<IconFile size={24} />} 
                  title="Enter manually" 
                  desc="Note! We still need a photo of your income statement."
                  selected={selected === 3}
                  onClick={() => setSelected(3)}
               />
            </div>
        </OnboardingLayout>
    );
};

// --- Step 4: Tax Return Details ---
export const OnboardingStep4: React.FC<NavigationProps> = ({ navigate }) => {
    return (
        <OnboardingLayout
            title="Confirm your tax return details"
            subtitle="Which is the first tax return you want Kletta to submit?"
            icon={<IconFile />}
            primaryLabel="Confirm and continue"
            onPrimary={() => navigate('onboarding-5')}
            onSecondary={() => navigate('onboarding-5')}
        >
            <div className="mb-8">
                <label className="text-xs font-bold text-kletta-dark uppercase tracking-wider ml-1 mb-2 block">Select Period</label>
                <div className="relative">
                    <select className="w-full p-4 bg-gray-50 rounded-2xl border border-gray-200 font-bold text-[15px] text-kletta-dark outline-none focus:border-kletta-teal focus:bg-white transition-all appearance-none">
                        <option>2025</option>
                        <option>Quarter I, 2025</option>
                        <option>Quarter II, 2025</option>
                    </select>
                    <IconChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" size={20} />
                </div>
            </div>

            <div className="bg-orange-50 border border-orange-100 p-4 rounded-2xl text-orange-800 text-sm font-bold text-center">
                Please note that you cannot change this selection later.
            </div>
        </OnboardingLayout>
    );
};

// --- Step 5: Phone Number ---
export const OnboardingStep5: React.FC<NavigationProps> = ({ navigate }) => {
    return (
        <OnboardingLayout
            title="Phone number"
            subtitle="Add your phone number. You will receive a verification code via SMS."
            icon={<IconPhone />}
            onPrimary={() => navigate('onboarding-6')}
            onSecondary={() => navigate('onboarding-6')}
        >
            <div className="flex gap-3">
                <div className="relative w-28 shrink-0">
                    <select className="w-full h-[56px] pl-4 bg-gray-50 rounded-2xl border border-gray-200 font-bold text-[15px] text-kletta-dark outline-none appearance-none focus:border-kletta-teal">
                        <option>+358</option>
                        <option>+46</option>
                        <option>+1</option>
                    </select>
                     <IconChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" size={16} />
                </div>
                <input 
                    type="tel" 
                    placeholder="40 123 4567" 
                    className="flex-1 h-[56px] px-4 bg-gray-50 rounded-2xl border border-gray-200 font-bold text-[15px] text-kletta-dark outline-none focus:border-kletta-teal focus:bg-white transition-all placeholder:text-gray-300"
                />
            </div>
        </OnboardingLayout>
    );
};

// --- Step 6: YEL Insurance ---
export const OnboardingStep6: React.FC<NavigationProps> = ({ navigate }) => {
    return (
        <OnboardingLayout
            title="YEL insurance"
            icon={<IconGift />}
            primaryLabel="Confirm and continue"
            onPrimary={() => navigate('onboarding-7')}
            onSecondary={() => navigate('onboarding-7')}
        >
             <div className="space-y-5 mb-8 text-gray-600 font-medium text-[15px] leading-relaxed">
                <p>An entrepreneur must take YEL insurance when:</p>
                <ul className="list-none space-y-3">
                    <li className="flex gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-kletta-teal mt-2 shrink-0"></div>
                        <span>Your entrepreneurial income is over €767/month.</span>
                    </li>
                    <li className="flex gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-kletta-teal mt-2 shrink-0"></div>
                        <span>You operate as an entrepreneur continuously for at least four months.</span>
                    </li>
                </ul>
             </div>

             <div className="bg-[#FFF9E6] border border-kletta-yellow rounded-2xl p-6 text-center shadow-[0_4px_20px_rgba(255,217,59,0.15)]">
                <h3 className="font-bold text-lg text-kletta-dark mb-2">Make use of your benefit now!</h3>
                <p className="text-[13px] text-gray-700 leading-relaxed opacity-80">
                    When you take YEL insurance with Ilmarinen, you will receive one free month of Kletta. The value of your benefit is €29–69.
                </p>
             </div>
        </OnboardingLayout>
    );
};

// --- Step 7: Vehicle Use ---
export const OnboardingStep7: React.FC<NavigationProps> = ({ navigate }) => {
    const [selected, setSelected] = useState<number | null>(null);

    const handleContinue = () => {
        if (selected === 1 || selected === 2) {
            navigate('onboarding-8');
        } else {
            navigate('home');
        }
    };

    return (
        <OnboardingLayout
            title="Vehicle for work use"
            subtitle="Do you own a vehicle that you use for work purposes?"
            icon={<IconCar />}
            onPrimary={handleContinue}
            onSecondary={() => navigate('home')}
            disablePrimary={selected === null}
        >
            <div className="space-y-4">
                <SelectionCard 
                    icon={<IconCar size={24} />} 
                    title="I own a car (> 50% work)" 
                    desc="Car is a business asset, expenses deductible."
                    selected={selected === 1}
                    onClick={() => setSelected(1)}
                />
                <SelectionCard 
                    icon={<IconCar size={24} />} 
                    title="I own a car (< 50% work)" 
                    desc="Not a business asset, mileage deductible."
                    selected={selected === 2}
                    onClick={() => setSelected(2)}
                />
                <SelectionCard 
                    icon={<IconBike size={24} />} 
                    title="I don’t have a car for work" 
                    desc="You can add this later."
                    selected={selected === 3}
                    onClick={() => setSelected(3)}
                />
            </div>
        </OnboardingLayout>
    );
};

// --- Step 8: Add Vehicle ---
export const OnboardingStep8: React.FC<NavigationProps> = ({ navigate }) => {
    return (
        <OnboardingLayout
            title="Add a vehicle"
            subtitle="The name helps you distinguish between vehicles. It will not be visible to others."
            icon={<IconCar />}
            primaryLabel="Confirm and continue"
            onPrimary={() => navigate('home')}
            onSecondary={() => navigate('home')}
        >
            <div className="space-y-8">
                <InputGroup label="Vehicle Name" placeholder="e.g. Van or ABC-123" />

                <div>
                    <label className="text-xs font-bold text-kletta-dark uppercase tracking-wider ml-1 mb-2 block">Vehicle Type</label>
                    <div className="flex flex-wrap gap-2">
                        <ChipOption label="Passenger car" active />
                        <ChipOption label="Van / Taxi" />
                        <ChipOption label="Motorcycle" />
                    </div>
                </div>

                <div>
                    <label className="text-xs font-bold text-kletta-dark uppercase tracking-wider ml-1 mb-2 block">Business Use</label>
                    <div className="relative">
                         <select className="w-full p-4 bg-gray-50 rounded-2xl border border-gray-200 font-medium text-kletta-dark outline-none appearance-none focus:border-kletta-teal">
                             <option>Less than 50%</option>
                             <option>More than 50%</option>
                             <option>100%</option>
                          </select>
                          <IconChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" size={20} />
                    </div>
                </div>
                
                 <div>
                    <label className="text-xs font-bold text-kletta-dark uppercase tracking-wider ml-1 mb-2 block">Acquisition Type</label>
                    <div className="space-y-3">
                        <RadioOption label="Transfer from personal ownership" active />
                        <RadioOption label="Transfer from previous bookkeeping" />
                        <RadioOption label="New acquisition" />
                    </div>
                </div>
            </div>
        </OnboardingLayout>
    );
};

// --- Helper Components ---

const InputGroup = ({ label, placeholder }: { label: string, placeholder: string }) => (
    <div>
       <label className="text-xs font-bold text-kletta-dark uppercase tracking-wider ml-1 mb-2 block">{label}</label>
       <input 
           type="text" 
           placeholder={placeholder} 
           className="w-full p-4 bg-gray-50 rounded-2xl border border-gray-200 font-bold text-[15px] text-kletta-dark outline-none focus:border-kletta-teal focus:bg-white transition-all placeholder:text-gray-300 placeholder:font-medium" 
        />
    </div>
);

const SelectionCard = ({ icon, title, desc, selected, onClick }: any) => (
    <button 
        onClick={onClick}
        className={`w-full text-left p-5 rounded-2xl border-[2px] transition-all duration-200 flex items-start gap-4 active:scale-[0.98] ${selected ? 'border-kletta-teal bg-teal-50/50 shadow-sm' : 'border-transparent bg-gray-50 hover:bg-gray-100'}`}
    >
        <div className={`w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${selected ? 'bg-kletta-teal text-white' : 'bg-white text-gray-400'}`}>
            {React.cloneElement(icon as React.ReactElement<any>, { 
                color: selected ? 'white' : 'currentColor',
                size: 24 
            })}
        </div>
        <div className="flex-1 pt-0.5">
            <h3 className={`font-bold text-[15px] mb-1 leading-tight ${selected ? 'text-kletta-teal' : 'text-kletta-dark'}`}>{title}</h3>
            <p className="text-[13px] text-gray-500 leading-snug">{desc}</p>
        </div>
        <div className={`w-6 h-6 rounded-full border-[2px] mt-2 flex-shrink-0 flex items-center justify-center transition-all ${selected ? 'border-kletta-teal bg-kletta-teal scale-110' : 'border-gray-300'}`}>
            {selected && <IconCheck size={14} color="white" />}
        </div>
    </button>
);

const ChipOption = ({ label, active }: any) => (
    <button className={`px-4 py-2.5 rounded-xl text-xs font-bold border transition-colors ${active ? 'bg-kletta-dark text-white border-kletta-dark shadow-sm' : 'bg-white text-gray-500 border-gray-200'}`}>
        {label}
    </button>
);

const RadioOption = ({ label, active }: any) => (
    <button className={`w-full text-left p-4 rounded-2xl border transition-colors flex items-center gap-4 ${active ? 'border-kletta-teal bg-teal-50' : 'border-gray-100 bg-white'}`}>
        <div className={`w-6 h-6 rounded-full border-[2.5px] flex items-center justify-center shrink-0 ${active ? 'border-kletta-teal' : 'border-gray-200'}`}>
            {active && <div className="w-2.5 h-2.5 bg-kletta-teal rounded-full"></div>}
        </div>
        <span className={`text-[15px] font-bold ${active ? 'text-kletta-dark' : 'text-gray-600'}`}>{label}</span>
    </button>
);