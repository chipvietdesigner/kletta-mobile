
export type ScreenName = 
  | 'splash' | 'welcome' | 'login' | 'home'
  | 'signup-email' | 'signup-verify' | 'signup-create-passcode' | 'signup-business-location'
  | 'onboarding-welcome'
  | 'onboarding-1' | 'onboarding-2' | 'onboarding-3' 
  | 'onboarding-5' | 'onboarding-phone-verify' | 'onboarding-6' | 'onboarding-7' | 'onboarding-8'
  | 'onboarding-manual-entry'
  | 'incomplete-onboarding-entry'
  | 'incomplete-onboarding-tax-info'
  | 'incomplete-onboarding-tax-confirm'
  | 'incomplete-onboarding-phone'
  | 'incomplete-onboarding-verify-code'
  | 'new-invoice' | 'invoice-create-details'
  | 'invoice-payment-method'
  | 'invoice-customer-select'
  | 'invoice-customer-new'
  | 'invoice-customer-confirm'
  | 'invoice-due-date' | 'invoice-notes'
  | 'invoice-preview' | 'invoice-success'
  | 'invoice-detail'
  | 'summary'
  | 'summary-business-income' | 'summary-other-income' | 'summary-business-expenses'
  | 'summary-nonallowable-expenses' | 'summary-claimed-kilometers' | 'summary-cash-withdrawal'
  | 'summary-tax-prepayments'
  | 'settings'
  | 'scan-receipt-camera' | 'scan-receipt-preview' | 'scan-receipt-analyzing' | 'scan-receipt-review'
  | 'tax-return'
  | 'add-entry'
  | 'product-select-type' 
  | 'product-step-name' | 'product-step-tax' | 'product-step-price' | 'product-step-art'
  | 'product-success'
  | 'add-vehicle';

export interface NavigationProps {
  navigate: (screen: ScreenName, params?: any) => void;
  goBack: () => void;
  params?: any;
}

export type TabName = 'home' | 'summary' | 'bank' | 'sales' | 'expenses' | 'chat' | 'assets';

export interface IconProps {
  className?: string;
  size?: number;
  color?: string;
  strokeWidth?: number;
  weight?: "bold" | "regular" | "light" | "fill" | "thin" | "duotone";
}
