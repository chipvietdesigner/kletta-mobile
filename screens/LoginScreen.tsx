import React, { useState } from 'react';
import { IconBack } from '../components/Icons';
import { NavigationProps } from '../types';
import PasscodeSheet from '../components/PasscodeSheet';

const LoginScreen: React.FC<NavigationProps> = ({ navigate, goBack }) => {
  const [email, setEmail] = useState('johndoe@gmail.com');
  const [showPasscode, setShowPasscode] = useState(false);

  const handleContinue = () => {
    if (email.includes('@')) {
      setShowPasscode(true);
    } else {
      alert('Please enter a valid email');
    }
  };

  const onPasscodeSuccess = () => {
    setShowPasscode(false);
    navigate('home');
  };

  const onPasscodeClose = () => {
    setShowPasscode(false);
  };

  const onLogout = () => {
    setShowPasscode(false);
    navigate('welcome');
  }

  return (
    <div className="h-full w-full bg-white flex flex-col font-aktifo animate-fade-in overflow-hidden">
      {/* Native Header */}
      <div className="px-6 pt-16 pb-4 flex items-center justify-between z-10 bg-white">
        <button onClick={goBack} className="w-10 h-10 -ml-2 rounded-full flex items-center justify-center hover:bg-gray-50 active:bg-gray-100 transition-colors">
          <IconBack size={26} />
        </button>
        <div className="w-8"></div> {/* Spacer */}
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar px-8 pt-6 pb-40">
        <div className="text-center mb-12 max-w-[420px] mx-auto">
            <h2 className="text-[28px] font-bold text-kletta-dark mb-4 leading-tight">Log in to Kletta</h2>
            <p className="text-gray-500 font-light text-[16px] leading-relaxed">Let's start by entering your e-mail address.</p>
        </div>

        <div className="space-y-6 max-w-[420px] mx-auto">
           <div>
              <label className="text-[11px] font-bold text-kletta-dark uppercase tracking-wider ml-1 mb-2 block">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-4 bg-gray-50 rounded-2xl border border-gray-200 text-[16px] text-kletta-dark font-medium outline-none focus:border-kletta-teal focus:bg-white transition-all placeholder:text-gray-300"
                placeholder="name@example.com"
                autoFocus
              />
              
           </div>
        </div>
      </div>

      {/* Fixed Bottom Action Area */}
      <div className="absolute bottom-0 left-0 right-0 bg-white px-6 pt-4 pb-8 border-t border-gray-50 z-20">
         <button 
           onClick={handleContinue}
           className="w-full py-4 bg-kletta-yellow rounded-2xl text-kletta-dark font-bold text-[16px] shadow-sm hover:shadow-md active:scale-[0.98] transition-all"
         >
           Continue
         </button>
         
         <div className="flex justify-center mt-8 mb-2">
             <button 
                onClick={() => navigate('signup-email')} 
                className="text-[15px] font-medium text-gray-500 hover:text-kletta-dark transition-colors"
             >
                Don't have an account? <span className="text-kletta-teal font-bold ml-1">Create account</span>
             </button>
         </div>
      </div>

      {/* Passcode Bottom Sheet */}
      {showPasscode && (
        <PasscodeSheet 
            onSuccess={onPasscodeSuccess} 
            onClose={onPasscodeClose}
            onLogout={onLogout}
        />
      )}
    </div>
  );
};

export default LoginScreen;