import React, { useState } from 'react';
import { 
  IconBack, IconPlus, IconCheck, IconTag, IconCalendarBlank, IconPaperclip, 
  IconChevronRight, IconCellSignalFull, IconWifiHigh, IconBatteryFull, IconPlusCircle,
  IconSparkle, IconSearch, IconClose, IconMinus, IconChevronDown
} from '../components/Icons';
import { NavigationProps } from '../types';
import { KlettaInput, KlettaSelect, KlettaTextarea } from '../components/Inputs';

interface Product {
    id: string;
    title: string;
    basePrice: number;
    vat: number;
    description: string;
    type: string;
    imageUrl?: string;
}

// --- MOCK DATA GENERATOR ---
const RECENT_PRODUCTS: Product[] = [
    { 
        id: "prod-1", 
        title: "Strategic Financial Planning & Annual Audit Review Consultation", 
        basePrice: 380.70, 
        vat: 24, 
        description: "Strategic planning", 
        type: "Service",
        imageUrl: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=100&h=100&fit=crop"
    },
    { 
        id: "prod-2", 
        title: "React Native Mobile App Development - Phase 1", 
        basePrice: 850.00, 
        vat: 24, 
        description: "Frontend development", 
        type: "Project",
        imageUrl: "https://images.unsplash.com/photo-1555099962-4199c345e5dd?w=100&h=100&fit=crop"
    },
    { 
        id: "prod-3", 
        title: "Monthly Bookkeeping (April 2025)", 
        basePrice: 120.00, 
        vat: 24, 
        description: "Monthly fee", 
        type: "Fixed",
        imageUrl: "https://images.unsplash.com/photo-1554224154-260327c00c4b?w=100&h=100&fit=crop"
    },
    { 
        id: "prod-recent-4", 
        title: "Legal Advisory - Contract Review", 
        basePrice: 220.00, 
        vat: 24, 
        description: "Contract analysis", 
        type: "Hourly",
        imageUrl: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=100&h=100&fit=crop"
    },
    { 
        id: "prod-recent-5", 
        title: "Server Maintenance", 
        basePrice: 95.00, 
        vat: 24, 
        description: "Routine check", 
        type: "Hourly",
        imageUrl: "https://images.unsplash.com/photo-1558494949-ef526b004297?w=100&h=100&fit=crop"
    },
];

const ALL_PRODUCTS: Product[] = [
    { id: "prod-4", title: "Internal Audit Service - Q1", basePrice: 1200.00, vat: 24, description: "Internal audit", type: "Service", imageUrl: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=100&h=100&fit=crop" },
    { id: "prod-5", title: "Statutory Audit - Year End 2024 Compliance Check", basePrice: 2500.00, vat: 24, description: "Yearly statutory audit", type: "Service", imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=100&h=100&fit=crop" },
    { id: "prod-6", title: "Basic Bookkeeping", basePrice: 65.00, vat: 24, description: "Hourly rate", type: "Hourly", imageUrl: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=100&h=100&fit=crop" },
    { id: "prod-7", title: "Senior Accountant Consultation", basePrice: 85.00, vat: 24, description: "Senior rate", type: "Hourly", imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop" },
    { id: "prod-8", title: "Corporate Tax Advisory", basePrice: 150.00, vat: 24, description: "Tax consultation", type: "Hourly", imageUrl: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=100&h=100&fit=crop" },
    { id: "prod-9", title: "Legal Framework Setup for New Subsidiary", basePrice: 200.00, vat: 24, description: "Legal setup", type: "Hourly", imageUrl: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=100&h=100&fit=crop" },
    { id: "prod-10", title: "Domain Renewal (.com) - 1 Year", basePrice: 15.00, vat: 24, description: "Annual fee", type: "Fixed", imageUrl: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=100&h=100&fit=crop" },
    { id: "prod-11", title: "Domain Renewal (.fi) - 5 Years", basePrice: 60.00, vat: 24, description: "Long term fee", type: "Fixed", imageUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=100&h=100&fit=crop" },
    { id: "prod-12", title: "Standard Web Hosting - Monthly", basePrice: 25.00, vat: 24, description: "Monthly hosting", type: "Service", imageUrl: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=100&h=100&fit=crop" },
    { id: "prod-13", title: "Dedicated Server Hosting - Enterprise Plan", basePrice: 120.00, vat: 24, description: "Dedicated server", type: "Service", imageUrl: "https://images.unsplash.com/photo-1558494949-ef526b004297?w=100&h=100&fit=crop" },
    { id: "prod-14", title: "UI/UX Design Review & Audit", basePrice: 450.00, vat: 24, description: "Interface audit", type: "Project", imageUrl: "https://images.unsplash.com/photo-1586717791821-3f44a5638d0f?w=100&h=100&fit=crop" },
    { id: "prod-15", title: "Brand Identity Logo Pack", basePrice: 800.00, vat: 24, description: "Brand assets", type: "Fixed", imageUrl: "https://images.unsplash.com/photo-1626785774573-4b799314346d?w=100&h=100&fit=crop" },
    { id: "prod-16", title: "Maintenance Contract Q1", basePrice: 300.00, vat: 24, description: "Quarterly maintenance", type: "Fixed", imageUrl: "https://images.unsplash.com/photo-1581092921461-eab62e97a782?w=100&h=100&fit=crop" },
    { id: "prod-17", title: "Maintenance Contract Q2", basePrice: 300.00, vat: 24, description: "Quarterly maintenance", type: "Fixed", imageUrl: "https://images.unsplash.com/photo-1504384764586-bb4cdc1707b0?w=100&h=100&fit=crop" },
    { id: "prod-18", title: "SaaS License - Annual Pro Plan", basePrice: 499.00, vat: 24, description: "Yearly subscription", type: "Fixed", imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=100&h=100&fit=crop" },
    { id: "prod-19", title: "SaaS License - Monthly Starter", basePrice: 49.00, vat: 24, description: "Monthly subscription", type: "Fixed", imageUrl: "https://images.unsplash.com/photo-1526304640152-d4619684e884?w=100&h=100&fit=crop" },
    { id: "prod-20", title: "Travel Reimbursement - Flight HEL-LHR", basePrice: 230.00, vat: 0, description: "Reimbursement", type: "Expense", imageUrl: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=100&h=100&fit=crop" },
    { id: "prod-21", title: "Accommodation - London Hotel 3 Nights", basePrice: 450.00, vat: 10, description: "Accommodation", type: "Expense", imageUrl: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=100&h=100&fit=crop" },
    { id: "prod-22", title: "Full Day Team Workshop Facilitation", basePrice: 1500.00, vat: 24, description: "Team training", type: "Service", imageUrl: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=100&h=100&fit=crop" },
    { id: "prod-23", title: "Printed Training Materials", basePrice: 150.00, vat: 24, description: "Materials", type: "Goods", imageUrl: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=100&h=100&fit=crop" },
    { id: "prod-24", title: "Emergency IT Support - Weekend Rate", basePrice: 180.00, vat: 24, description: "Emergency support", type: "Hourly", imageUrl: "https://images.unsplash.com/photo-1488229297570-58520851e868?w=100&h=100&fit=crop" },
    { id: "prod-25", title: "Office Supplies - Bulk Order", basePrice: 85.50, vat: 24, description: "Stationery", type: "Goods", imageUrl: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=100&h=100&fit=crop" },
    { id: "prod-26", title: "Coffee Machine Rental - April", basePrice: 45.00, vat: 24, description: "Rental", type: "Expense", imageUrl: "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?w=100&h=100&fit=crop" },
    { id: "prod-27", title: "Cleaning Services - Office", basePrice: 120.00, vat: 24, description: "Cleaning", type: "Service", imageUrl: "https://images.unsplash.com/photo-1581578731117-104f886f4b6d?w=100&h=100&fit=crop" },
    { id: "prod-28", title: "Courier Service - Express", basePrice: 35.00, vat: 24, description: "Delivery", type: "Service", imageUrl: "https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?w=100&h=100&fit=crop" }
];

// --- COMPONENT: Safe Image Loader ---
const ProductImage = ({ src, alt }: { src?: string, alt?: string }) => {
  const [error, setError] = useState(false);
  
  if (!src || error) {
    return (
      <div className="w-11 h-11 rounded-[12px] bg-gray-50 flex items-center justify-center border border-gray-100 shrink-0">
         <IconTag size={20} className="text-gray-300" weight="fill" />
      </div>
    );
  }

  return (
    <div className="w-11 h-11 rounded-[12px] bg-gray-50 overflow-hidden border border-gray-100 shrink-0 relative">
      <img 
        src={src} 
        alt={alt} 
        onError={() => setError(true)}
        className="w-full h-full object-cover"
      />
    </div>
  );
};

// --- Screen 1: Add To Invoice (Refined) ---
export const AddToInvoiceScreen: React.FC<NavigationProps> = ({ navigate, goBack }) => {
  const [cart, setCart] = useState<Array<Product & { quantity: number; total: number }>>([]);
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);

  const cartTotal = cart.reduce((acc, item) => acc + item.total, 0);

  const handleProductSelect = (product: Product) => {
    setActiveProduct(product);
  };

  const handleAddToCart = (item: Product & { quantity: number; total: number }) => {
    setCart([...cart, item]);
    setActiveProduct(null);
  };

  return (
    <div className="h-full w-full bg-white flex flex-col font-aktifo animate-fade-in relative overflow-hidden">
         
         {/* --- FIXED TOP SECTION (Header + Create Action) --- */}
         <div className="w-full bg-white z-20 shadow-[0_1px_2px_rgba(0,0,0,0.03)] shrink-0">
             
             {/* Header (Dark Teal) */}
             <div className="w-full bg-kletta-teal flex flex-col pb-5 pt-0">
                 {/* Status Bar - White Text */}
                 <div className="w-full h-[50px] flex justify-between items-end px-6 pb-2 text-white pointer-events-none">
                     <span className="text-[15px] font-medium tracking-normal leading-none ml-2">9:41</span>
                     <div className="flex gap-1.5 items-center mr-1">
                         <IconCellSignalFull size={16} weight="fill" />
                         <IconWifiHigh size={16} weight="bold" />
                         <IconBatteryFull size={24} weight="fill" className="rotate-0" />
                     </div>
                 </div>

                 {/* Navigation & Title */}
                 <div className="px-6 pt-2 flex flex-col">
                    <div className="flex justify-between items-center mb-6">
                        <div className="flex flex-col">
                            <button 
                                onClick={goBack} 
                                className="w-10 h-10 -ml-2 mb-2 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors text-white"
                            >
                                <IconBack size={26} weight="bold" />
                            </button>
                            <h1 className="text-[26px] font-medium text-white tracking-tight mb-0.5">Add to invoice</h1>
                            <p className="text-[13px] font-medium text-white/60">Select products or services</p>
                        </div>
                        
                        {/* Search Icon */}
                        <button className="w-10 h-10 -mr-2 flex items-center justify-center hover:bg-white/10 rounded-full transition-colors text-white self-end mb-1">
                            <IconSearch size={24} weight="bold" />
                        </button>
                    </div>
                 </div>
             </div>

             {/* Create New Product (Fixed sticky block) */}
             <button className="w-full py-4 px-6 bg-white border-b border-gray-100 flex items-center gap-4 group hover:bg-gray-50 transition-colors">
                <div className="w-11 h-11 rounded-full bg-kletta-yellow flex items-center justify-center text-kletta-dark shadow-sm shrink-0 group-active:scale-95 transition-transform">
                   <IconPlus size={20} weight="bold" />
                </div>
                <div className="flex-1 text-left">
                   <p className="text-[15px] font-medium text-kletta-dark leading-tight">Create new product</p>
                   <p className="text-[13px] text-gray-400 font-light mt-0.5">Add custom item to inventory</p>
                </div>
                <div className="text-gray-300">
                    <IconChevronRight size={16} weight="bold" />
                </div>
             </button>
         </div>

         {/* --- SCROLLABLE CONTENT --- */}
         <div className="flex-1 overflow-y-auto no-scrollbar pb-36 bg-white">
            
            {/* SECTION: Recently Used */}
            <div className="px-6 pt-5 pb-3 bg-white/95 sticky top-0 backdrop-blur-sm z-10 border-b border-gray-50">
                <p className="text-[12px] font-medium text-[#6F7683] uppercase tracking-wider">Recently Used</p>
            </div>
            
            {RECENT_PRODUCTS.map(product => (
                <ProductRow 
                    key={product.id}
                    product={product}
                    onTap={handleProductSelect}
                />
            ))}

            {/* SECTION: All Products */}
            <div className="px-6 pt-6 pb-3 bg-white/95 sticky top-0 backdrop-blur-sm z-10 border-b border-gray-50 mt-2">
                <p className="text-[12px] font-medium text-[#6F7683] uppercase tracking-wider">All Products</p>
            </div>

            {ALL_PRODUCTS.map(product => (
                <ProductRow 
                    key={product.id}
                    product={product}
                    onTap={handleProductSelect}
                />
            ))}
         </div>

         {/* Fixed Bottom Bar - Cart Summary */}
         {cart.length > 0 && (
            <div className="absolute bottom-6 left-6 right-6 bg-kletta-yellow rounded-[24px] p-4 flex items-center justify-between shadow-[0_8px_30px_rgba(255,217,59,0.3)] z-30 animate-slide-up border border-kletta-yellow/50">
               <div className="pl-2">
                  <p className="text-[11px] font-bold text-kletta-dark opacity-80 uppercase tracking-wide">{cart.length} items added</p>
                  <p className="text-xl font-bold text-kletta-dark">€{cartTotal.toFixed(2)}</p>
               </div>
               <button 
                  onClick={() => navigate('invoice-create-details')}
                  className="bg-white rounded-xl px-6 py-3 font-bold text-[14px] text-kletta-dark shadow-sm active:scale-95 transition-transform flex items-center gap-2"
               >
                  Next <IconChevronRight size={14} weight="bold" />
               </button>
            </div>
         )}

         {/* --- CONFIGURATION MODAL --- */}
         {activeProduct && (
            <ProductConfigSheet 
                product={activeProduct} 
                onClose={() => setActiveProduct(null)}
                onAdd={handleAddToCart}
            />
         )}
    </div>
  );
};

// --- Helper: Product Row (Refined Typography) ---
interface ProductRowProps {
    product: Product;
    onTap: (product: Product) => void;
}

const ProductRow: React.FC<ProductRowProps> = ({ product, onTap }) => {
    // Calculate total for display
    const total = product.basePrice * (1 + product.vat / 100);
    // Format: €380.70 • VAT 14% • €434.00 • Service
    const metaString = `€${product.basePrice.toFixed(2)} • VAT ${product.vat}% • €${total.toFixed(2)} • ${product.type}`;

    return (
        <button 
           onClick={() => onTap(product)} 
           className="w-full px-6 py-3 flex items-center gap-4 transition-colors border-b border-gray-50 bg-white hover:bg-gray-50 group text-left min-h-[72px]"
        >
           {/* Image Fallback Component */}
           <ProductImage src={product.imageUrl} alt={product.title} />

           {/* Middle Content - Refined Typography */}
           <div className="flex-1 min-w-0">
               {/* Title: 13px Book (300) #111 */}
               <p className="text-[13px] font-light text-[#111111] leading-snug mb-1 whitespace-normal text-left">
                   {product.title}
               </p>
               {/* Meta: 12px Light (300) #8A8F9A */}
               <p className="text-[12px] font-light text-[#8A8F9A] leading-tight text-left truncate">
                   {metaString}
               </p>
           </div>
     
           {/* Right Action - Yellow Button */}
           <div className="shrink-0 pl-2">
              <div className="w-9 h-9 rounded-full bg-kletta-yellow flex items-center justify-center text-kletta-dark shadow-sm group-hover:shadow-md transition-all active:scale-95">
                  <IconPlus size={18} weight="bold" />
              </div>
           </div>
        </button>
    );
};


// --- COMPONENT: Product Configuration Sheet ---
interface ConfigSheetProps {
    product: Product;
    onClose: () => void;
    onAdd: (item: Product & { quantity: number; total: number }) => void;
}

const ProductConfigSheet: React.FC<ConfigSheetProps> = ({ product, onClose, onAdd }) => {
    const [qty, setQty] = useState(1);
    const [price, setPrice] = useState(product.basePrice.toString());
    const [vat, setVat] = useState(product.vat);
    const [notes, setNotes] = useState('');

    const numericPrice = parseFloat(price) || 0;
    const subtotal = numericPrice * qty;
    const vatAmount = subtotal * (vat / 100);
    const total = subtotal + vatAmount;

    const handleAdd = () => {
        onAdd({
            ...product,
            basePrice: numericPrice,
            vat,
            description: notes,
            quantity: qty,
            total
        });
    };

    return (
        <div className="absolute inset-0 z-50 flex flex-col justify-end">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in" onClick={onClose} />
            
            {/* Modal Container: Tightened Radius (20px top), White Background */}
            <div className="bg-white w-full rounded-t-[20px] p-6 animate-slide-up relative z-10 max-h-[90%] flex flex-col shadow-2xl">
                {/* Drag Handle */}
                <div className="w-10 h-1 bg-gray-200 rounded-full mx-auto mb-6" />

                {/* Header: Typography Refined (Medium 500, not Bold) */}
                <div className="flex justify-between items-start mb-6">
                    <div>
                        <h2 className="text-[18px] font-medium text-kletta-dark leading-tight pr-8">{product.title}</h2>
                        <p className="text-[13px] text-gray-400 font-light mt-1">Configure line item</p>
                    </div>
                    <button onClick={onClose} className="w-8 h-8 flex items-center justify-center bg-gray-50 rounded-full hover:bg-gray-100 shrink-0 transition-colors">
                        <IconClose size={20} weight="bold" className="text-gray-500" />
                    </button>
                </div>

                {/* Scrollable Form Area */}
                <div className="flex-1 overflow-y-auto no-scrollbar space-y-6 pb-6">
                    
                    {/* Quantity Stepper: White Bg, Border, Lighter Buttons */}
                    <div className="flex items-center justify-between p-4 bg-white rounded-[12px] border border-[#E6E8EC]">
                        <span className="text-[11px] font-medium text-gray-500 uppercase tracking-wider">Quantity</span>
                        <div className="flex items-center gap-6">
                            <button 
                                onClick={() => setQty(Math.max(1, qty - 1))}
                                className="w-10 h-10 rounded-[12px] bg-white shadow-sm flex items-center justify-center border border-[#E6E8EC] active:scale-95 transition-transform hover:bg-gray-50"
                            >
                                <IconMinus size={16} weight="bold" className="text-kletta-dark" />
                            </button>
                            <span className="text-[18px] font-medium text-kletta-dark w-6 text-center">{qty}</span>
                            <button 
                                onClick={() => setQty(qty + 1)}
                                className="w-10 h-10 rounded-[12px] bg-white text-kletta-dark shadow-sm flex items-center justify-center border border-[#E6E8EC] active:scale-95 transition-transform hover:bg-gray-50"
                            >
                                <IconPlus size={16} weight="bold" />
                            </button>
                        </div>
                    </div>

                    {/* Price & VAT Row: White Inputs, Crisp Borders */}
                    <div className="flex gap-4">
                        <div className="flex-1">
                            <KlettaInput 
                                label="Price (€)"
                                type="number"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                            />
                        </div>
                         <div className="w-[120px]">
                            <KlettaSelect label="VAT %" value={vat} onChange={(e) => setVat(Number(e.target.value))}>
                                <option value={0}>0%</option>
                                <option value={10}>10%</option>
                                <option value={14}>14%</option>
                                <option value={24}>24%</option>
                            </KlettaSelect>
                        </div>
                    </div>

                    {/* Notes: White TextArea */}
                    <div>
                         <KlettaTextarea 
                            label="Description (Optional)"
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            placeholder="Add details..."
                            className="h-24"
                         />
                    </div>

                    {/* Calculation Summary: Clean, No Grey Block */}
                    <div className="p-1 space-y-2 mt-2">
                         <div className="flex justify-between text-[13px] text-gray-500 font-light px-2">
                             <span>Subtotal</span>
                             <span>€{subtotal.toFixed(2)}</span>
                         </div>
                         <div className="flex justify-between text-[13px] text-gray-500 font-light px-2">
                             <span>VAT Amount ({vat}%)</span>
                             <span>€{vatAmount.toFixed(2)}</span>
                         </div>
                         <div className="h-px bg-gray-100 my-2 mx-2" />
                         <div className="flex justify-between text-[16px] font-medium text-kletta-dark px-2">
                             <span>Total</span>
                             <span>€{total.toFixed(2)}</span>
                         </div>
                    </div>

                </div>

                {/* Primary Action */}
                <div className="pt-4 mt-2 border-t border-gray-50">
                    <button 
                        onClick={handleAdd}
                        className="w-full py-4 bg-kletta-yellow rounded-[14px] text-kletta-dark font-bold text-[16px] shadow-sm hover:shadow-md active:scale-[0.98] transition-all flex justify-between px-6 items-center"
                    >
                        <span>Add line item</span>
                        <span className="opacity-90 font-medium">€{total.toFixed(2)}</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

// --- Screen 2: Invoice Create Details (Refined) ---
export const InvoiceCreateDetailsScreen: React.FC<NavigationProps> = ({ navigate, goBack }) => {
   return (
      <div className="h-full w-full bg-[#F5F5F5] flex flex-col font-aktifo animate-fade-in relative overflow-hidden">
         
         {/* Fixed Header - Solid Dark */}
         <div className="bg-kletta-dark w-full z-20 shadow-sm shrink-0">
             {/* Status Bar */}
             <div className="w-full h-[50px] flex justify-between items-end px-6 pb-2 text-white pointer-events-none">
                <span className="text-[15px] font-medium tracking-normal leading-none ml-2">9:41</span>
                <div className="flex gap-1.5 items-center mr-1">
                   <IconCellSignalFull size={16} weight="fill" />
                   <IconWifiHigh size={16} weight="bold" />
                   <IconBatteryFull size={24} weight="fill" className="rotate-0" />
                </div>
             </div>

             {/* Navbar */}
             <div className="pt-2 pb-6 px-6 flex items-center justify-between">
                <button 
                    onClick={goBack} 
                    className="w-10 h-10 -ml-2 rounded-full flex items-center justify-center hover:bg-white/10 active:bg-white/20 transition-colors text-white"
                >
                   <IconBack size={26} weight="bold" />
                </button>
                <h1 className="text-[17px] font-medium text-white tracking-wide">Invoice details</h1>
                <div className="w-8"></div> {/* Spacer for centering */}
             </div>
         </div>

         {/* Main Scrollable Content */}
         <div className="flex-1 overflow-y-auto no-scrollbar px-5 pt-6 pb-36 relative z-10">
            
            {/* Main Details Card */}
            <div className="bg-white rounded-[16px] overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.05)] mb-4">
               
               {/* Date Row */}
               <button className="w-full flex items-center justify-between p-5 border-b border-gray-100 hover:bg-gray-50 transition-colors group text-left">
                  <div className="flex items-center gap-4">
                     <div className="w-10 h-10 bg-gray-50 rounded-[12px] flex items-center justify-center text-kletta-dark border border-gray-100 group-hover:border-gray-200 transition-colors">
                        <IconCalendarBlank size={20} weight="bold" />
                     </div>
                     <div>
                        <p className="text-[11px] font-medium text-gray-500 uppercase tracking-wider mb-0.5">Date</p>
                        <p className="text-[15px] font-medium text-kletta-dark">15 Dec 2025</p>
                     </div>
                  </div>
                  <IconChevronDown size={16} className="text-gray-300 group-hover:text-kletta-dark transition-colors" weight="bold" />
               </button>

               {/* Products Header */}
               <div className="flex justify-between items-center px-5 pt-6 pb-2">
                  <h3 className="text-[15px] font-medium text-kletta-dark">Products</h3>
                  <button 
                    onClick={() => navigate('new-invoice')}
                    className="text-[13px] font-medium text-kletta-teal hover:underline"
                  >
                    + Add more
                  </button>
               </div>

               {/* Product List */}
               <div className="px-5 pb-6">
                  <div className="space-y-0">
                      <InvoiceItem 
                         qty={1} 
                         title="Consulting" 
                         total="€434.00" 
                         vat="VAT 14% (€53.30)" 
                         last={false}
                      />
                      <InvoiceItem 
                         qty={2} 
                         title="Web Design & Development Phase 1" 
                         total="€2,976.00" 
                         vat="VAT 24% (€576.00)" 
                         last={true}
                      />
                  </div>

                  {/* Divider */}
                  <div className="h-px bg-gray-100 my-4" />

                  {/* Summary */}
                  <div className="space-y-2 pl-2">
                      <div className="flex justify-between text-[13px] font-light text-gray-500">
                         <span>Subtotal (excl. VAT)</span>
                         <span>€2,780.70</span>
                      </div>
                      <div className="flex justify-between text-[13px] font-light text-gray-500">
                         <span>VAT</span>
                         <span>€629.30</span>
                      </div>
                      <div className="flex justify-between text-[16px] font-medium text-kletta-dark mt-2 pt-2 border-t border-dashed border-gray-200">
                         <span>Total</span>
                         <span>€3,410.00</span>
                      </div>
                  </div>
               </div>
            </div>

            {/* Attachments Card */}
            <div className="bg-white rounded-[16px] p-2 shadow-[0_1px_3px_rgba(0,0,0,0.05)]">
                <div className="w-full flex items-center justify-between p-3">
                   <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-gray-50 rounded-[12px] flex items-center justify-center text-gray-400 border border-gray-100">
                         <IconPaperclip size={20} weight="bold" />
                      </div>
                      <div>
                         <span className="font-medium text-[15px] text-kletta-dark block">Attachments</span>
                         <span className="text-[12px] text-gray-400 font-light block mt-0.5">No files added</span>
                      </div>
                   </div>
                   <button className="text-[12px] font-bold text-kletta-teal bg-teal-50 px-4 py-2 rounded-[10px] hover:bg-teal-100 transition-colors">
                      Add
                   </button>
                </div>
            </div>
         </div>

         {/* Fixed Bottom Button */}
         <div className="absolute bottom-0 left-0 right-0 bg-white px-6 pt-4 pb-10 border-t border-gray-100 z-30">
            <button 
               onClick={() => navigate('invoice-payment-method')}
               className="w-full py-4 bg-kletta-yellow rounded-[14px] font-bold text-[16px] text-kletta-dark shadow-sm hover:shadow-md active:scale-[0.98] transition-all"
            >
               Next
            </button>
         </div>
      </div>
   );
};

const InvoiceItem = ({ qty, title, total, vat, last }: any) => (
   <div className={`flex items-start gap-3 py-3 ${!last ? 'border-b border-gray-50' : ''}`}>
      {/* Quantity Chip */}
      <div className="h-6 min-w-[32px] px-1.5 bg-gray-50 rounded-[8px] border border-gray-100 flex items-center justify-center text-[11px] font-medium text-gray-600 shrink-0 mt-0.5">
         {qty}x
      </div>
      
      {/* Middle Content */}
      <div className="flex-1 min-w-0 pr-2">
         <p className="text-[13px] font-light text-[#111111] leading-snug mb-0.5 whitespace-normal break-words">
             {title}
         </p>
         <p className="text-[11px] font-light text-gray-400">
             {vat}
         </p>
      </div>

      {/* Right Total */}
      <div className="text-right shrink-0">
         <p className="text-[13px] font-medium text-kletta-dark">{total}</p>
      </div>
   </div>
);