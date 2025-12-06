import React, { useState, useEffect } from 'react';

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

  const handleBackspace = () => {
    setCode(prev => prev.slice(0, -1));
  };

  return (
    <div className="absolute inset-0 z-50 flex flex-col justify-end">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in" onClick={onLogout}></div>

      {/* Sheet Content */}
      <div className="bg-kletta-yellow w-full rounded-t-[32px] p-6 pb-12 z-10 animate-slide-up flex flex-col items-center shadow-2xl relative">
        
        <h2 className="text-xl font-bold text-kletta-dark mt-4 mb-6">Enter the passcode</h2>

        {/* Dots */}
        <div className="flex gap-4 mb-10">
          {[0, 1, 2, 3].map((i) => (
            <div 
              key={i} 
              className={`w-4 h-4 rounded-full transition-all duration-200 ${
                i < code.length ? 'bg-kletta-dark' : 'bg-kletta-dark/20'
              }`}
            />
          ))}
        </div>

        {/* Keypad */}
        <div className="w-full max-w-xs grid grid-cols-3 gap-y-6 gap-x-8">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
            <button
              key={num}
              onClick={() => handlePress(num.toString())}
              className="h-16 w-full flex items-center justify-center text-3xl font-medium text-kletta-dark active:bg-black/10 rounded-full transition-colors"
            >
              {num}
            </button>
          ))}
          
          {/* Bottom Row */}
          <button 
            onClick={() => alert('Not implemented')}
            className="h-16 flex items-center justify-center text-sm font-medium text-kletta-dark"
          >
            Forgot?
          </button>
          
          <button
            onClick={() => handlePress('0')}
            className="h-16 flex items-center justify-center text-3xl font-medium text-kletta-dark active:bg-black/10 rounded-full transition-colors"
          >
            0
          </button>

          <button 
            onClick={onLogout}
            className="h-16 flex items-center justify-center text-sm font-medium text-kletta-dark"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default PasscodeSheet;