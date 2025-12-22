import React from 'react';
import { NavigationProps } from '../types';
import { IconArrowRight } from '../components/Icons';

const WelcomeScreen: React.FC<NavigationProps> = ({ navigate }) => {
  return (
    <div className="h-full w-full flex flex-col bg-[#F0F7F6] relative font-aktifo overflow-hidden">
      
      {/* --- TOP SECTION --- */}
      <div className="flex-1 flex flex-col items-center pt-14 px-8 relative z-0">
         
         {/* Headline */}
         <h1 className="text-[32px] leading-[1.15] font-medium text-[#00343B] text-center tracking-tight mb-10 max-w-[300px]">
            Sole trader accounting made easy
         </h1>

         {/* Hero Visual Container */}
         <div className="relative w-full max-w-[280px]">
             
             {/* Arch Image - Rounded Top, Flat Bottom */}
             <div className="w-full aspect-[0.9] bg-white rounded-t-[140px] rounded-b-[4px] overflow-hidden relative z-10 shadow-lg">
                 <img 
                    src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=800" 
                    alt="European Cafe Working" 
                    className="w-full h-full object-cover"
                 />
                 {/* Gradient overlay */}
                 <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
             </div>

             {/* Floating Info Card */}
             <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-[108%] bg-white rounded-[24px] p-5 shadow-[0_12px_30px_rgba(0,52,59,0.1)] z-20">
                <div className="flex justify-between items-center mb-4">
                    <span className="text-[15px] font-bold text-[#00343B]">Kletta</span>
                    <IconArrowRight size={18} weight="bold" className="text-[#00343B]" />
                </div>
                
                <div className="flex items-end justify-between">
                     {/* Abstract Icons */}
                     <div className="flex -space-x-2 pb-1">
                        <div className="w-8 h-8 rounded-full bg-[#E0F7F5] border-2 border-white flex items-center justify-center text-[#00343B] z-10">
                           <div className="w-3.5 h-3.5 bg-[#008c9e] rounded-full"></div>
                        </div>
                        <div className="w-8 h-8 rounded-full bg-[#FFD93B] border-2 border-white flex items-center justify-center z-0"></div>
                     </div>
                     
                     <div className="text-right">
                         <span className="block text-[22px] font-bold text-[#00343B] leading-none mb-1">€1,653.78</span>
                         <span className="inline-block bg-[#E0F7F5] text-[#005c66] text-[10px] font-bold px-2 py-1 rounded-[6px]">
                            +€28.47 interest
                         </span>
                     </div>
                </div>
             </div>
         </div>
      </div>

      {/* --- BOTTOM SECTION (Dark Curve) --- */}
      <div className="relative z-10 mt-auto">
          {/* Curve SVG - Hill Shape (Convex) */}
          <div className="absolute -top-[30px] left-0 right-0 w-full h-[31px] overflow-hidden">
             <svg viewBox="0 0 375 30" preserveAspectRatio="none" className="w-full h-full text-[#00343B] fill-current">
                 <path d="M0 30 Q 187.5 -5 375 30 V 30 H 0 Z" />
             </svg>
          </div>

          <div className="bg-[#00343B] pb-10 pt-8 px-6 flex flex-col items-center">
              
              <div className="mb-8 text-center mt-2">
                  <h2 className="text-[34px] font-medium text-white mb-2 tracking-tight">Welcome to Kletta</h2>
              </div>

              <div className="w-full space-y-4 max-w-[340px]">
                  <button 
                    onClick={() => navigate('signup-email')}
                    className="w-full py-4 bg-kletta-yellow rounded-[16px] text-kletta-dark font-bold text-[16px] hover:shadow-lg active:scale-[0.98] transition-all shadow-sm"
                  >
                    Create an account
                  </button>
                  
                  <button 
                    onClick={() => navigate('login')}
                    className="w-full py-4 bg-white rounded-[16px] text-[#00343B] font-bold text-[16px] hover:bg-gray-50 active:scale-[0.98] transition-all shadow-sm"
                  >
                    Sign In
                  </button>
              </div>
          </div>
      </div>

    </div>
  );
};

export default WelcomeScreen;