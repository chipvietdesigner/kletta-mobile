import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { NavigationProps } from '../types';
import { 
  KlettaLogo, 
  IconCellSignalFull, 
  IconWifiHigh, 
  IconBatteryFull,
  IconCheck,
  IconStar,
  IconCar,
  IconLock,
  IconShield
} from '../components/Icons';


const FeatureCard: React.FC<{ title: string, illustration: React.ReactNode }> = ({ title, illustration }) => (
  <div className="bg-white rounded-[20px] px-3 pt-5 pb-4 flex flex-col items-center w-[125px] shrink-0 border border-black/[0.04] shadow-[0_4px_10px_rgba(0,0,0,0.03)] relative transform transition-all active:scale-[0.98]">
    <div className="absolute top-3 right-3 w-[20px] h-[20px] bg-[#FFDC3E] rounded-full border-[2px] border-white flex items-center justify-center z-20 shadow-sm">
      <IconCheck size={10} weight="bold" className="text-black" />
    </div>
    <div className="h-[75px] w-full flex items-center justify-center relative mb-3">
      {illustration}
    </div>
    <p className="text-[12.5px] font-bold text-center leading-[1.2] text-black px-1 min-h-[3.6em] flex items-center justify-center">
      {title}
    </p>
  </div>
);

const WelcomeScreen: React.FC<NavigationProps> = ({ navigate }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const features = [
    {
      title: "Laskutus, kuittiskannaus",
      illustration: (
        <div className="relative w-full h-full flex items-center justify-center">
          <div className="absolute top-[18%] left-[45%] w-[34px] h-[48px] bg-[#224449] rounded-[3px] rotate-[8deg] shadow-sm" />
          <div className="w-[36px] h-[48px] bg-white border border-gray-100 rounded-[3px] shadow-[0_2px_4px_rgba(0,0,0,0.05)] p-2 flex flex-col gap-1 -rotate-[6deg] transform translate-x-1 relative z-10">
              <div className="text-[4px] font-bold text-gray-400 uppercase tracking-tighter">INVOICE</div>
              <div className="w-full h-px bg-gray-100 mt-1" />
              <div className="w-full h-px bg-gray-100" />
              <div className="w-[70%] h-px bg-gray-100" />
              <div className="mt-auto flex justify-between items-end">
                <div className="text-[7px] font-bold text-[#FFDC3E]">€</div>
                <div className="w-[12px] h-px bg-gray-100" />
              </div>
          </div>
        </div>
      )
    },
    {
      title: "Käyttöomaisuus, GPS-seuranta",
      illustration: (
        <div className="w-full h-full flex items-center justify-center p-2">
          <div className="w-[54px] h-[38px] bg-white border border-gray-100 rounded-[5px] shadow-[0_2px_6px_rgba(0,0,0,0.05)] flex flex-col overflow-hidden">
              <div className="h-[7px] border-b border-gray-100 bg-[#005A66] flex items-center px-1.5 gap-0.5">
                <div className="w-[1.5px] h-[1.5px] rounded-full bg-white/40" />
                <div className="w-[1.5px] h-[1.5px] rounded-full bg-white/40" />
                <div className="w-[1.5px] h-[1.5px] rounded-full bg-white/40" />
              </div>
              <div className="flex-1 p-1.5 flex items-center gap-1.5">
                 <IconCar size={15} weight="fill" className="text-[#1A1A1A]" />
                 <div className="flex-1 space-y-1">
                    <div className="w-full h-px bg-gray-100" />
                    <div className="w-[85%] h-px bg-gray-100" />
                 </div>
              </div>
          </div>
        </div>
      )
    },
    {
      title: "Asiantuntijan chat-tuki",
      illustration: (
        <div className="w-full h-full flex items-center justify-center">
          <div className="relative">
            <div className="w-[40px] h-[28px] bg-[#005A66] rounded-[8px] rounded-bl-0 flex items-center justify-center shadow-lg -mr-4 relative z-10">
              <div className="flex gap-0.5">
                 <div className="w-[2px] h-[2px] rounded-full bg-white/60" />
                 <div className="w-[2px] h-[2px] rounded-full bg-white/60" />
                 <div className="w-[2px] h-[2px] rounded-full bg-white/60" />
              </div>
            </div>
            <div className="w-[40px] h-[28px] bg-white border border-gray-100 rounded-[8px] rounded-br-0 shadow-md -mt-4 ml-4 flex items-center justify-center">
              <div className="flex gap-0.5">
                 <div className="w-[2px] h-[2px] rounded-full bg-gray-200" />
                 <div className="w-[2px] h-[2px] rounded-full bg-gray-200" />
                 <div className="w-[2px] h-[2px] rounded-full bg-gray-200" />
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Reduce anxiety, Reassurance",
      illustration: (
        <div className="w-full h-full flex items-center justify-center">
          <div className="relative">
            <div className="w-[48px] h-[48px] bg-white rounded-full border border-gray-100 shadow-md flex items-center justify-center relative z-10">
              <IconShield size={24} weight="fill" className="text-[#005A66]" />
            </div>
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-[#FFDC3E] rounded-full border-2 border-white flex items-center justify-center z-20 shadow-sm">
               <IconLock size={10} weight="bold" className="text-black" />
            </div>
          </div>
        </div>
      )
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % features.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [features.length]);
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

      <div className="w-full flex-1 flex flex-col items-center justify-between px-6 py-4 overflow-hidden">
          
          <div className="w-full flex-1 flex flex-col items-center justify-center">
            {/* Logo Section */}
            <div className="flex flex-col items-center mb-8">
                <KlettaLogo color="black" className="scale-[1.15] mb-2" />
                <p className="text-[#005A66] font-bold text-[15px] tracking-wide">Toiminimiyrittäjille</p>
            </div>

            <h1 className="text-[32px] font-bold text-black mb-10 text-center leading-[1.05] px-2">
              Automatisoi<br />veroilmoitukset helposti
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
                  <p className="text-[12px] text-black/60 font-medium whitespace-nowrap">from 1000+ sole traders</p>
                </div>
            </div>

            {/* Carousel Section */}
            <div className="w-full relative mb-4 overflow-hidden px-4">
              <motion.div 
                className="flex gap-3"
                animate={{ x: -(activeIndex * (125 + 12)) }}
                transition={{ type: 'spring', damping: 25, stiffness: 120 }}
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
              14 päivän kokeilujakso - peruuta milloin tahansa - Ei luottokorttia
            </p>
          </div>

          {/* Bottom Buttons */}
          <div className="w-full flex flex-col gap-3.5 pb-6">
              <button 
                onClick={() => navigate('signup-email')}
                className="w-full h-[56px] bg-[#005A66] rounded-[16px] text-white font-bold text-[18px] active:scale-[0.98] transition-all flex items-center justify-center shadow-[0_4px_16px_rgba(0,90,102,0.25)]"
              >
                Luo tili
              </button>
              
              <button 
                onClick={() => navigate('login')}
                className="w-full h-[56px] bg-[#FFEE99] rounded-[16px] text-black font-bold text-[18px] active:scale-[0.98] transition-all flex items-center justify-center border-2 border-black/25"
              >
                Kirjaudu sisään
              </button>
          </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;
