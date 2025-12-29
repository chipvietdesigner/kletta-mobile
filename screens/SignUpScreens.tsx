import React, { useState } from 'react';
import { KlettaLogo, IconBack } from '../components/Icons';
import { NavigationProps } from '../types';
import { KlettaInput } from '../components/Inputs';

// Screen 1: Sign Up Email
export const SignUpEmailScreen: React.FC<NavigationProps> = ({ navigate, goBack }) => {
  const [email, setEmail] = useState('johndoe@gmail.com');

  const handleContinue = () => {
    if (email.includes('@')) {
      navigate('signup-verify', { email });
    } else {
      alert('Please enter a valid email');
    }
  };

  return (
    <div className="h-full w-full bg-white flex flex-col font-aktifo animate-fade-in overflow-hidden">
      {/* Native Header */}
      <div className="px-6 pt-16 pb-4 flex items-center justify-between z-10 bg-white">
        <button onClick={goBack} className="w-10 h-10 -ml-2 rounded-full flex items-center justify-center hover:bg-gray-50 active:bg-gray-100 transition-colors">
          <IconBack size={26} />
        </button>
        <div className="w-8"></div> {/* Spacer */}
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar px-8 pt-6 pb-32">
         <div className="mb-12 max-w-[420px]">
            <h2 className="text-[32px] font-medium text-kletta-dark mb-2 tracking-tight">Welcome to Kletta!</h2>
            <p className="text-kletta-secondary font-light text-[15px]">
              Let's start by entering your e-mail address.
            </p>
        </div>

        <div className="space-y-6 max-w-[420px] mx-auto">
           <div>
              <KlettaInput 
                label="Email Address"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                autoFocus
              />
              <p className="text-[13px] text-gray-400 font-light ml-1 mt-2 flex items-start gap-1">
                <span className="text-kletta-teal">ℹ</span> We will send a 6-digit code to this email
              </p>
           </div>
        </div>
      </div>

      {/* Fixed Bottom Action Area */}
      <div className="absolute bottom-0 left-0 right-0 bg-white px-6 pt-4 pb-10 border-t border-gray-50 z-20">
         <button 
           onClick={handleContinue}
           className="w-full h-[64px] bg-kletta-yellow rounded-2xl text-kletta-dark font-bold text-[16px] shadow-sm hover:shadow-md active:scale-[0.98] transition-all"
         >
           Continue
         </button>
      </div>
    </div>
  );
};


// Screen 2: Verify Code
export const VerifyEmailCodeScreen: React.FC<NavigationProps> = ({ navigate, goBack, params }) => {
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const email = params?.email || 'your email';

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) return;
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`code-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleSignUp = () => {
    if (code.every(c => c !== '')) {
      navigate('onboarding-welcome');
    } else {
      alert('Please enter the 6-digit code');
    }
  };

  return (
    <div className="h-full w-full bg-white flex flex-col font-aktifo animate-slide-up overflow-hidden">
      <div className="px-6 pt-16 pb-4 flex items-center bg-white z-10">
        <button onClick={goBack} className="w-10 h-10 -ml-2 rounded-full flex items-center justify-center hover:bg-gray-50 active:bg-gray-100 transition-colors">
          <IconBack size={26} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar px-8 pt-4 pb-32">
        <div className="max-w-[420px] mx-auto">
            <h2 className="text-[32px] font-meidum text-kletta-dark mb-2 traking-tight text-center">Check your inbox</h2>
            <p className="text-gray-500 text-[16px] font-light mb-10 leading-relaxed text-center">
                We have sent a 6 digit code to <br/><span className="text-kletta-dark font-bold">{email}</span>.
            </p>

            <div className="flex gap-3 justify-center mb-10">
                {code.map((digit, i) => (
                    <input
                        key={i}
                        id={`code-${i}`}
                        type="tel"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleChange(i, e.target.value)}
                        className="w-14 h-14 bg-white border border-[#E6E8EC] rounded-[12px] text-center text-3xl font-bold text-kletta-dark outline-none focus:border-kletta-teal focus:ring-4 focus:ring-kletta-teal/5 transition-all shadow-sm"
                    />
                ))}
            </div>

            <div className="flex justify-center mb-12">
                <button className="text-kletta-teal font-bold text-[13px] hover:opacity-80 transition-opacity">
                    Didn't receive code? Resend
                </button>
            </div>

            <div className="mb-6">
                <KlettaInput 
                    label="Promotion Code (Optional)"
                    type="text" 
                    placeholder="Type your code" 
                />
            </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 bg-white px-6 pt-4 pb-8 border-t border-gray-50 z-20">
         <button 
            onClick={handleSignUp}
            disabled={!code.every(c => c !== '')}
            className={`w-full h-[64px] rounded-2xl text-kletta-dark font-bold text-[16px] shadow-sm transition-all ${code.every(c => c !== '') ? 'bg-kletta-yellow hover:shadow-md active:scale-[0.98]' : 'bg-gray-100 text-gray-400'}`}
         >
            Sign up
         </button>

         <p className="text-[13px] text-gray-700 text-center mt-6 leading-relaxed px-2 font-light">
            By continuing, you accept to our <button className="underline font-medium hover:text-kletta-dark">Terms of Service</button> and <button className="underline font-medium hover:text-kletta-dark">Privacy Policy</button>.
         </p>
      </div>
    </div>
  );
};