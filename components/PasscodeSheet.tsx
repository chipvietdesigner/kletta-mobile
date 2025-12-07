
import React, { useState } from 'react';

interface PasscodeSheetProps {
  onSuccess: () => void;
  onClose: () => void;
  onLogout: () => void;
}

const PasscodeSheet: React.FC<PasscodeSheetProps> = ({ onSuccess, onLogout }) => {
  const [code, setCode] = useState('');

  const handlePress = (digit: string) => {
    if (code.length < 4) {
      const newCode = code + digit;
      setCode(newCode);
      if (newCode.length === 4) {
        // Small delay for UX
        setTimeout(() => {
          onSuccess();
        }, 300);
      }
    }
  };

  return (
    <div className="absolute inset-0 z-50 flex flex-col justify-end">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in" onClick={onLogout}></div>

      {/* Sheet Content Container */}
      <div className="w-full z-10 animate-slide-up shadow-2xl relative rounded-t-[32px] overflow-hidden flex flex-col">
        
        {/* Top Section: Yellow */}
        <div className="bg-kletta-yellow w-full pt-8 pb-10 flex flex-col items-center">
           <h2 className="text-[17px] font-bold text-kletta-dark mb-8">Enter the passcode</h2>

           {/* Dots */}
           <div className="flex gap-4">
             {[0, 1, 2, 3].map((i) => (
               <div 
                 key={i} 
                 className={`w-3.5 h-3.5 rounded-full transition-all duration-200 ${
                   i < code.length ? 'bg-kletta-dark' : 'bg-kletta-dark/20'
                 }`}
               />
             ))}
           </div>
        </div>

        {/* Bottom Section: White - Keypad */}
        <div className="bg-white w-full pt-6 pb-12 flex flex-col items-center">
           <div className="w-full max-w-[320px] grid grid-cols-3 gap-y-2 gap-x-4">
             {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
               <button
                 key={num}
                 onClick={() => handlePress(num.toString())}
                 className="h-20 w-full flex items-center justify-center text-[28px] font-medium text-kletta-dark active:bg-gray-50 rounded-full transition-colors"
               >
                 {num}
               </button>
             ))}
             
             {/* Bottom Row */}
             <button 
               onClick={() => alert('Not implemented')}
               className="h-20 flex items-center justify-center text-[15px] font-medium text-kletta-dark"
             >
               Forgot?
             </button>
             
             <button
               onClick={() => handlePress('0')}
               className="h-20 flex items-center justify-center text-[28px] font-medium text-kletta-dark active:bg-gray-50 rounded-full transition-colors"
             >
               0
             </button>

             <button 
               onClick={onLogout}
               className="h-20 flex items-center justify-center text-[15px] font-medium text-kletta-dark"
             >
               Logout
             </button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default PasscodeSheet;
