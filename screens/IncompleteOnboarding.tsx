
import React, { useState } from 'react';
import { 
  IconClose, IconChevronRight, IconBack, IconCheckCircle, 
  IconSparkle, IconCalendarBlank, IconGlobe, IconIdentificationCard, 
  IconPhone, IconShield, IconFile, IconHandWaving, IconFileArrowUp, IconScan, IconPencilSimple
} from '../components/Icons';
import { NavigationProps, ScreenName } from '../types';
import { KlettaInput, KlettaSelect } from '../components/Inputs';

// --- SHARED UI: PROGRESS BAR ---
const ProgressBar = ({ stepsRemaining, total = 3 }: { stepsRemaining: number, total?: number }) => {
  const completed = total - stepsRemaining;
  return (
    <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden flex">
      <div 
        className="h-full bg-kletta-teal transition-all duration-500" 
        style={{ width: `${(completed / total) * 100}%` }}
      />
    </div>
  );
};

// --- SHARED UI: ONBOARDING-STYLE HEADER ---
const OnboardingHeader = ({ icon, onBack, onClose }: { icon: React.ReactNode, onBack?: () => void, onClose?: () => void }) => {
    return (
        <div className="relative w-full shrink-0 z-20 bg-white">
            <div className="bg-kletta-teal w-full h-[130px] pt-14 flex items-start justify-center shadow-sm relative">
                {onBack && (
                    <button 
                        onClick={onBack}
                        className="absolute top-[52px] left-6 z-50 w-10 h-10 -ml-2 flex items-center justify-center rounded-full text-white active:bg-white/20 transition-colors"
                    >
                        <IconBack size={26} weight="bold" />
                    </button>
                )}
                {onClose && (
                    <button 
                        onClick={onClose}
                        className="absolute top-[52px] right-6 z-50 w-10 h-10 -mr-2 flex items-center justify-center rounded-full text-white active:bg-white/20 transition-colors"
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
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] animate-fade-in" onClick={goBack} />
      
      <div className="mt-auto w-full bg-white rounded-t-[32px] animate-slide-up shadow-2xl relative z-10 pb-12">
        <div className="px-8 pt-10 pb-8">
          <div className="flex justify-between items-start mb-6">
            <div className="flex-1">
              {/* Refined heading weight */}
              <h1 className="text-[24px] font-medium text-kletta-dark tracking-tight leading-tight mb-2">Set up your account</h1>
              <p className="text-[15px] text-gray-500 font-light leading-relaxed">You still have a few steps to complete.</p>
            </div>
            <button onClick={goBack} className="w-10 h-10 -mr-2 -mt-2 flex items-center justify-center rounded-full hover:bg-gray-50">
              <IconClose size={24} weight="bold" className="text-gray-400" />
            </button>
          </div>

          <div className="mb-8">
            <div className="flex justify-between items-end mb-2.5">
               {/* Refined weight for setup progress labels */}
               <span className="text-[12px] font-medium text-kletta-teal uppercase tracking-widest">Setup Progress</span>
               <span className="text-[13px] font-normal text-kletta-dark">50% complete</span>
            </div>
            <ProgressBar stepsRemaining={3} total={6} />
          </div>

          <div className="space-y-4 mb-8">
            {remainingSteps.map(step => (
              <button 
                key={step.id}
                onClick={() => navigate(step.screen)}
                className="w-full p-5 rounded-[16px] bg-white border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.03)] flex items-center justify-between group active:bg-gray-50 transition-all"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 flex items-center justify-center text-gray-400 shrink-0">
                    {step.icon}
                  </div>
                  <div className="text-left">
                    {/* Refined font weight for step labels */}
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
               onClick={() => navigate(remainingSteps[0].screen)}
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

// --- 2. STEP: TAX INFO (MATCHES ONBOARDING STEP 2) ---
export const IncompleteTaxInfo: React.FC<NavigationProps> = ({ navigate, goBack }) => {
  return (
    <div className="h-full w-full bg-white flex flex-col font-aktifo animate-fade-in relative overflow-hidden">
      <OnboardingHeader icon={<IconFile />} onClose={() => navigate('home', { showIncompleteOnboarding: true })} />
      
      <div className="flex-1 overflow-y-auto no-scrollbar px-6 pt-[60px] pb-60">
        <h1 className="text-[24px] font-bold text-kletta-dark text-center mb-5 tracking-tight">Add your tax information</h1>
        <p className="text-center text-kletta-dark font-normal text-[17px] leading-relaxed mb-10 max-w-[340px] mx-auto">
            Support will verify your Business ID (Y-tunnus) and tax period. After verification, tax reports will be sent automatically.
        </p>

        <div className="space-y-6">
            <KlettaInput label="Business ID" placeholder="1234567-8" />
            <KlettaInput label="Company Name" placeholder="Company ABC" />
            <KlettaSelect label="VAT Period">
                 <option>No VAT liability</option>
                 <option>Monthly</option>
                 <option>Quarterly</option>
                 <option>Yearly</option>
            </KlettaSelect>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm px-6 pt-4 pb-10 border-t border-gray-50 z-30">
         <button 
           onClick={() => navigate('incomplete-onboarding-tax-confirm')}
           className="w-full py-4 bg-kletta-yellow rounded-2xl text-kletta-dark font-medium text-[16px] shadow-sm active:scale-[0.98] transition-all"
         >
           Save and continue
         </button>
      </div>
    </div>
  );
};

// --- 3. STEP: TAX CONFIRM (MATCHES ONBOARDING STEP 4) ---
export const IncompleteTaxConfirm: React.FC<NavigationProps> = ({ navigate, goBack }) => {
  return (
    <div className="h-full w-full bg-white flex flex-col font-aktifo animate-fade-in relative overflow-hidden">
      <OnboardingHeader icon={<IconFile />} onClose={() => navigate('home', { showIncompleteOnboarding: true })} />
      
      <div className="flex-1 overflow-y-auto no-scrollbar px-6 pt-[60px] pb-60">
        <h1 className="text-[24px] font-bold text-kletta-dark text-center mb-5 tracking-tight">Confirm your tax return</h1>
        <p className="text-center text-kletta-dark font-normal text-[17px] leading-relaxed mb-10 max-w-[340px] mx-auto">
            Which is the first tax return you want Kletta to submit?
        </p>

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
      </div>

      <div className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm px-6 pt-4 pb-10 border-t border-gray-50 z-30">
         <button 
           onClick={() => navigate('incomplete-onboarding-phone')}
           className="w-full py-4 bg-kletta-yellow rounded-2xl text-kletta-dark font-medium text-[16px] shadow-sm active:scale-[0.98] transition-all"
         >
           Confirm and continue
         </button>
      </div>
    </div>
  );
};

// --- 4. STEP: PHONE (MATCHES ONBOARDING STEP 5) ---
export const IncompletePhone: React.FC<NavigationProps> = ({ navigate, goBack }) => {
  const [phone, setPhone] = useState('');
  const [prefix, setPrefix] = useState('+358');

  const handleVerify = () => {
    navigate('incomplete-onboarding-verify-code', { phone: `${prefix} ${phone}` });
  };

  return (
    <div className="h-full w-full bg-white flex flex-col font-aktifo animate-fade-in relative overflow-hidden">
      <OnboardingHeader icon={<IconPhone />} onClose={() => navigate('home', { showIncompleteOnboarding: true })} />
      
      <div className="flex-1 overflow-y-auto no-scrollbar px-6 pt-[60px] pb-60">
        <h1 className="text-[24px] font-bold text-kletta-dark text-center mb-5 tracking-tight">Phone number</h1>
        <p className="text-center text-kletta-dark font-normal text-[17px] leading-relaxed mb-10 max-w-[340px] mx-auto">
            Add your phone number. You will receive a verification code via SMS.
        </p>

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
                />
            </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm px-6 pt-4 pb-10 border-t border-gray-50 z-30">
         <button 
           onClick={handleVerify}
           disabled={phone.length < 5}
           className={`w-full py-4 rounded-2xl font-medium text-[16px] shadow-sm transition-all active:scale-[0.98] ${phone.length >= 5 ? 'bg-kletta-yellow text-kletta-dark' : 'bg-gray-100 text-gray-400'}`}
         >
           Verify
         </button>
      </div>
    </div>
  );
};

// --- 5. STEP: VERIFY CODE (LIKE SIGNUP/ONBOARDING) ---
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
    if (code.every(c => c !== '')) {
      navigate('home');
    }
  };

  return (
    <div className="h-full w-full bg-white flex flex-col font-aktifo animate-slide-up overflow-hidden">
      <div className="px-6 pt-16 pb-4 flex items-center bg-white z-10">
        <button onClick={goBack} className="w-10 h-10 -ml-2 rounded-full flex items-center justify-center hover:bg-gray-50 active:bg-gray-100 transition-colors">
          <IconBack size={26} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar px-8 pt-4 pb-32">
        <div className="max-w-[420px] mx-auto text-center md:text-left">
            <h2 className="text-[32px] font-medium text-kletta-dark mb-2 tracking-tight">Check your phone</h2>
            <p className="text-gray-700 text-[16px] font-light mb-10 leading-relaxed">
                We have sent a 6 digit code to <br/><span className="text-kletta-dark font-medium">{phone}</span>.
            </p>

            <div className="flex gap-3 justify-center mb-10">
                {code.map((digit, i) => (
                    <input
                        key={i}
                        id={`phone-code-${i}`}
                        type="tel"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleChange(i, e.target.value)}
                        className="w-[16%] h-14 bg-white border border-[#E6E8EC] rounded-[12px] text-center text-3xl font-bold text-kletta-dark outline-none focus:border-kletta-teal focus:ring-4 focus:ring-kletta-teal/5 transition-all shadow-sm"
                    />
                ))}
            </div>

            <div className="flex justify-center mb-12">
                <button className="text-gray-700 font-medium text-[13px] hover:opacity-80 transition-opacity">
                    Didn't receive code? Resend
                </button>
            </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 bg-white px-6 pt-4 pb-12 border-t border-gray-50 z-20">
         <button 
            onClick={handleFinish}
            disabled={!code.every(c => c !== '')}
            className={`w-full h-[60px] rounded-2xl text-kletta-dark font-semibold text-[16px] shadow-sm transition-all ${code.every(c => c !== '') ? 'bg-kletta-yellow hover:shadow-md active:scale-[0.98]' : 'bg-gray-100 text-gray-400'}`}
         >
            Finish setup
         </button>
      </div>
    </div>
  );
};
