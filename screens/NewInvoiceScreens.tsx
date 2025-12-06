import React, { useState } from 'react';
import { 
  IconBack, IconPlus, IconCheck, IconTag, IconCalendarBlank, IconPaperclip, 
  IconChevronRight, IconCellSignalFull, IconWifiHigh, IconBatteryFull, IconPlusCircle,
  IconSparkle, IconSearch
} from '../components/Icons';
import { NavigationProps } from '../types';

// --- Screen 1: Add To Invoice (Redesigned) ---
export const AddToInvoiceScreen: React.FC<NavigationProps> = ({ navigate, goBack }) => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const toggleItem = (id: string) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter(i => i !== id));
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  };

  const totalAmount = "€806.45"; // Mock total

  return (
    <div className="h-full w-full bg-[#F5F5F5] flex flex-col font-aktifo animate-fade-in relative overflow-hidden">
         
         {/* --- TEAL HEADER (Home Style) --- */}
         <div className="bg-kletta-teal pt-0 pb-20 rounded-b-[42px] relative z-0 shadow-sm">
             
             {/* Status Bar (White) */}
             <div className="w-full h-[50px] flex justify-between items-end px-6 pb-2 text-white pointer-events-none">
                <span className="text-[15px] font-bold tracking-normal leading-none ml-2">9:41</span>
                <div className="flex gap-1.5 items-center mr-1">
                   <IconCellSignalFull size={16} weight="fill" />
                   <IconWifiHigh size={16} weight="bold" />
                   <IconBatteryFull size={24} weight="fill" className="rotate-0" />
                </div>
             </div>

             {/* Navigation & Title */}
             <div className="px-6 pt-4 pb-4">
                <button onClick={goBack} className="w-10 h-10 -ml-2 rounded-full flex items-center justify-center hover:bg-white/10 active:bg-white/20 transition-colors mb-4 text-white">
                   <IconBack size={26} />
                </button>
                <div className="flex justify-between items-end">
                   <div>
                      <h1 className="text-[32px] font-bold text-white leading-tight mb-1">Add to invoice</h1>
                      <p className="text-[15px] font-medium text-white/70">Choose products or services</p>
                   </div>
                   <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white">
                      <IconSearch size={20} weight="bold" />
                   </div>
                </div>
             </div>
         </div>

         {/* --- SCROLLABLE CONTENT (Overlapping) --- */}
         <div className="flex-1 overflow-y-auto no-scrollbar -mt-12 z-10 px-5 pb-36">
            
            {/* New Product Card (Overlapping) */}
            <button className="w-full bg-white rounded-[24px] p-4 flex items-center gap-4 shadow-sm mb-8 active:scale-[0.98] transition-transform">
               <div className="w-12 h-12 rounded-full bg-kletta-yellow flex items-center justify-center shadow-sm shrink-0 text-kletta-dark">
                  <IconPlus size={24} weight="bold" />
               </div>
               <div className="text-left flex-1">
                  <p className="font-bold text-[17px] text-kletta-dark">Create new product</p>
                  <p className="text-[13px] font-medium text-gray-400">Add custom item to inventory</p>
               </div>
               <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center">
                  <IconChevronRight size={16} className="text-gray-400" weight="bold" />
               </div>
            </button>

            {/* Recent Section */}
            <div className="mb-6">
               <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 ml-2">Recently Used</h3>
               <div className="space-y-3">
                  <ProductCard 
                     id="prod-1"
                     title="Consulting Service" 
                     price="€380.70"
                     sub="VAT 24% • Service"
                     selected={selectedItems.includes('prod-1')}
                     onToggle={() => toggleItem('prod-1')}
                  />
                  <ProductCard 
                     id="prod-2"
                     title="Web Development" 
                     price="€850.00"
                     sub="VAT 24% • Project"
                     selected={selectedItems.includes('prod-2')}
                     onToggle={() => toggleItem('prod-2')}
                  />
               </div>
            </div>

            {/* All Products Section */}
            <div>
               <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 ml-2">All Products</h3>
               <div className="space-y-3">
                  <ProductCard 
                     id="prod-3"
                     title="Maintenance Hour" 
                     price="€90.00"
                     sub="VAT 24% • Hourly"
                     selected={selectedItems.includes('prod-3')}
                     onToggle={() => toggleItem('prod-3')}
                  />
                  <ProductCard 
                     id="prod-4"
                     title="Server Setup" 
                     price="€250.00"
                     sub="VAT 24% • One-time"
                     selected={selectedItems.includes('prod-4')}
                     onToggle={() => toggleItem('prod-4')}
                  />
                  <ProductCard 
                     id="prod-5"
                     title="Design Review" 
                     price="€120.00"
                     sub="VAT 24% • Service"
                     selected={selectedItems.includes('prod-5')}
                     onToggle={() => toggleItem('prod-5')}
                  />
               </div>
            </div>
         </div>

         {/* Fixed Bottom Bar - Conditional */}
         {selectedItems.length > 0 && (
            <div className="absolute bottom-6 left-6 right-6 bg-kletta-yellow rounded-[24px] p-4 flex items-center justify-between shadow-[0_8px_30px_rgba(255,217,59,0.3)] z-30 animate-slide-up border border-kletta-yellow/50">
               <div className="pl-2">
                  <p className="text-[11px] font-bold text-kletta-dark opacity-80 uppercase tracking-wide">{selectedItems.length} items selected</p>
                  <p className="text-xl font-bold text-kletta-dark">{totalAmount}</p>
               </div>
               <button 
                  onClick={() => navigate('invoice-create-details')}
                  className="bg-white rounded-xl px-6 py-3 font-bold text-[14px] text-kletta-dark shadow-sm active:scale-95 transition-transform flex items-center gap-2"
               >
                  Next <IconChevronRight size={14} weight="bold" />
               </button>
            </div>
         )}
    </div>
  );
};

// --- Helper: Product Card (Home Style) ---
const ProductCard = ({ id, title, price, sub, selected, onToggle }: any) => (
    <button 
       onClick={onToggle} 
       className={`w-full p-4 rounded-[20px] flex items-center justify-between transition-all duration-200 shadow-sm border ${selected ? 'bg-kletta-teal text-white border-kletta-teal' : 'bg-white text-kletta-dark border-transparent active:scale-[0.99]'}`}
    >
       <div className="flex items-center gap-4">
          <div className={`w-12 h-12 rounded-[14px] flex items-center justify-center shrink-0 ${selected ? 'bg-white/10 text-white' : 'bg-gray-50 text-gray-400'}`}>
             <IconSparkle size={22} weight="fill" />
          </div>
          <div className="text-left">
             <p className={`font-bold text-[16px] leading-tight mb-0.5 ${selected ? 'text-white' : 'text-kletta-dark'}`}>{title}</p>
             <p className={`text-[12px] font-medium ${selected ? 'text-white/60' : 'text-gray-400'}`}>{sub}</p>
          </div>
       </div>
 
       <div className="text-right">
          <p className={`font-bold text-[16px] mb-1 ${selected ? 'text-white' : 'text-kletta-dark'}`}>{price}</p>
          <div className={`inline-flex items-center justify-center w-6 h-6 rounded-full ${selected ? 'bg-kletta-yellow text-kletta-dark' : 'bg-gray-100 text-gray-300'}`}>
             {selected ? <IconCheck size={14} weight="bold" /> : <IconPlus size={14} weight="bold" />}
          </div>
       </div>
    </button>
 );

// --- Screen 2: Invoice Create Details (Existing Implementation) ---
export const InvoiceCreateDetailsScreen: React.FC<NavigationProps> = ({ navigate, goBack }) => {
   return (
      <div className="h-full w-full bg-[#F5F5F5] flex flex-col font-aktifo animate-fade-in relative">
         
         {/* Dark Header Background */}
         <div className="bg-kletta-dark h-[220px] w-full absolute top-0 left-0 z-0"></div>

         {/* Status Bar (Light for dark bg) */}
         <div className="absolute top-0 left-0 w-full h-[50px] flex justify-between items-end px-6 pb-2 text-white z-20 pointer-events-none">
            <span className="text-[15px] font-bold tracking-normal leading-none ml-2">9:41</span>
            <div className="flex gap-1.5 items-center mr-1">
               <IconCellSignalFull size={16} weight="fill" />
               <IconWifiHigh size={16} weight="bold" />
               <IconBatteryFull size={24} weight="fill" className="rotate-0" />
            </div>
         </div>

         {/* Navbar */}
         <div className="pt-14 pb-4 px-6 flex items-center relative z-10">
            <button onClick={goBack} className="w-10 h-10 -ml-2 rounded-full flex items-center justify-center bg-white/10 hover:bg-white/20 active:bg-white/30 transition-colors text-white">
               <IconBack size={26} />
            </button>
            <div className="flex-1 text-center pr-8">
               <h1 className="text-[17px] font-bold text-white">Invoice details</h1>
            </div>
         </div>

         {/* Main Scrollable Content */}
         <div className="flex-1 overflow-y-auto no-scrollbar px-5 pt-4 pb-36 relative z-10">
            
            {/* Main Card */}
            <div className="bg-white rounded-[24px] p-6 shadow-sm mb-4">
               
               {/* Date Row */}
               <div className="flex justify-between items-center pb-6 border-b border-gray-100 mb-6">
                  <div className="flex items-center gap-3">
                     <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-kletta-dark">
                        <IconCalendarBlank size={20} weight="bold" />
                     </div>
                     <div>
                        <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Date</p>
                        <p className="text-[15px] font-bold text-kletta-dark">15 Dec 2025</p>
                     </div>
                  </div>
                  <IconChevronRight size={16} className="text-gray-300 rotate-90" weight="bold" />
               </div>

               {/* Products Header */}
               <div className="flex justify-between items-center mb-4">
                  <h3 className="text-[15px] font-bold text-kletta-dark">Products</h3>
                  <button className="text-[13px] font-bold text-kletta-teal">+ Add more</button>
               </div>

               {/* Product List */}
               <div className="space-y-4 mb-6">
                  <InvoiceItem 
                     qty={1} 
                     title="Consulting" 
                     total="€434.00" 
                     vat="VAT 14% (€53.30)" 
                  />
                  <InvoiceItem 
                     qty={2} 
                     title="Web Design" 
                     total="€2,976.00" 
                     vat="VAT 24% (€576.00)" 
                  />
               </div>

               {/* Dotted Divider */}
               <div className="border-t-2 border-dashed border-gray-100 mb-6"></div>

               {/* Summary */}
               <div className="space-y-2">
                  <div className="flex justify-between text-[13px] font-medium text-gray-500">
                     <span>Subtotal (excl. VAT)</span>
                     <span>€2,780.70</span>
                  </div>
                  <div className="flex justify-between text-[13px] font-medium text-gray-500">
                     <span>VAT</span>
                     <span>€629.30</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold text-kletta-dark mt-2">
                     <span>Total</span>
                     <span>€3,410.00</span>
                  </div>
               </div>
            </div>

            {/* Attachments Card */}
            <div className="bg-white rounded-[24px] p-5 shadow-sm flex items-center justify-between">
               <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-gray-400">
                     <IconPaperclip size={20} weight="bold" />
                  </div>
                  <span className="font-bold text-[15px] text-kletta-dark">Attachments</span>
               </div>
               <button className="text-[13px] font-bold text-kletta-teal bg-teal-50 px-3 py-1.5 rounded-lg">
                  Add
               </button>
            </div>
         </div>

         {/* Fixed Bottom Button */}
         <div className="absolute bottom-0 left-0 right-0 bg-white/0 p-6 z-20">
            <button className="w-full py-4 bg-kletta-yellow rounded-2xl font-bold text-lg text-kletta-dark shadow-lg active:scale-[0.98] transition-transform">
               Next
            </button>
         </div>
      </div>
   );
};

const InvoiceItem = ({ qty, title, total, vat }: any) => (
   <div className="flex items-start gap-3">
      <div className="w-8 h-8 bg-gray-50 rounded-lg flex items-center justify-center text-xs font-bold text-kletta-dark shrink-0">
         {qty}x
      </div>
      <div className="flex-1">
         <div className="flex justify-between items-start">
            <p className="font-bold text-[15px] text-kletta-dark">{title}</p>
            <p className="font-bold text-[15px] text-kletta-dark">{total}</p>
         </div>
         <p className="text-[11px] font-medium text-gray-400 mt-0.5">{vat}</p>
      </div>
   </div>
);