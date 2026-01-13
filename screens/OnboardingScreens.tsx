
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
  IconInfo,
  IconBack,
  IconHandWaving,
  IconCheckCircle,
  IconFileArrowUp,
  IconScan,
  IconPencilSimple
} from '../components/Icons';
import { KlettaInput, KlettaSelect } from '../components/Inputs';

// --- Shared Layout with Custom Header ---
interface OnboardingLayoutProps extends React.PropsWithChildren {
    title: string;
    subtitle?: string;
    icon: React.ReactNode;
    onPrimary: () => void;
    onSecondary: () => void;
    onBack?: () => void;
    primaryLabel?: string;
    secondaryLabel?: string;
    disablePrimary?: boolean;
}

const OnboardingHeader = ({ icon }: { icon: React.ReactNode }) => {
    return (
        <div className="relative w-full shrink-0 z-20 bg-white">
            {/* Teal background with rounded bottom corners */}
            <div className="bg-kletta-teal w-full h-[130px] pt-14 flex items-start justify-center shadow-sm">
                {/* Optional: Add a subtle texture or keep plain teal */}
            </div>

            {/* Icon Wrapper: Absolute positioned to overlap */}
            <div className="absolute bottom-[-36px] left-0 right-0 flex justify-center items-center pointer-events-none">
                {/* Outer white ring */}
                <div className="w-[92px] h-[92px] rounded-full bg-white flex items-center justify-center shadow-md">
                    {/* Middle teal ring */}
                    <div className="w-[84px] h-[84px] rounded-full bg-white border-[4px] border-kletta-teal flex items-center justify-center">
                        {/* Icon */}
                        {React.cloneElement(icon as React.ReactElement<any>, { 
                            color: '#00343B', 
                            size: 32,
                            // Ensure weight is passed through if provided on the element
                            ...(icon as React.ReactElement<any>).props
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

const OnboardingLayout: React.FC<OnboardingLayoutProps> = ({ 
    title, subtitle, icon, children, onPrimary, onSecondary, onBack,
    primaryLabel = "Continue", secondaryLabel = "Remind me later", disablePrimary = false 
}) => {
    return (
        <div className="h-full w-full bg-white flex flex-col font-aktifo relative animate-fade-in overflow-hidden">
            {/* Back Button */}
            {onBack && (
                <button 
                    onClick={onBack}
                    className="absolute top-[52px] left-6 z-50 w-10 h-10 -ml-2 flex items-center justify-center rounded-full text-white active:bg-white/20 transition-colors"
                >
                    <IconBack size={26} />
                </button>
            )}

            {/* Custom Header */}
            <OnboardingHeader icon={icon} />

            {/* Scrollable Content Body */}
            <div className="flex-1 overflow-y-auto no-scrollbar px-6 pt-[60px] pb-40 bg-white">
                <h1 className="text-[24px] font-bold text-kletta-dark text-center mb-5 leading-tight tracking-tight">{title}</h1>
                {subtitle && (
                    <p className="text-center text-kletta-dark font-normal text-[17px] leading-relaxed mb-10 max-w-[340px] mx-auto">
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
                 className={`w-full py-4 rounded-2xl font-medium text-[16px] shadow-sm transition-all active:scale-[0.98] ${disablePrimary ? 'bg-gray-100 text-gray-400' : 'bg-kletta-yellow text-kletta-dark hover:shadow-md'}`}
               >
                 {primaryLabel}
               </button>
               <button 
                 onClick={onSecondary}
                 className="w-full py-6 mt-2 text-kletta-dark font-medium text-[14px] hover:text-kletta-dark transition-colors"
               >
                 {secondaryLabel}
               </button>
            </div>
        </div>
    );
};

// --- Step 0: Welcome Sole Proprietor ---
export const OnboardingWelcome: React.FC<NavigationProps> = ({ navigate, goBack }) => {
    return (
        <OnboardingLayout
            title="Welcome, sole proprietor!"
            icon={<IconHandWaving weight="fill" />}
            primaryLabel="Transfer my accounting to Kletta"
            secondaryLabel="I am a new sole proprietor"
            onPrimary={() => navigate('onboarding-1')}
            onSecondary={() => navigate('onboarding-1')}
            onBack={goBack}
        >
            <div className="flex flex-col items-center">
                <p className="text-gray-700 text-[15px] font-light leading-relaxed text-center mb-6">
                    If you have already been operating as an entrepreneur, we need your current season’s bookkeeping in order to submit VAT and tax declarations.
                </p>
            </div>
        </OnboardingLayout>
    );
};

// --- Step 1: Authorization ---
export const OnboardingStep1: React.FC<NavigationProps> = ({ navigate, goBack }) => {
    const [expanded, setExpanded] = useState(false);

    return (
        <OnboardingLayout
            title="Tax return authorizations"
            icon={<IconShield weight="fill" />}
            primaryLabel="Proceed to authorize"
            onPrimary={() => navigate('onboarding-2')}
            onSecondary={() => navigate('onboarding-2')}
            onBack={goBack}
        >
            <div className="flex flex-col items-center">
                <p className="text-gray-700 text-[15px] font-light leading-relaxed text-center mb-6">
                    We need Suomi.fi authorizations in order to handle your tax matters.
                </p>
                
                    <div className="bg-gray-50 p-5 rounded-2xl text-left text-[14px] text-gray-700 leading-relaxed mb-4 animate-slide-up border border-gray-100 w-full font-light">
                        <p>Kletta uses the Suomi.fi authorization service to submit your tax returns directly to the Tax Administration. This ensures your data is handled securely and correctly.</p>
                    </div>
            </div>
        </OnboardingLayout>
    );
};

// --- Step 2: Tax Info ---
export const OnboardingStep2: React.FC<NavigationProps> = ({ navigate, goBack }) => {
    return (
        <OnboardingLayout
            title="Add your tax information"
            subtitle="Support will verify your Business ID (Y-tunnus) and tax period. After verification, tax reports will be sent automatically."
            icon={<IconFile weight="fill" />}
            onPrimary={() => navigate('onboarding-3')}
            onSecondary={() => navigate('onboarding-3')}
            onBack={goBack}
        >
            <div className="space-y-6 mb-8">
                <KlettaInput label="Business ID" placeholder="1234567-8" />
                <KlettaInput label="Company Name" placeholder="Company ABC" />
                
                <KlettaSelect label="VAT Period">
                     <option>No VAT liability</option>
                     <option>Monthly</option>
                     <option>Quarterly</option>
                     <option>Yearly</option>
                </KlettaSelect>
            </div>
        </OnboardingLayout>
    );
};

// --- Step 3: Bookkeeping ---
export const OnboardingStep3: React.FC<NavigationProps> = ({ navigate, goBack }) => {
    const [selected, setSelected] = useState<number | null>(1);

    return (
        <OnboardingLayout
            title="Opening bookkeeping"
            subtitle="How would you like to import this season’s bookkeeping?"
            icon={<IconFile weight="fill" />}
            onPrimary={() => navigate('onboarding-4')}
            onSecondary={() => navigate('onboarding-4')}
            disablePrimary={selected === null}
            onBack={goBack}
        >
            <div className="space-y-4">
               {/* Card 1: Upload (Centered, Dashed) */}
               <button 
                  onClick={() => setSelected(1)}
                  className={`w-full flex flex-col items-center justify-center p-8 rounded-[20px] border-2 transition-all group ${selected === 1 ? 'border-gray-300 border-dashed bg-white' : 'border-gray-100 bg-white active:border-gray-300'}`}
               >
                  <div className="text-kletta-teal mb-4 group-active:scale-95 transition-transform">
                     <IconFileArrowUp size={32} weight="regular" />
                  </div>
                  <h3 className="text-[15px] font-medium text-kletta-dark mb-1">Upload statement</h3>
                  <p className="text-[14px] text-gray-500 font-normal leading-tight text-center max-w-[240px]">
                     Kletta will automatically read the necessary data.
                  </p>
               </button>

               {/* Card 2: Take Photo (Left Aligned) */}
               <button 
                  onClick={() => setSelected(2)}
                  className={`w-full flex items-start gap-5 p-6 rounded-[20px] border-2 text-left transition-all group ${selected === 2 ? 'border-gray-300 bg-white' : 'border-gray-100 bg-white active:border-gray-300'}`}
               >
                  <div className="text-kletta-dark mt-1 shrink-0 group-active:scale-95 transition-transform">
                     <IconScan size={30} weight="regular" />
                  </div>
                  <div className="flex-1">
                     <h3 className="text-[15px] font-medium text-kletta-dark mb-1 leading-snug">Take a photo of the statement</h3>
                     <p className="text-[14px] text-gray-500 font-normal leading-tight">
                        Kletta will automatically read the necessary data.
                     </p>
                  </div>
               </button>

               {/* Card 3: Manual Entry (Left Aligned) */}
               <button 
                  onClick={() => setSelected(3)}
                  className={`w-full flex items-start gap-5 p-6 rounded-[20px] border-2 text-left transition-all group ${selected === 3 ? 'border-gray-300 bg-white' : 'border-gray-100 bg-white active:border-gray-300'}`}
               >
                  <div className="text-kletta-dark mt-1 shrink-0 group-active:scale-95 transition-transform">
                     <IconPencilSimple size={30} weight="regular" />
                  </div>
                  <div className="flex-1">
                     <h3 className="text-[15px] font-medium text-kletta-dark mb-1">Enter the data manually</h3>
                     <p className="text-[14px] text-gray-500 font-normal leading-tight">
                        Note! We still need a photo of your income statement to verify the information.
                     </p>
                  </div>
               </button>
            </div>
        </OnboardingLayout>
    );
};

// --- Step 4: Tax Return Details ---
export const OnboardingStep4: React.FC<NavigationProps> = ({ navigate, goBack }) => {
    return (
        <OnboardingLayout
            title="Confirm your tax return"
            subtitle="Which is the first tax return you want Kletta to submit?"
            icon={<IconFile weight="fill" />}
            primaryLabel="Confirm and continue"
            onPrimary={() => navigate('onboarding-5')}
            onSecondary={() => navigate('onboarding-5')}
            onBack={goBack}
        >
            <div className="mb-8">
                <KlettaSelect label="Select Period">
                    <option>2025</option>
                    <option>Quarter I, 2025</option>
                    <option>Quarter II, 2025</option>
                </KlettaSelect>
            </div>

            <div className="bg-[#F7F6EE] p-5 rounded-2xl text-kletta-dark text-[15px] font-normal leading-relaxed">
                Please note that you cannot change this selection later.
            </div>
        </OnboardingLayout>
    );
};

// --- Step 5: Phone Number ---
export const OnboardingStep5: React.FC<NavigationProps> = ({ navigate, goBack }) => {
    return (
        <OnboardingLayout
            title="Phone number"
            subtitle="Add your phone number. You will receive a verification code via SMS."
            icon={<IconPhone weight="fill" />}
            onPrimary={() => navigate('onboarding-6')}
            onSecondary={() => navigate('onboarding-6')}
            onBack={goBack}
        >
            <div className="flex gap-3">
                <div className="relative w-28 shrink-0">
                    <KlettaSelect>
                        <option>+358</option>
                        <option>+46</option>
                        <option>+1</option>
                    </KlettaSelect>
                </div>
                <div className="flex-1">
                    <KlettaInput type="tel" placeholder="40 123 4567" />
                </div>
            </div>
        </OnboardingLayout>
    );
};

// --- Step 6: YEL Insurance ---
export const OnboardingStep6: React.FC<NavigationProps> = ({ navigate, goBack }) => {
    return (
        <OnboardingLayout
            title="YEL insurance"
            subtitle="You are required to take entrepreneur’s pension insurance (YEL) if:"
            icon={<IconGift weight="fill" />}
            primaryLabel="Confirm and continue"
            onPrimary={() => navigate('onboarding-7')}
            onSecondary={() => navigate('onboarding-7')}
            onBack={goBack}
        >
             <div className="space-y-6 mb-10 px-2">
                <div className="flex items-start gap-4">
                    <IconCheckCircle size={22} className="text-[#005c66] mt-0.5 shrink-0" weight="regular" />
                    <p className="text-[17px] text-kletta-dark font-normal leading-snug">
                        Your entrepreneurial income is over <span className="font-bold">€767/month.</span>
                    </p>
                </div>
                <div className="flex items-start gap-4">
                    <IconCheckCircle size={22} className="text-[#005c66] mt-0.5 shrink-0" weight="regular" />
                    <p className="text-[17px] text-kletta-dark font-normal leading-snug">
                        You operate as an entrepreneur continuously for at least <span className="font-bold">four months.</span>
                    </p>
                </div>
             </div>

             <div className="bg-[#FFEE99] rounded-[24px] py-6 px-6 text-center shadow-none flex flex-col items-center">
                <h3 className="font-bold text-[18px] text-kletta-dark mb-2">Make use of your benefit now!</h3>
                <p className="text-[15px] text-kletta-dark leading-snug font-normal mb-2 max-w-[280px]">
                    When you take YEL insurance with Ilmarinen, you will receive one free month of Kletta.
                </p>
                <p className="text-[15px] text-kletta-dark font-normal">
                    The value of your benefit is €29–69.
                </p>
             </div>
        </OnboardingLayout>
    );
};

// --- Step 7: Vehicle Use ---
export const OnboardingStep7: React.FC<NavigationProps> = ({ navigate, goBack }) => {
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
            icon={<IconCar weight="fill" />}
            onPrimary={handleContinue}
            onSecondary={() => navigate('home')}
            disablePrimary={selected === null}
            onBack={goBack}
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
export const OnboardingStep8: React.FC<NavigationProps> = ({ navigate, goBack }) => {
    return (
        <OnboardingLayout
            title="Add a vehicle"
            subtitle="The name helps you distinguish between vehicles. It will not be visible to others."
            icon={<IconCar weight="fill" />}
            primaryLabel="Confirm and continue"
            onPrimary={() => navigate('home')}
            onSecondary={() => navigate('home')}
            onBack={goBack}
        >
            <div className="space-y-8">
                <KlettaInput label="Vehicle Name" placeholder="e.g. Van or ABC-123" />

                <div>
                    <label className="text-[11px] font-medium text-kletta-dark uppercase tracking-wider ml-1 mb-2 block">Vehicle Type</label>
                    <div className="flex flex-wrap gap-2">
                        <ChipOption label="Passenger car" active />
                        <ChipOption label="Van / Taxi" />
                        <ChipOption label="Motorcycle" />
                    </div>
                </div>

                <KlettaSelect label="Business Use">
                     <option>Less than 50%</option>
                     <option>More than 50%</option>
                     <option>100%</option>
                </KlettaSelect>
                
                 <div>
                    <label className="text-[11px] font-medium text-kletta-dark uppercase tracking-wider ml-1 mb-2 block">Acquisition Type</label>
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

const SelectionCard = ({ icon, title, desc, selected, onClick }: any) => (
    <button 
        onClick={onClick}
        className={`w-full text-left p-5 rounded-2xl border-[2px] transition-all duration-200 flex items-start gap-4 active:scale-[0.98] ${selected ? 'border-kletta-teal bg-teal-50/50 shadow-sm' : 'border-transparent bg-gray-50 hover:bg-gray-100'}`}
    >
        <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${selected ? 'bg-kletta-teal text-white' : 'bg-white text-gray-700'}`}>
            {React.cloneElement(icon as React.ReactElement<any>, { 
                color: selected ? 'white' : 'currentColor',
                size: 24 
            })}
        </div>
        <div className="flex-1 pt-0.5">
            <h3 className={`font-normal text-[15px] mb-1 leading-tight ${selected ? 'text-kletta-dark' : 'text-kletta-dark'}`}>{title}</h3>
            <p className="text-[13px] text-gray-600 leading-snug font-light">{desc}</p>
        </div>
    </button>
);

const ChipOption = ({ label, active }: any) => (
    <button className={`px-4 py-2.5 rounded-xl text-[12px] font-medium border transition-colors ${active ? 'bg-kletta-dark text-white border-kletta-dark shadow-sm' : 'bg-white text-gray-500 border-gray-200'}`}>
        {label}
    </button>
);

const RadioOption = ({ label, active }: any) => (
    <button className={`w-full text-left p-4 rounded-2xl border transition-colors flex items-center gap-4 ${active ? 'border-kletta-teal bg-teal-50' : 'border-gray-100 bg-white'}`}>
        <div className={`w-6 h-6 rounded-full border-[2.5px] flex items-center justify-center shrink-0 ${active ? 'border-kletta-teal' : 'border-gray-200'}`}>
            {active && <div className="w-2.5 h-2.5 bg-kletta-teal rounded-full"></div>}
        </div>
        <span className={`text-[14px] font-medium ${active ? 'text-kletta-dark' : 'text-gray-600'}`}>{label}</span>
    </button>
);
