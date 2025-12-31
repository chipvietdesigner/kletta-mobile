import React from 'react';
import { NavigationProps } from '../types';
import { IconCheck, IconChartPieSlice, IconReceipt, KlettaLogo } from '../components/Icons';

const WelcomeScreen: React.FC<NavigationProps> = ({ navigate }) => {
  return (
    <div className="h-full w-full flex flex-col bg-white font-aktifo overflow-hidden selection:bg-kletta-yellow selection:text-kletta-dark animate-fade-in">
      
      {/* --- TOP SECTION (TEAL) --- */}
      <div className="flex-[1.6] bg-kletta-teal relative flex flex-col px-8 pt-16 pb-12">
         
         {/* Logo at Top - Centered */}
         <div className="flex justify-center mb-10">
            <KlettaLogo color="white" className="h-7 w-auto" />
         </div>

         {/* Abstract Illustration */}
         <div className="relative w-full h-[220px] mb-8 flex justify-center items-center">
            {/* Background Card (Verification) */}
            <div className="absolute top-[5%] left-1/2 -translate-x-[85%] w-[160px] h-[200px] bg-white/5 border border-white/10 rounded-[24px] backdrop-blur-md rotate-[-8deg] flex flex-col p-5 shadow-2xl">
               <div className="w-10 h-10 rounded-[12px] bg-kletta-yellow/20 flex items-center justify-center mb-auto">
                  <IconReceipt size={22} className="text-kletta-yellow" weight="fill" />
               </div>
               <div className="mt-auto">
                  <div className="flex items-center gap-2 mb-1">
                     <div className="w-4 h-4 rounded-full bg-[#008c9e] flex items-center justify-center">
                        <IconCheck size={10} color="white" weight="bold" />
                     </div>
                     <span className="text-[9px] font-medium text-white/40 uppercase tracking-widest">Auto-verified</span>
                  </div>
               </div>
            </div>

            {/* Foreground Card (Data) */}
            <div className="absolute top-[35%] left-1/2 -translate-x-[15%] w-[180px] h-[130px] bg-white/10 border border-white/20 rounded-[24px] backdrop-blur-xl rotate-[4deg] p-6 shadow-2xl z-20">
                <div className="flex justify-between items-start mb-4">
                   <div className="w-7 h-4.5 bg-white/20 rounded-sm"></div>
                   <IconChartPieSlice size={18} className="text-kletta-yellow opacity-80" weight="fill" />
                </div>
                <p className="text-[20px] font-medium text-white tracking-tight">€12,400.00</p>
                <p className="text-[9px] font-medium text-white/40 uppercase tracking-widest mt-1">Expenses Logged</p>
            </div>

            {/* Decorative Blur Circle */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-kletta-yellow/10 rounded-full blur-[60px] pointer-events-none"></div>
         </div>

         {/* Headlines and Text */}
      </div>

      {/* --- BOTTOM SECTION (WHITE) --- */}
      <div className="flex-1 bg-white px-8 pt-8 pb-8 flex flex-col justify-center">
         <div className="w-full flex flex-col gap-6">
            <h1 className="text-[28px] font-bold text-kletta-dark tracking-tighter max-w-[360px] text-center">
               Accounting app for<br />sole traders
            </h1>
            <p className="text-kletta-dark font-light text-[15px] leading-relaxed max-w-[360px] text-center pb-8">
               Kletta automates your accounting, VAT declarations and yearly income tax self assessment - easily, on time and correctly
            </p>
            <button 
               onClick={() => navigate('signup-email')}
               className="w-full h-[60px] bg-kletta-yellow rounded-[16px] text-kletta-dark font-semibold text-[16px] active:scale-[0.98] transition-all shadow-sm hover:shadow-md"
            >
               Create an account
            </button>
            
            <button 
               onClick={() => navigate('login')}
               className="w-full h-[60px] bg-white border border-kletta-teal/20 rounded-[16px] text-kletta-dark font-semibold text-[16px] active:scale-[0.98] transition-all hover:bg-gray-50"
            >
               Sign In
            </button>
         </div>
      </div>

    </div>
  );
};

export default WelcomeScreen;