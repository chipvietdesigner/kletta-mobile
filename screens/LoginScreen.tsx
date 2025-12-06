import React, { useState } from 'react';
import { KlettaLogo, IconBack } from '../components/Icons';
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
    <div className="h-full w-full bg-gray-50 flex flex-col relative font-aktifo">
      {/* Navbar */}
      <div className="px-6 pt-16 pb-4 flex items-center justify-between z-10">
        <button 
          onClick={goBack}
          className="w-12 h-12 -ml-2 rounded-full flex items-center justify-center hover:bg-black/5 active:bg-black/10 transition-colors"
        >
          <IconBack size={26} />
        </button>
        {/* Helper Link Top Right */}
         <button className="text-sm font-bold text-kletta-teal">
            Need help?
         </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 px-7 flex flex-col pt-6 max-w-[360px] mx-auto w-full">
        
        {/* Header Section */}
        <div className="mb-10 text-center">
            <div className="flex justify-center mb-8">
                <KlettaLogo color="black" className="h-7" />
            </div>
            <h2 className="text-[28px] font-bold text-kletta-dark mb-3 leading-tight">Log in to Kletta</h2>
            <p className="text-gray-500 font-medium text-lg">We'll send a sign-in link to your e-mail.</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-[32px] p-7 shadow-[0_4px_24px_rgba(0,0,0,0.04)] border border-gray-100 relative">
           <div className="flex flex-col gap-2 mb-8">
              <label className="text-xs font-bold text-kletta-dark uppercase tracking-wider ml-1 mb-1">Email address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-4 bg-gray-50 rounded-xl border border-gray-200 text-lg text-kletta-dark font-medium outline-none focus:border-kletta-teal focus:ring-1 focus:ring-kletta-teal transition-all placeholder:text-gray-400"
                placeholder="name@example.com"
              />
              <p className="text-xs text-gray-400 font-medium ml-1 mt-1">
                Use the same email you use for invoices.
              </p>
           </div>

           <button 
              onClick={handleContinue}
              className="w-full py-4 bg-kletta-yellow rounded-2xl text-kletta-dark font-bold text-lg active:scale-95 transition-transform flex items-center justify-center shadow-md hover:shadow-lg"
            >
              Continue
            </button>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="pb-14 pt-4 flex justify-center">
         <button 
            onClick={() => navigate('welcome')} 
            className="text-base font-medium text-gray-500 hover:text-kletta-dark transition-colors"
         >
            Don't have an account? <span className="text-kletta-teal font-bold ml-1">Create account</span>
         </button>
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