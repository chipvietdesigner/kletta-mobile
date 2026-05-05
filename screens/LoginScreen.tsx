
import React, { useState } from 'react';
import { IconBack, IconCheckCircle, IconWarningCircle } from '../components/Icons';
import { NavigationProps } from '../types';
import PasscodeSheet from '../components/PasscodeSheet';
import { KlettaInput } from '../components/Inputs';
import { useLanguage } from '../components/LanguageContext';

const LoginScreen: React.FC<NavigationProps> = ({ navigate, goBack }) => {
  const [email, setEmail] = useState('johndoe@gmail.com');
  const [showPasscode, setShowPasscode] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const { t } = useLanguage();

  const handleContinue = () => {
    if (email.includes('@')) {
      setShowPasscode(true);
    } else {
      alert(t('email_error'));
    }
  };

  const onPasscodeSuccess = () => {
    setShowPasscode(false);
    // Navigate to Home screen and trigger the onboarding checklist modal as an overlay
    navigate('home', { showIncompleteOnboarding: true });
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
      {/* Header */}
      <div className="px-6 pt-16 pb-4 flex items-center justify-between z-10 bg-white">
        <button onClick={goBack} className="w-10 h-10 -ml-2 rounded-full flex items-center justify-center hover:bg-gray-50 active:bg-gray-100 transition-colors">
          <IconBack size={26} weight="bold" />
        </button>
        <div className="w-8"></div>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar px-8 pt-8 pb-40">
        <div className="mb-12 max-w-[420px]">
            <h2 className="text-[30px] font-medium text-kletta-dark mb-2 tracking-tight">{t('welcome_back')}</h2>
            <p className="text-kletta-dark font-light text-[15px]">
               {t('new_to_kletta')} <button onClick={() => navigate('signup-email')} className="text-kletta-teal font-medium hover:underline">{t('sign_up')}</button>
            </p>
        </div>

        <div className="space-y-6 max-w-[420px]">
           <KlettaInput 
              label={t('your_email')}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t('email_placeholder')}
              autoFocus
           />

           {/* Layout Refinement: Added visual mocks for premium feeling */}
           <div className="flex items-center justify-between px-1">
              <button 
                onClick={() => setRememberMe(!rememberMe)}
                className="flex items-center gap-2 group"
              >
                <div className={`w-5 h-5 rounded-md border-[1.5px] transition-colors flex items-center justify-center ${rememberMe ? 'bg-kletta-teal border-kletta-teal' : 'border-gray-300 group-hover:border-kletta-teal'}`}>
                   {rememberMe && <IconBack size={12} color="white" weight="bold" className="rotate-[270deg]" />}
                </div>
                <span className="text-[14px] text-kletta-secondary font-medium">{t('remember_me')}</span>
              </button>
              
              <button className="text-[14px] text-kletta-dark font-medium hover:text-kletta-teal transition-colors">
                {t('forgot_password')}
              </button>
           </div>
        </div>
      </div>

      {/* Fixed Bottom Action Area */}
      <div className="absolute bottom-0 left-0 right-0 bg-white px-6 pt-4 pb-12 border-t border-gray-50 z-20">
         <button 
           onClick={handleContinue}
           className="w-full h-[52px] bg-kletta-yellow rounded-[12px] text-kletta-dark font-semibold text-[16px] shadow-sm hover:shadow-[0_8px_24px_rgba(255,217,59,0.3)] active:scale-[0.98] transition-all"
         >
           {t('log_in')}
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
