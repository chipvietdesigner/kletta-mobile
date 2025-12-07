export type ScreenName = 
  | 'splash' | 'welcome' | 'login' | 'home'
  | 'signup-email' | 'signup-verify'
  | 'onboarding-1' | 'onboarding-2' | 'onboarding-3' | 'onboarding-4' 
  | 'onboarding-5' | 'onboarding-6' | 'onboarding-7' | 'onboarding-8'
  | 'new-invoice' | 'invoice-create-details'
  | 'invoice-detail'
  | 'summary'
  | 'summary-business-income'
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