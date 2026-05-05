import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { NavigationProps } from '../types';
import { useLanguage } from '../components/LanguageContext';
import { 
  KlettaLogo, 
  IconCellSignalFull, 
  IconWifiHigh, 
  IconBatteryFull,
  IconCheck,
  IconStar,
  IconLock,
  IconShield,
  IconShieldCheck,
  IconChevronDown,
  IconGlobe,
  IconReceipt,
  IconMapPin,
  IconChatTeardropText
} from '../components/Icons';


const FeatureCard: React.FC<{ title: string, illustration: React.ReactNode }> = ({ title, illustration }) => (
  <div className="bg-white rounded-[20px] px-3 pt-6 pb-6 flex flex-col items-center w-[125px] shrink-0 border border-black/[0.04] shadow-[0_4px_10px_rgba(0,0,0,0.03)] relative transform transition-all active:scale-[0.98]">
    <div className="h-[50px] w-full flex items-center justify-center relative mb-4">
      {illustration}
    </div>
    <p className="text-[12.5px] font-bold text-center leading-[1.2] text-black px-1 min-h-[3em] flex items-center justify-center">
      {title}
    </p>
  </div>
);

const WelcomeScreen: React.FC<NavigationProps> = ({ navigate }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [maxScroll, setMaxScroll] = useState(0);
  const { language, setLanguage, t } = useLanguage();

  const features = [
    {
      title: t('feature_invoicing'),
      illustration: <IconReceipt size={40} weight="fill" className="text-[#005A66]" />
    },
    {
      title: t('feature_assets'),
      illustration: <IconMapPin size={40} weight="fill" className="text-[#005A66]" />
    },
    {
      title: t('feature_chat'),
      illustration: <IconChatTeardropText size={40} weight="fill" className="text-[#005A66]" />
    }
  ];

  useEffect(() => {
    const updateMaxScroll = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const totalContentWidth = (features.length * 125) + ((features.length - 1) * 12) + 48; // cards + gaps + padding
        setMaxScroll(Math.max(0, totalContentWidth - containerWidth));
      }
    };
    
    updateMaxScroll();
    // Add small delay to ensure layout is complete
    const timer = setTimeout(updateMaxScroll, 100);
    
    window.addEventListener('resize', updateMaxScroll);
    return () => {
      window.removeEventListener('resize', updateMaxScroll);
      clearTimeout(timer);
    };
  }, [features.length]);

  useEffect(() => {
    if (isDragging) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % features.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [isDragging, features.length]);
  return (
    <div className="h-full w-full flex flex-col items-center bg-[#FFEE99] font-aktifo overflow-hidden selection:bg-kletta-yellow selection:text-kletta-dark animate-fade-in relative">
      
      {/* Phone Header / Status Bar */}
      <div className="w-full h-[50px] flex justify-between items-end px-6 pb-2 text-kletta-dark pointer-events-none z-20 shrink-0">
          <span className="text-[15px] font-medium tracking-normal leading-none ml-2">9:41</span>
          <div className="flex gap-1.5 items-center mr-1">
             <IconCellSignalFull size={16} weight="fill" />
             <IconWifiHigh size={16} weight="bold" />
             <IconBatteryFull size={24} weight="fill" className="rotate-0" />
          </div>
      </div>

      <div className="w-full flex-1 flex flex-col items-center justify-between px-6 py-4 overflow-hidden relative">
          {/* Language Switcher */}
          <div className="absolute top-0 right-4 z-50">
             <button 
               onClick={() => setShowLangMenu(!showLangMenu)}
               className="flex items-center gap-1.5 px-3 py-1.5 bg-white/40 backdrop-blur-md border border-black/5 rounded-full shadow-sm active:scale-95 transition-all"
             >
                <IconGlobe size={16} className="text-kletta-teal" />
                <span className="text-[14px] font-bold text-black">{language === 'fi' ? 'FI' : 'EN'}</span>
                <IconChevronDown size={14} className={`text-black/40 transition-transform ${showLangMenu ? 'rotate-180' : ''}`} />
             </button>

             <AnimatePresence>
               {showLangMenu && (
                 <motion.div 
                   initial={{ opacity: 0, y: -10, scale: 0.95 }}
                   animate={{ opacity: 1, y: 5, scale: 1 }}
                   exit={{ opacity: 0, y: -10, scale: 0.95 }}
                   className="absolute top-full right-0 bg-white rounded-[16px] shadow-xl border border-black/5 overflow-hidden w-[140px] mt-1"
                 >
                    <button 
                      onClick={() => { setLanguage('en'); setShowLangMenu(false); }}
                      className={`w-full px-4 py-3 flex items-center gap-3 active:bg-gray-50 transition-colors ${language === 'en' ? 'bg-[#005A66]/5' : ''}`}
                    >
                      <span className="text-[20px]">🇬🇧</span>
                      <span className={`text-[15px] font-bold ${language === 'en' ? 'text-[#005A66]' : 'text-black'}`}>English</span>
                    </button>
                    <div className="h-px bg-black/5 mx-2" />
                    <button 
                      onClick={() => { setLanguage('fi'); setShowLangMenu(false); }}
                      className={`w-full px-4 py-3 flex items-center gap-3 active:bg-gray-50 transition-colors ${language === 'fi' ? 'bg-[#005A66]/5' : ''}`}
                    >
                      <span className="text-[20px]">🇫🇮</span>
                      <span className={`text-[15px] font-bold ${language === 'fi' ? 'text-[#005A66]' : 'text-black'}`}>Suomi</span>
                    </button>
                 </motion.div>
               )}
             </AnimatePresence>
          </div>
          
          <div className="w-full flex-1 flex flex-col items-center justify-center">
            {/* Logo Section */}
            <div className="flex flex-col items-center mb-8">
                <KlettaLogo color="black" className="scale-[1.15] mb-2" />
                <p className="text-[#005A66] font-bold text-[15px] tracking-wide">{t('for_sole_traders')}</p>
            </div>

            <h1 className="text-[32px] font-bold text-black mb-10 text-center leading-[1.05] px-2 whitespace-pre-line">
              {t('automate_tax_returns')}
            </h1>

            {/* Social Proof Row */}
            <div className="flex items-center gap-4 mb-10">
                <div className="flex -space-x-3.5">
                  <img src="https://i.pravatar.cc/150?u=1" className="w-10 h-10 rounded-full border-2 border-white object-cover shadow-sm" alt="U1" referrerPolicy="no-referrer" />
                  <img src="https://i.pravatar.cc/150?u=2" className="w-10 h-10 rounded-full border-2 border-white object-cover shadow-sm" alt="U2" referrerPolicy="no-referrer" />
                  <img src="https://i.pravatar.cc/150?u=3" className="w-10 h-10 rounded-full border-2 border-white object-cover shadow-sm" alt="U3" referrerPolicy="no-referrer" />
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-0.5">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <IconStar key={i} className={i === 5 ? "text-[#005A66] opacity-30" : "text-[#005A66]"} size={18} weight="fill" />
                    ))}
                    <span className="text-[17px] font-bold text-black ml-2">4,3</span>
                  </div>
                  <p className="text-[12px] text-black/60 font-medium whitespace-nowrap">{t('from_traders')}</p>
                </div>
            </div>

            {/* Carousel Section */}
            <div className="w-full relative mb-4 overflow-hidden" ref={containerRef}>
              <motion.div 
                className="flex gap-3 px-6 cursor-grab active:cursor-grabbing"
                drag="x"
                dragConstraints={{ left: -maxScroll, right: 0 }}
                dragElastic={0.2}
                onDragStart={() => setIsDragging(true)}
                onDragEnd={(_e, info) => {
                  setIsDragging(false);
                  const dragOffset = info.offset.x;
                  if (Math.abs(dragOffset) > 40) {
                    if (dragOffset > 0) setActiveIndex(Math.max(0, activeIndex - 1));
                    else setActiveIndex(Math.min(features.length - 1, activeIndex + 1));
                  }
                }}
                animate={{ x: Math.max(-maxScroll, -(activeIndex * 137)) }}
                transition={{ type: 'spring', damping: 28, stiffness: 150 }}
              >
                {features.map((feature, i) => (
                  <FeatureCard 
                    key={i} 
                    title={feature.title} 
                    illustration={feature.illustration} 
                  />
                ))}
              </motion.div>
            </div>

            {/* Pagination Dots */}
            <div className="flex gap-3 mb-6">
                {features.map((_, i) => (
                  <div 
                    key={i}
                    className={`h-2.5 rounded-full transition-all duration-500 ${
                      i === activeIndex ? "w-6 bg-[#005A66]" : "w-2.5 bg-black/[0.08]"
                    }`} 
                  />
                ))}
            </div>

            <p className="text-[14px] font-medium text-black/70 text-center leading-relaxed max-w-[320px] px-4">
              {t('trial_text')}
            </p>
          </div>

          {/* Bottom Buttons */}
          <div className="w-full flex flex-col gap-3.5 pb-6">
              <button 
                onClick={() => navigate('signup-email')}
                className="w-full h-[52px] bg-[#002D33] rounded-[12px] text-white font-bold text-[18px] active:scale-[0.98] transition-all flex items-center justify-center shadow-[0_4px_16px_rgba(0,45,51,0.25)]"
              >
                {t('create_account')}
              </button>
              
              <button 
                onClick={() => navigate('login')}
                className="w-full h-[52px] bg-[#FFEE99] rounded-[12px] text-black font-bold text-[18px] active:scale-[0.98] transition-all flex items-center justify-center border-2 border-black/25"
              >
                {t('log_in')}
              </button>
          </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;
