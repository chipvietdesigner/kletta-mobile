
import React, { useState, useEffect, useRef } from 'react';
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
  IconPencilSimple,
  IconCalendarBlank,
  IconSparkle,
  IconClose,
  IconChevronRight,
  IconArrowSquareOut,
  IconMotorcycle
} from '../components/Icons';
import { KlettaInput, KlettaSelect } from '../components/Inputs';

// --- Confetti Animation Component ---
const Confetti = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.offsetWidth;
    const height = canvas.offsetHeight;
    canvas.width = width * window.devicePixelRatio;
    canvas.height = height * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    const particles: any[] = [];
    const colors = ['#FFD93B', '#00343B', '#005c66', '#FFEE99', '#616A6B'];

    const createBurst = (count: number) => {
      for (let i = 0; i < count; i++) {
        particles.push({
          x: width / 2,
          y: height / 2.8, 
          vx: (Math.random() - 0.5) * 14,
          vy: (Math.random() - 0.5) * 16 - 6,
          r: Math.random() * 5 + 3,
          color: colors[Math.floor(Math.random() * colors.length)],
          tilt: Math.random() * 10 - 10,
          tiltAngleIncremental: Math.random() * 0.05 + 0.03,
          tiltAngle: 0,
          opacity: 1
        });
      }
    };

    createBurst(100);
    const secondBurstTimer = setTimeout(() => createBurst(60), 1200);

    let animationId: number;
    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      let alive = false;
      particles.forEach((p) => {
        if (p.opacity <= 0) return;
        alive = true;
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.15;
        p.vx *= 0.98;
        p.tiltAngle += p.tiltAngleIncremental;
        p.tilt = Math.sin(p.tiltAngle) * 15;
        p.opacity -= 0.0025;
        ctx.globalAlpha = p.opacity;
        ctx.fillStyle = p.color;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.tiltAngle);
        ctx.fillRect(-p.r, -p.r / 2, p.r * 2, p.r);
        ctx.restore();
      });
      if (alive || !!secondBurstTimer) animationId = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      if (animationId) cancelAnimationFrame(animationId);
      clearTimeout(secondBurstTimer);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-[120] w-full h-full" />;
};

// --- Global state to track if we are already in the flow to prevent re-sliding up the entire sheet ---
let flowWasAlreadyOpen = false;

// --- Shared Layout with Custom Header ---
interface OnboardingLayoutProps extends React.PropsWithChildren {
    title: string;
    subtitle?: string | React.ReactNode;
    icon: React.ReactNode;
    onPrimary: () => void;
    onSecondary?: () => void;
    onTertiary?: () => void;
    onBack?: () => void;
    primaryLabel?: string;
    secondaryLabel?: string;
    tertiaryLabel?: string;
    disablePrimary?: boolean;
    secondaryNavigates?: boolean;
    noScroll?: boolean;
}

const OnboardingHeader = ({ icon, onBack }: { icon: React.ReactNode, onBack?: () => void }) => {
    return (
        <div className="relative w-full shrink-0 z-20 bg-white">
            <div className="w-full h-[120px] relative overflow-hidden bg-white">
                <svg viewBox="0 0 400 120" preserveAspectRatio="none" className="absolute inset-0 w-full h-full">
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
            </div>

            <div className="absolute bottom-[-36px] left-0 right-0 flex justify-center items-center pointer-events-none">
                <div className="w-[92px] h-[92px] rounded-full bg-white flex items-center justify-center shadow-md">
                    <div className="w-[84px] h-[84px] rounded-full bg-white border-[4px] border-kletta-teal flex items-center justify-center">
                        {React.cloneElement(icon as React.ReactElement<any>, { 
                            color: '#00343B', 
                            size: 44, 
                            weight: 'fill'
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

const OnboardingLayout: React.FC<OnboardingLayoutProps> = ({ 
    title, subtitle, icon, children, onPrimary, onSecondary, onTertiary, onBack,
    primaryLabel = "Continue", secondaryLabel, tertiaryLabel, disablePrimary = false, secondaryNavigates = false, noScroll = false
}) => {
    const [isTransitioning, setIsTransitioning] = useState(false);

    useEffect(() => {
        flowWasAlreadyOpen = true;
    }, []);

    const handlePrimaryClick = () => {
        setIsTransitioning(true);
        setTimeout(() => onPrimary(), 400);
    };

    const handleSecondaryClick = () => {
        if (onSecondary) {
            if (secondaryNavigates) {
                setIsTransitioning(true);
                setTimeout(() => onSecondary(), 400);
            } else {
                onSecondary();
            }
        }
    };

    return (
        <div className="absolute inset-0 z-50 flex flex-col justify-end font-aktifo overflow-hidden">
            <div className={`absolute inset-0 bg-black/60 backdrop-blur-sm ${flowWasAlreadyOpen ? '' : 'animate-fade-in'}`} />

            <div className={`h-[92%] w-full bg-white rounded-t-[32px] shadow-2xl relative z-10 overflow-hidden flex flex-col ${flowWasAlreadyOpen ? '' : 'animate-slide-up'}`}>
                <OnboardingHeader 
                    icon={icon} 
                    onBack={onBack} 
                />

                <div className={`flex-1 ${noScroll ? 'overflow-hidden' : 'overflow-y-auto no-scrollbar'} px-6 pt-[50px] pb-60 bg-white transition-opacity duration-600 ${isTransitioning ? 'opacity-0' : 'opacity-100 animate-slide-in-right'}`}>
                    <h1 className="text-[24px] font-bold text-kletta-dark text-center mb-4 leading-tight tracking-tight">{title}</h1>
                    {subtitle && (
                        <div className="text-center text-kletta-dark font-normal text-[16px] leading-relaxed mb-6 max-w-[340px] mx-auto">
                            {subtitle}
                        </div>
                    )}
                    <div className="w-full">
                        {children}
                    </div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm px-6 pt-4 pb-10 border-t border-gray-100 z-30 flex flex-col items-center">
                <button 
                    onClick={handlePrimaryClick}
                    disabled={disablePrimary}
                    className={`w-full py-4 rounded-2xl font-medium text-[16px] shadow-sm transition-all active:scale-[0.98] ${disablePrimary ? 'bg-gray-100 text-gray-400' : 'bg-kletta-yellow text-kletta-dark hover:shadow-md'}`}
                >
                    {primaryLabel}
                </button>
                
                {onSecondary && secondaryLabel && (
                    <button 
                        onClick={handleSecondaryClick}
                        className="w-full pt-7 pb-5 text-kletta-dark font-medium text-[16px] hover:opacity-70 transition-colors"
                    >
                        {secondaryLabel}
                    </button>
                )}

                {onTertiary && tertiaryLabel && (
                    <button 
                        onClick={onTertiary}
                        className="w-full py-2 text-kletta-dark font-bold text-[15px] hover:opacity-70 transition-opacity"
                    >
                        {tertiaryLabel}
                    </button>
                )}
                </div>
            </div>
        </div>
    );
};

export const resetOnboardingFlowState = () => {
    flowWasAlreadyOpen = false;
};

// --- Step 0: Welcome Sole Proprietor ---
export const OnboardingWelcome: React.FC<NavigationProps> = ({ navigate }) => {
    return (
        <OnboardingLayout
            title="Welcome sole trader!"
            icon={<IconHandWaving weight="fill" />}
            primaryLabel="Transfer my accounting to Kletta"
            secondaryLabel="I am a new sole proprietor"
            secondaryNavigates={true}
            onPrimary={() => navigate('onboarding-1')}
            onSecondary={() => navigate('onboarding-1')}
        >
            <Confetti />
            <div className="flex flex-col items-center px-2 text-center">
                <div className="space-y-6">
                    <p className="text-kletta-dark font-normal text-[15px] leading-relaxed">
                        Kletta automatically sends your scheduled VAT and tax returns based on the invoices you submit, the receipts you photograph, and the trips you log.
                    </p>
                    <p className="text-kletta-dark font-normal text-[15px] leading-relaxed">
                        You will always get fast support through chat, and with the DUO or CARE subscriptions you can also book video meetings with an accountant.
                    </p>
                    <p className="text-kletta-dark font-normal text-[15px] leading-relaxed">
                        Are you transferring your bookkeeping to Kletta or starting your business now?
                    </p>
                </div>
            </div>
        </OnboardingLayout>
    );
};

// --- Step 1: Authorization ---
export const OnboardingStep1: React.FC<NavigationProps> = ({ navigate, goBack }) => {
    return (
        <OnboardingLayout
            title="Grant tax-filing authorizations"
            icon={<IconShield weight="fill" />}
            primaryLabel="Continue"
            onPrimary={() => navigate('onboarding-2')}
            onBack={goBack}
        >
            <div className="flex flex-col items-center space-y-6">
                <p className="text-kletta-dark text-[15px] font-normal leading-relaxed text-center">
                    Grant the required tax-filing authorizations in the suomi.fi service. We will send the request until next business day.
                </p>
                <p className="text-kletta-dark text-[15px] font-normal leading-relaxed text-center">
                    These authorizations are needed to review and handle your tax matters.
                </p>
                
                <div className="w-full pt-4">
                    <button 
                        onClick={() => {}} 
                        className="w-full flex items-center justify-between p-5 bg-[#FAFAFA] border border-gray-100 rounded-[16px] shadow-sm active:bg-gray-100 transition-colors text-left"
                    >
                        <span className="text-[15px] font-medium text-kletta-dark">I want to read more about mandates</span>
                        <IconArrowSquareOut size={20} className="text-kletta-dark" weight="bold" />
                    </button>
                </div>
            </div>
        </OnboardingLayout>
    );
};

// --- Step 2: Tax Info ---
export const OnboardingStep2: React.FC<NavigationProps> = ({ navigate, goBack }) => {
    const [vatPeriod, setVatPeriod] = useState('No VAT liability');

    return (
        <OnboardingLayout
            title="Add your tax information"
            subtitle="Support will verify your Business ID (Y-tunnus) and tax period. After verification, tax reports will be sent automatically."
            icon={<IconFile weight="fill" />}
            onPrimary={() => navigate('onboarding-3')}
            onSecondary={() => navigate('onboarding-3')}
            secondaryLabel="Later"
            onBack={goBack}
        >
            <div className="space-y-6 mb-8">
                <KlettaInput label="Business name" placeholder="Company ABC" />
                <KlettaInput label="Finnish business ID" placeholder="1234567-8" />
                
                <KlettaSelect 
                    label="VAT return period" 
                    value={vatPeriod} 
                    onChange={(e) => setVatPeriod(e.target.value)}
                >
                     <option>No VAT liability</option>
                     <option>Monthly</option>
                     <option>Quarterly</option>
                     <option>Yearly</option>
                </KlettaSelect>

                {/* Conditional reporting period selection embedded here for Monthly selection */}
                {vatPeriod === 'Monthly' && (
                    <div className="space-y-6 animate-fade-in pt-2">
                        <div className="bg-gray-50/50 p-4 rounded-2xl border border-gray-100">
                             <p className="text-[14px] font-medium text-kletta-dark mb-4 text-center">What is the first VAT return that Kletta will send for you?</p>
                            <KlettaSelect label="Year">
                                <option>2026</option>
                                <option>2025</option>
                            </KlettaSelect>
                            <div className="h-4" />
                            <KlettaSelect label="Month">
                                <option>January</option>
                                <option>February</option>
                                <option>March</option>
                                <option>April</option>
                                <option>May</option>
                                <option>June</option>
                                <option>July</option>
                                <option>August</option>
                                <option>September</option>
                                <option>October</option>
                                <option>November</option>
                                <option>December</option>
                            </KlettaSelect>
                        </div>
                    </div>
                )}

                <div className="bg-[#F7F6EE] p-5 rounded-2xl text-kletta-dark text-[15px] font-normal leading-relaxed mt-4">
                    Please note that you cannot change this selection later.
                </div>
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
            onPrimary={() => navigate('onboarding-5')}
            onSecondary={() => navigate('onboarding-5')}
            secondaryLabel="Later"
            disablePrimary={selected === null}
            onBack={goBack}
        >
            <div className="space-y-3">
               {/* Card 1: Upload */}
               <button 
                  onClick={() => setSelected(1)}
                  className={`w-full flex flex-col items-center justify-center p-5 rounded-[20px] border-2 transition-all group ${selected === 1 ? 'border-gray-300 border-dashed bg-white' : 'border-gray-100 bg-white active:border-gray-300'}`}
               >
                  <div className="text-kletta-teal mb-2 group-active:scale-95 transition-transform">
                     <IconFileArrowUp size={32} weight="regular" />
                  </div>
                  <h3 className="text-[15px] font-medium text-kletta-dark mb-1">Upload statement</h3>
                  <p className="text-[14px] text-gray-500 font-normal leading-tight text-center max-w-[240px]">
                     Kletta will automatically read the necessary data.
                  </p>
               </button>

               {/* Card 2: Take Photo */}
               <button 
                  onClick={() => {
                    setSelected(2);
                    navigate('scan-receipt-camera', { type: 'statement' });
                  }}
                  className={`w-full flex items-start gap-4 p-4 rounded-[20px] border-2 text-left transition-all group ${selected === 2 ? 'border-gray-300 bg-white' : 'border-gray-100 bg-white active:border-gray-300'}`}
               >
                  <div className="text-kletta-dark mt-1 shrink-0 group-active:scale-95 transition-transform">
                     <IconScan size={30} weight="regular" />
                  </div>
                  <div className="flex-1">
                     <h3 className="text-[15px] font-medium text-kletta-dark mb-0.5 leading-snug">Take a photo of the statement</h3>
                     <p className="text-[14px] text-gray-500 font-normal leading-tight">
                        Kletta will automatically read the necessary data.
                     </p>
                  </div>
               </button>

               {/* Card 3: Manual Entry */}
               <button 
                  onClick={() => {
                    setSelected(3);
                    navigate('onboarding-manual-entry');
                  }}
                  className={`w-full flex items-start gap-4 p-4 rounded-[20px] border-2 text-left transition-all group ${selected === 3 ? 'border-gray-300 bg-white' : 'border-gray-100 bg-white active:border-gray-300'}`}
               >
                  <div className="text-kletta-dark mt-1 shrink-0 group-active:scale-95 transition-transform">
                     <IconPencilSimple size={30} weight="regular" />
                  </div>
                  <div className="flex-1">
                     <h3 className="text-[15px] font-medium text-kletta-dark mb-0.5">Enter the data manually</h3>
                     <p className="text-[14px] text-gray-500 font-normal leading-tight">
                        Note! We still need a photo of your income statement to verify the information.
                     </p>
                  </div>
               </button>
            </div>
        </OnboardingLayout>
    );
};

// --- ONBOARDING MANUAL ENTRY FORM ---
export const OnboardingManualEntry: React.FC<NavigationProps> = ({ navigate, goBack }) => {
    return (
        <OnboardingLayout
            title="Year-to-date entry"
            subtitle="Input the amounts from your income statement. Amounts should not include value-added taxes (Excl. VAT)."
            icon={<IconPencilSimple weight="fill" />}
            onPrimary={() => navigate('onboarding-5')}
            onBack={goBack}
        >
            <div className="space-y-10">
                {/* Year Dropdown */}
                <div className="flex justify-between items-center px-2">
                    <span className="text-[17px] font-bold text-kletta-dark">Year</span>
                    <div className="flex items-center gap-2">
                        <span className="text-[17px] font-medium text-kletta-dark">2026</span>
                        <IconChevronDown size={20} className="text-kletta-dark" />
                    </div>
                </div>

                {/* Income Section */}
                <div className="space-y-6">
                    <div>
                        <h3 className="text-[18px] font-bold text-kletta-dark mb-1">Income</h3>
                        <p className="text-[14px] text-gray-500 font-normal">Early year / Year-to-date</p>
                    </div>
                    <div className="space-y-4">
                        <FinancialInputRow label="Sales" sub="Year-to-date revenue" />
                        <FinancialInputRow label="Grants and subsidies" sub="Government support or additional income" />
                        <FinancialInputRow label="Other income" sub="e.g. capital gains from fixed assets or compensation" />
                        <FinancialInputRow label="Interest and other financial income" />
                    </div>
                </div>

                {/* Expenses Section */}
                <div className="space-y-6">
                    <div>
                        <h3 className="text-[18px] font-bold text-kletta-dark mb-1">Expenses</h3>
                        <p className="text-[14px] text-gray-500 font-normal">Early year / Year-to-date</p>
                        <p className="text-[12px] text-gray-400 mt-2 leading-relaxed">Fill only necessary fields. If there isn't a specific field for a cost on the income statement, include it in "Other deductible expenses".</p>
                    </div>
                    <div className="space-y-4">
                        <FinancialInputRow label="Purchases and inventory changes" sub="Goods and materials for customers" />
                        <FinancialInputRow label="External services" sub="Subcontracting" />
                        <FinancialInputRow label="Representation expenses" sub="Only 50% are deductible. Enter full amount here, Kletta will calculate the half." />
                        <FinancialInputRow label="Rents" sub="e.g. office space or parking spot rental" />
                        <FinancialInputRow label="Other deductible expenses" sub="e.g. accounting, phone, internet, travel, public transport and marketing costs" />
                        <FinancialInputRow label="Interest expenses" sub="e.g. interest on loans" />
                        <FinancialInputRow label="Other financial expenses" sub="e.g. loan handling or reminder fees" />
                        <FinancialInputRow label="Personnel costs" sub="e.g. YEL and personal insurances" />
                        <FinancialInputRow label="Vehicle costs" sub="Fuel, maintenance, parts. Deductible if business use > 50%" />
                    </div>
                </div>

                {/* Others Section */}
                <div className="space-y-6">
                    <div>
                        <h3 className="text-[18px] font-bold text-kletta-dark mb-1">Others</h3>
                        <p className="text-[14px] text-gray-500 font-normal">To date</p>
                        <p className="text-[12px] text-gray-400 mt-2 leading-relaxed">Fill only necessary fields.</p>
                    </div>
                    <div className="space-y-4">
                        <FinancialInputRow label="Tax prepayment" sub="How much you have already paid in advanced taxes?" isOthers />
                        <FinancialInputRow label="Private withdrawals" sub="How much money have you taken for yourself?" isOthers />
                        
                        {/* Highlighted card for Total Paid VATs */}
                        <div className="bg-[#F7F6EE] p-5 rounded-2xl space-y-4 border border-gray-100/50">
                            <div>
                                <p className="text-[15px] font-bold text-kletta-dark leading-tight">Total of paid VATs</p>
                                <p className="text-[13px] text-gray-500 font-light mt-1">Enter total amount of already paid VATs.</p>
                            </div>
                            <input 
                                type="text"
                                placeholder="0"
                                className="w-full h-12 bg-white rounded-xl border border-gray-200 px-4 text-right text-[17px] font-medium text-kletta-dark outline-none focus:border-kletta-teal transition-all"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </OnboardingLayout>
    );
};

const FinancialInputRow = ({ label, sub, isOthers }: { label: string, sub?: string, isOthers?: boolean }) => (
    <div className="flex items-start justify-between py-2 group">
        <div className="flex-1 pr-4">
            <p className="text-[15px] font-bold text-kletta-dark leading-tight">{label}</p>
            {sub && <p className="text-[12px] text-gray-500 font-light mt-1 leading-snug">{sub}</p>}
        </div>
        <div className="w-[120px] shrink-0">
            <input 
                type="text" 
                placeholder={isOthers ? "0" : "Excl. VAT"} 
                className="w-full h-12 bg-white border border-gray-200 rounded-[14px] px-4 text-right text-[15px] font-medium text-kletta-dark outline-none focus:border-kletta-teal transition-all placeholder:text-gray-300"
            />
        </div>
    </div>
);

// --- Step 5: Phone Number ---
export const OnboardingStep5: React.FC<NavigationProps> = ({ navigate, goBack }) => {
    return (
        <OnboardingLayout
            title="Phone number"
            subtitle="Add your phone number. You will receive a verification code via SMS."
            icon={<IconPhone weight="fill" />}
            onPrimary={() => navigate('onboarding-6')}
            onSecondary={() => navigate('onboarding-6')}
            secondaryLabel="Later"
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
                    <KlettaInput type="tel" placeholder="40 123 4567" autoFocus />
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
    // Option 1 is select default as per request
    const [selected, setSelected] = useState<number | null>(1);

    const handleContinue = () => {
        if (selected === 1 || selected === 2) {
            navigate('onboarding-8');
        } else {
            resetOnboardingFlowState();
            navigate('home');
        }
    };

    return (
        <OnboardingLayout
            title="Vehicle for work use"
            subtitle="Do you own a vehicle that you use for work purposes?"
            icon={<IconCar weight="fill" />}
            onPrimary={handleContinue}
            disablePrimary={selected === null}
            onBack={goBack}
        >
            <div className="space-y-4">
                <SelectionCard 
                    icon={<IconCar size={24} />} 
                    title="I own a car (>50% for work)" 
                    desc="Car is a business asset, expenses deductible."
                    selected={selected === 1}
                    onClick={() => setSelected(1)}
                />
                <SelectionCard 
                    icon={<IconCar size={24} />} 
                    title="I own a car (<50% for work)" 
                    desc="Not a business asset, mileage deductible."
                    selected={selected === 2}
                    onClick={() => setSelected(2)}
                />
                <SelectionCard 
                    icon={<IconMotorcycle size={24} />} 
                    title="I don’t have a car for work use" 
                    desc="You can add it later."
                    selected={selected === 3}
                    onClick={() => setSelected(3)}
                />
            </div>
        </OnboardingLayout>
    );
};

// --- Step 8: Add Vehicle ---
export const OnboardingStep8: React.FC<NavigationProps> = ({ navigate, goBack }) => {
    const [vehicleType, setVehicleType] = useState('Passenger car');
    const [acquisitionType, setAcquisitionType] = useState('Transfer from personal ownership');
    const [proportion, setProportion] = useState('Less than 50%');
    const [taxRate, setTaxRate] = useState('10%');

    return (
        <OnboardingLayout
            title="Add a vehicle"
            subtitle="The name helps you distinguish between vehicles. It will not be visible to others."
            icon={<IconCar weight="fill" />}
            primaryLabel="Confirm and continue"
            onPrimary={() => { resetOnboardingFlowState(); navigate('home'); }}
            onBack={goBack}
        >
            <div className="space-y-10">
                <KlettaInput label="VEHICLE NAME" placeholder="e.g. Van or ABC-123" />
                <div>
                    <label className="text-[11px] font-medium text-kletta-secondary uppercase tracking-wider ml-1 mb-6 block">VEHICLE TYPE</label>
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
                <div className="bg-[#F8F9FA] py-8 px-6 -mx-6 flex items-center justify-between">
                    <span className="text-[13px] font-medium text-kletta-dark uppercase tracking-wider">BUSINESS USE</span>
                    <div className="relative">
                        <select 
                            value={proportion}
                            onChange={(e) => setProportion(e.target.value)}
                            className="bg-white border border-gray-200 rounded-[10px] pl-4 pr-10 py-2.5 text-[15px] font-medium text-kletta-dark appearance-none shadow-sm outline-none"
                        >
                            <option>Less than 50%</option>
                            <option>More than 50%</option>
                            <option>100%</option>
                        </select>
                        <IconChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" weight="bold" />
                    </div>
                </div>
                <div>
                    <label className="text-[11px] font-medium text-kletta-secondary uppercase tracking-wider ml-1 mb-6 block leading-relaxed">
                        Is this a transfer of personal property to the business name or a new acquisition?
                    </label>
                    <div className="space-y-4">
                        <CardRadioItem 
                            label="Transfer from personal ownership" 
                            active={acquisitionType === 'Transfer from personal ownership'} 
                            onClick={() => setAcquisitionType('Transfer from personal ownership')} 
                        />
                        <CardRadioItem 
                            label="Transfer from previous bookkeeping" 
                            active={acquisitionType === 'Transfer from previous bookkeeping'} 
                            onClick={() => setAcquisitionType('Transfer from previous bookkeeping')} 
                        />
                        <CardRadioItem 
                            label="New acquisition" 
                            active={acquisitionType === 'New acquisition'} 
                            onClick={() => setAcquisitionType('New acquisition')} 
                        />
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
        className={`w-full text-left p-5 rounded-[16px] border-[1.5px] transition-all duration-200 flex items-center gap-5 active:scale-[0.98] ${selected ? 'border-kletta-teal bg-[#F0FBFC]' : 'border-gray-200 bg-white'}`}
    >
        <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${selected ? 'bg-kletta-teal text-white shadow-sm' : 'text-kletta-teal'}`}>
            {React.cloneElement(icon as React.ReactElement<any>, { 
                weight: selected ? 'fill' : 'regular',
                size: 28 
            })}
        </div>
        <div className="flex-1 pt-0.5">
            <h3 className="font-bold text-[18px] text-kletta-dark leading-tight mb-1">{title}</h3>
            <p className="text-[15px] text-gray-500 leading-snug font-normal">{desc}</p>
        </div>
    </button>
);

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
