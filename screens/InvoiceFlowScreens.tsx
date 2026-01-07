
import React, { useState } from 'react';
import { 
  IconBack, IconCellSignalFull, IconWifiHigh, IconBatteryFull, IconChevronRight, IconPlus,
  IconSearch, IconCheck, IconChevronDown, IconCalendarBlank, IconWarningCircle, IconSparkle,
  IconCheckCircle
} from '../components/Icons';
import { NavigationProps } from '../types';
import { KlettaInput, KlettaTextarea } from '../components/Inputs';

// --- SHARED LAYOUT ---
interface InvoiceFlowLayoutProps {
    title?: string; // For dark header
    children: React.ReactNode;
    goBack?: () => void;
    bottomAction?: React.ReactNode;
    headerAction?: React.ReactNode;
    variant?: 'clean' | 'dark'; // 'clean' = white bg, back arrow only (screens 1-6). 'dark' = teal header (preview)
}

const InvoiceFlowLayout: React.FC<InvoiceFlowLayoutProps> = ({ 
    title, children, goBack, bottomAction, headerAction, variant = 'clean' 
}) => {
    return (
        <div className={`h-full w-full flex flex-col font-aktifo animate-fade-in relative overflow-hidden ${variant === 'clean' ? 'bg-[#FAFAFA]' : 'bg-[#F5F5F5]'}`}>
            
             {/* Header */}
             {variant === 'dark' ? (
                 <div className="bg-kletta-dark w-full z-20 shadow-sm shrink-0">
                     <div className="w-full h-[50px] flex justify-between items-end px-6 pb-2 text-white pointer-events-none">
                        <span className="text-[15px] font-medium tracking-normal leading-none ml-2">9:41</span>
                        <div className="flex gap-1.5 items-center mr-1">
                           <IconCellSignalFull size={16} weight="fill" />
                           <IconWifiHigh size={16} weight="bold" />
                           <IconBatteryFull size={24} weight="fill" className="rotate-0" />
                        </div>
                     </div>
                     <div className="pt-2 pb-6 px-6 flex items-center justify-between">
                        <button onClick={goBack} className="w-10 h-10 -ml-2 rounded-full flex items-center justify-center hover:bg-white/10 active:bg-white/20 transition-colors text-white">
                           <IconBack size={26} weight="bold" />
                        </button>
                        <h1 className="text-[17px] font-medium text-white tracking-wide">{title}</h1>
                        <div className="w-10 flex justify-end">{headerAction}</div>
                     </div>
                 </div>
             ) : (
                 <div className="w-full z-20 shrink-0 bg-[#FAFAFA]">
                     <div className="w-full h-[50px] flex justify-between items-end px-6 pb-2 text-kletta-dark pointer-events-none">
                        <span className="text-[15px] font-medium tracking-normal leading-none ml-2">9:41</span>
                        <div className="flex gap-1.5 items-center mr-1">
                           <IconCellSignalFull size={16} weight="fill" />
                           <IconWifiHigh size={16} weight="bold" />
                           <IconBatteryFull size={24} weight="fill" className="rotate-0" />
                        </div>
                     </div>
                     <div className="pt-2 pb-2 px-6 flex items-center justify-between">
                        <button onClick={goBack} className="w-10 h-10 -ml-2 rounded-full flex items-center justify-center hover:bg-gray-100 active:bg-gray-200 transition-colors text-kletta-dark">
                           <IconBack size={26} weight="bold" />
                        </button>
                     </div>
                 </div>
             )}
    
             {/* Main Scrollable Content */}
             <div className="flex-1 overflow-y-auto no-scrollbar relative z-10">
                {children}
                {/* Spacer for bottom action */}
                <div className="h-32"></div> 
             </div>
    
             {/* Fixed Bottom Action Area */}
             {bottomAction && (
                 <div className="absolute bottom-0 left-0 right-0 bg-white px-6 pt-4 pb-10 border-t border-gray-100 z-30">
                    {bottomAction}
                 </div>
             )}
        </div>
    );
};


// --- SCREEN 1: SELECT PAYMENT METHOD ---
export const InvoicePaymentMethodScreen: React.FC<NavigationProps> = ({ navigate, goBack }) => {
    const [selected, setSelected] = useState<'invoice' | 'cash' | 'einvoice'>('invoice');

    return (
        <InvoiceFlowLayout 
            variant="clean"
            goBack={goBack}
            bottomAction={
                <button 
                    onClick={() => navigate('invoice-customer-select')}
                    className="w-full py-4 bg-kletta-yellow rounded-[14px] font-medium text-[16px] text-kletta-dark shadow-sm hover:shadow-md active:scale-[0.98] transition-all"
                >
                    Next
                </button>
            }
        >
            <div className="px-6 pt-2 mb-8">
                <h1 className="text-[24px] font-medium text-kletta-dark leading-tight">
                    Your sale order total is <span className="font-bold">€855.00</span>
                </h1>
                <h1 className="text-[24px] font-medium text-kletta-dark leading-tight mt-1">
                    Select the payment method
                </h1>
            </div>

            <div className="bg-white border-y border-gray-100 px-6">
                 <RadioRow 
                    label="Cash receipt" 
                    selected={selected === 'cash'} 
                    onClick={() => setSelected('cash')} 
                 />
                 <RadioRow 
                    label="Invoice" 
                    selected={selected === 'invoice'} 
                    onClick={() => setSelected('invoice')} 
                 />
                 <RadioRow 
                    label="E-invoice" 
                    selected={selected === 'einvoice'} 
                    onClick={() => setSelected('einvoice')} 
                 />
            </div>
        </InvoiceFlowLayout>
    );
};

// --- SCREEN 2: SELECT CUSTOMER ---
export const InvoiceCustomerSelectScreen: React.FC<NavigationProps> = ({ navigate, goBack }) => {
    const [selectedId, setSelectedId] = useState<string | null>(null);

    const customers = [
        { id: '1', name: 'John Doe', email: 'john.doe@gmail.com' },
        { id: '2', name: 'Malik Boatwright', email: 'malik.boatwright@gmail.com' },
        { id: '3', name: 'Amari Straub', email: 'amari.straub@gmail.com' },
        { id: '4', name: 'Kobe Hodkiewicz', email: 'kobe.hodkiewicz@gmail.com' },
    ];

    return (
        <InvoiceFlowLayout 
            variant="clean"
            goBack={goBack}
            bottomAction={
                <div className="flex gap-3">
                    <button 
                         onClick={() => navigate('invoice-due-date')} 
                         className="flex-1 py-4 bg-white border border-gray-200 rounded-[14px] font-medium text-[15px] text-kletta-dark active:bg-gray-50 transition-colors"
                    >
                        No customer
                    </button>
                    <button 
                        onClick={() => navigate('invoice-customer-confirm', { customerId: selectedId })}
                        // Enable next even if not selected for demo flow, usually disabled={!selectedId}
                        className="flex-[2] py-4 bg-kletta-yellow rounded-[14px] font-medium text-[16px] text-kletta-dark shadow-sm hover:shadow-md active:scale-[0.98] transition-all"
                    >
                        Next
                    </button>
                </div>
            }
        >
             <div className="px-6 pt-2 mb-6">
                <h1 className="text-[24px] font-medium text-kletta-dark leading-tight">
                    Add customer information to invoice
                </h1>
             </div>

             {/* Add New Action (Blue Link Style) */}
             <div className="px-6 mb-8">
                 <button 
                    onClick={() => navigate('invoice-customer-new')}
                    className="text-[16px] font-medium text-[#0056D2] hover:underline flex items-center gap-1"
                 >
                     + Add a new customer
                 </button>
             </div>

             <div className="px-6 mb-4">
                 <p className="text-[15px] font-medium text-kletta-dark">Choose from existing customers</p>
             </div>

             <div className="bg-transparent px-6 space-y-4">
                 {customers.map((c) => (
                     <div 
                        key={c.id} 
                        className="flex items-start gap-4 cursor-pointer group"
                        onClick={() => setSelectedId(c.id)}
                     >
                         <div className={`w-6 h-6 rounded-full border-[2px] mt-0.5 flex items-center justify-center shrink-0 transition-colors ${selectedId === c.id ? 'border-[#005c66]' : 'border-kletta-dark'}`}>
                             {selectedId === c.id && <div className="w-3 h-3 bg-[#005c66] rounded-full"></div>}
                         </div>
                         <div className="flex-1 min-w-0 pb-4 border-b border-gray-200/60 group-last:border-none">
                             <p className="text-[16px] font-medium text-kletta-dark mb-1">{c.name}</p>
                             <p className="text-[14px] text-gray-500 font-light">{c.email}</p>
                         </div>
                     </div>
                 ))}
             </div>
        </InvoiceFlowLayout>
    );
};

// --- SCREEN 3: ADD NEW CUSTOMER ---
export const InvoiceNewCustomerScreen: React.FC<NavigationProps> = ({ navigate, goBack }) => {
    const [type, setType] = useState<'company' | 'private'>('company');

    return (
        <InvoiceFlowLayout 
            variant="clean"
            goBack={goBack}
            bottomAction={
                <button 
                    onClick={() => navigate('invoice-customer-confirm', { isNew: true })}
                    className="w-full py-4 bg-kletta-yellow rounded-[14px] font-medium text-[16px] text-kletta-dark shadow-sm hover:shadow-md active:scale-[0.98] transition-all"
                >
                    Next
                </button>
            }
        >
             <div className="px-6 pt-2 mb-8">
                <h1 className="text-[24px] font-medium text-kletta-dark leading-tight">
                    Add a new customer
                </h1>
             </div>

             <div className="px-6 mb-8">
                 <p className="text-[15px] font-medium text-kletta-dark mb-4">Is the customer a company or a private person?</p>
                 <div className="space-y-4">
                     <RadioItem label="Company" selected={type === 'company'} onClick={() => setType('company')} />
                     <RadioItem label="Private person" selected={type === 'private'} onClick={() => setType('private')} />
                 </div>
             </div>

             <div className="px-6 mb-4">
                 <p className="text-[15px] font-medium text-kletta-dark">Customer information</p>
             </div>

             <div className="px-6 space-y-4">
                 <KlettaInput label="Company" defaultValue="KLETTA LIMITED" icon={<IconSearch size={18} />} />
                 <KlettaInput label="Name" defaultValue="John Doe" />
                 <KlettaInput label="Email address" defaultValue="john.doe@gmail.com" />
                 <KlettaInput label="Street address" defaultValue="17 Rosewood Crescent" />
                 
                 <div className="flex gap-3">
                     <div className="flex-1">
                        <KlettaInput label="City" defaultValue="Bristol" />
                     </div>
                     <div className="flex-1">
                        <KlettaInput label="Postal code" defaultValue="BS8 3LP" />
                     </div>
                 </div>

                 <div className="relative">
                     <div className="w-full h-[60px] bg-white rounded-[12px] border border-[#E6E8EC] px-4 pt-5 pb-1 relative">
                        <span className="absolute top-2 left-4 text-[11px] text-gray-500 font-medium uppercase tracking-wider">Country</span>
                        <div className="flex items-center gap-2">
                             <span>🇬🇧</span>
                             <span className="text-[15px] font-medium text-kletta-dark">United Kingdom</span>
                        </div>
                     </div>
                     <IconChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1 mt-1 text-gray-500 pointer-events-none" />
                 </div>
             </div>
        </InvoiceFlowLayout>
    );
};

// --- SCREEN 4: CONFIRM CUSTOMER ---
export const InvoiceConfirmCustomerScreen: React.FC<NavigationProps> = ({ navigate, goBack }) => {
    return (
        <InvoiceFlowLayout 
            variant="clean"
            goBack={goBack}
            bottomAction={
                <button 
                    onClick={() => navigate('invoice-due-date')}
                    className="w-full py-4 bg-kletta-yellow rounded-[14px] font-medium text-[16px] text-kletta-dark shadow-sm hover:shadow-md active:scale-[0.98] transition-all"
                >
                    Confirm
                </button>
            }
        >
             <div className="px-6 pt-2 mb-8">
                <h1 className="text-[24px] font-medium text-kletta-dark leading-tight">
                    Confirm customer
                </h1>
             </div>

             <div className="px-6 space-y-4">
                 <KlettaInput label="Company" defaultValue="KLETTA LIMITED" readOnly />
                 <KlettaInput label="Name" defaultValue="John Doe" readOnly />
                 <KlettaInput label="Email address" defaultValue="john.doe@gmail.com" readOnly />
                 <KlettaInput label="Street address" defaultValue="17 Rosewood Crescent" readOnly />
                 
                 <div className="flex gap-3">
                     <div className="flex-1">
                        <KlettaInput label="City" defaultValue="Bristol" readOnly />
                     </div>
                     <div className="flex-1">
                        <KlettaInput label="Postal code" defaultValue="BS8 3LP" readOnly />
                     </div>
                 </div>

                 <div className="w-full h-[60px] bg-white rounded-[12px] border border-[#E6E8EC] px-4 pt-5 pb-1 relative">
                    <span className="absolute top-2 left-4 text-[11px] text-gray-500 font-medium uppercase tracking-wider">Country</span>
                    <div className="flex items-center gap-2">
                         <span>🇬🇧</span>
                         <span className="text-[15px] font-medium text-kletta-dark">United Kingdom</span>
                    </div>
                    <IconChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1 mt-1 text-gray-500 pointer-events-none" />
                 </div>
             </div>
        </InvoiceFlowLayout>
    );
};

// --- SCREEN 5: DUE DATE ---
export const InvoiceDueDateScreen: React.FC<NavigationProps> = ({ navigate, goBack }) => {
    const [days, setDays] = useState(14);
    const [isSpecific, setIsSpecific] = useState(false);

    return (
        <InvoiceFlowLayout 
            variant="clean"
            goBack={goBack}
            bottomAction={
                <button 
                    onClick={() => navigate('invoice-notes')}
                    className="w-full py-4 bg-kletta-yellow rounded-[14px] font-medium text-[16px] text-kletta-dark shadow-sm hover:shadow-md active:scale-[0.98] transition-all"
                >
                    Next
                </button>
            }
        >
             <div className="px-6 pt-2 mb-8">
                <h1 className="text-[24px] font-medium text-kletta-dark leading-tight">
                    Set a due date
                </h1>
             </div>

             <div className="px-6 space-y-4">
                 <RadioItem label="Upon receipt" selected={!isSpecific && days === 0} onClick={() => { setDays(0); setIsSpecific(false); }} />
                 <RadioItem label="7 days" selected={!isSpecific && days === 7} onClick={() => { setDays(7); setIsSpecific(false); }} />
                 <RadioItem label="14 days" selected={!isSpecific && days === 14} onClick={() => { setDays(14); setIsSpecific(false); }} />
                 <RadioItem label="30 days" selected={!isSpecific && days === 30} onClick={() => { setDays(30); setIsSpecific(false); }} />
                 <RadioItem label="Specific" selected={isSpecific} onClick={() => setIsSpecific(true)} />
             </div>
        </InvoiceFlowLayout>
    );
};

// --- SCREEN 6: ADDITIONAL NOTES ---
export const InvoiceNotesScreen: React.FC<NavigationProps> = ({ navigate, goBack }) => {
    const [note, setNote] = useState('Hi Jari, thanks for your business. Please pay within 14 days.'); // Mock filled

    return (
        <InvoiceFlowLayout 
            variant="clean"
            goBack={goBack}
            bottomAction={
                <div className="flex gap-3">
                    <button 
                         onClick={() => navigate('invoice-preview')} 
                         className="flex-1 py-4 bg-white border border-gray-200 rounded-[14px] font-medium text-[15px] text-kletta-dark active:bg-gray-50 transition-colors"
                    >
                        Skip
                    </button>
                    <button 
                        onClick={() => navigate('invoice-preview')}
                        className="flex-[2] py-4 bg-kletta-yellow rounded-[14px] font-medium text-[16px] text-kletta-dark shadow-sm hover:shadow-md active:scale-[0.98] transition-all"
                    >
                        Next
                    </button>
                </div>
            }
        >
             <div className="px-6 pt-2 mb-6">
                <h1 className="text-[24px] font-medium text-kletta-dark leading-tight">
                    Any additional notes?
                </h1>
             </div>

             <div className="px-6">
                 <KlettaTextarea 
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="Add message (optional)"
                    className="h-40"
                 />
             </div>
        </InvoiceFlowLayout>
    );
};

// --- SCREEN 7: PREVIEW ---
export const InvoicePreviewScreen: React.FC<NavigationProps> = ({ navigate, goBack }) => {
    const [showDiscard, setShowDiscard] = useState(false);

    return (
        <div className="relative h-full w-full"> 
            <InvoiceFlowLayout 
                title="Preview invoice" 
                variant="dark"
                goBack={goBack}
                bottomAction={
                    <div className="flex flex-col gap-3">
                         {/* NOJA Banner */}
                         <div className="w-full bg-[#002B49] rounded-[10px] p-4 flex items-center justify-between mb-2">
                             <div className="flex flex-col">
                                 <div className="flex items-center gap-1 mb-0.5">
                                     <span className="text-white font-medium text-[16px]">NOJA</span>
                                     <span className="text-white/60 text-[10px] uppercase font-medium tracking-widest mt-0.5">RAHOITUS</span>
                                 </div>
                             </div>
                             <span className="text-white font-medium text-[16px]">Get 50% now</span>
                         </div>

                        <button 
                            onClick={() => navigate('invoice-success')}
                            className="w-full py-4 bg-kletta-yellow rounded-[14px] font-medium text-[16px] text-kletta-dark shadow-sm hover:shadow-md active:scale-[0.98] transition-all"
                        >
                            Send
                        </button>
                        <button 
                            onClick={() => navigate('home')}
                            className="w-full py-4 bg-white border border-gray-200 rounded-[14px] font-medium text-[15px] text-kletta-dark hover:bg-gray-50 transition-colors"
                        >
                            Save as draft
                        </button>
                        <button 
                            onClick={() => setShowDiscard(true)}
                            className="w-full py-2 text-[14px] font-medium text-kletta-dark hover:opacity-70 transition-opacity"
                        >
                            Discard
                        </button>
                    </div>
                }
            >
                {/* Preview Card */}
                <div className="bg-white rounded-[6px] shadow-[0_4px_24px_rgba(0,0,0,0.08)] overflow-hidden mx-6 mt-4 min-h-[500px] border border-gray-100 relative">
                    <div className="p-6">
                        {/* Header */}
                        <div className="flex justify-between items-start mb-8">
                            <h2 className="text-2xl font-medium text-kletta-dark">Invoice</h2>
                            <span className="font-medium text-xl text-kletta-dark">Kletta</span>
                        </div>
                        
                        {/* Info Grid */}
                        <div className="grid grid-cols-2 gap-8 mb-8">
                             <div>
                                 <p className="text-[10px] font-medium text-gray-900 mb-1">From</p>
                                 <p className="text-[11px] font-medium text-kletta-dark">Kletta Sami</p>
                                 <p className="text-[11px] text-gray-500">sami+1@kletta.com</p>
                                 <p className="text-[11px] text-gray-500">Laajaniityntie 12 D46</p>
                                 <p className="text-[11px] text-gray-500">01620 Vantaa, Suomi</p>
                             </div>
                             <div>
                                 <div className="grid grid-cols-2 gap-y-2 gap-x-1 mb-4">
                                     <div>
                                         <p className="text-[8px] font-medium border border-gray-300 p-0.5 inline-block mb-0.5">Date</p>
                                         <p className="text-[9px] font-medium">29.04.2025</p>
                                     </div>
                                     <div>
                                         <p className="text-[8px] font-medium border border-gray-300 p-0.5 inline-block mb-0.5">Invoice number</p>
                                         <p className="text-[9px] font-medium">14149</p>
                                     </div>
                                     <div>
                                         <p className="text-[8px] font-medium border border-gray-300 p-0.5 inline-block mb-0.5">Due date</p>
                                         <p className="text-[9px] font-medium">13.05.2025</p>
                                     </div>
                                 </div>
                             </div>
                        </div>

                        {/* Bill To */}
                        <div className="mb-8">
                             <p className="text-[10px] font-medium text-gray-900 mb-1">Billed to</p>
                             <p className="text-[11px] font-medium text-kletta-dark">Jari</p>
                             <p className="text-[11px] text-gray-500">United Kingdom</p>
                             <p className="text-[11px] text-gray-500">sami+56778@kletta.com</p>
                        </div>
                        
                        {/* Table Header */}
                        <div className="flex border-b border-black pb-1 mb-2">
                            <p className="w-1/2 text-[9px] font-medium">Item</p>
                            <p className="w-1/6 text-[9px] font-medium text-right">Quantity</p>
                            <p className="w-1/6 text-[9px] font-medium text-right">Price</p>
                            <p className="w-1/6 text-[9px] font-medium text-right">Total</p>
                        </div>

                        {/* Item Row */}
                        <div className="flex mb-4">
                            <div className="w-1/2">
                                <p className="text-[9px] font-medium">Customer work</p>
                            </div>
                            <p className="w-1/6 text-[9px] text-right">1</p>
                            <p className="w-1/6 text-[9px] text-right">€855.00</p>
                            <p className="w-1/6 text-[9px] text-right">€855.00</p>
                        </div>
                        
                        {/* Totals */}
                        <div className="flex justify-end border-t border-black pt-2">
                             <div className="w-1/2">
                                 <div className="flex justify-between mb-1">
                                     <span className="text-[9px] font-medium">Subtotal</span>
                                     <span className="text-[9px]">€855.00</span>
                                 </div>
                                 <div className="flex justify-between mb-1">
                                     <span className="text-[9px] font-medium">Tax 25.5%</span>
                                     <span className="text-[9px]">€218.03</span>
                                 </div>
                                 <div className="flex justify-between border-t border-black pt-1">
                                     <span className="text-[10px] font-medium">Total</span>
                                     <span className="text-[10px] font-medium">€1,073.03</span>
                                 </div>
                             </div>
                        </div>
                    </div>
                </div>
            </InvoiceFlowLayout>

            {/* Discard Modal */}
            {showDiscard && (
                <div className="absolute inset-0 z-50 flex items-center justify-center p-6">
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-fade-in" onClick={() => setShowDiscard(false)} />
                    <div className="bg-white w-full max-w-[320px] rounded-[24px] p-6 relative z-10 animate-slide-up shadow-2xl text-center">
                        <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4 text-red-500">
                             <IconWarningCircle size={28} weight="fill" />
                        </div>
                        <h3 className="text-[18px] font-medium text-kletta-dark mb-2">Discard invoice?</h3>
                        <p className="text-[14px] text-gray-500 font-light mb-6 leading-relaxed">
                            Your changes will be lost and this invoice will not be saved.
                        </p>
                        <div className="flex flex-col gap-3">
                             <button 
                                onClick={() => setShowDiscard(false)}
                                className="w-full py-3.5 bg-gray-100 rounded-[14px] font-medium text-[15px] text-kletta-dark hover:bg-gray-200 transition-colors"
                             >
                                Keep editing
                             </button>
                             <button 
                                onClick={() => navigate('home')}
                                className="w-full py-3.5 bg-white border border-red-100 rounded-[14px] font-medium text-[15px] text-red-500 hover:bg-red-50 transition-colors"
                             >
                                Discard
                             </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

// --- SCREEN 8: SUCCESS ---
export const InvoiceSuccessScreen: React.FC<NavigationProps> = ({ navigate, params }) => {
    const isExpense = params?.type === 'expense';
    const title = isExpense ? 'Your receipt has been recorded' : 'Your invoice has been sent';
    const subActionText = isExpense ? 'View expense details' : 'View invoice details';

    return (
        <div className="h-full w-full bg-white flex flex-col font-aktifo animate-fade-in relative overflow-hidden items-center justify-center p-8">
             
             <div className="bg-[#00343B] w-[120px] h-[120px] rounded-full flex items-center justify-center relative mb-10 shadow-xl">
                 <IconCheck size={60} weight="bold" className="text-white" />
                 <IconSparkle size={24} weight="fill" className="text-kletta-yellow absolute top-2 right-4 animate-pulse" />
                 <IconSparkle size={16} weight="fill" className="text-kletta-yellow absolute bottom-4 left-2 animate-bounce" />
             </div>

             <h1 className="text-[24px] font-medium text-kletta-dark text-center mb-4 leading-tight">{title}</h1>
             
             <button className="text-[15px] font-medium text-kletta-dark underline hover:no-underline mb-20">
                 {subActionText}
             </button>

             {/* Feedback Card */}
             <div className="w-full bg-[#FAFAFA] rounded-[20px] p-5 flex items-center gap-4 border border-gray-100 mb-8">
                 <div className="w-12 h-12 bg-kletta-yellow rounded-full flex items-center justify-center text-2xl shadow-sm">
                     😉
                 </div>
                 <div className="flex-1">
                     <p className="text-[14px] font-medium text-kletta-dark mb-0.5">Are you loving your experience with us so far?</p>
                     <button className="text-[12px] font-medium text-kletta-teal underline">Give us a rating</button>
                 </div>
             </div>

             <div className="absolute bottom-0 left-0 right-0 p-6">
                 <button 
                    onClick={() => navigate('home')}
                    className="w-full py-4 bg-kletta-yellow rounded-[14px] font-medium text-[16px] text-kletta-dark shadow-sm hover:shadow-md active:scale-[0.98] transition-all"
                 >
                    Done
                 </button>
             </div>
        </div>
    );
};


// --- HELPER COMPONENTS ---

const RadioRow = ({ label, selected, onClick }: { label: string, selected: boolean, onClick: () => void }) => (
    <button 
       onClick={onClick} 
       className="w-full py-5 flex items-center gap-4 border-b border-gray-100 transition-colors group text-left"
    >
        <div className={`w-6 h-6 rounded-full border-[2px] flex items-center justify-center shrink-0 transition-colors ${selected ? 'border-[#005c66]' : 'border-kletta-dark'}`}>
            {selected && <div className="w-3 h-3 bg-[#005c66] rounded-full"></div>}
        </div>
        <p className="text-[16px] font-medium text-kletta-dark">{label}</p>
    </button>
);

const RadioItem = ({ label, selected, onClick }: { label: string, selected: boolean, onClick: () => void }) => (
    <button 
       onClick={onClick} 
       className="flex items-center gap-4 group text-left w-full"
    >
        <div className={`w-6 h-6 rounded-full border-[2px] flex items-center justify-center shrink-0 transition-colors ${selected ? 'border-[#005c66]' : 'border-kletta-dark'}`}>
            {selected && <div className="w-3 h-3 bg-[#005c66] rounded-full"></div>}
        </div>
        <p className="text-[16px] font-medium text-kletta-dark">{label}</p>
    </button>
);
