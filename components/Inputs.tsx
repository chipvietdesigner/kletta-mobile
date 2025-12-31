
import React from 'react';
import { IconChevronDown } from './Icons';

// Use type intersection for more robust prop inheritance from standard HTML elements
export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  icon?: React.ReactNode;
};

// Label component for reuse
export const KlettaLabel = ({ children }: { children?: React.ReactNode }) => {
  if (!children) return null;
  return (
    <label className="text-[11px] font-medium text-kletta-secondary uppercase tracking-wider ml-1 mb-2 block">
      {children}
    </label>
  );
};

// Input component with standard HTML attributes support
export const KlettaInput = ({ label, icon, className = '', ...props }: InputProps) => {
  return (
    <div className="w-full">
      {label && <KlettaLabel>{label}</KlettaLabel>}
      <div className="relative">
        {icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-kletta-secondary pointer-events-none">
            {icon}
          </div>
        )}
        <input 
          className={`w-full p-4 bg-white rounded-[12px] border border-[#E6E8EC] font-normal text-[16px] text-kletta-dark outline-none focus:border-kletta-teal focus:ring-4 focus:ring-kletta-teal/5 transition-all placeholder:text-gray-300 disabled:bg-gray-50 disabled:text-kletta-secondary ${icon ? 'pl-11' : ''} ${className}`}
          {...props}
        />
      </div>
    </div>
  );
};

// Select component with standard HTML attributes support
export type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  label?: string;
};

export const KlettaSelect = ({ label, children, className = '', ...props }: SelectProps) => {
  return (
    <div className="w-full">
      {label && <KlettaLabel>{label}</KlettaLabel>}
      <div className="relative">
        <select 
          className={`w-full p-4 bg-white rounded-[12px] border border-[#E6E8EC] font-medium text-[16px] text-kletta-dark outline-none focus:border-kletta-teal focus:ring-4 focus:ring-kletta-teal/5 transition-all appearance-none disabled:bg-gray-50 disabled:text-kletta-secondary ${className}`}
          {...props}
        >
          {children}
        </select>
        <IconChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-kletta-secondary pointer-events-none" />
      </div>
    </div>
  );
};

// Textarea component with standard HTML attributes support
export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string;
};

export const KlettaTextarea = ({ label, className = '', ...props }: TextareaProps) => {
  return (
    <div className="w-full">
       {label && <KlettaLabel>{label}</KlettaLabel>}
       <textarea 
          className={`w-full p-4 bg-white rounded-[12px] border border-[#E6E8EC] font-medium text-[16px] text-kletta-dark outline-none focus:border-kletta-teal focus:ring-4 focus:ring-kletta-teal/5 transition-all resize-none placeholder:text-gray-300 ${className}`}
          {...props}
       />
    </div>
  );
};
