import React from 'react';
import { 
  IconBack, IconCellSignalFull, IconWifiHigh, IconBatteryFull,
  IconUserCircle, IconBell, IconGlobe, IconLock, IconShield, IconQuestion, IconSignOut, IconChevronRight
} from '../components/Icons';
import { NavigationProps } from '../types';

export const SettingsScreen: React.FC<NavigationProps> = ({ navigate, goBack }) => {
    return (
        <div className="h-full w-full bg-[#FAFAFA] flex flex-col font-aktifo animate-fade-in relative overflow-hidden">
             
            {/* Status Bar */}
            <div className="w-full h-[50px] flex justify-between items-end px-6 pb-2 text-kletta-dark pointer-events-none z-20">
                <span className="text-[15px] font-bold tracking-normal leading-none ml-2">9:41</span>
                <div className="flex gap-1.5 items-center mr-1">
                    <IconCellSignalFull size={16} weight="fill" />
                    <IconWifiHigh size={16} weight="bold" />
                    <IconBatteryFull size={24} weight="fill" className="rotate-0" />
                </div>
            </div>

            {/* Header */}
            <div className="px-6 pt-2 pb-6 flex items-center justify-between z-10">
                <button 
                    onClick={goBack} 
                    className="w-10 h-10 -ml-2 rounded-full flex items-center justify-center hover:bg-black/5 active:bg-black/10 transition-colors"
                >
                    <IconBack size={26} className="text-kletta-dark" />
                </button>
                <h1 className="text-[17px] font-bold text-kletta-dark">Settings</h1>
                <div className="w-8"></div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto no-scrollbar pb-36 px-5 space-y-6">
                
                {/* Account Section */}
                <div>
                    <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-3 ml-2">Account</h3>
                    <div className="bg-white rounded-[24px] overflow-hidden shadow-sm">
                        <SettingsRow icon={<IconUserCircle size={24} />} title="Profile Details" />
                        <div className="h-[1px] bg-gray-50 mx-4 border-t border-dashed border-gray-100"></div>
                        <SettingsRow icon={<IconGlobe size={24} />} title="Language" value="English" />
                    </div>
                </div>

                {/* App Settings */}
                <div>
                    <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-3 ml-2">App Settings</h3>
                    <div className="bg-white rounded-[24px] overflow-hidden shadow-sm">
                        <SettingsRow icon={<IconBell size={24} />} title="Notifications" />
                        <div className="h-[1px] bg-gray-50 mx-4 border-t border-dashed border-gray-100"></div>
                        <SettingsRow icon={<IconLock size={24} />} title="Security & Privacy" />
                    </div>
                </div>

                {/* Support */}
                <div>
                    <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-3 ml-2">Support</h3>
                    <div className="bg-white rounded-[24px] overflow-hidden shadow-sm">
                        <SettingsRow icon={<IconQuestion size={24} />} title="Help Center" />
                        <div className="h-[1px] bg-gray-50 mx-4 border-t border-dashed border-gray-100"></div>
                        <SettingsRow icon={<IconShield size={24} />} title="Terms of Service" />
                    </div>
                </div>

                {/* Logout Button */}
                <button 
                    onClick={() => navigate('welcome')}
                    className="w-full bg-white rounded-[24px] p-5 flex items-center gap-4 shadow-sm hover:bg-red-50 active:bg-red-100 transition-colors group mt-4"
                >
                    <div className="w-10 h-10 bg-red-50 rounded-full flex items-center justify-center text-red-500 shrink-0 group-hover:bg-red-100">
                        <IconSignOut size={24} weight="bold" />
                    </div>
                    <span className="text-[15px] font-bold text-red-500 flex-1 text-left">Log out</span>
                </button>
                
                <p className="text-center text-[11px] text-gray-400 font-medium pt-4">Version 1.0.2 (Build 450)</p>

            </div>
        </div>
    );
};

interface SettingsRowProps {
    icon: React.ReactNode;
    title: string;
    value?: string;
    onClick?: () => void;
}

const SettingsRow: React.FC<SettingsRowProps> = ({ icon, title, value, onClick }) => (
    <button onClick={onClick} className="w-full p-5 flex items-center gap-4 hover:bg-gray-50 active:bg-gray-100 transition-colors group">
        <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-kletta-dark shrink-0">
            {icon}
        </div>
        <div className="flex-1 flex justify-between items-center">
            <span className="text-[15px] font-medium text-kletta-dark">{title}</span>
            <div className="flex items-center gap-2">
                {value && <span className="text-[13px] text-gray-400 font-medium">{value}</span>}
                <IconChevronRight size={16} weight="bold" className="text-gray-300 group-hover:text-kletta-teal transition-colors" />
            </div>
        </div>
    </button>
);