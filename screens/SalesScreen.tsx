
import React from 'react';
import { NavigationProps } from '../types';

const SalesScreen: React.FC<Partial<NavigationProps>> = () => {
  return (
    <div className="flex-1 h-full w-full bg-white flex items-center justify-center font-aktifo animate-fade-in">
      <span className="text-xl font-bold text-gray-300">Coming soon</span>
    </div>
  );
};

export default SalesScreen;
