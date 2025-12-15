
export type ScreenName = 
  | 'splash' | 'welcome' | 'login' | 'home'
  | 'signup-email' | 'signup-verify'
  | 'onboarding-welcome'
  | 'onboarding-1' | 'onboarding-2' | 'onboarding-3' | 'onboarding-4' 
  | 'onboarding-5' | 'onboarding-6' | 'onboarding-7' | 'onboarding-8'
  | 'new-invoice' | 'invoice-create-details'
  // New Flow
  | 'invoice-payment-method'
  | 'invoice-customer-select'
  | 'invoice-customer-new'
  | 'invoice-customer-confirm'
  | 'invoice-due-date'
  | 'invoice-notes'
  | 'invoice-preview'
  | 'invoice-success'
  | 'invoice-detail'
  | 'summary'
  | 'summary-business-income'
  | 'summary-other-income'
  | 'summary-business-expenses'
  | 'summary-nonallowable-expenses'
  | 'summary-claimed-kilometers'
  | 'summary-cash-withdrawal'
  | 'summary-tax-prepayments'
  | 'settings';

export interface NavigationProps {
  navigate: (screen: ScreenName, params?: any) => void;
  goBack: () => void;
  params?: any;
}

export type TabName = 'home' | 'bank' | 'sales' | 'expenses' | 'chat' | 'assets';

export interface IconProps {
  className?: string;
  size?: number;
  color?: string;
  strokeWidth?: number;
  weight?: "bold" | "regular" | "light" | "fill" | "thin" | "duotone";
}