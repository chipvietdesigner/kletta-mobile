
import React from 'react';
import { 
    IconBack, IconChevronDown, IconPlus, IconQuestion, IconChevronRight, IconTrendUp,
    IconCellSignalFull, IconWifiHigh, IconBatteryFull, IconTrendDown, IconCar, IconMoney,
    IconCoins
} from '../components/Icons';
import { NavigationProps } from '../types';

// --- Shared Layout for Summary Detail Screens (Bank Style) ---
interface DetailScreenLayoutProps {
    title: string;
    totalAmount: string;
    totalLabel: string;
    children: React.ReactNode;
    goBack: () => void;
    onAdd?: () => void;
}

const DetailScreenLayout: React.FC<DetailScreenLayoutProps> = ({ 
    title, totalAmount, totalLabel, children, goBack, onAdd 
}) => {
    return (
        <div className="h-full w-full bg-white flex flex-col font-aktifo animate-fade-in relative overflow-hidden">
             
            {/* Header Section - Dark Teal #00343B */}
            <div className="w-full bg-kletta-teal flex flex-col z-20 pb-6 pt-0 shadow-sm">
                
                {/* Status Bar */}
                <div className="w-full h-[50px] flex justify-between items-end px-6 pb-2 text-white pointer-events-none">
                    <span className="text-[15px] font-medium tracking-normal leading-none ml-2">9:41</span>
                    <div className="flex gap-1.5 items-center mr-1">
                        <IconCellSignalFull size={16} weight="fill" />
                        <IconWifiHigh size={16} weight="bold" />
                        <IconBatteryFull size={24} weight="fill" className="rotate-0" />
                    </div>
                </div>

                {/* Navigation Row */}
                <div className="px-6 pt-2 pb-2">
                    <button 
                        onClick={goBack} 
                        className="w-10 h-10 -ml-2 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors text-white"
                    >
                        <IconBack size={26} weight="bold" />
                    </button>
                </div>

                {/* Header Content */}
                <div className="px-6 pt-0 flex flex-col">
                    <div className="flex justify-between items-center mb-6">
                        <div className="flex flex-col">
                            <h1 className="text-[26px] font-medium text-white tracking-tight mb-1 leading-tight">{title}</h1>
                            <div className="flex items-center gap-1 opacity-70 transition-opacity hover:opacity-100 cursor-pointer text-white">
                                <span className="text-[13px] font-medium">All time</span>
                                <IconChevronDown size={12} weight="bold" />
                            </div>
                        </div>
                        {onAdd && (
                            <button 
                                onClick={onAdd}
                                className="w-10 h-10 -mr-2 flex items-center justify-center hover:bg-white/10 rounded-full transition-colors text-white shrink-0"
                            >
                                <IconPlus size={24} weight="regular" />
                            </button>
                        )}
                    </div>

                    <div className="flex flex-col gap-1">
                        <p className="text-[12px] font-medium text-white/60 uppercase tracking-widest">{totalLabel}</p>
                        <p className="text-[34px] font-light text-white tracking-tight leading-none">{totalAmount}</p>
                    </div>
                </div>
            </div>

            {/* Scrollable List Content */}
            <div className="flex-1 overflow-y-auto no-scrollbar pb-36 pt-0 bg-white">
                {children}
            </div>
        </div>
    );
};

// --- Shared Row Component ---
interface DetailRowProps {
    title: string;
    subtitle?: string;
    amount: string;
    icon?: React.ReactNode;
    isPositive?: boolean;
    onClick?: () => void;
}

const DetailRow: React.FC<DetailRowProps> = ({ title, subtitle, amount, icon, isPositive, onClick }) => (
    <button 
        onClick={onClick}
        className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 active:bg-gray-100 transition-colors border-b border-gray-50 group text-left"
    >
        <div className="flex items-center gap-4 flex-1 min-w-0 pr-4">
            {/* Icon */}
            {icon && (
                <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 shrink-0">
                    {icon}
                </div>
            )}
            
            <div className="flex-1 min-w-0">
                <p className="text-[15px] font-medium text-kletta-dark truncate mb-0.5">{title}</p>
                {subtitle && (
                    <p className="text-[13px] font-light text-gray-400 truncate flex items-center gap-2">
                        {subtitle}
                    </p>
                )}
            </div>
        </div>
        
        <div className="text-right flex items-center gap-3 shrink-0">
            <p className={`text-[15px] font-medium tracking-normal ${isPositive ? 'text-green-600' : 'text-kletta-dark'}`}>
                {amount}
            </p>
            {onClick && (
                <IconChevronRight size={14} weight="bold" className="text-gray-300 group-hover:text-kletta-teal transition-colors" />
            )}
        </div>
    </button>
);


// --- Screens ---

// 1. Business Income
export const BusinessIncomeScreen: React.FC<NavigationProps> = ({ navigate, goBack }) => {
    const data = [
        { title: "Consulting Service - Project Alpha", subtitle: "24.04.2025 • INV-2025-001 • Tech Oy", amount: "€15,300.00" },
        { title: "Web Development & Maintenance", subtitle: "22.04.2025 • INV-2025-002 • Design Studio", amount: "€4,200.00" },
        { title: "UI/UX Workshop Facilitation", subtitle: "18.04.2025 • INV-2025-003 • Startup Hub", amount: "€1,250.00" },
        { title: "Monthly Retainer - April", subtitle: "15.04.2025 • INV-2025-004 • Corporate Inc.", amount: "€3,500.00" },
        { title: "Small Fixes", subtitle: "10.04.2025 • INV-2025-005 • Local Cafe", amount: "€200.00" },
        { title: "Logo Design Package", subtitle: "05.04.2025 • INV-2025-006 • Flower Shop", amount: "€850.00" },
        { title: "Emergency Server Support / Weekend", subtitle: "01.04.2025 • INV-2025-007 • IT Solutions", amount: "€600.00" },
        { title: "Content Strategy & Copywriting for Q2 Marketing Campaign", subtitle: "28.03.2025 • INV-2025-008 • Marketing Agency", amount: "€2,400.00" },
        { title: "Training Session", subtitle: "25.03.2025 • INV-2025-009 • School District", amount: "€500.00" },
    ];

    return (
        <DetailScreenLayout 
            title="Business income" 
            totalAmount="€232,436.00" 
            totalLabel="Total Income" 
            goBack={goBack}
            onAdd={() => navigate('new-invoice')}
        >
            <div className="px-6 py-3 bg-white/95 sticky top-0 backdrop-blur-sm z-10 border-b border-gray-50">
                <p className="text-[11px] font-medium text-gray-400 uppercase tracking-widest">Recent Invoices</p>
            </div>
            {data.map((item, i) => (
                <DetailRow 
                    key={i}
                    title={item.title}
                    subtitle={item.subtitle}
                    amount={item.amount}
                    icon={<IconTrendUp size={20} weight="bold" />}
                    isPositive
                    onClick={() => {}} 
                />
            ))}
        </DetailScreenLayout>
    );
};

// 2. Other Income
export const OtherIncomeScreen: React.FC<NavigationProps> = ({ navigate, goBack }) => {
    return (
        <DetailScreenLayout 
            title="Other income" 
            totalAmount="€0.00" 
            totalLabel="Total Other Income" 
            goBack={goBack}
        >
            <div className="px-6 py-12 flex flex-col items-center justify-center text-center opacity-60">
                <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center text-gray-300 mb-4">
                    <IconTrendUp size={32} weight="bold" />
                </div>
                <p className="text-[15px] font-medium text-kletta-dark mb-1">No other income yet</p>
                <p className="text-[13px] text-gray-500 font-light max-w-[240px]">
                    Grants, subsidies, tax refunds, and other non-sales income will appear here.
                </p>
            </div>
        </DetailScreenLayout>
    );
};

// 3. Business Expenses
export const BusinessExpensesScreen: React.FC<NavigationProps> = ({ navigate, goBack }) => {
    const data = [
        { title: "Adobe Creative Cloud Subscription", subtitle: "24.04.2025 • Software • Recurring", amount: "€59.99" },
        { title: "WeWork Co-working Space Rent", subtitle: "01.04.2025 • Office Rent", amount: "€450.00" },
        { title: "Apple Store - MacBook Pro 16” M3 Max", subtitle: "20.03.2025 • Equipment • Depreciated", amount: "€3,299.00" },
        { title: "Telia Business Internet", subtitle: "15.03.2025 • Phone & Internet", amount: "€29.90" },
        { title: "Taxi Helsinki - Client Meeting", subtitle: "12.03.2025 • Travel", amount: "€42.50" },
        { title: "Google Workspace Business Standard", subtitle: "01.03.2025 • Software", amount: "€10.80" },
        { title: "Office Chair - Herman Miller Aeron", subtitle: "25.02.2025 • Furniture", amount: "€1,150.00" },
        { title: "Squarespace Website Hosting & Domain Renewal (Annual)", subtitle: "10.02.2025 • Marketing", amount: "€214.00" },
        { title: "Posti - Shipping fees", subtitle: "05.02.2025 • Postage", amount: "€8.90" },
    ];

    return (
        <DetailScreenLayout 
            title="Business expenses" 
            totalAmount="€91,649.00" 
            totalLabel="Total Expenses" 
            goBack={goBack}
            onAdd={() => navigate('home', { tab: 'expenses' })} 
        >
            <div className="px-6 py-3 bg-white/95 sticky top-0 backdrop-blur-sm z-10 border-b border-gray-50">
                <p className="text-[11px] font-medium text-gray-400 uppercase tracking-widest">Deductible Expenses</p>
            </div>
            {data.map((item, i) => (
                <DetailRow 
                    key={i}
                    title={item.title}
                    subtitle={item.subtitle}
                    amount={item.amount}
                    icon={<IconTrendDown size={20} weight="bold" />}
                    onClick={() => {}} 
                />
            ))}
        </DetailScreenLayout>
    );
};

// 4. Non-allowable Expenses
export const NonAllowableExpensesScreen: React.FC<NavigationProps> = ({ navigate, goBack }) => {
    const data = [
        { title: "Parking Fine - Helsinki City", subtitle: "14.04.2025 • Fines are not deductible", amount: "€60.00" },
        { title: "Personal Lunch - Wolt", subtitle: "02.04.2025 • Private expense", amount: "€14.50" },
        { title: "Spotify Premium Family", subtitle: "01.04.2025 • Private use", amount: "€18.99" },
        { title: "Grocery Shopping - K-Citymarket", subtitle: "28.03.2025 • Private expense", amount: "€84.20" },
        { title: "Gym Membership - Elixia", subtitle: "15.03.2025 • Private expense", amount: "€69.00" },
        { title: "Tax Prepayments / Estimated Tax", subtitle: "10.03.2025 • Taxes are not expenses", amount: "€1,873.00" },
    ];

    return (
        <DetailScreenLayout 
            title="Non-allowable" 
            totalAmount="€2,120.50" 
            totalLabel="Total Non-Deductible" 
            goBack={goBack}
        >
             <div className="px-6 py-3 bg-white/95 sticky top-0 backdrop-blur-sm z-10 border-b border-gray-50">
                <p className="text-[11px] font-medium text-gray-400 uppercase tracking-widest">Personal & Fines</p>
            </div>
            {data.map((item, i) => (
                <DetailRow 
                    key={i}
                    title={item.title}
                    subtitle={item.subtitle}
                    amount={item.amount}
                    icon={<IconTrendDown size={20} weight="bold" />}
                    onClick={() => {}} 
                />
            ))}
        </DetailScreenLayout>
    );
};

// 5. Claimed Kilometers
export const ClaimedKilometersScreen: React.FC<NavigationProps> = ({ navigate, goBack }) => {
    const data = [
        { title: "Trip to Client Office (Espoo)", subtitle: "22.04.2025 • 24 km • Audi A4", amount: "€12.72" },
        { title: "Site Visit - Construction Project Alpha", subtitle: "18.04.2025 • 86 km • Audi A4", amount: "€45.58" },
        { title: "Supplier Meeting", subtitle: "10.04.2025 • 12 km • Audi A4", amount: "€6.36" },
        { title: "Conference in Tampere (Round trip)", subtitle: "02.04.2025 • 360 km • Audi A4", amount: "€190.80" },
        { title: "Post Office Run", subtitle: "28.03.2025 • 5 km • Audi A4", amount: "€2.65" },
        { title: "Client Workshop - Vantaa", subtitle: "15.03.2025 • 32 km • Audi A4", amount: "€16.96" },
        { title: "Networking Event", subtitle: "10.03.2025 • 18 km • Audi A4", amount: "€9.54" },
    ];

    return (
        <DetailScreenLayout 
            title="Claimed kilometers" 
            totalAmount="€328.79" 
            totalLabel="Total Deductible Value" 
            goBack={goBack}
            onAdd={() => navigate('home', { tab: 'assets' })} 
        >
            <div className="px-6 py-3 bg-white/95 sticky top-0 backdrop-blur-sm z-10 border-b border-gray-50">
                <p className="text-[11px] font-medium text-gray-400 uppercase tracking-widest">Mileage Log</p>
            </div>
            {data.map((item, i) => (
                <DetailRow 
                    key={i}
                    title={item.title}
                    subtitle={item.subtitle}
                    amount={item.amount}
                    icon={<IconCar size={20} weight="bold" />}
                    isPositive // Treated as income/deduction benefit visual
                    onClick={() => {}} 
                />
            ))}
        </DetailScreenLayout>
    );
};

// 6. Cash Withdrawal
export const CashWithdrawalScreen: React.FC<NavigationProps> = ({ navigate, goBack }) => {
     const data = [
        { title: "ATM Withdrawal - Otto.", subtitle: "20.04.2025 • Kamppi Center", amount: "€200.00" },
        { title: "ATM Withdrawal - Otto.", subtitle: "15.04.2025 • Helsinki Central", amount: "€500.00" },
        { title: "ATM Withdrawal - Nosto", subtitle: "01.04.2025 • Alepa Kallio", amount: "€1,000.00" },
        { title: "Cash Withdrawal", subtitle: "25.03.2025 • Bank Counter", amount: "€2,500.00" },
        { title: "ATM Withdrawal - Otto.", subtitle: "10.03.2025 • Iso Omena", amount: "€150.00" },
        { title: "ATM Withdrawal - Otto.", subtitle: "02.03.2025 • Airport", amount: "€400.00" },
    ];

    return (
        <DetailScreenLayout 
            title="Cash withdrawal" 
            totalAmount="€5,353.50" 
            totalLabel="Total Withdrawn" 
            goBack={goBack}
        >
            <div className="px-6 py-3 bg-white/95 sticky top-0 backdrop-blur-sm z-10 border-b border-gray-50">
                <p className="text-[11px] font-medium text-gray-400 uppercase tracking-widest">History</p>
            </div>
            {data.map((item, i) => (
                <DetailRow 
                    key={i}
                    title={item.title}
                    subtitle={item.subtitle}
                    amount={item.amount}
                    icon={<IconMoney size={20} weight="bold" />}
                    onClick={() => {}} 
                />
            ))}
        </DetailScreenLayout>
    );
};

// 7. Tax Prepayments (New)
export const TaxPrepaymentsScreen: React.FC<NavigationProps> = ({ navigate, goBack }) => {
    const data = [
       { title: "Prepayment 2025 (4/4)", subtitle: "20.10.2025 • Tax Admin", amount: "€1,050.00" },
       { title: "Prepayment 2025 (3/4)", subtitle: "20.07.2025 • Tax Admin", amount: "€1,050.00" },
       { title: "Prepayment 2025 (2/4)", subtitle: "20.04.2025 • Tax Admin", amount: "€1,050.00" },
       { title: "Prepayment 2025 (1/4)", subtitle: "20.01.2025 • Tax Admin", amount: "€1,050.00" },
   ];

   return (
       <DetailScreenLayout 
           title="Tax prepayments" 
           totalAmount="€4,200.00" 
           totalLabel="Total Paid" 
           goBack={goBack}
       >
           <div className="px-6 py-3 bg-white/95 sticky top-0 backdrop-blur-sm z-10 border-b border-gray-50">
               <p className="text-[11px] font-medium text-gray-400 uppercase tracking-widest">Prepayment History</p>
           </div>
           {data.map((item, i) => (
               <DetailRow 
                   key={i}
                   title={item.title}
                   subtitle={item.subtitle}
                   amount={item.amount}
                   icon={<IconCoins size={20} weight="fill" />}
                   onClick={() => {}} 
               />
           ))}
       </DetailScreenLayout>
   );
};
