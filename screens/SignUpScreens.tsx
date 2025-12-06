import React, { useState } from 'react';
import { KlettaLogo, IconBack } from '../components/Icons';
import { NavigationProps } from '../types';

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
    <div className="h-full w-full bg-gray-50 flex flex-col relative font-aktifo animate-fade-in">
      <div className="px-6 pt-16 pb-4 flex items-center z-10">
        <button onClick={goBack} className="w-12 h-12 -ml-2 rounded-full flex items-center justify-center hover:bg-black/5">
          <IconBack size={26} />
        </button>
      </div>

      <div className="flex-1 px-7 flex flex-col pt-2 max-w-[360px] mx-auto w-full">
        <div className="flex justify-center mb-8">
            <KlettaLogo color="black" className="h-7" />
        </div>
        
        <div className="text-center mb-10">
            <h2 className="text-[28px] font-bold text-kletta-dark mb-3 leading-tight">Welcome to Kletta!<br/>Let's start by entering your e-mail</h2>
        </div>

        <div className="bg-white rounded-[32px] p-7 shadow-sm border border-gray-100">
           <div className="flex flex-col gap-2 mb-8">
              <label className="text-xs font-bold text-kletta-dark uppercase tracking-wider ml-1 mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-4 bg-gray-50 rounded-xl border border-gray-200 text-lg text-kletta-dark font-medium outline-none focus:border-kletta-teal focus:ring-1 focus:ring-kletta-teal"
                placeholder="name@example.com"
              />
              <p className="text-xs text-gray-400 font-medium ml-1 mt-1">
                We will send a 6-digit code to this email
              </p>
           </div>

           <button 
              onClick={handleContinue}
              className="w-full py-4 bg-kletta-yellow rounded-2xl text-kletta-dark font-bold text-lg shadow-sm hover:shadow-md active:scale-95 transition-all"
            >
              Continue
            </button>
        </div>
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
      navigate('onboarding-1');
    } else {
      alert('Please enter the 6-digit code');
    }
  };

  return (
    <div className="h-full w-full bg-gray-50 flex flex-col relative font-aktifo animate-slide-up">
      <div className="px-6 pt-16 pb-4 flex items-center z-10">
        <button onClick={goBack} className="w-12 h-12 -ml-2 rounded-full flex items-center justify-center hover:bg-black/5">
          <IconBack size={26} />
        </button>
      </div>

      <div className="flex-1 px-7 flex flex-col pt-2 max-w-[360px] mx-auto w-full">
        <h2 className="text-[28px] font-bold text-kletta-dark mb-4 leading-tight">Enter the 6-digit code</h2>
        <p className="text-gray-500 text-lg mb-8 leading-relaxed">
            We have sent a 6 digit code to <span className="text-kletta-dark font-bold">{email}</span>. Please enter the code to continue
        </p>

        <div className="flex gap-2 justify-center mb-8">
            {code.map((digit, i) => (
                <input
                    key={i}
                    id={`code-${i}`}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleChange(i, e.target.value)}
                    className="w-12 h-14 bg-white border border-gray-200 rounded-xl text-center text-2xl font-bold text-kletta-dark outline-none focus:border-kletta-teal focus:ring-1 focus:ring-kletta-teal shadow-sm"
                />
            ))}
        </div>

        <button className="text-kletta-teal font-bold text-sm mb-10 self-center">Resend</button>

        <div className="bg-white rounded-2xl p-4 mb-6 shadow-sm border border-gray-100">
            <input 
                type="text" 
                placeholder="Type your promotion code" 
                className="w-full bg-transparent outline-none text-kletta-dark font-medium placeholder:text-gray-400"
            />
        </div>

        <button 
           onClick={handleSignUp}
           className={`w-full py-4 rounded-2xl text-kletta-dark font-bold text-lg shadow-md transition-all ${code.every(c => c !== '') ? 'bg-kletta-yellow hover:shadow-lg active:scale-95' : 'bg-gray-200 text-gray-400'}`}
        >
           Sign up
        </button>

        <p className="text-xs text-gray-400 text-center mt-6 leading-relaxed px-4">
            By continuing, you accept to our <button className="underline hover:text-kletta-dark">Terms of Service</button> and <button className="underline hover:text-kletta-dark">Privacy Policy</button>.
        </p>
      </div>
    </div>
  );
};
