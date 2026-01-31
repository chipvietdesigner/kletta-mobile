
import React from 'react';
import { NavigationProps } from '../types';
import { KlettaLogo, IconCellSignalFull, IconWifiHigh, IconBatteryFull } from '../components/Icons';

const WelcomeScreen: React.FC<NavigationProps> = ({ navigate }) => {
  return (
    <div className="h-full w-full flex flex-col items-center bg-[#F7F6EE] font-aktifo overflow-hidden selection:bg-kletta-yellow selection:text-kletta-dark animate-fade-in">
      
      {/* Phone Header / Status Bar */}
      <div className="w-full h-[50px] flex justify-between items-end px-6 pb-2 text-kletta-dark pointer-events-none z-20 shrink-0">
          <span className="text-[15px] font-medium tracking-normal leading-none ml-2">9:41</span>
          <div className="flex gap-1.5 items-center mr-1">
             <IconCellSignalFull size={16} weight="fill" />
             <IconWifiHigh size={16} weight="bold" />
             <IconBatteryFull size={24} weight="fill" className="rotate-0" />
          </div>
      </div>

      <div className="flex-1 w-full flex flex-col items-center px-8">
          {/* Top Logo */}
          <div className="pt-6 mb-6">
              <KlettaLogo color="black" className="h-8 w-auto" />
          </div>

          {/* Main Illustration: Smartphone Mockup */}
          <div className="relative w-full flex-1 flex items-center justify-center max-h-[450px]">
                  {/* Inner Phone Content (Dashboard Screenshot Integration) */}
                  <img 
                    src="https://images.unsplash.com/vector-1768028475271-fdd8e79664f7?q=80&w=1284&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                    alt="App Dashboard"
                    className="w-[full] max-h-[400px] object-cover opacity-100"
                  />
     
              {/* Subtle Shadow beneath phone */}
              <div className="absolute bottom-[-10px] w-[220px] h-[20px] bg-black/5 rounded-[100%] blur-xl" />
          </div>

          {/* Headline */}
          <div className="w-full text-center mt-10 mb-14">
              <h1 className="text-[24px] font-bold text-kletta-dark tracking-tight leading-[1.1] max-w-[300px] mx-auto">
                 Sole trader accounting made easy ✨
              </h1>
          </div>

          {/* Bottom Buttons */}
          <div className="w-full flex flex-col gap-4 pb-14">
              <button 
                 onClick={() => navigate('signup-email')}
                 className="w-full h-[60px] bg-kletta-yellow rounded-[16px] text-kletta-dark font-semibold text-[16px] active:scale-[0.98] transition-all shadow-sm"
              >
                 Create account
              </button>
              
              <button 
                 onClick={() => navigate('login')}
                 className="w-full py-4 text-kletta-dark font-normal text-[16px] active:opacity-60 transition-opacity"
              >
                 Have an account? <span className="underline font-semibold">Login</span>
              </button>
          </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;
