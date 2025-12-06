import React, { useEffect } from 'react';
import { KlettaLogo } from '../components/Icons';

interface SplashScreenProps {
  onFinish: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish();
    }, 2000);

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className="h-full w-full bg-kletta-yellow flex items-center justify-center animate-fade-in">
      <KlettaLogo color="black" className="scale-125" />
    </div>
  );
};

export default SplashScreen;