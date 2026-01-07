
import React, { useState, useEffect } from 'react';
import { 
  IconBack, IconClose, IconCamera, IconUpload, 
  IconSparkle, IconChevronRight, IconCoins, IconReceipt,
  IconCheck, IconChevronDown, IconDotsThree
} from '../components/Icons';
import { NavigationProps } from '../types';

// --- CAMERA SCREEN ---
export const ScanReceiptCamera: React.FC<NavigationProps> = ({ navigate, goBack }) => {
    return (
        <div className="h-full w-full bg-black flex flex-col font-aktifo relative animate-fade-in overflow-hidden">
            {/* Header */}
            <div className="absolute top-0 left-0 right-0 z-20 pt-14 pb-4 px-6 flex items-center justify-between bg-gradient-to-b from-black/50 to-transparent">
                <button 
                    onClick={goBack}
                    className="w-10 h-10 -ml-2 rounded-full flex items-center justify-center text-white"
                >
                    <IconBack size={26} weight="bold" />
                </button>
                <h1 className="text-[17px] font-medium text-white tracking-wide">Scan receipt</h1>
                <div className="w-10"></div>
            </div>

            {/* Viewfinder Area */}
            <div className="flex-1 relative flex items-center justify-center overflow-hidden">
                {/* Simulated Camera Feed */}
                <div className="absolute inset-0 bg-[#1A1A1A]">
                    {/* Ghostly receipt silhouette for guide */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-10">
                        <div className="w-[70%] h-[60%] border-2 border-dashed border-white rounded-[4px]" />
                    </div>
                </div>

                {/* Framing Overlay */}
                <div className="relative w-[85%] aspect-[3/4] border-2 border-white/40 rounded-[12px] shadow-[0_0_0_1000px_rgba(0,0,0,0.4)]">
                    {/* Corner Indicators */}
                    <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-white rounded-tl-[12px]" />
                    <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-white rounded-tr-[12px]" />
                    <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-white rounded-bl-[12px]" />
                    <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-white rounded-br-[12px]" />
                </div>

                <div className="absolute bottom-1/4 left-0 right-0 flex justify-center">
                    <p className="text-white/80 text-[14px] font-medium tracking-wide">Place the receipt inside the frame</p>
                </div>
            </div>

            {/* Shutter Bar */}
            <div className="h-44 bg-black flex items-center justify-between px-10 pb-10">
                <button className="w-12 h-12 flex items-center justify-center text-white/80 active:scale-95 transition-transform">
                    <IconDotsThree size={28} weight="bold" />
                </button>
                
                <button 
                    onClick={() => navigate('scan-receipt-preview', { imageUrl: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&fit=crop' })}
                    className="w-[82px] h-[82px] rounded-full bg-white p-1 shadow-lg active:scale-95 transition-transform"
                >
                    <div className="w-full h-full rounded-full bg-kletta-yellow flex items-center justify-center" />
                </button>

                <button className="w-12 h-12 flex items-center justify-center text-white/80 active:scale-95 transition-transform">
                    <IconUpload size={24} weight="bold" />
                </button>
            </div>
        </div>
    );
};

// --- PREVIEW SCREEN (UPDATED WITH DARK THEME) ---
export const ScanReceiptPreview: React.FC<NavigationProps> = ({ navigate, goBack, params }) => {
    return (
        <div className="h-full w-full bg-kletta-dark flex flex-col font-aktifo relative animate-fade-in overflow-hidden">
            {/* Dark Header */}
            <div className="absolute top-0 left-0 right-0 z-20 pt-14 pb-4 px-6 flex items-center justify-between">
                <button 
                    onClick={goBack}
                    className="w-10 h-10 -ml-2 rounded-full flex items-center justify-center text-white hover:bg-white/10 active:scale-95 transition-all"
                >
                    <IconBack size={26} weight="bold" />
                </button>
                <div className="w-10"></div>
            </div>

            {/* Centered Content with Dark Backdrop */}
            <div className="flex-1 flex items-center justify-center p-6 pt-24">
                <div className="w-full h-full bg-black/20 rounded-[12px] overflow-hidden shadow-2xl border border-white/5">
                    <img 
                        src={params?.imageUrl || 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&fit=crop'} 
                        className="w-full h-full object-cover" 
                        alt="Scanned receipt"
                    />
                </div>
            </div>

            {/* Dark Bottom Action Bar */}
            <div className="bg-black/80 backdrop-blur-md px-6 pt-6 pb-14 flex flex-col gap-4 border-t border-white/10">
                <button 
                    onClick={() => navigate('scan-receipt-analyzing')}
                    className="w-full h-[52px] bg-kletta-yellow rounded-[14px] text-kletta-dark font-bold text-[16px] shadow-lg active:scale-[0.98] transition-all"
                >
                    Use photo
                </button>
                <button 
                    onClick={goBack}
                    className="w-full py-2 text-white/60 font-medium text-[15px] hover:text-white transition-colors"
                >
                    Retake
                </button>
            </div>
        </div>
    );
};

// --- ANALYZING SCREEN ---
export const ScanReceiptAnalyzing: React.FC<NavigationProps> = ({ navigate }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            navigate('scan-receipt-review', { 
                supplier: 'Nur taxi Service Oy',
                date: '5.9.2025',
                amount: '€114.00',
                imageUrl: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&fit=crop'
            });
        }, 3000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="h-full w-full bg-white flex flex-col items-center justify-center font-aktifo animate-fade-in px-10 text-center">
            {/* Analysis Animation */}
            <div className="relative mb-10 group">
                <div className="w-32 h-44 bg-gray-50 border border-gray-100 rounded-[12px] shadow-sm flex flex-col p-4 relative overflow-hidden">
                    <div className="h-2 w-12 bg-gray-200 rounded-full mb-3" />
                    <div className="h-1.5 w-full bg-gray-100 rounded-full mb-1.5" />
                    <div className="h-1.5 w-3/4 bg-gray-100 rounded-full mb-1.5" />
                    <div className="h-1.5 w-1/2 bg-gray-100 rounded-full mb-8" />
                    <div className="h-3 w-10 bg-gray-200 rounded-full self-end mt-auto" />

                    {/* Scanning Line */}
                    <div className="absolute left-0 right-0 h-[3px] bg-kletta-teal shadow-[0_0_10px_#00343B] animate-scan-receipt z-10" />
                    {/* Shimmer overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full animate-shimmer" />
                </div>
                
                <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-kletta-yellow rounded-full flex items-center justify-center shadow-md animate-bounce">
                    <IconSparkle size={24} weight="fill" className="text-kletta-dark" />
                </div>
            </div>

            <h2 className="text-[20px] font-medium text-kletta-dark tracking-tight mb-2">Analyzing receipt...</h2>
            <p className="text-[14px] text-gray-500 font-light max-w-[200px] leading-relaxed">David is reading the numbers and categories for you.</p>

            <style>{`
                @keyframes scan {
                    0% { top: 0% }
                    100% { top: 100% }
                }
                .animate-scan-receipt {
                    animation: scan 1.5s ease-in-out infinite alternate;
                }
                @keyframes shimmer {
                    100% { transform: translateX(100%); }
                }
                .animate-shimmer {
                    animation: shimmer 1s infinite;
                }
            `}</style>
        </div>
    );
};

// --- REVIEW SCREEN (UPDATED PER SCREENSHOT) ---
export const ScanReceiptReview: React.FC<NavigationProps> = ({ navigate, goBack, params }) => {
    const [selectedVats, setSelectedVats] = useState<string[]>(['14%']);

    const toggleVat = (rate: string) => {
        setSelectedVats(prev => 
            prev.includes(rate) 
                ? prev.filter(r => r !== rate) 
                : [...prev, rate]
        );
    };

    return (
        <div className="h-full w-full bg-white flex flex-col font-aktifo animate-fade-in relative overflow-hidden">
            {/* Compressed Teal Header Section */}
            <div className="bg-kletta-teal pt-10 pb-3 px-6 relative shrink-0">
                <div className="flex items-center justify-between mb-1">
                    <button 
                        onClick={goBack}
                        className="w-10 h-10 -ml-2 rounded-full flex items-center justify-center text-white active:bg-white/10"
                    >
                        <IconBack size={26} weight="bold" />
                    </button>

                    {/* Date Bubble */}
                    <div className="bg-[#FFEE99] rounded-full px-5 py-2 shadow-sm border-[2px] border-white z-10">
                        <span className="text-[13px] font-bold text-kletta-dark">{params?.date || '5.9.2025'}</span>
                    </div>
                </div>

                <div className="flex flex-col">
                    <p className="text-[12px] text-white/40 font-light mb-0.5">Supplier:</p>
                    <div className="flex items-center gap-2 border-b border-white/10 pb-1.5">
                        <h1 className="text-[19px] font-medium text-white tracking-tight">{params?.supplier || 'Nur taxi Service Oy'}</h1>
                    </div>
                </div>
            </div>

            {/* Receipt Preview Strip - Padding removed as per screenshot */}
            <div className="bg-kletta-teal/95 overflow-hidden shrink-0">
                <div className="w-full h-[100px] overflow-hidden opacity-90 group active:opacity-100 transition-opacity">
                    <img 
                        src={params?.imageUrl || 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&fit=crop'} 
                        className="w-full h-full object-cover grayscale-[0.2]" 
                        alt="Receipt"
                    />
                </div>
            </div>

            {/* Amount Band */}
            <div className="bg-[#FFEE99] py-4 px-6 flex items-center justify-center shrink-0">
                <h2 className="text-[36px] font-bold text-kletta-dark tracking-tight leading-none">{params?.amount || '€114.00'}</h2>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 overflow-y-auto no-scrollbar px-6 pb-36 pt-6 space-y-7">
                
                {/* AI Hint Section - Text moved outside yellow bar as requested */}
                <div className="flex flex-col">
                    <div className="bg-kletta-yellow rounded-[14px] p-4 flex items-center justify-between shadow-sm">
                        <span className="text-[15px] font-medium text-kletta-dark">Non-allowable business expenses</span>
                        <div className="flex items-center gap-2">
                            <div className="w-7 h-7 rounded-full bg-kletta-teal flex items-center justify-center">
                                <IconSparkle size={16} weight="fill" className="text-white" />
                            </div>
                            <IconChevronRight size={18} weight="bold" className="text-kletta-dark" />
                        </div>
                    </div>
                    
                    <div className="py-4 space-y-4">
                        <p className="text-[14px] text-kletta-dark font-light leading-relaxed">
                            The purchase is for a personal care product, which is not typically allowable as a business expense for a builder.
                        </p>

                        <div className="flex items-center gap-2">
                            <IconSparkle size={16} weight="fill" className="text-kletta-teal" />
                            <span className="text-[12px] font-bold text-kletta-dark uppercase tracking-wide">Proposed by David Kletta AI assistant</span>
                        </div>
                    </div>
                </div>

                {/* VAT Rate Selection - Size reduced and multi-select enabled */}
                <div>
                    <label className="text-[13px] font-light text-gray-400 mb-3 block uppercase tracking-wide">VAT rate</label>
                    <div className="flex flex-wrap gap-2">
                        {['25,5%', '14%', '0%', '10%', 'Lisää'].map((rate) => (
                            <button 
                                key={rate}
                                onClick={() => toggleVat(rate)}
                                className={`h-[40px] px-5 rounded-full border transition-all flex items-center justify-center text-[13px] font-medium ${selectedVats.includes(rate) ? 'bg-[#00343B] text-white border-[#00343B]' : 'bg-white text-kletta-dark border-gray-200'}`}
                            >
                                {rate}
                            </button>
                        ))}
                    </div>
                </div>

                {/* VAT breakdown section - Shown when >1 rate is selected */}
                {selectedVats.length > 1 && (
                    <div className="animate-fade-in">
                        <label className="text-[13px] font-light text-gray-400 mb-3 block uppercase tracking-wide">VAT breakdown</label>
                        <div className="border border-gray-200 rounded-[20px] p-5 bg-white">
                            {/* Column Titles */}
                            <div className="flex mb-4">
                                <div className="w-[50px]"></div>
                                <div className="flex-1 text-center text-[13px] font-medium text-kletta-dark">Tax-free</div>
                                <div className="flex-1 text-center text-[13px] font-medium text-kletta-dark mx-2">VAT</div>
                                <div className="flex-1 text-center text-[13px] font-medium text-kletta-dark">Total</div>
                            </div>
                            
                            {/* Rows */}
                            <div className="space-y-3">
                                {selectedVats.map((rate) => {
                                    // Mock data based on provided screenshot
                                    const breakdownValues: Record<string, {free: string, vat: string, total: string}> = {
                                        '25,5%': { free: '159,20', vat: '40,60', total: '199,80' },
                                        '14%': { free: '100,00', vat: '14,00', total: '114,00' },
                                        '0%': { free: '114,00', vat: '0,00', total: '114,00' },
                                        '10%': { free: '103,64', vat: '10,36', total: '114,00' },
                                    };
                                    const v = breakdownValues[rate] || { free: '0,00', vat: '0,00', total: '0,00' };

                                    return (
                                        <div key={rate} className="flex items-center">
                                            <div className="w-[50px] text-[14px] font-medium text-kletta-dark">{rate}</div>
                                            <div className="flex-1 h-[44px] border border-gray-200 rounded-[12px] flex items-center justify-center text-[14px] font-normal text-kletta-dark shadow-sm">
                                                {v.free}
                                            </div>
                                            <div className="flex-1 h-[44px] border border-gray-200 rounded-[12px] flex items-center justify-center text-[14px] font-normal text-kletta-dark mx-2 shadow-sm">
                                                {v.vat}
                                            </div>
                                            <div className="flex-1 h-[44px] border border-gray-200 rounded-[12px] flex items-center justify-center text-[14px] font-normal text-kletta-dark shadow-sm">
                                                {v.total}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                )}

                {/* Description Field */}
                <div>
                    <label className="text-[13px] font-light text-gray-400 mb-2 block uppercase tracking-wide">Description</label>
                    <div className="border-b border-gray-100 pb-2">
                         <p className="text-[15px] font-normal text-kletta-dark leading-relaxed">
                            The purchase is for a personal care product, which is not typically allowable
                         </p>
                    </div>
                </div>
            </div>

            {/* Bottom Button */}
            <div className="absolute bottom-0 left-0 right-0 px-6 pt-4 pb-10 bg-white/95 backdrop-blur-sm border-t border-gray-100 z-30">
                <button 
                    onClick={() => navigate('invoice-success', { type: 'expense' })}
                    className="w-full h-[52px] bg-kletta-yellow rounded-[16px] text-kletta-dark font-bold text-[16px] shadow-sm active:scale-[0.98] transition-all"
                >
                    Record expense
                </button>
            </div>
        </div>
    );
};
