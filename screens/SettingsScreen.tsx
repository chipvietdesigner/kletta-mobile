import React from 'react';
import { 
  IconBack, IconCellSignalFull, IconWifiHigh, IconBatteryFull,
  IconUser, IconGlobe, IconBank, IconPhone, IconLock, IconCar, 
  IconReceipt, IconFileText, IconCreditCard, IconSignOut, IconChevronRight
} from '../components/Icons';
import { NavigationProps } from '../types';

export const SettingsScreen: React.FC<NavigationProps> = ({ navigate, goBack }) => {
    return (
        <div className="h-full w-full bg-white flex flex-col font-aktifo animate-fade-in relative overflow-hidden text-kletta-dark">
             
            {/* Status Bar */}
            <div className="w-full h-[50px] flex justify-between items-end px-6 pb-2 text-kletta-dark pointer-events-none z-20 bg-white">
                <span className="text-[15px] font-medium tracking-normal leading-none ml-2">9:41</span>
                <div className="flex gap-1.5 items-center mr-1">
                    <IconCellSignalFull size={16} weight="fill" />
                    <IconWifiHigh size={16} weight="bold" />
                    <IconBatteryFull size={24} weight="fill" className="rotate-0" />
                </div>
            </div>

            {/* Header */}
            <div className="px-6 pt-2 pb-4 flex items-center justify-between z-10 bg-white shrink-0 border-b border-gray-50">
                <button 
                    onClick={goBack} 
                    className="w-10 h-10 -ml-2 rounded-full flex items-center justify-center hover:bg-gray-50 active:bg-gray-100 transition-colors"
                >
                    <IconBack size={26} className="text-kletta-dark" weight="bold" />
                </button>
                <h1 className="text-[17px] font-medium text-kletta-dark">Settings</h1>
                <div className="w-8"></div>
            </div>

            {/* Content List */}
            <div className="flex-1 overflow-y-auto no-scrollbar pb-10 bg-white">
                
                <div className="w-full">
                    {/* Name & address */}
                    <SettingsRow 
                        icon={<IconUser size={24} />} 
                        title="Name & address" 
                    />

                    {/* Region & language */}
                    <SettingsRow 
                        icon={<IconGlobe size={24} />} 
                        title="Region & language" 
                        subtitle="Region and language settings"
                    />

                    {/* Bank details */}
                    <SettingsRow 
                        icon={<IconBank size={24} />} 
                        title="Bank details" 
                        subtitle="Update your bank information"
                    />

                    {/* Phone number */}
                    <SettingsRow 
                        icon={<IconPhone size={24} />} 
                        title="Phone number" 
                    />

                    {/* Passcode */}
                    <SettingsRow 
                        icon={<IconLock size={24} />} 
                        title="Passcode" 
                        subtitle="Change passcode"
                    />

                    {/* Vehicles & assets */}
                    <SettingsRow 
                        icon={<IconCar size={24} />} 
                        title="Vehicles & assets" 
                        subtitle="0 vehicles, 0 assets"
                    />

                    {/* VAT */}
                    <SettingsRow 
                        icon={<IconReceipt size={24} />} 
                        title="VAT" 
                        subtitle="VAT settings"
                    />

                    {/* Tax return */}
                    <SettingsRow 
                        icon={<IconFileText size={24} />} 
                        title="Tax return" 
                    />

                    {/* Billing */}
                    <SettingsRow 
                        icon={<IconCreditCard size={24} />} 
                        title="Billing" 
                        subtitle="Monthly subscription and invoices"
                    />

                    {/* Log out */}
                    <SettingsRow 
                        icon={<IconSignOut size={24} />} 
                        title="Log out" 
                        isDestructive
                        onClick={() => navigate('welcome')}
                    />
                </div>

                {/* Footer */}
                <div className="py-8 text-center">
                    <p className="text-[13px] text-kletta-secondary font-normal">Kletta, Version: 2.32.2</p>
                </div>

            </div>
        </div>
    );
};

interface SettingsRowProps {
    icon: React.ReactNode;
    title: string;
    subtitle?: string;
    value?: string;
    onClick?: () => void;
    isDestructive?: boolean;
}

const SettingsRow: React.FC<SettingsRowProps> = ({ icon, title, subtitle, value, onClick, isDestructive }) => (
    <button 
        onClick={onClick} 
        className="w-full px-6 py-5 flex items-center gap-5 hover:bg-gray-50 active:bg-gray-100 transition-colors group border-b border-gray-100"
    >
        {/* Leading Icon */}
        <div className={`shrink-0 ${isDestructive ? 'text-red-500' : 'text-kletta-secondary'}`}>
            {React.cloneElement(icon as React.ReactElement<any>, { 
                weight: 'regular', 
                className: isDestructive ? 'text-red-500' : 'text-kletta-dark' 
            })}
        </div>

        {/* Text Content */}
        <div className="flex-1 text-left">
            <p className={`text-[16px] font-medium leading-tight mb-0.5 ${isDestructive ? 'text-red-500' : 'text-kletta-dark'}`}>
                {title}
            </p>
            {subtitle && (
                <p className="text-[14px] text-kletta-secondary font-normal leading-snug">
                    {subtitle}
                </p>
            )}
        </div>

        {/* Trailing Chevron */}
        <div className="shrink-0 text-gray-300">
            <IconChevronRight size={18} weight="bold" />
        </div>
    </button>
);