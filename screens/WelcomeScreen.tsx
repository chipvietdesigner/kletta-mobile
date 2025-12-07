
import React from 'react';
import { KlettaLogo } from '../components/Icons';
import { NavigationProps } from '../types';

const WelcomeScreen: React.FC<NavigationProps> = ({ navigate }) => {
  return (
    <div className="h-full w-full flex flex-col bg-white overflow-hidden relative font-aktifo">
      
      {/* Top Hero Section */}
      <div className="flex-1 bg-kletta-teal relative flex flex-col items-center pt-14">
         {/* Background Curves */}
         <div className="absolute inset-0 overflow-hidden pointer-events-none">
             <div className="absolute -top-20 -left-20 w-72 h-72 bg-white opacity-5 rounded-full blur-3xl"></div>
             <div className="absolute top-40 -right-20 w-80 h-80 bg-kletta-yellow opacity-10 rounded-full blur-3xl"></div>
         </div>

         {/* Logo
          */}
        <div className="relative z-10 mt-6 mb-10">
            <KlettaLogo color="white" className="h-10" />
        </div>
        

         {/* Hero Image / Illustration */}
         <div className="relative z-10 w-full max-w-[360px] flex-1 flex items-end justify-center pb-2 px-4">
            <div className="w-72 h-[380px] bg-gradient-to-b from-gray-700 to-gray-900 rounded-[36px] border-[6px] border-gray-800 shadow-2xl relative overflow-hidden transform rotate-[-4deg]">
                {/* Mockup Screen */}
                <div className="absolute inset-0 bg-gray-100 flex flex-col">
                    <div className="h-36 bg-kletta-teal w-full rounded-b-xl p-5">
                       <div className="w-14 h-14 bg-white/20 rounded-full mb-3"></div>
                       <div className="h-2 w-24 bg-white/20 rounded mb-1.5"></div>
                       <div className="h-6 w-36 bg-white/30 rounded"></div>
                    </div>
                    <div className="p-5 space-y-3">
                       <div className="h-14 bg-white rounded-xl shadow-sm"></div>
                       <div className="h-14 bg-white rounded-xl shadow-sm"></div>
                       <div className="h-14 bg-white rounded-xl shadow-sm"></div>
                    </div>
                </div>
            </div>
            {/* Decorative Card */}
             <div className="absolute bottom-28 -right-4 bg-white p-4 rounded-2xl shadow-xl transform rotate-[6deg] max-w-[160px] animate-slide-up">
                <div className="flex items-center gap-2 mb-1">
                   <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
                   <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wide">Incoming</span>
                </div>
                <div className="font-bold text-xl text-kletta-dark font-aktifo">+€1,250.00</div>
             </div>
         </div>
         
         {/* Bottom Curve Divider */}
         <div className="absolute bottom-0 left-0 right-0 h-10 bg-white rounded-t-[24px] z-10"></div>
      </div>

      {/* Bottom Content Section */}
      <div className="bg-white px-8 pb-20 pt-2 flex flex-col items-center text-center z-20 font-aktifo">
        <h1 className="text-[30px] font-bold text-kletta-dark mb-16 leading-tight tracking-tight">
          Make your accounting <br />
          <span className="text-kletta-teal">simple</span>, clear and stress-free.
        </h1>
        
        {/* <p className="text-gray-500 text-lg mb-10 max-w-xs leading-relaxed">
        //   The all-in-one solution for sole traders.
        // </p> */}

        <button 
          onClick={() => navigate('signup-email')} 
          className="w-full py-4 bg-kletta-yellow rounded-2xl text-kletta-dark font-bold text-[16px] mb-4 active:scale-95 transition-transform shadow-sm hover:shadow-md"
        >
          Get started
        </button>

        <button 
          onClick={() => navigate('login')}
          className="py-4 text-kletta-teal font-bold text-[16px] active:opacity-60 transition-opacity"
        >
          I already have an account
        </button>
      </div>
    </div>
  );
};

export default WelcomeScreen;
