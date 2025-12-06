import React, { useState } from 'react';
import SplashScreen from './screens/SplashScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import { SignUpEmailScreen, VerifyEmailCodeScreen } from './screens/SignUpScreens';
import { 
    OnboardingStep1, OnboardingStep2, OnboardingStep3, OnboardingStep4, 
    OnboardingStep5, OnboardingStep6, OnboardingStep7, OnboardingStep8 
} from './screens/OnboardingScreens';
import { ScreenName } from './types';

const App = () => {
  const [currentScreen, setCurrentScreen] = useState<ScreenName>('splash');
  const [navParams, setNavParams] = useState<any>({});

  const navigate = (screen: ScreenName, params?: any) => {
    if (params) {
        setNavParams(params);
    }
    setCurrentScreen(screen);
  };

  const goBack = () => {
    // Simple stack-like behavior for linear flows
    switch (currentScreen) {
        case 'login': navigate('welcome'); break;
        case 'signup-email': navigate('welcome'); break;
        case 'signup-verify': navigate('signup-email'); break;
        case 'welcome': navigate('splash'); break;
        // Onboarding usually prevents back for this demo, or goes to previous step
        case 'onboarding-1': navigate('welcome'); break; 
        case 'onboarding-2': navigate('onboarding-1'); break;
        case 'onboarding-3': navigate('onboarding-2'); break;
        case 'onboarding-4': navigate('onboarding-3'); break;
        case 'onboarding-5': navigate('onboarding-4'); break;
        case 'onboarding-6': navigate('onboarding-5'); break;
        case 'onboarding-7': navigate('onboarding-6'); break;
        case 'onboarding-8': navigate('onboarding-7'); break;
        default: break;
    }
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'splash':
        return <SplashScreen onFinish={() => navigate('welcome')} />;
      case 'welcome':
        return <WelcomeScreen navigate={navigate} goBack={goBack} />;
      case 'login':
        return <LoginScreen navigate={navigate} goBack={goBack} />;
      case 'signup-email':
        return <SignUpEmailScreen navigate={navigate} goBack={goBack} />;
      case 'signup-verify':
        return <VerifyEmailCodeScreen navigate={navigate} goBack={goBack} params={navParams} />;
      
      // Onboarding Flow
      case 'onboarding-1': return <OnboardingStep1 navigate={navigate} goBack={goBack} />;
      case 'onboarding-2': return <OnboardingStep2 navigate={navigate} goBack={goBack} />;
      case 'onboarding-3': return <OnboardingStep3 navigate={navigate} goBack={goBack} />;
      case 'onboarding-4': return <OnboardingStep4 navigate={navigate} goBack={goBack} />;
      case 'onboarding-5': return <OnboardingStep5 navigate={navigate} goBack={goBack} />;
      case 'onboarding-6': return <OnboardingStep6 navigate={navigate} goBack={goBack} />;
      case 'onboarding-7': return <OnboardingStep7 navigate={navigate} goBack={goBack} />;
      case 'onboarding-8': return <OnboardingStep8 navigate={navigate} goBack={goBack} />;

      case 'home':
        return <HomeScreen />;
      default:
        return <SplashScreen onFinish={() => navigate('welcome')} />;
    }
  };

  return (
    // Updated Main Container: iPhone 16 Pro dimensions (402x874) on desktop.
    // Using font-aktifo globally.
    <div className="relative w-full h-[100dvh] md:w-[402px] md:h-[874px] bg-white md:rounded-[55px] shadow-2xl overflow-hidden font-aktifo mx-auto selection:bg-kletta-yellow selection:text-kletta-dark">
      
      {/* Status Bar - Overlay   <div className="absolute top-0 w-full h-[54px] z-50 flex justify-between items-end pb-3 px-7 pointer-events-none mix-blend-exclusion text-white font-aktifo">
        <span className="text-[16px] font-bold tracking-normal leading-none ml-2">9:41</span>
        <div className="flex gap-1.5 mr-1 items-center">
           <div className="w-[18px] h-[12px] bg-current rounded-[1px] opacity-100 relative">
              <div className="absolute inset-0.5 bg-current opacity-20"></div> 
           </div>
           <div className="w-[17px] h-[12px] bg-current rounded-[1px]"></div>
           <div className="w-[26px] h-[12px] border-[1px] border-current rounded-[3px] relative flex items-center justify-start px-[1px]">
              <div className="w-[19px] h-[8px] bg-current rounded-[1px]"></div>
              <div className="absolute -right-[3px] top-[2px] w-[1px] h-[4px] bg-current rounded-r-[1px]"></div>
           </div>
        </div>
      </div> */}
    

      {/* Screen Content */}
      <div className="w-full h-full relative z-0">
        {renderScreen()}
      </div>

      {/* Home Indicator */}
      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-[140px] h-[5px] bg-black/30 rounded-full z-50 pointer-events-none mix-blend-difference"></div>
    </div>
  );
};

export default App;