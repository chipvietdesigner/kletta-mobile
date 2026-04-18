import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { NavigationProps } from '../types';
import { KlettaLogo, IconCellSignalFull, IconWifiHigh, IconBatteryFull } from '../components/Icons';

const slides = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=1000&auto=format&fit=crop",
    title: "Hassle-free bookkeeping and tax declarations",
    description: "Kletta does your bookkeeping and tax declarations automatically based on the invoices you send and expenses you track."
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=1000&auto=format&fit=crop",
    title: "Hassle-free bookkeeping and tax declarations",
    description: "Kletta does your bookkeeping and tax declarations automatically based on the invoices you send and expenses you track."
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=1000&auto=format&fit=crop",
    title: "Hassle-free bookkeeping and tax declarations",
    description: "Kletta does your bookkeeping and tax declarations automatically based on the invoices you send and expenses you track."
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=1000&auto=format&fit=crop",
    title: "Hassle-free bookkeeping and tax declarations",
    description: "Kletta does your bookkeeping and tax declarations automatically based on the invoices you send and expenses you track."
  }
];

const WelcomeScreen: React.FC<NavigationProps> = ({ navigate }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="h-full w-full flex flex-col items-center bg-[#FDEE98] font-aktifo overflow-hidden selection:bg-kletta-yellow selection:text-kletta-dark animate-fade-in">
      
      {/* Phone Header / Status Bar */}
      <div className="w-full h-[50px] flex justify-between items-end px-6 pb-2 text-kletta-dark pointer-events-none z-20 shrink-0">
          <span className="text-[15px] font-medium tracking-normal leading-none ml-2">9:41</span>
          <div className="flex gap-1.5 items-center mr-1">
             <IconCellSignalFull size={16} weight="fill" />
             <IconWifiHigh size={16} weight="bold" />
             <IconBatteryFull size={24} weight="fill" className="rotate-0" />
          </div>
      </div>

      <div className="flex-1 w-full flex flex-col items-center px-6">
          {/* Top Logo */}
          <div className="pt-6 mb-8">
              <KlettaLogo color="black" className="h-7 w-auto" />
          </div>

          {/* Carousel Section */}
          <div className="relative w-full flex-1 flex flex-col items-center justify-center max-h-[420px]">
              <div className="relative w-full aspect-[4/5] max-w-[280px] bg-white rounded-[32px] shadow-2xl overflow-hidden border-[6px] border-white">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentSlide}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.5, ease: "easeInOut" }}
                      className="w-full h-full relative"
                    >
                      {/* Mock App Content - Tax Return 2024 */}
                      <div className="w-full h-full bg-white p-3.5 flex flex-col">
                        <div className="flex items-center justify-between mb-3">
                          <div className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center">
                            <span className="text-[9px]">‹</span>
                          </div>
                          <span className="text-[11px] font-bold">Tax return 2024</span>
                          <div className="w-5 h-5" />
                        </div>

                        <div className="space-y-2.5">
                          <div className="flex justify-between items-center">
                            <span className="text-[9px] text-gray-500">Status</span>
                            <span className="text-[9px] text-teal-600 font-bold flex items-center gap-1">
                              Submitted <span className="w-1.5 h-1.5 bg-teal-600 rounded-full" />
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-[9px] text-gray-500">Accounting period</span>
                            <span className="text-[9px] font-medium">Jan 1, 2024 – Dec 31, 2024</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-[9px] text-gray-500">Submission date</span>
                            <span className="text-[9px] font-medium">Mar 10, 2025 9:43 am</span>
                          </div>

                          <div className="pt-1.5 border-t border-gray-100">
                            <div className="flex justify-between items-center mb-0.5">
                              <span className="text-[10px] font-bold">Income</span>
                              <span className="text-[9px]">▾</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-[9px] text-gray-500">Taxable business income</span>
                              <span className="text-[9px] font-bold">€29,224.86</span>
                            </div>
                          </div>

                          <div className="pt-1.5 border-t border-gray-100">
                            <div className="flex justify-between items-center mb-0.5">
                              <span className="text-[10px] font-bold">Expenses</span>
                              <span className="text-[9px]">▾</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-[9px] text-gray-500">Deductible business expenses</span>
                              <span className="text-[9px] font-bold">€11,993.80</span>
                            </div>
                          </div>

                          <div className="pt-1.5 border-t border-gray-100">
                            <div className="flex justify-between items-center mb-0.5">
                              <span className="text-[10px] font-bold">Profit</span>
                              <span className="text-[9px]">▾</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-[9px] text-gray-500">Business profit</span>
                              <span className="text-[9px] font-bold">€17,231.06</span>
                            </div>
                          </div>
                        </div>

                        {/* Play Button Overlay */}
                        <div className="absolute inset-0 flex items-center justify-center">
                           <div className="w-12 h-12 bg-[#005A66] rounded-full flex items-center justify-center pl-1 shadow-lg">
                              <div className="w-0 h-0 border-t-[8px] border-t-transparent border-l-[14px] border-l-white border-b-[8px] border-b-transparent" />
                           </div>
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>
              </div>

              {/* Pagination Dots */}
              <div className="flex gap-1.5 mt-6">
                {slides.map((_, idx) => (
                  <div 
                    key={idx}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${currentSlide === idx ? 'bg-[#005A66] w-5' : 'bg-[#005A66]/20'}`}
                  />
                ))}
              </div>
          </div>

          {/* Text Content */}
          <div className="w-full text-center mt-6 mb-8 px-4">
              <h1 className="text-[24px] font-bold text-kletta-dark tracking-tight leading-[1.2] mb-3">
                 {slides[currentSlide].title}
              </h1>
              <p className="text-[15px] text-kletta-dark/80 leading-[1.4] font-normal max-w-[300px] mx-auto">
                 {slides[currentSlide].description}
              </p>
          </div>

          {/* Bottom Buttons */}
          <div className="w-full flex flex-col gap-3 pb-14">
              <button 
                 onClick={() => navigate('signup-email')}
                 className="w-full h-[48px] bg-[#005A66] rounded-[16px] text-white font-bold text-[17px] active:scale-[0.98] transition-all shadow-lg"
              >
                 Create account
              </button>
              
              <button 
                 onClick={() => navigate('login')}
                 className="w-full h-[48px] flex items-center justify-center text-kletta-dark font-medium text-[16px] active:opacity-60 transition-opacity"
              >
                 Have an account? <span className="underline font-bold ml-1">Log in</span>
              </button>
          </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;
