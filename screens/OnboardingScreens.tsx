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
  IconArrowRight,
  IconBike,
  IconInfo
} from '../components/Icons';

// --- Shared Layout ---
interface OnboardingLayoutProps extends React.PropsWithChildren {
    title: string;
    icon: React.ReactNode;
    onPrimary: () => void;
    onSecondary: () => void;
    primaryLabel?: string;
    secondaryLabel?: string;
    disablePrimary?: boolean;
}

const OnboardingLayout: React.FC<OnboardingLayoutProps> = ({ 
    title, icon, children, onPrimary, onSecondary, 
    primaryLabel = "Continue", secondaryLabel = "Remind me later", disablePrimary = false 
}) => {
    return (
        <div className="h-full w-full bg-gray-50 flex flex-col font-aktifo relative animate-slide-up">
            {/* Header Curve */}
            <div className="bg-kletta-teal pt-16 pb-12 px-6 rounded-b-[40px] text-white relative z-0">
               <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mb-4 backdrop-blur-sm">
                     {icon}
                  </div>
                  <h1 className="text-2xl font-bold leading-tight max-w-[280px]">{title}</h1>
               </div>
            </div>

            {/* Content Card (Overlapping) */}
            <div className="flex-1 px-4 -mt-6 z-10 flex flex-col pb-4">
               <div className="bg-white rounded-[32px] p-6 shadow-sm border border-gray-100/50 flex-1 flex flex-col">
                  {children}
               </div>
            </div>

            {/* Footer Buttons */}
            <div className="px-6 pb-10 pt-2 flex flex-col gap-3">
               <button 
                 onClick={onPrimary}
                 disabled={disablePrimary}
                 className={`w-full py-4 rounded-2xl font-bold text-lg shadow-sm transition-all ${disablePrimary ? 'bg-gray-200 text-gray-400' : 'bg-kletta-yellow text-kletta-dark hover:shadow-md active:scale-95'}`}
               >
                 {primaryLabel}
               </button>
               <button 
                 onClick={onSecondary}
                 className="py-2 text-gray-400 font-bold text-sm hover:text-kletta-dark transition-colors"
               >
                 {secondaryLabel}
               </button>
            </div>
        </div>
    );
};

// --- Step 1 ---
export const OnboardingStep1: React.FC<NavigationProps> = ({ navigate }) => {
    const [expanded, setExpanded] = useState(false);

    return (
        <OnboardingLayout
            title="Tax return authorizations"
            icon={<IconShield size={32} color="white" />}
            primaryLabel="Proceed to authorize"
            onPrimary={() => navigate('onboarding-2')}
            onSecondary={() => navigate('onboarding-2')}
        >
            <div className="flex-1 flex flex-col justify-center items-center text-center">
                <p className="text-gray-600 text-lg font-medium leading-relaxed mb-6">
                    We need Suomi.fi authorizations in order to handle your tax matters.
                </p>
                <button 
                   onClick={() => setExpanded(!expanded)}
                   className="flex items-center gap-2 text-kletta-teal font-bold mb-6 hover:opacity-80"
                >
                   Read more <IconChevronDown size={18} className={`transition-transform ${expanded ? 'rotate-180' : ''}`} />
                </button>
                
                {expanded && (
                    <div className="bg-gray-50 p-4 rounded-xl text-left text-sm text-gray-500 leading-relaxed mb-6 animate-fade-in">
                        <p>Kletta uses the Suomi.fi authorization service to submit your tax returns directly to the Tax Administration. This ensures your data is handled securely and correctly.</p>
                    </div>
                )}
            </div>
        </OnboardingLayout>
    );
};

// --- Step 2 ---
export const OnboardingStep2: React.FC<NavigationProps> = ({ navigate }) => {
    return (
        <OnboardingLayout
            title="Add your tax information"
            icon={<IconFile size={32} color="white" />}
            onPrimary={() => navigate('onboarding-3')}
            onSecondary={() => navigate('onboarding-3')}
        >
            <p className="text-gray-500 font-medium mb-8 leading-relaxed">
                Support will verify your Business ID and tax period. After verification, tax reports will be sent automatically.
            </p>
            
            <div className="space-y-4 mb-8">
                <div>
                   <label className="text-xs font-bold text-kletta-dark uppercase tracking-wider ml-1 mb-1">Business ID</label>
                   <input type="text" placeholder="1234567-8" className="w-full p-3.5 bg-gray-50 rounded-xl border border-gray-200 font-medium text-kletta-dark outline-none focus:border-kletta-teal" />
                </div>
                <div>
                   <label className="text-xs font-bold text-kletta-dark uppercase tracking-wider ml-1 mb-1">Company Name</label>
                   <input type="text" placeholder="Company ABC" className="w-full p-3.5 bg-gray-50 rounded-xl border border-gray-200 font-medium text-kletta-dark outline-none focus:border-kletta-teal" />
                </div>
                <div>
                   <label className="text-xs font-bold text-kletta-dark uppercase tracking-wider ml-1 mb-1">VAT Period</label>
                   <div className="relative">
                      <select className="w-full p-3.5 bg-gray-50 rounded-xl border border-gray-200 font-medium text-kletta-dark outline-none focus:border-kletta-teal appearance-none">
                         <option>No VAT liability</option>
                         <option>Monthly</option>
                         <option>Quarterly</option>
                         <option>Yearly</option>
                      </select>
                      <IconChevronDown className="absolute right-4 top-4 text-gray-400 pointer-events-none" size={18} />
                   </div>
                </div>
            </div>

            <div className="bg-teal-50 border-l-4 border-kletta-teal p-4 rounded-r-xl flex gap-3">
                <IconInfo size={20} className="text-kletta-teal flex-shrink-0 mt-0.5" />
                <p className="text-xs text-gray-600 leading-relaxed font-medium">
                    These details cannot be changed later. Information such as the VAT period can only be updated through support.
                </p>
            </div>
        </OnboardingLayout>
    );
};

// --- Step 3 ---
export const OnboardingStep3: React.FC<NavigationProps> = ({ navigate }) => {
    const [selected, setSelected] = useState<number | null>(null);

    return (
        <OnboardingLayout
            title="Opening bookkeeping"
            icon={<IconFile size={32} color="white" />}
            onPrimary={() => navigate('onboarding-4')}
            onSecondary={() => navigate('onboarding-4')}
            disablePrimary={selected === null}
        >
            <p className="text-gray-500 font-medium mb-6 leading-relaxed text-center">
                How would you like to import this season’s bookkeeping?
            </p>

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

// --- Step 4 ---
export const OnboardingStep4: React.FC<NavigationProps> = ({ navigate }) => {
    return (
        <OnboardingLayout
            title="Confirm your tax return details"
            icon={<IconFile size={32} color="white" />}
            primaryLabel="Confirm and continue"
            onPrimary={() => navigate('onboarding-5')}
            onSecondary={() => navigate('onboarding-5')}
        >
             <p className="text-gray-500 font-medium mb-8 leading-relaxed text-center">
                Which is the first tax return you want Kletta to submit?
            </p>

            <div className="mb-6">
                <label className="text-xs font-bold text-kletta-dark uppercase tracking-wider ml-1 mb-1">Select Period</label>
                <div className="relative">
                    <select className="w-full p-4 bg-gray-50 rounded-xl border border-gray-200 font-bold text-lg text-kletta-dark outline-none focus:border-kletta-teal appearance-none">
                        <option>2025</option>
                        <option>Quarter I, 2025</option>
                        <option>Quarter II, 2025</option>
                    </select>
                    <IconChevronDown className="absolute right-4 top-5 text-gray-500 pointer-events-none" size={20} />
                </div>
            </div>

            <div className="bg-orange-50 p-4 rounded-xl text-orange-800 text-sm font-medium text-center">
                Please note that you cannot change this selection later.
            </div>
        </OnboardingLayout>
    );
};

// --- Step 5 ---
export const OnboardingStep5: React.FC<NavigationProps> = ({ navigate }) => {
    return (
        <OnboardingLayout
            title="Phone number"
            icon={<IconPhone size={32} color="white" />}
            onPrimary={() => navigate('onboarding-6')}
            onSecondary={() => navigate('onboarding-6')}
        >
             <p className="text-gray-500 font-medium mb-8 leading-relaxed text-center">
                Add your phone number. You will receive a verification code via SMS.
            </p>

            <div className="flex gap-3">
                <div className="relative w-28">
                    <select className="w-full p-4 bg-gray-50 rounded-xl border border-gray-200 font-bold text-lg text-kletta-dark outline-none appearance-none">
                        <option>+358</option>
                        <option>+46</option>
                        <option>+1</option>
                    </select>
                     <IconChevronDown className="absolute right-3 top-5 text-gray-500 pointer-events-none" size={16} />
                </div>
                <input 
                    type="tel" 
                    placeholder="40 123 4567" 
                    className="flex-1 p-4 bg-gray-50 rounded-xl border border-gray-200 font-bold text-lg text-kletta-dark outline-none focus:border-kletta-teal"
                />
            </div>
        </OnboardingLayout>
    );
};

// --- Step 6 ---
export const OnboardingStep6: React.FC<NavigationProps> = ({ navigate }) => {
    return (
        <OnboardingLayout
            title="YEL insurance"
            icon={<IconGift size={32} color="white" />}
            primaryLabel="Confirm and continue"
            onPrimary={() => navigate('onboarding-7')}
            onSecondary={() => navigate('onboarding-7')}
        >
             <div className="space-y-4 mb-8 text-gray-600 font-medium">
                <p>An entrepreneur must take YEL insurance when:</p>
                <ul className="list-disc pl-5 space-y-2">
                    <li>Your entrepreneurial income is over €767/month.</li>
                    <li>You operate as an entrepreneur continuously for at least four months.</li>
                </ul>
             </div>

             <div className="bg-kletta-yellow/10 border border-kletta-yellow rounded-2xl p-6 text-center">
                <h3 className="font-bold text-lg text-kletta-dark mb-2">Make use of your benefit now!</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                    When you take YEL insurance with Ilmarinen, you will receive one free month of Kletta. The value of your benefit is €29–69.
                </p>
             </div>
        </OnboardingLayout>
    );
};

// --- Step 7 ---
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
            icon={<IconCar size={32} color="white" />}
            onPrimary={handleContinue}
            onSecondary={() => navigate('home')}
            disablePrimary={selected === null}
        >
             <p className="text-gray-500 font-medium mb-6 leading-relaxed text-center">
                Do you own a vehicle that you use for work purposes?
            </p>

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

// --- Step 8 ---
export const OnboardingStep8: React.FC<NavigationProps> = ({ navigate }) => {
    return (
        <OnboardingLayout
            title="Add a vehicle"
            icon={<IconCar size={32} color="white" />}
            primaryLabel="Confirm and continue"
            onPrimary={() => navigate('home')}
            onSecondary={() => navigate('home')}
        >
             <p className="text-gray-500 font-medium mb-6 leading-relaxed text-center text-sm">
                The name helps you distinguish between vehicles. It will not be visible to others.
            </p>

            <div className="space-y-6">
                <div>
                   <label className="text-xs font-bold text-kletta-dark uppercase tracking-wider ml-1 mb-1">Vehicle Name</label>
                   <input type="text" placeholder="e.g. Van or ABC-123" className="w-full p-3.5 bg-gray-50 rounded-xl border border-gray-200 font-medium text-kletta-dark outline-none focus:border-kletta-teal" />
                </div>

                <div>
                    <label className="text-xs font-bold text-kletta-dark uppercase tracking-wider ml-1 mb-2 block">Vehicle Type</label>
                    <div className="flex gap-2">
                        <ChipOption label="Passenger car" active />
                        <ChipOption label="Van / Taxi" />
                        <ChipOption label="Motorcycle" />
                    </div>
                </div>

                <div>
                    <label className="text-xs font-bold text-kletta-dark uppercase tracking-wider ml-1 mb-2 block">Business Use</label>
                     <select className="w-full p-3.5 bg-gray-50 rounded-xl border border-gray-200 font-medium text-kletta-dark outline-none appearance-none">
                         <option>Less than 50%</option>
                         <option>More than 50%</option>
                         <option>100%</option>
                      </select>
                </div>
                
                 <div>
                    <label className="text-xs font-bold text-kletta-dark uppercase tracking-wider ml-1 mb-2 block">Acquisition Type</label>
                    <div className="space-y-2">
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
const SelectionCard = ({ icon, title, desc, selected, onClick }: any) => (
    <button 
        onClick={onClick}
        className={`w-full text-left p-4 rounded-2xl border transition-all flex gap-4 ${selected ? 'border-kletta-teal bg-teal-50 ring-1 ring-kletta-teal' : 'border-gray-200 bg-white hover:border-kletta-teal/50'}`}
    >
        <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${selected ? 'bg-kletta-teal text-white' : 'bg-gray-100 text-gray-500'}`}>
            {icon}
        </div>
        <div>
            <h3 className={`font-bold text-sm mb-1 ${selected ? 'text-kletta-teal' : 'text-kletta-dark'}`}>{title}</h3>
            <p className="text-xs text-gray-500 leading-snug">{desc}</p>
        </div>
        <div className={`w-6 h-6 rounded-full border-2 ml-auto flex-shrink-0 flex items-center justify-center ${selected ? 'border-kletta-teal bg-kletta-teal' : 'border-gray-300'}`}>
            {selected && <IconCheck size={14} color="white" />}
        </div>
    </button>
);

const ChipOption = ({ label, active }: any) => (
    <button className={`px-3 py-2 rounded-lg text-xs font-bold border transition-colors ${active ? 'bg-kletta-dark text-white border-kletta-dark' : 'bg-white text-gray-500 border-gray-200'}`}>
        {label}
    </button>
);

const RadioOption = ({ label, active }: any) => (
    <button className={`w-full text-left p-3 rounded-xl border flex items-center gap-3 transition-colors ${active ? 'border-kletta-teal bg-teal-50' : 'border-gray-200'}`}>
        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${active ? 'border-kletta-teal' : 'border-gray-300'}`}>
            {active && <div className="w-2.5 h-2.5 bg-kletta-teal rounded-full"></div>}
        </div>
        <span className={`text-sm font-medium ${active ? 'text-kletta-dark' : 'text-gray-600'}`}>{label}</span>
    </button>
);