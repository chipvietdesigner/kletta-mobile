
import React, { useState, useEffect } from 'react';
import { 
  IconClose, IconChevronRight, IconBack, IconCheckCircle, 
  IconSparkle, IconCalendarBlank, IconGlobe, IconIdentificationCard, 
  IconPhone, IconShield, IconFile, IconHandWaving, IconFileArrowUp, IconScan, IconPencilSimple
} from '../components/Icons';
import { NavigationProps, ScreenName } from '../types';
import { KlettaInput, KlettaSelect } from '../components/Inputs';
import { resetOnboardingFlowState } from './OnboardingScreens';

// --- Shared state to prevent re-sliding up for incomplete flow steps ---
let incompleteFlowActive = false;

// --- SHARED UI: PROGRESS BAR ---
const ProgressBar = ({ stepsRemaining, total = 3 }: { stepsRemaining: number, total?: number }) => {
  const completed = total - stepsRemaining;
  return (
    <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden flex">
      <div 
        className="h-full bg-kletta-teal transition-all duration-600" 
        style={{ width: `${(completed / total) * 100}%` }}
      />
    </div>
  );
};

// --- SHARED UI: ONBOARDING-STYLE HEADER ---
const OnboardingHeader = ({ icon, onBack, onClose }: { icon: React.ReactNode, onBack?: () => void, onClose?: () => void }) => {
    return (
        <div className="relative w-full shrink-0 z-20 bg-white">
            {/* Teal background with smooth vector curve as requested - Reduced height */}
            <div className="w-full h-[120px] relative overflow-hidden bg-white">
                <svg viewBox="0 0 400 120" preserveAspectRatio="none" className="absolute inset-0 w-full h-full">
                    {/* Background color changed to #002D33 */}
                    <path d="M0 0 H400 V85 Q200 120 0 85 Z" fill="#002D33" />
                </svg>
                
                {onBack && (
                    <button 
                        onClick={onBack}
                        className="absolute top-4 left-6 z-50 w-10 h-10 -ml-2 flex items-center justify-center rounded-full text-white active:bg-white/20 transition-colors"
                    >
                        <IconBack size={26} weight="bold" />
                    </button>
                )}
                {onClose && (
                    <button 
                        onClick={onClose}
                        className="absolute top-4 right-6 z-50 w-10 h-10 -mr-2 flex items-center justify-center rounded-full text-white active:bg-white/20 transition-colors"
                    >
                        <IconClose size={26} weight="bold" />
                    </button>
                )}
            </div>
            <div className="absolute bottom-[-36px] left-0 right-0 flex justify-center items-center pointer-events-none">
                <div className="w-[92px] h-[92px] rounded-full bg-white flex items-center justify-center shadow-md">
                    <div className="w-[84px] h-[84px] rounded-full bg-white border-[4px] border-kletta-teal flex items-center justify-center">
                        {React.cloneElement(icon as React.ReactElement<any>, { 
                            color: '#00343B', 
                            size: 32,
                            weight: 'fill'
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- 1. ENTRY MODAL (RE-ENGAGEMENT CHECKLIST) ---
export const IncompleteOnboardingEntry: React.FC<NavigationProps> = ({ navigate, goBack }) => {
  const remainingSteps = [
    { 
      id: 'tax-info', 
      label: 'Add your tax information', 
      description: 'Y-tunnus and VAT period',
      icon: <IconFile size={22} weight="regular" />,
      screen: 'incomplete-onboarding-tax-info' as ScreenName 
    },
    { 
      id: 'tax-confirm', 
      label: 'Confirm your tax return', 
      description: 'Select your first reporting period',
      icon: <IconFile size={22} weight="regular" />,
      screen: 'incomplete-onboarding-tax-confirm' as ScreenName 
    },
    { 
      id: 'phone', 
      label: 'Add phone number', 
      description: 'Receive verification code',
      icon: <IconPhone size={22} weight="regular" />,
      screen: 'incomplete-onboarding-phone' as ScreenName 
    }
  ];

  return (
    <div className="absolute inset-0 z-[100] flex flex-col justify-end">
      {/* Changed backdrop from black to a soft grey and increased blur as requested */}
      <div className="absolute inset-0 bg-[#9CA3AF]/30 backdrop-blur-[4px] animate-fade-in" onClick={goBack} />
      
      <div className="mt-auto w-full bg-white rounded-t-[32px] animate-slide-up shadow-2xl relative z-10 pb-12 overflow-hidden">
        {/* UPDATED DARK TEAL HEADER WITH CURVE */}
        <div className="relative w-full h-[150px] overflow-hidden shrink-0">
           <svg viewBox="0 0 400 150" preserveAspectRatio="none" className="absolute inset-0 w-full h-full">
              <path d="M0 0 H400 V110 Q200 150 0 110 Z" fill="#002D33" />
           </svg>
           
           <div className="absolute inset-0 px-8 pt-10 flex justify-between items-start z-10">
              <div className="flex-1">
                <h1 className="text-[20px] font-bold text-white tracking-tight leading-tight mb-2">Set up your account</h1>
                <p className="text-[14px] text-white/70 font-normal leading-relaxed">You still have a few steps to complete.</p>
              </div>
              <button onClick={goBack} className="w-10 h-10 -mr-2 -mt-1.5 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors">
                <IconClose size={24} weight="bold" className="text-white" />
              </button>
           </div>
        </div>

        {/* CONTENT BELOW HEADER */}
        <div className="px-8 pt-2">
          <div className="mb-8">
            <div className="flex justify-between items-end mb-2.5">
               <span className="text-[12px] font-medium text-kletta-teal uppercase tracking-widest">Setup Progress</span>
               <span className="text-[13px] font-normal text-kletta-dark">50% complete</span>
            </div>
            <ProgressBar stepsRemaining={3} total={6} />
          </div>

          <div className="space-y-4 mb-8">
            {remainingSteps.map(step => (
              <button 
                key={step.id}
                onClick={() => { incompleteFlowActive = true; navigate(step.screen); }}
                className="w-full p-5 rounded-[16px] bg-white border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.03)] flex items-center justify-between group active:bg-gray-50 transition-all"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 flex items-center justify-center text-gray-400 shrink-0">
                    {step.icon}
                  </div>
                  <div className="text-left">
                    <p className="text-[15px] font-medium text-kletta-dark">{step.label}</p>
                    <p className="text-[13px] text-gray-500 font-light mt-0.5">{step.description}</p>
                  </div>
                </div>
                <IconChevronRight size={18} weight="bold" className="text-gray-300 group-hover:text-kletta-teal" />
              </button>
            ))}
          </div>

          <div className="flex flex-col gap-3">
             <button 
               onClick={() => { incompleteFlowActive = true; navigate(remainingSteps[0].screen); }}
               className="w-full h-[60px] bg-kletta-yellow rounded-[16px] text-kletta-dark font-bold text-[16px] active:scale-[0.98] transition-all shadow-sm"
             >
               Continue
             </button>
             <button 
               onClick={goBack}
               className="w-full py-4 text-kletta-dark font-bold text-[15px] active:opacity-60"
             >
               Not now
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- SHARED WRAPPER FOR INCOMPLETE STEPS (SHEET STYLE) ---
const IncompleteStepLayout = ({ icon, title, subtitle, children, onPrimary, primaryLabel = "Save and continue", disablePrimary = false, onClose, onBack }: any) => {
    const [isTransitioning, setIsTransitioning] = useState(false);

    const handlePrimaryClick = () => {
        setIsTransitioning(true);
        setTimeout(() => {
            onPrimary();
        }, 400);
    };

    return (
        <div className="absolute inset-0 z-[105] flex flex-col justify-end font-aktifo overflow-hidden">
            {/* Unified grey backdrop for all setup steps */}
            <div className={`absolute inset-0 bg-[#9CA3AF]/30 backdrop-blur-[4px] ${incompleteFlowActive ? '' : 'animate-fade-in'}`} />
            
            <div className={`h-[92%] w-full bg-white rounded-t-[32px] shadow-2xl relative z-10 overflow-hidden flex flex-col ${incompleteFlowActive ? '' : 'animate-slide-up'}`}>
                <OnboardingHeader icon={icon} onBack={onBack} onClose={onClose} />
                
                <div className={`flex-1 overflow-y-auto no-scrollbar px-6 pt-[50px] pb-60 transition-opacity duration-600 ${isTransitioning ? 'opacity-0' : 'opacity-100 animate-slide-in-right'}`}>
                    <h1 className="text-[24px] font-bold text-kletta-dark text-center mb-4 tracking-tight">{title}</h1>
                    <div className="text-center text-kletta-dark font-normal text-[16px] leading-relaxed mb-6 max-w-[340px] mx-auto">
                        {subtitle}
                    </div>
                    <div className="w-full">
                        {children}
                    </div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm px-6 pt-4 pb-10 border-t border-gray-100 z-30">
                    <button 
                        onClick={handlePrimaryClick}
                        disabled={disablePrimary}
                        className={`w-full py-4 rounded-2xl font-medium text-[16px] shadow-sm transition-all active:scale-[0.98] ${disablePrimary ? 'bg-gray-100 text-gray-400' : 'bg-kletta-yellow text-kletta-dark hover:shadow-md'}`}
                    >
                        {primaryLabel}
                    </button>
                </div>
            </div>
        </div>
    );
};

// Reset function for incomplete flow state
const resetIncompleteFlowState = () => {
    incompleteFlowActive = false;
};

// --- 2. STEP: TAX INFO ---
export const IncompleteTaxInfo: React.FC<NavigationProps> = ({ navigate, goBack }) => {
  return (
    <IncompleteStepLayout
        icon={<IconFile />}
        title="Add your tax information"
        subtitle="Support will verify your Business ID (Y-tunnus) and tax period. After verification, tax reports will be sent automatically."
        onPrimary={() => navigate('incomplete-onboarding-tax-confirm')}
        onClose={() => { resetIncompleteFlowState(); navigate('home', { showIncompleteOnboarding: true }); }}
        onBack={() => { resetIncompleteFlowState(); navigate('home', { showIncompleteOnboarding: true }); }}
    >
        <div className="space-y-6">
            <KlettaInput label="Business name" placeholder="Company ABC" />
            <KlettaInput label="Finnish business ID" placeholder="1234567-8" />
            <KlettaSelect label="VAT return period">
                 <option>No VAT liability</option>
                 <option>Monthly</option>
                 <option>Quarterly</option>
                 <option>Yearly</option>
            </KlettaSelect>

            <div className="bg-[#F7F6EE] p-5 rounded-2xl text-kletta-dark text-[15px] font-normal leading-relaxed mt-4">
                Please note that you cannot change this selection later.
            </div>
        </div>
    </IncompleteStepLayout>
  );
};

// --- 3. STEP: TAX CONFIRM ---
export const IncompleteTaxConfirm: React.FC<NavigationProps> = ({ navigate, goBack }) => {
  return (
    <IncompleteStepLayout
        icon={<IconFile />}
        title="Confirm your tax return"
        subtitle="Which is the first tax return you want Kletta to submit?"
        onPrimary={() => navigate('incomplete-onboarding-phone')}
        onClose={() => { resetIncompleteFlowState(); navigate('home', { showIncompleteOnboarding: true }); }}
        onBack={() => navigate('incomplete-onboarding-tax-info')}
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
    </IncompleteStepLayout>
  );
};

// --- 4. STEP: PHONE ---
export const IncompletePhone: React.FC<NavigationProps> = ({ navigate, goBack }) => {
  const [phone, setPhone] = useState('');
  const [prefix, setPrefix] = useState('+358');

  return (
    <IncompleteStepLayout
        icon={<IconPhone />}
        title="Phone number"
        subtitle="Add your phone number. You will receive a verification code via SMS."
        onPrimary={() => navigate('incomplete-onboarding-verify-code', { phone: `${prefix} ${phone}` })}
        onClose={() => { resetIncompleteFlowState(); navigate('home', { showIncompleteOnboarding: true }); }}
        onBack={() => navigate('incomplete-onboarding-tax-confirm')}
    >
        <div className="flex gap-3">
            <div className="w-28 shrink-0">
                <KlettaSelect value={prefix} onChange={(e) => setPrefix(e.target.value)}>
                    <option>+358</option>
                    <option>+46</option>
                    <option>+1</option>
                </KlettaSelect>
            </div>
            <div className="flex-1">
                <KlettaInput 
                    type="tel" 
                    placeholder="40 123 4567" 
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    autoFocus
                />
            </div>
        </div>
    </IncompleteStepLayout>
  );
};

// --- 5. STEP: VERIFY CODE ---
export const IncompleteVerifyPhoneCode: React.FC<NavigationProps> = ({ navigate, goBack, params }) => {
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const phone = params?.phone || 'your phone number';

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) return;
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value && index < 5) {
      const nextInput = document.getElementById(`phone-code-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleFinish = () => {
    resetIncompleteFlowState();
    resetOnboardingFlowState();
    navigate('home');
  };

  return (
    <IncompleteStepLayout
        icon={<IconPhone />}
        title="Check your phone"
        subtitle={
            <div className="text-gray-700 text-[16px] font-light leading-relaxed">
                We have sent a 6 digit code to <br/><span className="text-kletta-dark font-medium">{phone}</span>.
            </div>
        }
        primaryLabel="Finish setup"
        disablePrimary={!code.every(c => c !== '')}
        onPrimary={handleFinish}
        onClose={() => { resetIncompleteFlowState(); navigate('home', { showIncompleteOnboarding: true }); }}
        onBack={goBack}
    >
        <div className="max-w-[420px] mx-auto">
            <div className="flex gap-3 justify-center mb-10">
                {code.map((digit, i) => (
                    <input
                        key={i}
                        id={`phone-code-${i}`}
                        type="tel"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleChange(i, e.target.value)}
                        className="w-[16%] h-14 bg-white border border-gray-200 rounded-[12px] text-center text-3xl font-bold text-kletta-dark outline-none focus:border-kletta-teal transition-all"
                    />
                ))}
            </div>

            <div className="flex justify-center mb-8">
                <button className="text-kletta-teal font-medium text-[13px] hover:opacity-80 transition-opacity">
                    Didn't receive code? Resend
                </button>
            </div>
        </div>
    </IncompleteStepLayout>
  );
};
